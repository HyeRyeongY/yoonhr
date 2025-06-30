<template>
    <div class="morphin-text">
        <div id="container">
            <span ref="text1Ref" id="text1"></span>
            <span ref="text2Ref" id="text2"></span>
        </div>
        <svg id="filters">
            <defs>
                <filter id="threshold">
                    <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
                </filter>
            </defs>
        </svg>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// 1. props로 texts 받아오기
const props = defineProps({
    texts: {
        type: Array,
        required: true,
    },
});
// 로컬 상수로 복사 (props.texts는 읽기 전용이지만, 직접 읽어도 무방)
const texts = props.texts;

const text1Ref = ref(null);
const text2Ref = ref(null);

onMounted(() => {
    const text1 = text1Ref.value;
    const text2 = text2Ref.value;

    const morphTime = 1.4;
    const cooldownTime = 0.5;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    text1.textContent = texts[textIndex % texts.length];
    text2.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
        morph -= cooldown;
        cooldown = 0;

        let fraction = morph / morphTime;

        if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
        }

        setMorph(fraction);
    }

    function setMorph(fraction) {
        text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        text1.textContent = texts[textIndex % texts.length];
        text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
        morph = 0;

        text2.style.filter = "";
        text2.style.opacity = "100%";

        text1.style.filter = "";
        text1.style.opacity = "0%";
    }

    function animate() {
        requestAnimationFrame(animate);

        let newTime = new Date();
        let shouldIncrementIndex = cooldown > 0;
        let dt = (newTime - time) / 1000;
        time = newTime;

        cooldown -= dt;

        if (cooldown <= 0) {
            if (shouldIncrementIndex) {
                textIndex++;
            }
            doMorph();
        } else {
            doCooldown();
        }
    }

    animate();
});
</script>

<style lang="scss">
.morphin-text {
    width: 100%;
    #container {
        filter: url(#threshold) blur(0.6px);
        position: relative;
        height: 100%;
    }
    #text1,
    #text2 {
        position: absolute;
        left: 0;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        font-family: "Funnel Display", sans-serif;
        font-weight: 900;
        text-align: center;
        user-select: none;
    }
    #filters {
        display: none;
    }
}
</style>
