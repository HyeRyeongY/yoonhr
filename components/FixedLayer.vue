<template>
    <div ref="layerRef" :style="layerStyle">
        <slot />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const props = defineProps({
    top: [String, Number],
    bottom: [String, Number],
    left: [String, Number],
    right: [String, Number],
    zIndex: {
        type: [String, Number],
        default: 9999,
    },
    pointerEvents: {
        type: String,
        default: "auto",
    },
});

const layerRef = ref(null);

const addUnit = (val) => (typeof val === "number" ? `${val}px` : val);
const px = (val) => (val != null ? (typeof val === "number" ? val : parseFloat(val)) : null);

const layerStyle = computed(() => ({
    position: "absolute",
    top: 0,
    left: props.left != null ? addUnit(props.left) : undefined,
    right: props.right != null ? addUnit(props.right) : undefined,
    zIndex: props.zIndex,
    pointerEvents: props.pointerEvents,
    willChange: "transform",
}));

let animationFrame;
let smoother;

function syncPosition() {
    const el = layerRef.value;
    if (!el) return;

    if (!smoother) {
        smoother = ScrollSmoother.get();
        if (!smoother) {
            animationFrame = requestAnimationFrame(syncPosition);
            return;
        }
    }

    const scrollY = smoother.scrollTop();
    const top = px(props.top);
    const bottom = px(props.bottom);
    const winHeight = window.innerHeight;
    const elHeight = el.offsetHeight;

    let y = 0;
    if (top != null) {
        y = scrollY + top;
    } else if (bottom != null) {
        y = scrollY + winHeight - elHeight - bottom;
    } else {
        y = scrollY;
    }

    // X는 CSS로 처리, Y만 transform으로 보정
    el.style.transform = `translateY(${y}px)`;

    animationFrame = requestAnimationFrame(syncPosition);
}

onMounted(() => {
    animationFrame = requestAnimationFrame(syncPosition);
});

onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrame);
});
</script>
