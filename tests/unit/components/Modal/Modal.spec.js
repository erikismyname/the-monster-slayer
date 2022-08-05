import { mount } from '@vue/test-utils';

import Modal from '@/components/Modal/Modal';

describe('Modal.vue', () => {
    it('should render backdrop and modal when player name is not set', () => {
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="backdrop"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(false);
    });

    it('should not render backdrop and modal when player name is set', () => {
        computed.isPlayerNameSet = () => true;
        const wrapper = createWrapper();

        expect(wrapper.find('[data-testid="backdrop"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(true);
    });
});

const computed = {
    isPlayerNameSet: () => false
};

function createWrapper() {
    return mount(Modal, {
        computed
    });
}