import { mount } from '@vue/test-utils';

import BaseSpan from '@/components/common/BaseSpan';

describe('BaseSpan.vue', () => {
    let wrapper;
    let span;

    beforeAll(() => {
        wrapper = mount(BaseSpan, {
            slots: { default: 'Test' }
        });
        span = wrapper.find('span');
    });

    it('should render a span', () => {
        expect(span.exists()).toBe(true);
    });

    it('should render a correct span text', () => {
        expect(span.text()).toBe('Test');
    });
});