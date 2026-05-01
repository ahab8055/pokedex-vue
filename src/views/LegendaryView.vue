<template>
  <Layout>
    <div class="legendary-wrapper bg-gray-900 min-h-screen px-4 md:px-8">
      <!-- Page Title -->
      <div class="text-center py-8">
        <h1 class="text-5xl font-bold text-white mb-2">Legendaries</h1>
        <div class="w-24 h-1 bg-yellow-400 mx-auto"></div>
      </div>

      <!-- Legendary Pokemon Sections -->
      <div class="space-y-12 pb-8 max-w-6xl mx-auto">
        <div v-for="(pokemon, index) in legendaryPokemons" :key="pokemon.id" class="w-full">
          <!-- Section Title -->
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-gray-600">
            {{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}
          </h2>

          <!-- Pokemon Details Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <!-- Left: Image -->
            <div class="flex items-center justify-center">
              <img
                :src="pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default"
                :alt="pokemon.name"
                class="object-contain max-h-96 w-full"
              />
            </div>

            <!-- Right: Details -->
            <div class="flex flex-col gap-6">
              <!-- Name & ID -->
              <div class="flex items-center justify-between">
                <h3 class="text-4xl font-bold text-white capitalize">{{ pokemon.name }}</h3>
                <div class="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-full">
                  #{{ pokemon.id }}
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-300 text-sm leading-relaxed">
                {{ getDescription(pokemon) }}
              </p>

              <!-- Health Points & Experience -->
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-800 rounded-lg p-4">
                  <h3 class="font-bold text-white text-sm mb-2">Health Points</h3>
                  <p class="text-3xl font-bold text-yellow-400">{{ hpStat(pokemon).base_stat }}</p>
                  <div class="bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      class="bg-green-500 h-2 rounded-full"
                      :style="{ width: (hpStat(pokemon).base_stat / 255 * 100) + '%' }"
                    ></div>
                  </div>
                </div>
                <div class="bg-gray-800 rounded-lg p-4">
                  <h3 class="font-bold text-white text-sm mb-2">Experience</h3>
                  <p class="text-3xl font-bold text-yellow-400">{{ pokemon.base_experience }}</p>
                  <div class="bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      class="bg-yellow-500 h-2 rounded-full"
                      :style="{ width: (pokemon.base_experience / 500 * 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div v-for="stat in getMainStats(pokemon)" :key="stat.name" class="bg-gray-800 rounded-lg p-3 text-center">
                  <p class="text-xs font-bold text-white capitalize mb-2">{{ stat.name }}</p>
                  <p class="text-2xl font-bold text-yellow-400">{{ stat.value }}</p>
                  <div class="bg-gray-700 rounded-full h-1 mt-2">
                    <div
                      class="bg-blue-500 h-1 rounded-full"
                      :style="{ width: (stat.value / 255 * 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Types -->
              <div class="flex gap-2 flex-wrap">
                <span
                  v-for="type in getTypes(pokemon)"
                  :key="type.name"
                  class="text-white text-sm font-bold px-4 py-2 rounded-full capitalize"
                  :style="{ backgroundColor: typeColors[type.name] }"
                >
                  {{ type.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Related Pokemon Carousel -->
          <div class="mt-8">
            <h4 class="text-lg font-bold text-white mb-4">Related Pokemon</h4>
            <div class="flex gap-4 overflow-x-auto pb-4 items-center">
              <button
                @click="scrollCarousel(index, 'left')"
                class="flex-shrink-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              >
                ◀
              </button>

              <div class="flex gap-4 flex-1" :ref="'carousel-' + index">
                <div
                  v-for="relatedPoke in getRelatedPokemon(pokemon)"
                  :key="relatedPoke.id"
                  class="flex-shrink-0 w-32 bg-gray-800 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-700 transition"
                  @click="selectPokemon(relatedPoke)"
                >
                  <img
                    :src="relatedPoke.sprites.other.dream_world.front_default || relatedPoke.sprites.front_default"
                    :alt="relatedPoke.name"
                    class="object-contain h-24 w-full mb-2"
                  />
                  <p class="text-white capitalize text-sm font-bold">{{ relatedPoke.name }}</p>
                  <p class="text-yellow-400 text-xs">#{{ relatedPoke.id }}</p>
                </div>
              </div>

              <button
                @click="scrollCarousel(index, 'right')"
                class="flex-shrink-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
              >
                ▶
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div v-if="index < legendaryPokemons.length - 1" class="border-t border-gray-600 mt-12"></div>
        </div>
      </div>

      <!-- Pokemon Detail Modal -->
      <PokemonDetailModal :pokemon="selectedPokemon" :isOpen="showModal" @close="closeModal" />
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import PokemonDetailModal from '@/components/PokemonDetailModal.vue';
import { colors } from '@/constraints';
import instance from '@/config/instance';
import { map } from 'lodash';

export default {
  name: "LegendaryView",
  components: {
    Layout,
    PokemonDetailModal
  },
  data() {
    return {
      legendaryPokemons: [],
      typeColors: colors,
      loading: true,
      showModal: false,
      selectedPokemon: null,
      pokemonCache: {},
      relatedPokemonsData: {}
    };
  },
  mounted() {
    this.fetchLegendaryPokemons();
  },
  methods: {
    async fetchLegendaryPokemons() {
      try {
        this.loading = true;
        // Fetch legendary pokemon species
        const { data } = await instance.get('pokemon-species?limit=1000');
        const legendaries = data.results.filter(species =>
          species.name.toLowerCase().includes('legendary') ||
          ['mewtwo', 'mew', 'articuno', 'zapdos', 'molres', 'lugia', 'hooh', 'raikou', 'entei', 'suicune', 'dragonite', 'salamence', 'garchomp', 'metagross', 'goodra', 'tornadus', 'thundurus', 'landorus', 'yveltal', 'xerneas', 'zygarde', 'rayquaza', 'kyogre', 'groudon', 'dialga', 'palkia', 'giratina', 'arceus', 'victini', 'cobalion', 'terrakion', 'virizion', 'reshiram', 'zekrom', 'deinon'].includes(species.name.toLowerCase())
        );

        // Fetch detailed pokemon data for each legendary
        const pokemonUrls = legendaries.slice(0, 10).map(l => l.url.replace('pokemon-species', 'pokemon'));
        const responses = await Promise.all(
          pokemonUrls.map(url => instance.get(url))
        );

        this.legendaryPokemons = map(responses, r => r.data).sort((a, b) => a.id - b.id);
        
        // Fetch related pokemon for each legendary
        this.legendaryPokemons.forEach(pokemon => {
          this.fetchRelatedPokemon(pokemon);
        });
      } catch (error) {
        console.error('Error fetching legendary pokemon:', error);
      } finally {
        this.loading = false;
      }
    },
    hpStat(pokemon) {
      return pokemon.stats.find(stat => stat.stat.name === 'hp') || { base_stat: 0 };
    },
    getMainStats(pokemon) {
      const statNames = ['attack', 'defense', 'sp-atk', 'sp-def'];
      return map(statNames, (name) => {
        const stat = pokemon.stats.find(s => s.stat.name === name);
        return {
          name: name.replace('-', ' '),
          value: stat?.base_stat || 0
        };
      });
    },
    getTypes(pokemon) {
      return map(pokemon.types, (type) => ({
        name: type.type.name,
        color: colors[type.type.name]
      }));
    },
    getRelatedPokemon(pokemon) {
      // Return cached related pokemon or empty array while loading
      return this.relatedPokemonsData[pokemon.id] || [];
    },
    async fetchRelatedPokemon(pokemon) {
      // Build a list of IDs for related pokemon
      const relatedIds = [];
      for (let i = Math.max(1, pokemon.id - 3); i <= Math.min(pokemon.id + 3, 905); i++) {
        if (i !== pokemon.id && relatedIds.length < 6) {
          relatedIds.push(i);
        }
      }

      try {
        // Fetch pokemon data for each related ID
        const pokemonDataList = [];
        for (const id of relatedIds) {
          try {
            const { data } = await instance.get(`pokemon/${id}`);
            pokemonDataList.push(data);
          } catch (err) {
            console.error(`Error fetching pokemon ${id}:`, err);
          }
        }

        // Store related pokemon for this legendary using Vue reactivity
        this.relatedPokemonsData[pokemon.id] = pokemonDataList;
        // Trigger reactivity update
        this.$forceUpdate();
      } catch (error) {
        console.error('Error fetching related pokemon:', error);
      }
    },
    async scrollCarousel(index, direction) {
      const carousel = this.$refs['carousel-' + index]?.[0];
      if (carousel) {
        const scrollAmount = 200;
        carousel.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    },
    selectPokemon(pokemon) {
      this.selectedPokemon = pokemon;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedPokemon = null;
    },
    getDescription(pokemon) {
      return `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} is a powerful legendary Pokemon. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`;
    }
  }
};
</script>

<style scoped>
.legendary-wrapper {
  background-color: #1f2937;
}

::-webkit-scrollbar {
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #6B7280;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

/* Image animations */
img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.05);
}

/* Smooth transitions for interactive elements */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}
</style>