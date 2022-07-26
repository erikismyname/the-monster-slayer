import { mount } from '@vue/test-utils';

import Modal from '@/components/Modal.vue';

describe('Modal.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Modal, {
            propsData: {
                isVisible: false
            }
        })
    });

    it('should not render backdrop when isVisible is false', () => {
        expect(wrapper.find('[data-testid="backdrop"]').exists()).toBe(false);
    });

    it('should render backdop when isVisible is true', async () => {
        await wrapper.setProps({ isVisible: true });

        expect(wrapper.find('[data-testid="backdrop"]').exists()).toBe(true);
    });

    it('should not render modal when isVisible is false', () => {
        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(false);
    });

    it('should render modal when isVisible is true', async () => {
        await wrapper.setProps({ isVisible: true });

        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(true);
    });

    it('should not attach invalid class on initial render', async () => {
        await wrapper.setProps({ isVisible: true });

        expect(wrapper.classes('invalid')).toBe(false);
    });

    it('should attach invalid class when player name is empty', async () => {
        await wrapper.setProps({ isVisible: true });

        await wrapper.find('[data-testid="start-new-game-btn"]').trigger('click');

        expect(wrapper.find('[data-testid="player-name"]').element._prevClass).toBe('invalid');

        await wrapper.find('#generate-random-name').setChecked();

        expect(wrapper.find('[data-testid="player-name"]').element._prevClass).toBe('');

        await wrapper.find('#generate-random-name').setChecked(false);

        expect(wrapper.find('[data-testid="player-name"]').element._prevClass).toBe('invalid');
    });

    it('emits an event when start new game button is clicked', async () => {
        await wrapper.setProps({ isVisible: true });

        await wrapper.find('#player-name').setValue('Test');

        await wrapper.find('button').trigger('click');

        const emittedEvent = wrapper.emitted('set-player-name');

        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent.length).toBe(1);
        expect(emittedEvent[0]).toEqual(['Test']);
    });
});