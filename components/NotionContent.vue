<template>
    <div class="notion-contents">
        <div class="inner">
            <div v-if="isLoading" class="loader"></div>
            <template v-else>
                <NuxtLink to="/posts" class="back">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    목록으로
                </NuxtLink>
                <div class="notion-header">
                    <span>{{ date }}</span>
                    <h3>{{ title }}</h3>
                </div>
                <div class="notion-blocks">
                    <component v-for="(block, index) in renderedBlocks" :key="index" :is="block" />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { h, watch, computed } from "vue";
import Prism from "prismjs";

// Prism 스타일 import
import "prismjs/themes/prism-tomorrow.css";

// 필요한 언어만 선택 import (원하는 언어만 추가하면 돼)
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-bash";

const props = defineProps({
    title: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    blocks: {
        type: Array,
        required: true,
    },
});

const isLoading = ref(true);

watch(
    () => props.blocks,
    (newVal) => {
        if (newVal && newVal.length > 0) {
            isLoading.value = false;
        }
    },
    { immediate: true }
);

const renderRichText = (texts) =>
    texts.map((t) =>
        h(
            "span",
            {
                class: {
                    "font-bold": t.annotations?.bold,
                    italic: t.annotations?.italic,
                    underline: t.annotations?.underline,
                    "line-through": t.annotations?.strikethrough,
                },
                style: { color: t.annotations?.color !== "default" ? t.annotations?.color : "" },
            },
            t.plain_text
        )
    );

const groupListBlocks = (blocks) => {
    const result = [];
    let i = 0;

    while (i < blocks.length) {
        const block = blocks[i];

        if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
            const listType = block.type === "bulleted_list_item" ? "ul" : "ol";
            const items = [];

            while (i < blocks.length && blocks[i].type === block.type) {
                items.push(blocks[i]);
                i++;
            }

            result.push({
                type: listType,
                items,
            });
        } else {
            result.push(block);
            i++;
        }
    }

    return result;
};

const renderBlock = (block) => {
    if (block.type === "ul" || block.type === "ol") {
        return h(
            block.type,
            { class: "ml-6 list-disc marker:text-gray-500 space-y-1" },
            block.items.map((item) => h("li", { key: item.id }, renderRichText(item[item.type]?.rich_text || [])))
        );
    }

    const { type } = block;
    const text = block[type]?.rich_text || [];

    switch (type) {
        case "paragraph":
            return h("p", { class: "text-base leading-7" }, renderRichText(text));

        case "heading_1":
            return h("h1", { class: "text-3xl font-extrabold mt-6" }, renderRichText(text));
        case "heading_2":
            return h("h2", { class: "text-2xl font-extrabold mt-5" }, renderRichText(text));
        case "heading_3":
            return h("h3", { class: "text-xl font-bold mt-4" }, renderRichText(text));

        case "quote":
            return h("blockquote", { class: "border-l-4 pl-4 italic text-gray-600 my-4" }, renderRichText(text));

        case "callout":
            return h(
                "div",
                {
                    class: "bg-yellow-100 p-4 rounded-md border border-yellow-300 flex items-start space-x-2",
                },
                [block.callout.icon?.emoji && h("span", null, block.callout.icon.emoji), h("div", null, renderRichText(text))]
            );

        case "image":
            const isExternal = block.image?.type === "external";
            const url = isExternal ? block.image.external.url : block.image.file.url;

            const caption = block.image.caption?.[0]?.plain_text || "Notion Image";

            return h("figure", { class: "my-6" }, [
                h("img", {
                    class: "rounded-lg shadow-md w-full",
                    src: url,
                    alt: caption,
                    onError: (e) => {
                        e.target.src = "/placeholder-image.png"; // fallback 이미지 경로 설정 가능
                    },
                }),
                caption && h("figcaption", { class: "text-sm text-gray-500 mt-2 text-center" }, caption),
            ]);

        case "to_do":
            return h("div", { class: "flex items-start space-x-2" }, [
                h("input", {
                    type: "checkbox",
                    checked: block.to_do.checked,
                    disabled: true,
                }),
                h("span", null, renderRichText(text)),
            ]);

        case "code":
            const code = text.map((t) => t.plain_text).join("");
            const language = block.code.language || "plaintext";
            const grammar = Prism.languages[language] || Prism.languages.plaintext;
            const highlightedCode = Prism.highlight(code, grammar, language);

            return h(
                "pre",
                { class: `language-${language} rounded-md my-4 overflow-x-auto` },
                h("code", {
                    class: `language-${language}`,
                    innerHTML: highlightedCode,
                })
            );

        case "toggle":
            return h("details", { class: "my-3" }, [h("summary", { class: "cursor-pointer font-semibold" }, renderRichText(text)), ...(block.children?.map(renderBlock) || [])]);

        case "divider":
            return h("hr", { class: "my-6 border-gray-300" });

        case "table":
            return h("table", { class: "table-auto border border-gray-300 w-full my-4" }, [
                h(
                    "tbody",
                    {},
                    block.children?.map((row) =>
                        h(
                            "tr",
                            { class: "border-b border-gray-200" },
                            row.table_row.cells.map((cell) => h("td", { class: "px-4 py-2 border-r border-gray-200" }, renderRichText(cell)))
                        )
                    )
                ),
            ]);
        case "bookmark":
            return h(
                "a",
                {
                    href: block.bookmark.url,
                    target: "_blank",
                    class: "block p-4 border rounded-lg hover:bg-gray-50 transition my-4",
                },
                [h("div", { class: "text-blue-600 underline" }, block.bookmark.url)]
            );

        default:
            return h("div", { class: "text-gray-400 text-sm italic" }, `Unsupported block: ${type}`);
    }
};

const renderedBlocks = computed(() => groupListBlocks(props.blocks).map(renderBlock));
</script>

<style lang="scss">
.notion-contents {
    padding: 100px 0;
    min-height: 100vh;
    font-family: "PretendardVariable", sans-serif;

    .back {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 5px 14px 6px 8px;
        border: 1px solid #000;
        border-bottom: none;
    }
    .notion-header {
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        padding: 20px;
        span {
            font-weight: 300;
        }
    }
    .notion-blocks {
        border-bottom: 1px solid #000;
        padding: 20px;
    }
}

/* Prism 스타일 추가로 덮어쓰기 가능 */
pre[class*="language-"] {
    padding: 1rem;
    border-radius: 0.5rem;
    background: #2d2d2d;
    color: white;
}

.loader {
    position: fixed;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background-color: #000;
    &::before {
        position: absolute;
        content: "";
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        border: 1px solid #000;
        border-radius: 50%;
        animation: loader 2s infinite alternate;
    }
}
@keyframes loader {
    from {
        transform: translate(-50%, -50%) scale(1);
    }
    to {
        transform: translate(-50%, -50%) scale(1.8);
    }
}
</style>
