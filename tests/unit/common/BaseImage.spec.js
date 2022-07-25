import { mount } from '@vue/test-utils';

import BaseImage from '@/components/common/BaseImage.vue';

describe('BaseImage.vue', () => {
    it('should render an image with correct src and alt attributes', () => {
        const wrapper = mount(BaseImage, {
            propsData: {
                src: 'test src',
                alt: 'test alt'
            }
        });

        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.attributes('src')).toBe('test src');
        expect(wrapper.attributes('alt')).toBe('test alt');
    });
});