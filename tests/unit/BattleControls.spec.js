import { mount } from '@vue/test-utils';

import BattleControls from '@/components/BattleControls.vue';

describe('BattleControls.vue', () => {
    let wrapper;
    let specialAttackButton;
    let healButton;

    beforeEach(() => {
        wrapper = mount(BattleControls, {
            propsData: {
                winner: '',
                currentRound: 0,
                playerHealth: 100,
                playerHealthPotions: 5
            }
        });
        specialAttackButton = wrapper.find('[data-testid="special-attack-btn"]');
        healButton = wrapper.find('[data-testid="heal-btn"]');
    });

    it('should render section when there is no winner', () => {
        expect(wrapper.find('section').exists()).toBe(true);
    });

    it('should not render section when there is a winner', async () => {
        await wrapper.setProps({ winner: 'player' });

        expect(wrapper.find('section').exists()).toBe(false);
    });

    it('should not disable special attack when current round is divisible by three', async () => {
        expect(specialAttackButton.element.disabled).toBe(false);

        await wrapper.setProps({ currentRound: 3 });

        expect(specialAttackButton.element.disabled).toBe(false);
    });

    it('should disable special attack when current round is not divisible by three', async () => {
        await wrapper.setProps({ currentRound: 1 });

        expect(specialAttackButton.element.disabled).toBe(true);

        await wrapper.setProps({ currentRound: 2 });

        expect(specialAttackButton.element.disabled).toBe(true);

    });

    it('should disable heal when player health is 100 or there are no health potions left', async () => {
        expect(healButton.element.disabled).toBe(true);

        await wrapper.setProps({ playerHealth: 50 });

        expect(healButton.element.disabled).toBe(false);

        await wrapper.setProps({ playerHealthPotions: 0 });

        expect(healButton.element.disabled).toBe(true);
    });

    it('should emit an event when the attack button is clicked', async () => {
        await wrapper.find('[data-testid="attack-btn"]').trigger('click');

        const emittedEvent = wrapper.emitted('attack-monster');

        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent.length).toBe(1);
        expect(emittedEvent[0]).toEqual([false]);
    });

    it('should emit an event when the special attack button is clicked', async () => {
        await specialAttackButton.trigger('click');

        const emittedEvent = wrapper.emitted('attack-monster');

        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent.length).toBe(1);
        expect(emittedEvent[0]).toEqual([true]);
    });

    it('should emit an event when the heal button is clicked', async () => {
        await wrapper.setProps({ playerHealth: 50 });

        await wrapper.find('[data-testid="heal-btn"]').trigger('click');

        const emittedEvent = wrapper.emitted('heal-player');

        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent.length).toBe(1);
    });

    it('should emit an event when the surrender button is clicked', async () => {
        await wrapper.find('[data-testid="surrender-btn"]').trigger('click');

        const emittedEvent = wrapper.emitted('surrender-to-monster');

        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent.length).toBe(1);
    });
});