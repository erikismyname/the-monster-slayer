import { mount } from '@vue/test-utils';

import BaseImage from '@/components/common/BaseImage';

describe('BaseImage.vue', () => {
    let wrapper;
    let image;

    beforeAll(() => {
        wrapper = mount(BaseImage, {
            propsData: {
                src: 'Test 1',
                alt: 'Test 2'
            }
        });
        image = wrapper.find('img');
    });

    it('should render an image', () => {
        expect(image.exists()).toBe(true);
    });

    it('should render a correct src', () => {
        expect(image.attributes('src')).toBe('Test 1');
    });

    it('should render a correct alt', () => {
        expect(image.attributes('alt')).toBe('Test 2');
    });
});