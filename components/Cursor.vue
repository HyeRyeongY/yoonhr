<template>
    <div class="cursor">
        <div class="cursor-dot"></div>
        <div class="cursor-outline"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import gsap from "gsap";

const isPc = ref(false);
let pointerQuery;

let leaveTimeout;

const handleMouseMove = () => {
    if (leaveTimeout) clearTimeout(leaveTimeout);
    if (!isPc.value) isPc.value = true;
};

const handleMouseOut = () => {
    leaveTimeout = setTimeout(() => {
        isPc.value = false;
    }, 150);
};

const onDocumentMouseMove = (e) => {
    if (!isPc.value) return; // PC 아니면 무시

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    gsap.to(".cursor-dot", { x: mouseX, y: mouseY, duration: 0 });
    gsap.to(".cursor-outline", { x: mouseX, y: mouseY, duration: 0.5, ease: "elastic.out(1, 0.4)" });
};

const onDocumentMouseOver = (e) => {
    if (!isPc.value) return;

    if (e.target.closest("a, button, input, textarea, summary")) {
        gsap.to(".cursor-outline", { scale: 1.8, duration: 0.2, ease: "power2.out" });
    }
};

const onDocumentMouseOut = (e) => {
    if (!isPc.value) return;

    if (e.target.closest("a, button,input, textarea, summary")) {
        gsap.to(".cursor-outline", { scale: 1, duration: 0.2, ease: "power2.out" });
    }
};

watch(isPc, (visible) => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    gsap.killTweensOf([cursorDot, cursorOutline]);

    if (visible) {
        gsap.to([cursorDot, cursorOutline], {
            opacity: 1,
            duration: 0.3,
            onStart: () => {
                cursorDot.style.visibility = "visible";
                cursorOutline.style.visibility = "visible";
            },
        });
    } else {
        gsap.to([cursorDot, cursorOutline], {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                cursorDot.style.visibility = "hidden";
                cursorOutline.style.visibility = "hidden";
            },
        });
    }
});

onMounted(() => {
    pointerQuery = window.matchMedia("(any-pointer: fine)");

    if (pointerQuery.matches) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseOut);

        document.addEventListener("mousemove", onDocumentMouseMove);
        document.addEventListener("mouseover", onDocumentMouseOver);
        document.addEventListener("mouseout", onDocumentMouseOut);
    }
});

onUnmounted(() => {
    if (pointerQuery?.matches) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseout", handleMouseOut);

        document.removeEventListener("mousemove", onDocumentMouseMove);
        document.removeEventListener("mouseover", onDocumentMouseOver);
        document.removeEventListener("mouseout", onDocumentMouseOut);
    }
});
</script>

<style scoped lang="scss">
/* 기본 커서 숨기기 */
body {
    cursor: none;
}

/* 커스텀 커서 컨테이너 */
.cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;

    /* 작은 원 (즉시 따라가는 점) */
    .cursor-dot {
        position: absolute;
        width: 6px;
        height: 6px;
        background-color: white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }

    /* 큰 원 (스무스하게 따라가는 테두리) */
    .cursor-outline {
        position: absolute;
        width: 30px;
        height: 30px;
        border: 1px solid white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
}
</style>
