<template>
    <div class="flex flex-col items-center">
        <span class="text-sm text-gray-700">
            Showing <span class="font-semibold text-gray-900">1</span> to <span
                class="font-semibold text-gray-900">10</span> of <span class="font-semibold text-gray-900">100</span>
            Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
            <button
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900">
                Prev
            </button>
            <button
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900">
                Next
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaginationComponent"
}
</script>