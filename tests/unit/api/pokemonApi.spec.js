import pokemonApi from "@/api/pokemonApi";

describe("pokemonApi.js", () => {
  test("axios debe estar configurado con el api de pokemon", () => {
    expect(pokemonApi.defaults.baseURL).toBe(
      "https://pokeapi.co/api/v2/pokemon"
    );
  });
});
