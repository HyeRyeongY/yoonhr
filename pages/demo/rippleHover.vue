<template>
    <div class="ripple-hover-demo">
        <NuxtLink v-hover="{ bg: '#e91e63', text: '#fff' }" target="_blank" to="">
            NuxtLink
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </NuxtLink>
        <button v-hover="{ bg: '#e91e63', text: '#fff' }">
            Button
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
</template>
<script setup></script>
<style lang="scss">
.ripple-hover-demo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    min-height: 100vh;
    a,
    button {
        border-radius: 8px;
        border: 2px solid #fff;
        padding: 8px;
        display: inline-flex;
        gap: 8px;
        font-size: 2rem;
    }
}
</style>
