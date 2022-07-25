import { mount } from '@vue/test-utils';

import BattleLogList from '@/components/BattleLog/BattleLogList.vue';

describe('BattleLogList.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(BattleLogList, {
            propsData: {
                battleLog: [
                    { id: 1, text: 'Test 1' },
                    { id: 2, text: 'Test 2' }
                ]
            }
        });
    });

    it('should render li elements depending on battleLog\'s length', () => {
        expect(wrapper.find('li').exists()).toBe(true);
        expect(wrapper.findAll('li')).toHaveLength(2);
    });

    it('should render correct entries\' text', () => {
        expect(wrapper.find('li:first-of-type').text()).toBe('Test 1');
        expect(wrapper.find('li:nth-of-type(2)').text()).toBe('Test 2');
    });
});