export default defineNuxtConfig({
    ssr: true,
    app: {
        head: {
            title: "YHR | Yes, Here. Ready.",
            meta: [{ name: "description", content: "This is yoonhyeryeong's project." }],
            script: [
                {
                    src: "https://www.google.com/recaptcha/api.js",
                    async: true,
                    defer: true,
                },
            ],
        },
    },
    modules: ["@nuxtjs/tailwindcss"],
    css: ["@/assets/css/tailwind.css", "@/assets/css/reset.scss", "@/assets/css/global.scss", "@/assets/fonts/fonts.css"],
    runtimeConfig: {
        notionToken: process.env.NOTION_TOKEN,
        notionLogDBId: process.env.NOTION_LOG_DB_ID,
        notionContactDBId: process.env.NOTION_CONTACT_DB_ID,
        recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
        // resendApiKey: process.env.RESEND_API_KEY, // resend key
        public: {},
    },

    compatibilityDate: "2025-04-09",
});
