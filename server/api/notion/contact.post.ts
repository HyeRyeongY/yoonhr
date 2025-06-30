import { defineEventHandler, readBody, sendError, createError } from "h3";
import { Client } from "@notionhq/client";

const config = useRuntimeConfig();
const notion = new Client({ auth: config.notionToken });

interface ContactForm {
    name: string;
    email?: string;
    tel?: string;
    message: string;
}

export default defineEventHandler(async (event) => {
    if (event.node.req.method !== "POST") {
        return sendError(event, createError({ statusCode: 405, statusMessage: "Method Not Allowed" }));
    }

    const body = await readBody<ContactForm>(event);
    const { name, email, tel, message } = body;

    try {
        const properties: any = {
            Name: {
                title: [
                    {
                        text: { content: name || "Anonymous" },
                    },
                ],
            },
            Message: {
                rich_text: [
                    {
                        text: { content: message },
                    },
                ],
            },
        };

        // 선택된 연락 수단에 따라 조건부 추가
        if (email) {
            properties.Email = {
                email,
            };
        }

        if (tel) {
            properties.Tel = {
                phone_number: tel,
            };
        }

        await notion.pages.create({
            parent: { database_id: config.notionContactDBId as string },
            properties,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Notion API error:", error);
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
});
