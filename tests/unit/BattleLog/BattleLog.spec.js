import { mount } from '@vue/test-utils';

import BattleLog from '@/components/BattleLog/BattleLog.vue';

describe('BattleLog.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(BattleLog, {
            propsData: {
                battleLog: [],
                battleLogEntriesOrder: 'descending'
            }
        });
    });

    it('should render an arrow down instead of an arrow up when entries order is descending', () => {
        expect(wrapper.find('.fa-arrow-down').exists()).toBe(true);
        expect(wrapper.find('.fa-arrow-up').exists()).toBe(false);
    });

    it('should render an arrow up instead of an arrow down when entries order is ascending', async () => {
        await wrapper.setProps({ battleLogEntriesOrder: 'ascending' });

        expect(wrapper.find('.fa-arrow-down').exists()).toBe(false);
        expect(wrapper.find('.fa-arrow-up').exists()).toBe(true);
    });

    it('should emit an event whenever each arrow is clicked', async () => {
        await wrapper.find('.fa-arrow-down').trigger('click');

        const emittedEvent = wrapper.emitted('change-battle-log-entries-order');

        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent.length).toBe(1);

        await wrapper.setProps({ battleLogEntriesOrder: 'ascending' });

        await wrapper.find('.fa-arrow-up').trigger('click');

        expect(emittedEvent.length).toBe(2);
    });
});