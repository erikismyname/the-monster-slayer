import { mount } from '@vue/test-utils';

import BattleLogListItem from '@/components/BattleLog/BattleLogListItem';

describe('BattleLogListItem.vue', () => {
    let wrapper;
    let li;

    beforeAll(() => {
        wrapper = mount(BattleLogListItem, {
            propsData: { text: 'Test' }
        });
        li = wrapper.find('li');
    });

    it('should render a li', () => {
        expect(li.exists()).toBe(true);
    });

    it('should render text prop', () => {
        expect(li.text()).toBe('Test');
    });
});