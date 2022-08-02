import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';

import ScrollToTop from '@/components/ScrollToTop';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ScrollToTop.vue', () => {
    it('should not render scroll to top icon when scrollY < 250', () => {
        const store = createStore('light');
        const wrapper = createWrapper(store);

        expect(wrapper.find('i').exists()).toBe(false);
    });

    it('should render scroll to top icon when scrollY >= 250', async () => {
        const store = createStore('light');
        const wrapper = createWrapper(store);

        await wrapper.setData({ scrollY: 250 });

        expect(wrapper.find('i').exists()).toBe(true);
    });

    it('should add light class instead of dark when theme is light', async () => {
        const store = createStore('light');
        const wrapper = createWrapper(store);

        await wrapper.setData({ scrollY: 250 });

        const iClasses = wrapper.find('i').classes();

        expect(iClasses).toContain('light');
        expect(iClasses).not.toContain('dark');
    });

    it('should add dark class instead of light when theme is dark', async () => {
        const store = createStore('dark');
        const wrapper = createWrapper(store);

        await wrapper.setData({ scrollY: 250 });

        const iClasses = wrapper.find('i').classes();

        expect(iClasses).toContain('dark');
        expect(iClasses).not.toContain('light');
    });
});

function createStore(value) {
    return new Vuex.Store({
        getters: {
            theme: () => value
        }
    });
}

function createWrapper(store) {
    return mount(ScrollToTop, {
        localVue,
        store
    });
}