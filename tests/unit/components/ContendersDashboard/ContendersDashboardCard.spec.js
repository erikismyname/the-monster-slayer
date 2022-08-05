import { shallowMount } from '@vue/test-utils';

import ContendersDashboardCard from '@/components/ContendersDashboard/ContendersDashboardCard';

describe('CotendersDashboardCard.vue', () => {
    it('should not apply dark class when dark mode is off', () => {
        const wrapper = createWrapper();

        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should apply dark class when dark mode is on', () => {
        computed.isDarkModeOn = () => true;
        const wrapper = createWrapper();

        expect(wrapper.classes('dark')).toBe(true);
    });

    it('should render correct name when contender is monster', () => {
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="contender"]').text()).toBe('Monster')
    });

    it('should render correct name when contender is player', () => {
        propsData.contender = 'player';
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="contender"]').text()).toBe('Test');
    });

    it('should render monster avatar and not player icons when contender is monster', () => {
        propsData.contender = 'monster';
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="monster-avatar"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="player-icons"]').exists()).toBe(false);
    });

    it('should render player icons and not monster avatar when contender is player', () => {
        propsData.contender = 'player'
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="monster-avatar"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="player-icons"]').exists()).toBe(true);
    });

    it('should render player health potions number', () => {
        propsData.contender = 'player';
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="health-potions-counter"]').text()).toBe('5');
    });
});

const propsData = { contender: 'monster' };

const computed = {
    hasMonsterSecondWind: () => false,
    monsterHealth: () => 100,
    hasPlayerSecondWind: () => false,
    playerHealth: () => 100,
    playerHealthPotions: () => 5,
    playerName: () => 'Test',
    isDarkModeOn: () => false
};

function createWrapper() {
    return shallowMount(ContendersDashboardCard, {
        propsData,
        computed
    });
}