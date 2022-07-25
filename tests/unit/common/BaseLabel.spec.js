import { mount } from '@vue/test-utils';

import BaseLabel from '@/components/common/BaseLabel.vue';

describe('BaseLabel.vue', () => {
    it('Should render a label with a correct text', () => {
        const wrapper = mount(BaseLabel, {
            slots: {
                default: 'Test'
            }
        });
        const label = wrapper.find('label');

        expect(label.exists()).toBe(true);
        expect(label.text()).toBe('Test');
    });
});