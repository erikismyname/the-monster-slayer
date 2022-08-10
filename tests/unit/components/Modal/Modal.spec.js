import createWrapper from '@/utils/setupTests';
import Modal from '@/components/Modal/Modal';

describe('Modal.vue', () => {
    let player;

    beforeEach(() => {
        player = createPlayerModule();
    });

    it('should render backdrop and modal when player name is not set', () => {
        const wrapper = createWrapper(Modal, { player });

        expect(wrapper.find('[data-testid="backdrop"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(false);
    });

    it('should not render backdrop and modal when player name is set', () => {
        player.getters.name = () => 'Test';
        const wrapper = createWrapper(Modal, { player });

        expect(wrapper.find('[data-testid="backdrop"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(true);
    });
});

function createPlayerModule() {
    return {
        namespaced: true,
        getters: {
            name: () => ''
        }
    }
}