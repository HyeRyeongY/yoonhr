// plugins/v-hover.client.js
import { defineNuxtPlugin } from "#app";
import gsap from "gsap";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("hover", {
        mounted(el, binding) {
            // 옵션 추출: { bg, text } 또는 data-hover-bg, data-hover-text
            const opts = binding.value || {};
            const bgColor = opts.bg || el.dataset.hoverBg || "#fff";
            const textColor = opts.text || el.dataset.hoverText || "";

            // 부모 요소 스타일 보장
            const style = getComputedStyle(el);
            if (style.position === "static" || !style.position) {
                el.style.position = "relative";
                el.style.zIndex = "0";
            }
            el.style.overflow = "hidden";

            // 요소 크기 가져오기
            const { width, height } = el.getBoundingClientRect();
            // 대각선 기준으로 원 지름 계산 (버튼 모서리와 border 영역까지 커버)
            const diameter = Math.sqrt(width * width + height * height) * 2;

            // circle 생성
            const circle = document.createElement("span");
            circle.className = "hover-circle";
            Object.assign(circle.style, {
                position: "absolute",
                zIndex: "-1",
                top: "0",
                left: "0",
                width: `${diameter}px`,
                height: `${diameter}px`,
                borderRadius: "50%",
                pointerEvents: "none",
                backgroundColor: bgColor,
                transform: "translate(-50%, -50%) scale(0)",
                transformOrigin: "50% 50%",
                willChange: "transform",
            });
            // 첫 번째 자식으로 삽입 → 텍스트 위로, border 아래에 노출
            el.insertBefore(circle, el.firstChild);

            // EVENT HANDLERS
            const onEnter = (e) => {
                const { left, top } = el.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;

                gsap.set(circle, { x, y });
                gsap.to(circle, {
                    duration: 0.4,
                    scale: 1,
                    ease: "power2.out",
                });
                if (textColor) {
                    gsap.to(el, { duration: 0.2, color: textColor, ease: "none" });
                }
            };
            const onMove = (e) => {
                const { left, top } = el.getBoundingClientRect();
                gsap.to(circle, {
                    duration: 0.1,
                    x: e.clientX - left,
                    y: e.clientY - top,
                    ease: "none",
                });
            };
            const onLeave = () => {
                gsap.to(circle, {
                    duration: 0.4,
                    scale: 0,
                    ease: "power2.out",
                });
                if (textColor) {
                    gsap.to(el, { duration: 0.2, color: "", ease: "none" });
                }
            };

            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mouseleave", onLeave);

            // 언마운트 시 정리
            el._hoverCleanup = () => {
                el.removeEventListener("mouseenter", onEnter);
                el.removeEventListener("mousemove", onMove);
                el.removeEventListener("mouseleave", onLeave);
                circle.remove();
            };
        },
        unmounted(el) {
            el._hoverCleanup?.();
        },
    });
});
