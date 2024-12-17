<template>
    <a href="#" class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div class="grid grid-cols-10">
            <div class="col-span-4">
                <div class="flex h-full items-center justify-around flex-col">
                    <h4 class="capitalize text-lg font-bold">{{ pokemon.name }}</h4>
                    <div class="flex flex-row gap-2">
                        <CircularProgress type="Attack" :value="stats.attack.base_stat" />
                        <CircularProgress type="Defense" :value="stats.defense.base_stat" />
                    </div>
                    <div class="flex flex-row">
                        <span v-for="type in types" :key="type.name"
                            class="text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded capitalize"
                            :style="{ backgroundColor: type.color }">{{ type.name }}</span>
                    </div>
                </div>
            </div>
            <div class="col-span-6 w-52 h-40" :style="{ backgroundColor: colors[pokemon.types[0].type.name] }">
                <img :src="pokemon.sprites.other.dream_world.front_default"
                    class="object-contain w-10/12 h-full float-right" />
            </div>
        </div>
    </a>
</template>

<script>
import { map } from 'lodash';
import CircularProgress from './CircularProgress.vue';
import { colors } from '@/constraints';
export default {
    name: "PokeCardComponent",
    components: {
        CircularProgress
    },
    props: {
        pokemon: Object
    },
    data() {
        return {
            colors
        }
    },
    computed: {
        types() {
            return map(this.pokemon.types, (type) => ({ name: type.type.name, color: colors[type.type.name] }));
        },
        stats() {
            const attack = this.pokemon.stats.find(stat => stat.stat.name === 'attack');
            const defense = this.pokemon.stats.find(stat => stat.stat.name === 'defense');
            return { attack, defense }
        }
    },
};
</script>