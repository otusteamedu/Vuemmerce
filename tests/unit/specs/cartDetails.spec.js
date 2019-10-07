import { shallowMount } from "@vue/test-utils";
import CartDetail from "@/src/components/cart_detail/CartDetail.vue";

const localVue = global.newVueInstance();

describe('CartDetail.vue', () => {
    let wrapper;
  beforeEach(() => {
      wrapper = shallowMount(CartDetail, {
        localVue,
        propsData: {},
      });
    });
    console.log(wrapper);
    wrapper.toBeTruthy();
  });

// function mountComponentWithProps (Component, propsData) {
//     const Constructor = Vue.extend(Component);
//     const vm = new Constructor({
//       propsData
//     }).$mount();
  
//     return vm.$el;
//   }


// describe("App.vue", async () => {
//   it("mounts without error", () => {

//     const cardDetail = mountComponentWithProps(CartDetail, {  });
//     expect(cardDetail).toBeTruthy();
//     // const wrapper = shallowMount(component);
//     // const app = wrapper.find("#app");
//     // expect(app).toBeTruthy();
//   });
  
// });
