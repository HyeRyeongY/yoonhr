<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import NotionContent from "~/components/NotionContent.vue";

const route = useRoute();
const pageId = route.params.id;
const title = ref("");
const date = ref("");
const blocks = ref([]);

onMounted(async () => {
    const data = await $fetch(`/api/notion/block?id=${pageId}`);
    title.value = data.title || [];
    date.value = data.date || [];
    blocks.value = data.blocks || [];
});
</script>

<template>
    <div>
        <NotionContent :title="title" :date="date" :blocks="blocks" />
    </div>
</template>
