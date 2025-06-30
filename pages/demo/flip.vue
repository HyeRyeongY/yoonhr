<template>
    <div class="flip">
        <main class="content" ref="contentRef">
            <ul class="items">
                <li v-for="(product, index) in products" :key="product.id + index" class="item" :data-product-id="product.id + index">
                    <button class="btn-item" :data-product-id="product.id + index" @click="addToCart($event)">
                        <img :src="product.image" :alt="product.id" />
                        {{ product.id }}
                    </button>
                </li>
            </ul>
        </main>
        <FixedLayer :right="40" :bottom="40" :zIndex="3" :pointerEvents="'none'">
            <div class="cart" ref="cartRef">
                <div class="btn-cart-wrapper" ref="btnCartWrapperRef">
                    <button class="btn-cart" aria-label="Cart" ref="btnCartRef" @click="onCartBtnClick">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <div class="count" ref="countRef"></div>
                </div>

                <div class="items-wrapper">
                    <div class="empty-text" ref="emptyTextRef">Your cart is empty</div>
                    <div class="items" ref="cartItemsRef" @click="removeFromCart($event)"></div>
                </div>
            </div>
        </FixedLayer>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import Flip from "gsap/Flip";
// gsap.registerPlugin(Flip);

const products = [
    { id: "carrot", image: "/assets/images/fruits/carrot.svg" },
    { id: "grapes", image: "/assets/images/fruits/grapes.svg" },
    { id: "strawberry", image: "/assets/images/fruits/strawberry.svg" },
    { id: "tomato", image: "/assets/images/fruits/tomato.svg" },
    { id: "carrot", image: "/assets/images/fruits/carrot.svg" },
    { id: "grapes", image: "/assets/images/fruits/grapes.svg" },
    { id: "strawberry", image: "/assets/images/fruits/strawberry.svg" },
    { id: "tomato", image: "/assets/images/fruits/tomato.svg" },
];
// CustomWiggle.create("cartButtonWiggle", { wiggles: 8, type: "easeOut" });

const contentRef = ref(null);
const cartRef = ref(null);
const btnCartWrapperRef = ref(null);
const btnCartRef = ref(null);
const countRef = ref(null);
const cartItemsRef = ref(null);
const emptyTextRef = ref(null);

let reducedMotion = false;

onMounted(() => {
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
});
const addToCart = (e) => {
    const item = e.currentTarget;
    const state = Flip.getState(item);

    setInCartClass(item, true);
    setActiveItemClass(item, true);
    btnCartWrapperRef.value.appendChild(item);

    Flip.from(state, {
        duration: reducedMotion ? 0 : 0.5,
        ease: "back.in(0.8)",
        onComplete: () => {
            setActiveItemClass(item, false);
            cartItemsRef.value.appendChild(item);

            gsap.fromTo(
                item,
                { y: -12 },
                {
                    y: 0,
                    duration: reducedMotion ? 0 : 1,
                    ease: "elastic.out(1, 0.3)",
                }
            );

            updateCart(item);
            !reducedMotion && cartBtnAnimation();
        },
    });
};
const setInCartClass = (item, inCart) => item.parentNode.classList.toggle("in-cart", inCart);
const setActiveItemClass = (item, isActive) => item.parentNode.classList.toggle("active", isActive);

const updateCart = (item) => {
    const hasItems = cartItemsRef.value.children.length > 0;

    countRef.value.innerText = hasItems ? cartItemsRef.value.children.length : "";
    emptyTextRef.value.hidden = hasItems;
    cartItemsRef.value.hidden = !hasItems;
};

const cartBtnAnimation = () => {
    gsap.timeline()
        .fromTo(
            btnCartRef.value,
            { yPercent: 0, rotation: 0 },
            {
                duration: 0.9,
                ease: "cartButtonWiggle", // 만약 CustomWiggle 등록 안했다면 'power1.out' 등으로 대체
                yPercent: 20,
                rotation: -5,
                clearProps: "all",
            }
        )
        .fromTo(
            countRef.value,
            { rotation: 0 },
            {
                duration: 1.3,
                ease: "power4.out",
                rotation: 720,
                y: -30,
            },
            "<"
        )
        .to(
            countRef.value,
            {
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
                y: 0,
                clearProps: "all",
            },
            "-=0.6"
        );
};

const removeFromCart = (e) => {
    const target = e.target;
    const item = target.closest(".btn-item");
    const state = Flip.getState(item);

    // 원래 위치로 되돌리기
    const originalContainer = contentRef.value.querySelector(`[data-product-id="${item.dataset.productId}"]`);
    if (originalContainer) {
        originalContainer.appendChild(item);
    }

    updateCart(item);
    setActiveItemClass(item, true);

    Flip.from(state, {
        duration: reducedMotion ? 0 : 0.5,
        ease: "power4.out",
        onComplete: () => {
            setActiveItemClass(item, false);
            setInCartClass(item, false);
        },
    });
};

const onCartBtnClick = () => {
    cartRef.value.classList.toggle("open");
};
</script>
<style lang="scss">
body {
    --color-primary: hotpink;
    --color-secondary: black;
    --color-tertiary: dodgerblue;
    --padding: clamp(1rem, 2vw, 2rem);
    --radius: 0.25rem;
    --shadow: 0 1rem 2rem hsla(0 0% 0% / 0.2);
}
.flip {
    min-height: 100vh;
    padding: 100px 20px;
    h2 {
        text-align: center;
    }
    * {
        box-sizing: border-box;
    }

    /* ITEMS */

    .items:not(:empty) {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: var(--padding);
        padding: calc(var(--padding) * 2);
        grid-template-columns: var(--columns, 1fr);
    }

    @media (min-width: 350px) {
        .items {
            --columns: repeat(auto-fit, minmax(20rem, 1fr));
        }
    }

    .item {
        position: relative;
        aspect-ratio: 1;
        border-radius: var(--radius);
        background-color: var(--color-secondary);
        box-sizing: border-box;
    }

    .item.in-cart {
        background-color: var(--color-secondary);
        color: var(--color-primary);
        border: 2px dashed currentcolor;
        z-index: 1;
    }

    .item.active {
        z-index: 2;
    }

    /* BUTTONS */

    [class*="btn"] {
        all: unset;
    }

    [class*="btn"]:active {
        transform: translateY(2px);
    }

    [class*="btn"]:focus-visible {
        --size: 3px;
        outline: var(--size) solid var(--color-tertiary);
        outline-offset: var(--size);
    }

    .btn-item {
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        user-select: none;
        font-size: 2rem;
        color: var(--color-secondary);
        background-color: var(--color-primary);
        border-radius: var(--radius);
    }

    .btn-cart {
        display: flex;
        align-items: center;
        padding: 1rem;
        font-size: 2.4rem;
        background: white;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        color: var(--color-secondary);

        svg {
            width: 1.5em;
            height: 1.5em;
        }
    }

    /* CART */

    .cart {
        display: grid;
        place-items: end;
        min-width: 0;
        position: relative;
        width: auto;
        height: auto;
        // position: absolute;
        // bottom: 0;
        // right: 0;
        // width: auto;
        transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .cart:not(.open) {
        transform: translateY(calc(100% + var(--padding)));
    }

    .cart:not(.open) .items-wrapper {
        // visibility: hidden;
        display: none;
        transition-delay: 300ms;
    }

    .cart .items-wrapper {
        display: grid;
        overflow: auto;
        width: 100%;
        max-height: 75vh;
        max-width: 350px;
        background-color: var(--color-secondary);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        pointer-events: initial;
        transition: visibility 0s;
    }

    .cart .items {
        --columns: repeat(auto-fill, minmax(4.5rem, 1fr));
        --padding: 0.5rem;
        background-color: white;
    }

    .cart .count {
        --size: 1.75em;
        position: absolute;
        top: -0.65em;
        right: -0.75em;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-secondary);
        background-color: var(--color-primary);
        font-size: 1.4rem;
        letter-spacing: -0.08em;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
    }

    .cart .count:empty {
        display: none;
    }

    .cart .items .btn-item {
        font-size: 1rem;
    }

    .cart .empty-text {
        grid-column: 1 / -1;
        text-align: center;
        padding: 1rem;
        color: var(--color-secondary);
        font-size: 1.4rem;
        white-space: nowrap;
        width: 100%;
    }

    .btn-cart-wrapper {
        position: absolute;
        bottom: calc(100% + var(--padding));
        pointer-events: initial;
        z-index: 1;
        .btn-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }

    @media (prefers-reduced-motion) {
        .cart {
            transition-duration: 0s;
        }

        .cart:not(.open) .items-wrapper {
            transition-delay: 0s;
        }
    }
}
</style>
