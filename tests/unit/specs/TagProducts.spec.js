import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueMeta from "vue-meta";
import TagProducts from "../../../src/components/tags/TagProducts";

describe("TagProducts component", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueMeta);

  let store;
  let getters;
  let actions;

  beforeEach(() => {
    actions = { pseudoFetchProductsByTagId: jest.fn() };
    getters = {
      getTagById: () => id => ({
        id,
        title: `Tag ${id}`,
        description: `Tag ${id} desription`
      })
    };
    store = new Vuex.Store({ actions, getters });
  });

  it("should mounts", () => {
    const wrapper = shallowMount(TagProducts, { localVue, store });
    expect(wrapper.exists()).toBe(true);
  });

  it("should display tag title", () => {
    const wrapper = shallowMount(TagProducts, {
      localVue,
      store,
      propsData: { id: 1 }
    });
    expect(wrapper.find(".tags-content__title").text()).toBe("Tag 1");
  });

  it("should display tag title in page title", () => {
    const wrapper = shallowMount(TagProducts, {
      localVue,
      store,
      propsData: { id: 1 }
    });
    expect(wrapper.vm.$meta().refresh().metaInfo.title).toContain("Tag 1");
  });
});