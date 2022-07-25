import { mount } from '@vue/test-utils';

import BattleLogListItem from '@/components/BattleLog/BattleLogListItem.vue';

describe('BattleLogListItem.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(BattleLogListItem, {
            propsData: {
                text: 'Test'
            }
        });
    });

    it('should render exactly one li element', () => {
        expect(wrapper.find('li').exists()).toBe(true);
        expect(wrapper.findAll('li')).toHaveLength(1);
    });

    it('should render text prop', () => {
        expect(wrapper.text()).toBe('Test');
    });
});