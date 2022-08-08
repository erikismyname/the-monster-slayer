import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';

import ToggleTheme from '@/components/ToggleTheme';

describe('ToggleTheme.vue', () => {
    it('should render dark icon only when mode is light', () => {
        const wrapper = setup();

        expect(wrapper.find('[data-testid="dark-mode"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="light-mode"]').exists()).toBe(false);
    });

    it('should dispatch action when dark icon is clicked', async () => {
        const wrapper = setup();
        await wrapper.find('[data-testid="dark-mode"]').trigger('click');
        expect(actions.toggleDarkMode).toHaveBeenCalledTimes(1);
    });

    it('should render light icon only when mode is dark', () => {
        getters.isDarkModeOn = () => true;
        const wrapper = setup();

        expect(wrapper.find('[data-testid="dark-mode"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="light-mode"]').exists()).toBe(true);
    });

    it('should dispatch action when light icon is clicked', async () => {
        const wrapper = setup();
        await wrapper.find('[data-testid="light-mode"]').trigger('click');
        expect(actions.toggleDarkMode).toHaveBeenCalledTimes(2);
    });
});

const getters = {
    isDarkModeOn: () => false
};

const actions = {
    toggleDarkMode: jest.fn()
};

function setup() {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
        modules: {
            game: {
                namespaced: true,
                getters,
                actions
            }
        }
    });

    return mount(ToggleTheme, {
        localVue,
        store
    });
}