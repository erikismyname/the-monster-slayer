import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';

import GameOver from '@/components/GameOver';

describe('GameOver.vue', () => {
    it('should not render component when game is not over', () => {
        const wrapper = setup();
        expect(wrapper.find('[data-testid="game-over"]').exists('dark')).toBe(false);
    });

    it('should render component when game is over', () => {
        getters.isGameOver = () => true;
        const wrapper = setup();

        expect(wrapper.find('[data-testid="game-over"]').exists()).toBe(true);
    });

    it('should not apply dark class when dark mode is off', () => {
        const wrapper = setup();
        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should apply dark class when dark mode is on', () => {
        getters.isDarkModeOn = () => true;
        const wrapper = setup();

        expect(wrapper.classes('dark')).toBe(true);
    });

    it('should display appropriate message when winner is monster', () => {
        const wrapper = setup();
        expect(wrapper.find('[data-testid="lost"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="win"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="draw"]').exists()).toBe(false);
    });

    it('should display appropriate message when there is no winner', () => {
        getters.isMonsterWinner = () => false;
        const wrapper = setup();
        expect(wrapper.find('[data-testid="lost"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="win"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="draw"]').exists()).toBe(true);
    });

    it('should display appropriate message when winner is player', () => {
        getters.isPlayerWinner = () => true;
        const wrapper = setup();
        expect(wrapper.find('[data-testid="lost"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="win"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="draw"]').exists()).toBe(false);
    });

    it('should call restart action when start new game button is clicked', async () => {
        const wrapper = setup();
        await wrapper.find('[data-testid="start-new-game"]').trigger('click');

        expect(actions.restart).toHaveBeenCalledTimes(1);
    });
});

const getters = {
    isGameOver: () => false,
    isDarkModeOn: () => false,
    isPlayerWinner: () => false,
    isMonsterWinner: () => true
};

const actions = {
    restart: jest.fn()
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

    return mount(GameOver, {
        localVue,
        store
    });
}