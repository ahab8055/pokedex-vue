<template>
    <div class="relative size-10">
        <svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200" stroke-width="2"></circle>
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600" stroke-width="2"
                stroke-dasharray="100" :stroke-dashoffset="getProgressValue" stroke-linecap="round"></circle>
        </svg>
        <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span class="text-center text-xs font-bold text-blue-600">{{ value }}</span>
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
    },

    computed: {
        getProgressValue() {
            return 100 - this.value;
        }
    }
}
</script>