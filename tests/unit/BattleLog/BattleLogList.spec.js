import { mount } from '@vue/test-utils';

import BattleLogList from '@/components/BattleLog/BattleLogList.vue';

describe('BattleLogList.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(BattleLogList, {
            propsData: {
                battleLog: [
                    { id: 1, text: 'Test1' },
                    { id: 2, text: 'Test2' }
                ]
            }
        });
    });

    it('should render lis depending on prop\'s length', () => {
        expect(wrapper.findAll('li')).toHaveLength(2);
    });

    it('should render proper lis text', () => {
        expect(wrapper.find('li:first-of-type').text()).toBe('Test1');
        expect(wrapper.find('li:nth-of-type(2)').text()).toBe('Test2');
    });
});