import { mount } from '@vue/test-utils';

import BattleLogListItem from '@/components/BattleLog/BattleLogListItem.vue';

describe('BattleLogListItem.vue', () => {
    it('should render text prop', () => {
        const wrapper = mount(BattleLogListItem, {
            propsData: {
                text: 'Test'
            }
        });

        expect(wrapper.text()).toBe('Test');
    });
});