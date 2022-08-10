import createWrapper from '@/utils/setupTests';
import BattleLog from '@/components/BattleLog/BattleLog';

describe('BattleLog.vue', () => {
    let battleLog;
    let game;
    let modules;

    beforeEach(() => {
        battleLog = createBattleLogModule();
        game = createGameModule();
        modules = { battleLog, game };
    });

    it('should not apply dark class when dark mode is off', () => {
        const wrapper = createWrapper(BattleLog, modules);

        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should apply dark class when dark mode is on', () => {
        game.getters.isDarkModeOn = () => true;
        const wrapper = createWrapper(BattleLog, modules);

        expect(wrapper.classes('dark')).toBe(true);
    });

    it('should render arrow down instead of arrow up when entries order is descending', () => {
        const wrapper = createWrapper(BattleLog, modules);

        expect(wrapper.find('.fa-arrow-down').exists()).toBe(true);
        expect(wrapper.find('.fa-arrow-up').exists()).toBe(false);
    });

    it('should render arrow up instead of arrow down when entries order is ascending', () => {
        battleLog.getters.isEntriesOrderDescending = () => false;
        const wrapper = createWrapper(BattleLog, modules);

        expect(wrapper.find('.fa-arrow-up').exists()).toBe(true);
        expect(wrapper.find('.fa-arrow-down').exists()).toBe(false);
    });

    it('should dispatch the correct action when the arrow down is clicked', async () => {
        const wrapper = createWrapper(BattleLog, modules);

        await wrapper.find('.fa-arrow-down').trigger('click');
        expect(battleLog.actions.changeEntriesOrder).toHaveBeenCalledTimes(1);
    });

    it('should dispatch the correct action when the arrow up is clicked', async () => {
        battleLog.getters.isEntriesOrderDescending = () => false;
        const wrapper = createWrapper(BattleLog, modules);

        await wrapper.find('.fa-arrow-up').trigger('click');
        expect(battleLog.actions.changeEntriesOrder).toHaveBeenCalledTimes(1);
    });
});

function createBattleLogModule() {
    return {
        namespaced: true,
        getters: {
            entries: () => [],
            isEntriesOrderDescending: () => true,
        },
        actions: { changeEntriesOrder: jest.fn() }
    }
}

function createGameModule() {
    return {
        namespaced: true,
        getters: {
            isDarkModeOn: () => false
        }
    };
}