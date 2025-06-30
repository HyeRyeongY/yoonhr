// plugins/gsap.client.ts

import { defineNuxtPlugin } from "#app";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import SplitText from "gsap/SplitText";
import TextPlugin from "gsap/TextPlugin";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import Flip from "gsap/Flip";

export default defineNuxtPlugin(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, TextPlugin, DrawSVGPlugin, Flip);

    ScrollTrigger.config({
        ignoreMobileResize: true,
    });

    if (process.client) {
        // 이미 생성되어 있지 않으면 ScrollSmoother 생성
        if (!ScrollSmoother.get()) {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.2,
                effects: true,
                normalizeScroll: true, // 모바일에서 약간 개선
            });
        }
    }
});
