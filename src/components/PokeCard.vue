<template>
    <a href="#" class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div class="grid grid-cols-10">
            <div class="col-span-4">
                <div class="flex h-full items-center justify-around flex-col">
                    <h4 class="capitalize text-lg font-bold">{{ pokemon.name }}</h4>
                    <div class="flex flex-row gap-2">
                        <CircularProgress type="Attack" />
                        <CircularProgress type="Defense" />
                    </div>
                    <div class="flex flex-row">
                        <span
                            class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Default</span>
                        <span
                            class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Red</span>
                    </div>
                </div>
            </div>
            <div class="col-span-6 bg-[#71c558] w-52 h-40">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                    class="object-contain w-10/12 h-full float-right" />
            </div>
        </div>
    </a>
</template>

<script>
import CircularProgress from './CircularProgress.vue';
export default {
    name: "PokeCardComponent",
    components: {
        CircularProgress
    },
    props: {
        pokemon: Object
    }
};
</script>