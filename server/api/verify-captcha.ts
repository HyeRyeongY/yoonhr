// server/api/verify-captcha.ts

const config = useRuntimeConfig();
const secretKey = config.recaptchaSecretKey;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const res = await $fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        body: new URLSearchParams({
            secret: secretKey,
            response: body.token,
        }),
    });

    if (!res.success || res.score < 0.5) {
        throw createError({ statusCode: 400, statusMessage: "reCAPTCHA verification failed" });
    }

    return { success: true };
});
