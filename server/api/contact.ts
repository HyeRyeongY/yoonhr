export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const config = useRuntimeConfig();

  const res = await $fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: {
      from: "YHR <portfolio@gnyng.com>", // 여기 주의 (아래 설명)
      to: ["yoonhr7@gmail.com"],
      subject: `[contact] ${body.name}님의 메시지`,
      html: `
        <h2>새 문의가 도착했습니다!</h2>
        <p><strong>보낸 사람:</strong> ${body.name} (${body.email})</p>
        <p><strong>메시지 내용:</strong><br>${body.message}</p>
      `,
    },
  });

  return { success: true };
});
