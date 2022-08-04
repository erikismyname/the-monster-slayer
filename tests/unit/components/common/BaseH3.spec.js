import { mount } from '@vue/test-utils';

import BaseH3 from '@/components/common/BaseH3';

describe('BaseH3', () => {
    let wrapper;
    let h3;

    beforeEach(() => {
        wrapper = mount(BaseH3, {
            slots: { default: 'Test' }
        });
        h3 = wrapper.find('h3');
    });

    it('should render a h3', () => {
        expect(h3.exists()).toBe(true);
    });

    it('should render a correct h3 text', () => {
        expect(h3.text()).toBe('Test');
    });
});