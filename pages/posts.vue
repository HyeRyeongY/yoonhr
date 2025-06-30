<template>
    <div class="posts-page">
        <div class="inner">
            <h2>Posts.</h2>

            <div class="tabs">
                <!-- <button @click="selectedCategory = 'all'" :class="{ active: 'all' === selectedCategory }">ALL</button> -->
                <button v-for="cat in categories" :key="cat" :class="{ active: cat === selectedCategory }" @click="selectedCategory = cat">
                    {{ cat }}
                </button>
            </div>

            <div class="scroll-list">
                <ul>
                    <template v-for="(item, index) in filteredItems" :key="index">
                        <li>
                            <NuxtLink :to="`/postsDetail/${item.id}`">
                                <!-- 썸네일 이미지 -->
                                <span>{{ index + 1 }}</span>
                                <!-- <img v-if="getThumbnailImage(item)" :src="getThumbnailImage(item)" alt="썸네일" class="object-cover" @error="(e) => (e.target.src = '/placeholder-thumbnail.png')" /> -->
                                <p>
                                    {{ item.properties.title.title[0]?.plain_text || "제목 없음" }} <i>{{ formatDateToYMD(item.created_time) }}</i>
                                </p>
                            </NuxtLink>
                        </li></template
                    >
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";

/**애니메이션 */

/* posts contents */
const { data: notionData } = await useFetch("/api/notion/notion");

const categories = computed(() => {
    const items = notionData.value?.results || [];
    const names = items.map((item) => item.properties.category?.select?.name).filter(Boolean); // undefined/null 제거
    return [...new Set(names)]; // 중복 제거
});

const selectedCategory = ref("study"); // 기본 탭 선택값

const filteredItems = computed(() => {
    const items = notionData.value?.results || [];

    if (selectedCategory.value === "all") {
        return items;
    }

    return items.filter((item) => item.properties.category?.select?.name === selectedCategory.value);
});
/** 날짜 포맷 */
function formatDateToYMD(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
}

const getThumbnailImage = (page) => {
    // 1. 커버가 있는 경우
    if (page.cover) {
        return page.cover.external?.url || page.cover.file?.url;
    }

    // 2. 특정 속성에 있는 파일 속성 (예: thumbnail)
    const files = page.properties?.thumbnail?.files;
    if (files?.length) {
        return files[0].external?.url || files[0].file?.url;
    }

    // // 3. 기본 이미지 fallback
    // return "/placeholder-thumbnail.png";
};

/* review */
const clickReview = () => {
    console.log("reivews");
    selectedCategory.value = "review";
};
</script>
