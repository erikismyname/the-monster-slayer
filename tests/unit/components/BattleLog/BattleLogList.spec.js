import { mount } from '@vue/test-utils';

import BattleLogList from '@/components/BattleLog/BattleLogList';

describe('BattleLogList.vue', () => {
    let wrapper;
    let liWrapper;

    beforeEach(() => {
        wrapper = mount(BattleLogList, {
            propsData: {
                entries: [
                    { id: 1, text: 'Test 1' },
                    { id: 2, text: 'Test 2' }
                ]
            }
        });
        liWrapper = wrapper.findAll('li');
    });

    it('should render two li elements', () => {
        expect(liWrapper.length).toBe(2);
    });

    it('should render the correct text of each entry', () => {
        expect(liWrapper.wrappers[0].text()).toBe('Test 1');
        expect(liWrapper.wrappers[1].text()).toBe('Test 2');
    });
});