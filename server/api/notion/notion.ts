// server/api/notion/notion.ts
import { Client } from "@notionhq/client";
export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    const notion = new Client({ auth: config.notionToken });
    const databaseId = config.notionLogDBId!;

    const response = await notion.databases.query({
        database_id: databaseId,
    });

    return response;
});
