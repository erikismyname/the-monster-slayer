import { mount } from '@vue/test-utils';

import BaseIcon from '@/components/common/BaseIcon';

describe('BaseIcon.vue', () => {
    it('should render an icon', () => {
        const wrapper = mount(BaseIcon);
        expect(wrapper.find('i').exists()).toBe(true);
    });
});