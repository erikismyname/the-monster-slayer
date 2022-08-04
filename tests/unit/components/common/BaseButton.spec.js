import { mount } from '@vue/test-utils';

import BaseButton from '@/components/common/BaseButton';

describe('BaseButton.vue', () => {
    let wrapper;
    let button;

    beforeEach(() => {
        wrapper = mount(BaseButton, {
            slots: { default: 'Test' }
        });
        button = wrapper.find('button');
    });

    it('should render a button', () => {
        expect(button.exists()).toBe(true);
    });

    it('should render a correct button text', () => {
        expect(button.text()).toBe('Test');
    });
});