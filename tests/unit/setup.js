import Vue from "vue";

import Meta from "vue-meta";
import { createLocalVue } from "@vue/test-utils";

Vue.use(Meta);
Vue.config.productionTip = false;
Vue.config.silent = true;

global.random = () =>
  Math.random()
    .toString(36)
    .slice(2);

global.randomEmail = () => global.random() + "@e2e.test";

global.newVueInstance = () => {
  const vue = createLocalVue();
  vue.config.silent = true;
  vue.config.productionTip = false;
  return vue;
};

