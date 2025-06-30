<template>
    <div class="stagger-text">
        <p ref="text">Stagger Text</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import gsap from "gsap";

import SplitText from "gsap/SplitText";
// gsap.registerPlugin(SplitText);

const text = ref(null);
onMounted(() => {
    const split = new SplitText(text.value, { type: "chars" });
    split.chars.forEach((charSpan) => {
        // charSpan 내부 글자(text node) 가져오기
        const letter = charSpan.textContent;

        // charSpan 내부 비우기
        charSpan.textContent = "";

        // 새 inner span 두 개 생성
        for (let i = 0; i < 2; i++) {
            const innerSpan = document.createElement("span");
            innerSpan.textContent = letter;
            charSpan.appendChild(innerSpan);
            // inner span을 charSpan에 붙임
            charSpan.appendChild(innerSpan);
        }

        // 클래스 이름 변경 (optional)
        charSpan.classList.remove("char");
        charSpan.classList.add("letter");
    });

    gsap.set(".letter", { display: "flex" });
    gsap.to(".letter", {
        duration: 1,
        yPercent: 100,
        ease: "expo.inOut",
        repeat: -1,
        yoyo: true,
        repeatDelay: 2,
        stagger: {
            each: 0.04,
            from: "random",
        },
    });
});
</script>

<style lang="scss">
.stagger-text {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        display: flex;
        overflow: hidden;
        line-height: 2ch;
        font-size: 3rem;
        .letter {
            position: relative;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            align-items: center;
            height: 1.9ch;
        }
    }
}
</style>
