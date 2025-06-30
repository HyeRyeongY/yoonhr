<template>
    <header :class="{ light: isLight }">
        <ul class="gnb">
            <li>
                <a href="#yes" @click.prevent="navigateToAnchor('yes')"
                    ><em>Y</em><span><strong>Yes.</strong><br />네</span></a
                >
            </li>
            <li>
                <a href="#here" @click.prevent="navigateToAnchor('here')"
                    ><em>H</em><span><strong>Here.</strong><br />여기 있습니다</span></a
                >
            </li>
            <li>
                <a href="#ready" @click.prevent="navigateToAnchor('ready')"
                    ><em>R</em><span><strong>Ready.</strong><br />준비됐습니다</span></a
                >
            </li>
        </ul>
    </header>
    <div id="smooth-wrapper" class="default" :class="{ light: isLight }">
        <div id="smooth-content">
            <main>
                <slot />
            </main>

            <footer>
                <p>© 2025 yoonhyeryeong</p>
                <!-- 네, 여기 있습니다. 준비됐습니다. -->
            </footer>
        </div>
    </div>
    <Cursor v-if="isMouse" />
</template>
<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/** scroll smoother */
// onMounted(() => {
//     ScrollSmoother.create({
//         wrapper: "#smooth-wrapper",
//         content: "#smooth-content",
//         smooth: 1.2, // 부드러움 정도
//         effects: true, // data-speed, data-lag 등 효과 활성화
//     });
// });

/* menu click */
const router = useRouter();
const route = useRoute();

const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
        ScrollSmoother.get().scrollTo(target, true, "power2.out");
    }
};
function navigateToAnchor(anchorId) {
    const targetPath = "/";
    const hash = `#${anchorId}`;

    if (route.path !== targetPath) {
        router.push({ path: targetPath, hash });
    } else {
        // const el = document.getElementById(anchorId);
        // if (el) {
        //     el.scrollIntoView({ behavior: "smooth" });
        // }
        scrollTo(anchorId);
    }
}

import Cursor from "@/components/Cursor.vue";

const isMouse = ref(false);

onMounted(() => {
    isMouse.value = window.matchMedia("(hover: hover)").matches;
});

/** theme */
const isLight = computed(() => {
    return route.path.includes("posts");
});

/* menu active */
onMounted(async () => {
    await nextTick();

    if (route.path !== "/") return;

    // 기존 메뉴용 ScrollTrigger 제거
    ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.id?.startsWith("menu-"))
        .forEach((trigger) => trigger.kill());

    // 메뉴 링크 등록
    const links = document.querySelectorAll('a[href^="#"]');
    const yesHeight = 9000 + window.innerHeight;
    links.forEach((link) => {
        const id = link.getAttribute("href");
        const section = document.querySelector(id);

        if (section) {
            const sectionId = id.replace("#", "");

            ScrollTrigger.create({
                id: `menu-${sectionId}`,
                trigger: section,
                start: "top center",
                end: sectionId === "yes" ? "+=" + yesHeight : "bottom center", // #yes만 커스텀 end
                toggleClass: { targets: link, className: "active" },
            });
        }
    });
});
</script>

<style scoped>
#smooth-wrapper {
    height: 100vh;
    overflow: hidden;
}

#smooth-content {
    will-change: transform;
}
</style>
