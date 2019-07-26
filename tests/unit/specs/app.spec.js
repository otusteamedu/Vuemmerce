import { shallowMount } from "@vue/test-utils";
import component from "../../../src/App";
import store from "../../../src/store";
import router from "../../../src/router";

const localVue = global.newVueInstance();


describe("App.vue", async () => {
  it("mounts without error", () => {
    const wrapper = shallowMount(component, {
      localVue,
      router,
      store
    });
    const app = wrapper.find("#app");
    expect(app).toBeTruthy();
  });
 
  it("gotoPage() redirects to /page/", async () => {
    fakeLogin();
    const wrapper = shallowMount(component, {
      localVue,
      router,
      store
    });
    router.push({ name: "registerfinal" });
    expect(router.history.current.name).toBe("registerfinal");
    wrapper.vm.gotoCabinet();
    expect(router.history.current.name).toBe("cabinet");
  });

  
});
