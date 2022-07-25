import { mount } from '@vue/test-utils';

import BaseButton from '@/components/common/BaseButton.vue';

describe('BaseButton.vue', () => {
    it('should render a button with a correct label', () => {
        const wrapper = mount(BaseButton, {
            slots: {
                default: 'Test'
            }
        });
        const button = wrapper.find('button');

        expect(button.exists()).toBe(true);
        expect(button.text()).toBe('Test');
    });
});