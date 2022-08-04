import { mount } from '@vue/test-utils';

import BaseLabel from '@/components/common/BaseLabel';

describe('BaseLabel.vue', () => {
    let wrapper;
    let label;

    beforeEach(() => {
        wrapper = mount(BaseLabel, {
            slots: { default: 'Test' }
        });
        label = wrapper.find('label');
    });

    it('should render a label', () => {
        expect(label.exists()).toBe(true);
    });

    it('should render a correct label text', () => {
        expect(label.text()).toBe('Test');
    });
});