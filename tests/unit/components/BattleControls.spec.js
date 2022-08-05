import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';

import BattleControls from '@/components/BattleControls';

describe('BattleControls.vue', () => {
    it('should render section if game is not over', () => {
        const wrapper = createWrapper();
        expect(wrapper.find('[data-testid="battle-controls"]').exists()).toBe(true);
    });

    it('should not render section if game is over', () => {
        gameGetters.isGameOver = () => true;
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="battle-controls"]').exists()).toBe(false);
    });

    it('should dispatch correct action on attack', async () => {
        gameGetters.isGameOver = () => false;
        const wrapper = createWrapper();

        await wrapper.find('[data-testid="attack-button"]').trigger('click');

        expect(playerActions.processAction).toHaveBeenCalledTimes(1);
        expect(monsterActions.processAction).toHaveBeenCalledTimes(1);
        expect(gameActions.endRound).toHaveBeenCalledTimes(1);
    });

    it('should not disable special attack button if round is divisible by 3', async () => {
        const wrapper = createWrapper();
        expect(wrapper.find('[data-testid="special-attack-button"]').element.disabled).toBe(false);
    });

    it('should disable special attack button if round is not divisible by 3', async () => {
        gameGetters.isCurrentRoundNotDivisibleByThree = () => true;
        const wrapper = createWrapper();
        expect(wrapper.find('[data-testid="special-attack-button"]').element.disabled).toBe(true);
    });

    it('should dispatch correct action on special attack', async () => {
        const wrapper = createWrapper();

        await wrapper.find('[data-testid="special-attack-button"]').trigger('click');

        expect(playerActions.processAction).toHaveBeenCalledTimes(1);
        expect(monsterActions.processAction).toHaveBeenCalledTimes(1);
        expect(gameActions.endRound).toHaveBeenCalledTimes(1);
    });

    it('should disable healing if player health is 100 or player health potions number is 0', () => {
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="heal-button"]').element.disabled).toBe(true);
    });

    it('should not disable healing if player health is not 100 or player health potions number is not 0', () => {
        computed.isPlayerHealingDisabled = () => false;
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="heal-button"]').element.disabled).toBe(false);
    });

    it('should dispatch correct action on heal', async () => {
        const wrapper = createWrapper();

        await wrapper.find('[data-testid="special-attack-button"]').trigger('click');

        expect(playerActions.processAction).toHaveBeenCalledTimes(1);
        expect(monsterActions.processAction).toHaveBeenCalledTimes(1);
        expect(gameActions.endRound).toHaveBeenCalledTimes(1);
    });

    it('should dispatch correct action on surrender', async () => {
        const wrapper = createWrapper();

        await wrapper.find('[data-testid="surrender-button"]').trigger('click');

        expect(gameActions.endBattle).toHaveBeenCalledTimes(1);
    });
});

const computed = {
    isPlayerHealingDisabled: () => true
};

const gameGetters = {
    isGameOver: () => false,
    isCurrentRoundNotDivisibleByThree: () => false
};

let store;

const playerActions = {
    processAction: jest.fn()
};

const monsterActions = {
    processAction: jest.fn()
};

const gameActions = {
    endRound: jest.fn(),
    endBattle: jest.fn()
};

function createWrapper() {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store({
        modules: {
            game: {
                namespaced: true,
                getters: gameGetters,
                actions: gameActions
            },
            player: {
                namespaced: true,
                actions: playerActions
            },
            monster: {
                namespaced: true,
                actions: monsterActions
            }
        }
    });

    return mount(BattleControls, {
        localVue,
        store,
        computed
    });
}