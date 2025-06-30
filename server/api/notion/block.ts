import { Client } from "@notionhq/client";
const config = useRuntimeConfig();
const notion = new Client({ auth: config.notionToken });

const getChildrenRecursively = async (block) => {
    if (block.has_children) {
        const childrenRes = await notion.blocks.children.list({ block_id: block.id });
        block.children = await Promise.all(childrenRes.results.map(getChildrenRecursively));
    }
    return block;
};

export default defineEventHandler(async (event) => {
    const id = getQuery(event).id;

    // 블럭 내용 가져오기
    const res = await notion.blocks.children.list({ block_id: id });
    const blocksWithChildren = await Promise.all(res.results.map(getChildrenRecursively));

    // 페이지 제목 가져오기
    const pageRes = await notion.pages.retrieve({ page_id: id });

    // 제목 속성 찾기 (title type인 속성만 필터)
    const titleProperty = Object.values(pageRes.properties).find((prop) => prop.type === "title");

    const title = titleProperty?.title?.map((part) => part.plain_text).join("") || "";

    // 생성일 가져오기 (ISO 문자열 → 포맷팅)
    const createdTime = pageRes.created_time;

    function formatDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
    }

    const date = formatDate(createdTime);

    return {
        title,
        date,
        blocks: blocksWithChildren,
    };
});
