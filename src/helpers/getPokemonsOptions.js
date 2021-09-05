import pokemonApi from "../api/pokemo0nApi";

const getPokemons = () => {
  const pokemons = Array.from(Array(650));
  return pokemons.map((_, index) => index + 1);
};

const getPokemonsNames = async (pokemons) => {
  const promises = pokemons.map((poke) => pokemonApi.get(`/${poke}`));
  const pokemones = await Promise.all(promises);

  return pokemones.map(({ data }) => ({
    name: data.name,
    id: data.id,
  }));
};

const getPokemonsOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  const names = await getPokemonsNames(mixedPokemons.splice(0, 4));
  return names;
};

export default getPokemonsOptions;
