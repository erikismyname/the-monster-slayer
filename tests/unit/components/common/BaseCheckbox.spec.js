import { mount } from '@vue/test-utils';

import BaseCheckbox from '@/components/common/BaseCheckbox';

describe('BaseCheckbox.vue', () => {
    let wrapper;
    let input;

    beforeEach(() => {
        wrapper = mount(BaseCheckbox, {
            propsData: { checked: false }
        });
        input = wrapper.find('input');
    });

    it('should render an input', () => {
        expect(input.exists()).toBe(true);
    });

    it('should change checked value on click', async () => {
        expect(input.element.checked).toBe(false);

        await input.setChecked();
        expect(input.element.checked).toBe(true);

        await input.setChecked(false);
        expect(input.element.checked).toBe(false);
    });

    it('should emit an event on click', async () => {
        await input.setChecked();
        const event = wrapper.emitted('change');

        expect(event).toBeTruthy();
        expect(event.length).toBe(1);
        expect(event[0]).toEqual([true]);

        await input.setChecked(false);

        expect(event.length).toBe(2);
        expect(event[1]).toEqual([false]);
    });
});