import { shallowMount, mount } from "@vue/test-utils";

import { createRenderer } from 'vue-server-renderer'
import component from "../../../src/components/profile/Profile";
import store from "../../../src/store";
import router from "../../../src/router";
import messages from "../../../src/messages.json";
import VueI18n from "vue-i18n";
import Vue from "vue";

const localVue = global.newVueInstance();
//localVue.config.productionTip = false;

//const localVue = createLocalVue()
localVue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

//Vue.use();
describe('Profile.vue', async () => {
    it('start mount', () => {
        const wrapper = mount(component, {
            localVue,
            router,
            store,
            i18n,
        });

        let element = wrapper.find('.profile');
        expect(element.is('div')).toBe(true);
        //expect(true).toBe(true);
    });

    it('snapshot renderer test Profile', () => {
        const renderer = createRenderer()
        const wrapper = mount(component, {
            localVue,
            router,
            store,
            i18n,
            propsData: {  }
        });
        renderer.renderToString(wrapper.vm, (err, str) => {
            if (err) throw new Error(err)
            expect(str).toMatchSnapshot()
        });
    });

    it('check changes expected store ', async () => {
        const wrapper = mount(component, {
            localVue,
            router,
            store,
            i18n,
        });

        wrapper.vm.$store.commit('isUserLoggedIn', true)
        wrapper.vm.$store.commit('setUserName', 'testName');
        wrapper.vm.$store.commit('setUserEmail', 'testEmail@gmail.com');
        wrapper.vm.$store.commit('setUserAddress', 'testUserAdress');
        wrapper.vm.save();

        expect(store.getters.isUserLoggedIn).toBe(true);
        expect(store.getters.getUserName).toBe("testName");
        expect(store.getters.getUserEmail).toBe("testEmail@gmail.com");
        expect(store.getters.getUserAddress).toBe("testUserAdress");
    });

    it('check image changes ', async () => {
        const wrapper = mount(component, {
            localVue,
            router,
            store,
            i18n,
        });

        const myEvent = {
            target: {
                files: [
                    {
                        name: 'image.png',
                        size: 50000,
                        type: 'image/png',
                    },
                ],
            },
        }
        const fileReaderSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(() => null)

        wrapper.vm.readFile(myEvent);
        expect(fileReaderSpy).toHaveBeenCalledWith(myEvent.target.files[0]);
    });

});
