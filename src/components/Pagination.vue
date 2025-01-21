<template>
    <div class="flex flex-col items-center">
        <span class="text-sm text-gray-700">
            Showing <span class="font-semibold text-gray-900">1</span> to <span
                class="font-semibold text-gray-900">{{ data.limit }}</span> of <span class="font-semibold text-gray-900">{{ data.count }}</span>
            Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
            <button
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:bg-gray-300 disabled:text-gray-400"
                :disabled="!data.previous"
                @click="$emit('prev')"
                >
                Prev
            </button>
            <button
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:bg-gray-300 disabled:text-gray-400"
                :disabled="!data.next"
                @click="$emit('next')"
                >
                Next
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaginationComponent",
    props: {
        data: Object
    }
}
</script>