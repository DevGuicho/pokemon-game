<template>
  <h1 v-if="!pokemon">Espere por favor ...</h1>
  <div v-else>
    <h1>¿Quien es este pokemon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
    <template v-if="showAnswer">
      <h2>{{ message }}</h2>
      <button v-on:click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "../components/PokemonPicture.vue";
import PokemonOptions from "../components/PokemonOptions.vue";

import getPokemonsOptions from "../helpers/getPokemonsOptions";

export default {
  name: "App",
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: null,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonsOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(pokemonId) {
      if (pokemonId === this.pokemon.id) {
        this.message = `Correcto ${this.pokemon.name}`;
      } else {
        this.message = `Opss era ${this.pokemon.name}`;
      }
      this.showPokemon = true;
      this.showAnswer = true;
    },
    newGame() {
      this.pokemonArr = [];
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.message = null;
      this.mixPokemonArray();
    },
  },
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
