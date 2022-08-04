import { mount } from '@vue/test-utils';

import BaseH2 from '@/components/common/BaseH2';

describe('BaseH2.vue', () => {
    let wrapper;
    let h2;

    beforeEach(() => {
        wrapper = mount(BaseH2, {
            slots: { default: 'Test' }
        });
        h2 = wrapper.find('h2');
    });

    it('should render a h2', () => {
        expect(h2.exists()).toBe(true);
    });

    it('should render a correct h2 text', () => {
        expect(h2.text()).toBe('Test');
    });
});