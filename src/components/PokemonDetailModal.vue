<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="relative w-full max-w-3xl rounded-lg overflow-hidden"
      :style="{ backgroundColor: colors[pokemon.types[0].type.name] }">
      
      <!-- Close Button -->
      <button @click="closeModal" 
        class="absolute top-4 right-4 z-10 text-white text-4xl font-bold hover:text-gray-300">
        &times;
      </button>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
        
        <!-- Left Side: Image -->
        <div class="flex items-center justify-center">
          <img :src="pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default"
            class="object-contain w-full h-96" />
        </div>

        <!-- Right Side: Details -->
        <div class="flex flex-col gap-4">
          
          <!-- Header: Name & Generation -->
          <div class="flex items-center justify-between">
            <h2 class="text-4xl font-bold text-white capitalize">{{ pokemon.name }}</h2>
            <div class="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-full">
              {{ pokemon.id }}
            </div>
          </div>

          <!-- Abilities -->
          <div class="bg-white rounded-lg p-4">
            <h3 class="font-bold text-gray-900 mb-2">Abilities</h3>
            <p class="text-gray-700">
              <span v-for="(ability, index) in abilities" :key="ability.name">
                {{ ability.name }}<span v-if="ability.isHidden" class="text-xs text-gray-500 ml-1">(Hidden)</span>
                <span v-if="index < abilities.length - 1"> - </span>
              </span>
            </p>
          </div>

          <!-- Health Points & Experience -->
          <div class="bg-white rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h3 class="font-bold text-gray-900 text-sm mb-2">Healthy Points</h3>
                <p class="text-2xl font-bold text-gray-900">{{ hpStat?.base_stat }}</p>
                <div class="bg-gray-200 rounded-full h-2 mt-2">
                  <div class="bg-green-500 h-2 rounded-full" 
                    :style="{ width: (hpStat?.base_stat / 255 * 100) + '%' }"></div>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-sm mb-2">Experience</h3>
                <p class="text-2xl font-bold text-gray-900">{{ pokemon.base_experience }}</p>
                <div class="bg-gray-200 rounded-full h-2 mt-2">
                  <div class="bg-yellow-500 h-2 rounded-full" 
                    :style="{ width: (pokemon.base_experience / 500 * 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats Circles -->
          <div class="grid grid-cols-4 gap-3">
            <div v-for="stat in mainStats" :key="stat.name" class="bg-white rounded-lg p-3 text-center">
              <div class="relative w-16 h-16 mx-auto mb-2">
                <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200" stroke-width="2"></circle>
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600" stroke-width="2"
                    :stroke-dasharray="100"
                    :stroke-dashoffset="100 - (stat.value / 255 * 100)"
                    stroke-linecap="round"></circle>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-xs font-bold text-gray-900">{{ stat.value }}</span>
                </div>
              </div>
              <p class="text-xs font-bold text-gray-900 capitalize">{{ stat.name }}</p>
            </div>
          </div>

          <!-- Types -->
          <div class="flex gap-2">
            <span v-for="type in types" :key="type.name"
              class="text-white text-sm font-bold px-4 py-2 rounded-full capitalize"
              :style="{ backgroundColor: type.color }">{{ type.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { map } from 'lodash';
import { colors } from '@/constraints';

export default {
  name: "PokemonDetailModal",
  props: {
    pokemon: Object,
    isOpen: Boolean
  },
  data() {
    return {
      colors
    }
  },
  computed: {
    types() {
      return map(this.pokemon.types, (type) => ({
        name: type.type.name,
        color: colors[type.type.name]
      }));
    },
    hpStat() {
      return this.pokemon.stats.find(stat => stat.stat.name === 'hp');
    },
    mainStats() {
      const statNames = ['defense', 'attack', 'sp-atk', 'sp-def'];
      return map(statNames, (name) => {
        const stat = this.pokemon.stats.find(s => s.stat.name === name);
        return {
          name: name.replace('-', ' '),
          value: stat?.base_stat || 0
        };
      });
    },
    abilities() {
      return map(this.pokemon.abilities, (ability) => ({
        name: ability.ability.name,
        isHidden: ability.is_hidden
      }));
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
</style>
