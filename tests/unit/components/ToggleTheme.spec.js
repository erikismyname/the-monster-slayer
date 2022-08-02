import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';

import ToggleTheme from '@/components/ToggleTheme';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ToggleTheme.vue', () => {
    it('should render sun icon instead of moon when theme is light', () => {
        const store = createStore(true);
        const wrapper = createWrapper(store);
        const iClasses = wrapper.find('i').classes();

        expect(iClasses).toContain('fa-sun');
        expect(iClasses).not.toContain('fa-moon');
    });

    it('should render moon icon instead of sun when theme is dark', () => {
        const store = createStore(false);
        const wrapper = createWrapper(store);
        const iClasses = wrapper.find('i').classes();

        expect(iClasses).toContain('fa-moon');
        expect(iClasses).not.toContain('fa-sun');
    });
});

function createStore(value) {
    return new Vuex.Store({
        getters: {
            isThemeLight: () => value
        }
    });
}

function createWrapper(store) {
    return mount(ToggleTheme, {
        localVue,
        store
    });
}