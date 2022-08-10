import createWrapper from '@/utils/setupTests';
import BattleControls from '@/components/BattleControls';

describe('BattleControls.vue', () => {
    let monster;
    let player;
    let game;
    let modules;

    beforeEach(() => {
        monster = createModule('monster');
        player = createModule('player');
        game = createModule('game');
        modules = { monster, player, game };
    });

    it('should render section if game is not over', () => {
        const wrapper = createWrapper(BattleControls, modules);
        expect(wrapper.find('[data-testid="battle-controls"]').exists()).toBe(true);
    });

    it('should not render section if game is over', () => {
        game.getters.isGameOver = () => true;
        const wrapper = createWrapper(BattleControls, modules);

        expect(wrapper.find('[data-testid="battle-controls"]').exists()).toBe(false);
    });

    it('should dispatch correct action on attack', async () => {
        const wrapper = createWrapper(BattleControls, modules);

        await wrapper.find('[data-testid="attack-button"]').trigger('click');

        expect(player.actions.processAction).toHaveBeenCalledTimes(1);
        expect(monster.actions.processAction).toHaveBeenCalledTimes(1);
        expect(game.actions.endRound).toHaveBeenCalledTimes(1);
    });

    it('should not disable special attack button if round is divisible by 3', async () => {
        const wrapper = createWrapper(BattleControls, modules);
        expect(wrapper.find('[data-testid="special-attack-button"]').element.disabled).toBe(false);
    });

    it('should disable special attack button if round is not divisible by 3', async () => {
        game.getters.isCurrentRoundNotDivisibleByThree = () => true;
        const wrapper = createWrapper(BattleControls, modules);

        expect(wrapper.find('[data-testid="special-attack-button"]').element.disabled).toBe(true);
    });

    it('should dispatch correct action on special attack', async () => {
        const wrapper = createWrapper(BattleControls, modules);

        await wrapper.find('[data-testid="special-attack-button"]').trigger('click');

        expect(player.actions.processAction).toHaveBeenCalledTimes(1);
        expect(monster.actions.processAction).toHaveBeenCalledTimes(1);
        expect(game.actions.endRound).toHaveBeenCalledTimes(1);
    });

    it('should disable healing if player health is 100 or player health potions number is 0', () => {
        const wrapper = createWrapper(BattleControls, modules);

        expect(wrapper.find('[data-testid="heal-button"]').element.disabled).toBe(true);
    });

    it('should not disable healing if player health is not 100 or player health potions number is not 0', () => {
        player.getters.isHealingDisabled = () => false;
        const wrapper = createWrapper(BattleControls, modules);

        expect(wrapper.find('[data-testid="heal-button"]').element.disabled).toBe(false);
    });

    it('should dispatch correct action on heal', async () => {
        const wrapper = createWrapper(BattleControls, modules);

        await wrapper.find('[data-testid="special-attack-button"]').trigger('click');

        expect(player.actions.processAction).toHaveBeenCalledTimes(1);
        expect(monster.actions.processAction).toHaveBeenCalledTimes(1);
        expect(game.actions.endRound).toHaveBeenCalledTimes(1);
    });

    it('should dispatch correct action on surrender', async () => {
        const wrapper = createWrapper(BattleControls, modules);

        await wrapper.find('[data-testid="surrender-button"]').trigger('click');

        expect(game.actions.endBattle).toHaveBeenCalledTimes(1);
    });
});

function createModule(name) {
    const modules = {
        monster: { actions: { processAction: jest.fn() } },
        player: {
            getters: { isHealingDisabled: () => true },
            actions: { processAction: jest.fn() }
        },
        game: {
            getters: {
                isGameOver: () => false,
                isCurrentRoundNotDivisibleByThree: () => false
            },
            actions: {
                endRound: jest.fn(),
                endBattle: jest.fn()
            }
        }
    };

    const module = modules[name];
    module.namespaced = true;

    return module;
}