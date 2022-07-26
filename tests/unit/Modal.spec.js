import { mount } from '@vue/test-utils';

import Modal from '@/components/Modal.vue';

describe('Modal.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Modal, {
            propsData: {
                isVisible: false
            }
        });
    });

    it('should not render backdrop when isVisible prop is false', () => {
        expect(wrapper.find('[data-testid="backdrop"]').exists()).toBe(false);
    });

    it('should render backdop when isVisible prop is true', async () => {
        await wrapper.setProps({ isVisible: true });

        expect(wrapper.find('[data-testid="backdrop"]').exists()).toBe(true);
    });

    it('should not render modal when isVisible prop is false', () => {
        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(false);
    });

    it('should render modal when isVisible prop is true', async () => {
        await wrapper.setProps({ isVisible: true });

        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(true);
    });

    it('should not attach invalid input class on initial render', async () => {
        await wrapper.setProps({ isVisible: true });

        expect(wrapper.find('[data-testid="player-name"]').element._prevClass).toBe('');
    });

    it('should attach invalid input class when player name is empty', async () => {
        await wrapper.setProps({ isVisible: true });

        await wrapper.find('[data-testid="start-game-btn"]').trigger('click');

        const playerNameInput = wrapper.find('[data-testid="player-name"]');

        const generateRandomNameCheckbox = wrapper.find('#generate-random-name');

        expect(playerNameInput.element._prevClass).toBe('invalid');

        await generateRandomNameCheckbox.setChecked();

        expect(playerNameInput.element._prevClass).toBe('');

        await generateRandomNameCheckbox.setChecked(false);

        expect(playerNameInput.element._prevClass).toBe('invalid');
    });

    it('emits an event when start new game button is clicked', async () => {
        await wrapper.setProps({ isVisible: true });

        await wrapper.find('[data-testid="player-name"]').setValue('Test');

        await wrapper.find('[data-testid="start-game-btn"]').trigger('click');

        const emittedEvent = wrapper.emitted('begin-game');

        expect(emittedEvent).toBeTruthy();
        expect(emittedEvent.length).toBe(1);
        expect(emittedEvent[0]).toEqual(['Test']);
    });
});