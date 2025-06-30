<template>
    <div class="gooey-demo">
        <svg>
            <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10" result="gooey" />
                <feBlend in="SourceGraphic" in2="gooey" />
            </filter>
        </svg>

        <div class="gooey-container">
            <div class="blob"></div>
            <div class="blob"></div>
        </div>
    </div>
</template>
<style lang="scss">
.gooey-demo {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        display: none;
    }
    .gooey-container {
        width: auto;
        filter: url(#gooey);
        position: relative;
    }
    .blob {
        width: 50px;
        height: 50px;
        left: -23px;
        transform: translateX(-50%);
        border-radius: 50%;
        background: #ffffff;
        position: absolute;
        animation: move 3s infinite alternate;
    }

    .blob:nth-child(2) {
        left: 23px;
        animation-delay: 1s;
    }

    @keyframes move {
        0% {
            transform: translate(-50%, 0);
        }
        100% {
            transform: translate(-50%, 30px);
        }
    }
}
</style>
