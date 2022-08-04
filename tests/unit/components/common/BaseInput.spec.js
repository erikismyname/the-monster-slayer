import { mount } from '@vue/test-utils';

import BaseInput from '@/components/common/BaseInput';

describe('BaseInput.vue', () => {
    let wrapper;
    let input;

    beforeEach(() => {
        wrapper = mount(BaseInput, {
            propsData: { value: '' }
        });
        input = wrapper.find('input');
    });

    it('should render an input of type text', () => {
        expect(input.exists()).toBe(true);
        expect(input.attributes('type')).toBe('text');
    });

    it('should change value on input', async () => {
        expect(input.element.value).toBe('');
        await input.setValue('Test 1');
        expect(input.element.value).toBe('Test 1');
        await input.setValue('Test 2');
        expect(input.element.value).toBe('Test 2');
    });

    it('should emit an event on input', async () => {
        await input.setValue('Test 1');
        const event = wrapper.emitted('input');

        expect(event).toBeTruthy();
        expect(event.length).toBe(1);
        expect(event[0]).toEqual(['Test 1']);

        await input.setValue('Test 2');

        expect(event.length).toBe(2);
        expect(event[1]).toEqual(['Test 2']);
    });
});