import { mount } from '@vue/test-utils';

import BaseInput from '@/components/common/BaseInput.vue';

describe('BaseInput.vue', () => {
    let wrapper;
    let input;

    beforeEach(() => {
        wrapper = mount(BaseInput, {
            propsData: {
                value: 'Test'
            }
        });
        input = wrapper.find('input[type="text"]');
    });

    it('should render an input', () => {
        expect(input.exists()).toBe(true);
    });

    it('should render a correct input value', () => {
        expect(input.element.value).toBe('Test');
    });

    it('should emit an event on input', async () => {
        await input.setValue('New value');

        const emittedEvent = wrapper.emitted('input');

        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent.length).toBe(1);
        expect(emittedEvent[0]).toEqual(['New value']);

        await input.setValue('Another value');

        expect(emittedEvent.length).toBe(2);
        expect(emittedEvent[1]).toEqual(['Another value']);
    });

    it('should change input value when an input event is emitted', async () => {
        expect(input.element.value).toBe('Test');

        await input.setValue('New value');

        expect(input.element.value).toBe('New value');
    });
});