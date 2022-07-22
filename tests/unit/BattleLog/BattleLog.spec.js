import { shallowMount } from '@vue/test-utils';

import BattleLog from '@/components/BattleLog/BattleLog.vue';

describe.only('BattleLog.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(BattleLog, {
            propsData: {
                battleLog: [],
                battleLogEntriesOrder: 'descending'
            }
        });
    });

    it('should render arrow down and not render arrow up when entries order is descending', () => {
        expect(wrapper.find('.fa-arrow-down').exists()).toBe(true);
        expect(wrapper.find('.fa-arrow-up').exists()).toBe(false);
    });

    it('should render arrow up and not render arrow down when entries order is ascending', async () => {
        await wrapper.setProps({ battleLogEntriesOrder: 'ascending' });

        expect(wrapper.find('.fa-arrow-down').exists()).toBe(false);
        expect(wrapper.find('.fa-arrow-up').exists()).toBe(true);
    });

    it('should emit an event when each one of the arrows is clicked', async () => {
        await wrapper.find('.fa-arrow-down').trigger('click');

        expect(wrapper.emitted('change-battle-log-entries-order')).toBeTruthy();
        expect(wrapper.emitted('change-battle-log-entries-order').length).toBe(1);

        await wrapper.setProps({ battleLogEntriesOrder: 'ascending' });

        await wrapper.find('.fa-arrow-up').trigger('click');

        expect(wrapper.emitted('change-battle-log-entries-order').length).toBe(2);
    });
});