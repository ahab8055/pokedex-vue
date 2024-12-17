<template>
    <div class="relative size-10">
        <svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-neutral-700"
                stroke-width="2"></circle>
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600 dark:text-blue-500"
                stroke-width="2" stroke-dasharray="100" stroke-dashoffset="65" stroke-linecap="round"></circle>
        </svg>
        <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span class="text-center text-xs font-bold text-blue-600 dark:text-blue-500">{{ value }}</span>
        </div>
        <div class="">
            <span class="text-center text-xs font-bold capitalize">{{ type }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CircularProgress",
    props: {
        type: String,
        value: Number
    }
}
</script>