import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import App from '@/App';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App.vue', () => {
    it('should add light class instead of dark when theme is light', () => {
        const store = createStore('light');
        const wrapper = createWrapper(store);

        expect(wrapper.classes('light')).toBe(true);
        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should add dark class instead of light when theme is dark', () => {
        const store = createStore('dark');
        const wrapper = createWrapper(store);

        expect(wrapper.classes('dark')).toBe(true);
        expect(wrapper.classes('light')).toBe(false);
    });
});

function createWrapper(store) {
    return shallowMount(App, {
        localVue,
        store
    });
}

function createStore(value) {
    return new Vuex.Store({
        getters: {
            theme: () => value
        }
    });
}