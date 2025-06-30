<template>
    <div class="text-morph">
        <div ref="textRef" class="text-wrap">
            <p>Design</p>
            <p>Publishing</p>
            <p>Development</p>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import TextPlugin from "gsap/TextPlugin";
// gsap.registerPlugin(ScrollTrigger, TextPlugin);

const textRef = ref(null);

onMounted(() => {
    const text = textRef.value;
    const [el1, el2, el3] = Array.from(text.querySelectorAll("p"));

    ScrollTrigger.create({
        trigger: ".text-morph",
        start: "top top",
        end: "bottom top",
        pin: true,
        anticipatePin: 1,
    });

    gsap.to(el1, {
        text: "Just",
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: ".text-morph",
            start: 200,
            toggleActions: "play none none reverse",
        },
    });

    gsap.to(el2, {
        text: "Do",
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: ".text-morph",
            start: 500,
            toggleActions: "play none none reverse",
        },
    });

    gsap.to(el3, {
        text: "It",
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: ".text-morph",
            start: 700,
            toggleActions: "play none none reverse",
        },
    });
});
</script>
<style lang="scss">
.text-morph {
    height: 200vh;
    text-align: center;
    font-size: 4rem;
    font-weight: 700;

    .text-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        height: 100vh;
    }
}
</style>
