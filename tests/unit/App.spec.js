import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import App from '@/App';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App.vue', () => {
    it('should add light class instead of dark when theme is light', () => {
        const wrapper = createWrapper('light');

        expect(wrapper.classes('light')).toBe(true);
        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should add dark class instead of light when theme is dark', () => {
        const wrapper = createWrapper('dark');

        expect(wrapper.classes('dark')).toBe(true);
        expect(wrapper.classes('light')).toBe(false);
    });
});

function createWrapper(theme) {
    const store = new Vuex.Store({
        getters: {
            theme: () => theme
        }
    });

    return shallowMount(App, {
        localVue,
        store
    });
}