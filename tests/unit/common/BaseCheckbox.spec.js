import { mount } from '@vue/test-utils';

import BaseCheckbox from '@/components/common/BaseCheckbox.vue';

describe('BaseCheckbox.vue', () => {
    let wrapper;
    let checkbox;

    beforeEach(() => {
        wrapper = mount(BaseCheckbox, {
            propsData: {
                checked: false
            }
        });
        checkbox = wrapper.find('input');
    });

    it('should render an unchecked checkbox by default', () => {
        expect(checkbox.exists()).toBe(true);
        expect(checkbox.element.checked).toBe(false);
    });

    it('should emit an event and change checkbox checked value when clicked', async () => {
        await checkbox.setChecked();

        const emittedEvent = wrapper.emitted('change');

        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent.length).toBe(1);
        expect(emittedEvent[0]).toEqual([true]);
        expect(checkbox.element.checked).toBe(true);

        await checkbox.setChecked(false);

        expect(emittedEvent.length).toBe(2);
        expect(emittedEvent[1]).toEqual([false]);
        expect(checkbox.element.checked)
    });
});