import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';

import BattleLog from '@/components/BattleLog/BattleLog';

describe('BattleLog.vue', () => {
    it('should not apply dark class when dark mode is off', () => {
        const wrapper = createWrapper();
        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should apply dark class when dark mode is on', () => {
        const wrapper = createWrapper({ isDarkModeOn: true });
        expect(wrapper.classes('dark')).toBe(true);
    });

    it('should render arrow down instead of arrow up when entries order is descending', () => {
        const wrapper = createWrapper({ isEntriesOrderDescending: true });

        expect(wrapper.find('.fa-arrow-down').exists()).toBe(true);
        expect(wrapper.find('.fa-arrow-up').exists()).toBe(false);
    });

    it('should render arrow up instead of arrow down when entries order is ascending', () => {
        const wrapper = createWrapper();

        expect(wrapper.find('.fa-arrow-up').exists()).toBe(true);
        expect(wrapper.find('.fa-arrow-down').exists()).toBe(false);
    });

    it('dispatches correct action when the arrow down is clicked', async () => {
        const wrapper = createWrapper({ isEntriesOrderDescending: true });

        await wrapper.find('.fa-arrow-down').trigger('click');
        expect(actions.changeEntriesOrder).toHaveBeenCalledTimes(1);
    });

    it('dispatches correct action when the arrow up is clicked', async () => {
        const wrapper = createWrapper();

        await wrapper.find('.fa-arrow-up').trigger('click');
        expect(actions.changeEntriesOrder).toHaveBeenCalledTimes(2);
    });
});

function createWrapper(initialStoreState = {}) {
    const localVue = createTestVue();
    const store = createStore(initialStoreState);

    return mount(BattleLog, {
        localVue,
        store,
    });
}

function createTestVue() {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    return localVue;
}

const actions = {
    changeEntriesOrder: jest.fn()
};

function createStore({ isEntriesOrderDescending, isDarkModeOn }) {
    return new Vuex.Store({
        modules: {
            battleLog: {
                namespaced: true,
                getters: {
                    isEntriesOrderDescending: () => isEntriesOrderDescending,
                    entries: () => []
                },
                actions
            },
            game: {
                namespaced: true,
                getters: {
                    isDarkModeOn: () => isDarkModeOn
                }
            }
        }
    });
}