import { shallowMount } from "@vue/test-utils";

import PokemonOptions from "@/components/PokemonOptions.vue";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonOptions Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons,
      },
    });
  });
  test("Debe renderizar el componente correctamente", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("debe mostrar las 4 opciones correctamente", () => {
    const listItems = wrapper.findAll("li");
    expect(listItems.length).toBe(4);
    listItems.map((item, i) => {
      expect(item.text()).toBe(pokemons[i].name);
    });
  });

  test('debe emitir "selection"con sus respectivos parametros al hace click', () => {
    const [li1, li2, li3, li4] = wrapper.findAll("li");
    li1.trigger("click");
    li2.trigger("click");
    li3.trigger("click");
    li4.trigger("click");

    expect(wrapper.emitted("selection").length).toBe(4);
    expect(wrapper.emitted("selection")[0]).toEqual([1]);
    expect(wrapper.emitted("selection")[1]).toEqual([2]);
    expect(wrapper.emitted("selection")[2]).toEqual([3]);
    expect(wrapper.emitted("selection")[3]).toEqual([4]);
  });
});
