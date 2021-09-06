import { shallowMount, mount } from "@vue/test-utils";
import PokemonPicture from "@/components/PokemonPicture.vue";

describe("PokemonPicture component", () => {
  test("debe renderizar el componente correctamente", () => {
    const wrapper = mount(PokemonPicture, {
      props: { pokemonId: 100, showPokemon: false },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("debe mostrar la imagen oculta y el pokemon 100", () => {
    const wrapper = mount(PokemonPicture, {
      props: { pokemonId: 100, showPokemon: false },
    });
    const [img1, img2] = wrapper.findAll("img");

    expect(img1.exists()).toBe(true);
    expect(img2).toBe(undefined);
    expect(img1.classes("hidden-pokemon")).toBe(true);
    expect(img1.attributes().src).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg"
    );
  });
  test("debe mostrar el pokemon si showPokemon: true", () => {
    const wrapper = mount(PokemonPicture, {
      props: { pokemonId: 100, showPokemon: true },
    });
    const [img1, img2] = wrapper.findAll("img");

    expect(img1.exists()).toBe(true);
    expect(img2).toBe(undefined);
    expect(img1.classes("fade-in")).toBe(true);
  });
});
