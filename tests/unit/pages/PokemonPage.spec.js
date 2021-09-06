import { mount, shallowMount } from "@vue/test-utils";

import PokemonPage from "@/pages/PokemonPage.vue";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonPage componen", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
    jest.clearAllMocks();
  });

  test("debe hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("debe hacer match con el snapshot cuando cargan los pokemons", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: null,
        };
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe llamar el mixPokemonArray al montar", () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonArray"
    );
    const wrapper = shallowMount(PokemonPage);
    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("debe mostrar los componentes de PokemonPicture y PokemonOption", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: null,
        };
      },
    });
    const picture = wrapper.find("pokemon-picture-stub");
    const options = wrapper.find("pokemon-options-stub");

    expect(picture.exists()).toBeTruthy();
    expect(options.exists()).toBeTruthy();

    expect(picture.attributes("pokemonid")).toBe("1");
    expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("pruebas con checkAnswer", async () => {
    const wrapper = mount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: null,
        };
      },
    });
    await wrapper.vm.checkAnswer(1);
    expect(wrapper.find("h2").exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBe(true);
    expect(wrapper.find("h2").text()).toBe(`Correcto ${pokemons[0].name}`);
    await wrapper.vm.checkAnswer(2);
    expect(wrapper.find("h2").text()).toBe(`Opss era ${pokemons[0].name}`);
  });
});
