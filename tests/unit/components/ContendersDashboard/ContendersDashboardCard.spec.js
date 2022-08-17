import createWrapper from '../../utils/setupTests';
import ContendersDashboardCard from '@/components/ContendersDashboard/ContendersDashboardCard';

describe('CotendersDashboardCard.vue', () => {
    let monster;
    let player;
    let game;
    let modules;
    let propsData;

    beforeEach(() => {
        monster = createMonsterModule();
        player = createPlayerModule();
        game = createGameModule();
        modules = { monster, player, game };
        propsData = { contender: 'monster' };
    });

    it('should not apply dark class when dark mode is off', () => {
        const wrapper = createWrapper(ContendersDashboardCard, modules, { propsData });

        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should apply dark class when dark mode is on', () => {
        game.getters.isDarkModeOn = () => true;
        const wrapper = createWrapper(ContendersDashboardCard, modules, { propsData });

        expect(wrapper.classes('dark')).toBe(true);
    });

    it('should render correct name when contender is monster', () => {
        const wrapper = createWrapper(ContendersDashboardCard, modules, { propsData });

        expect(wrapper.find('[data-testid="contender"]').text()).toBe('Monster')
    });

    it('should render correct name when contender is player', () => {
        propsData.contender = 'player';
        const wrapper = createWrapper(ContendersDashboardCard, modules, { propsData });

        expect(wrapper.find('[data-testid="contender"]').text()).toBe('Test');
    });

    it('should render monster avatar and not player icons when contender is monster', () => {
        const wrapper = createWrapper(ContendersDashboardCard, modules, { propsData });

        expect(wrapper.find('[data-testid="monster-avatar"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="player-icons"]').exists()).toBe(false);
    });

    it('should render player icons and not monster avatar when contender is player', () => {
        propsData.contender = 'player'
        const wrapper = createWrapper(ContendersDashboardCard, modules, { propsData });

        expect(wrapper.find('[data-testid="monster-avatar"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="player-icons"]').exists()).toBe(true);
    });

    it('should render player health potions number', () => {
        propsData.contender = 'player';
        const wrapper = createWrapper(ContendersDashboardCard, modules, { propsData });

        expect(wrapper.find('[data-testid="health-potions-counter"]').text()).toBe('5');
    });
});

function createMonsterModule() {
    return {
        namespaced: true,
        getters: {
            hasSecondWind: () => false,
            health: () => 100
        }
    }
}

function createPlayerModule() {
    return {
        namespaced: true,
        getters: {
            hasSecondWind: () => false,
            health: () => 100,
            healthPotions: () => 5,
            name: () => 'Test'
        }
    }
}

function createGameModule() {
    return {
        namespaced: true,
        getters: {
            isDarkModeOn: () => false
        }
    }
}