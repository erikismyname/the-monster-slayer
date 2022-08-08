import { mount } from '@vue/test-utils'

import ScrollToTop from '@/components/ScrollToTop';

describe('ScrollToTop', () => {
    it('should render scroll icon when scrollY < 250', () => {
        const wrapper = createWrapper(false);
        expect(wrapper.find('[data-testid="scroll-to-top"]').exists()).toBe(false);
    });

    it('should render scroll icon when scrollY >= 250', async () => {
        const wrapper = createWrapper(false);
        await wrapper.setData({ scrollY: 250 });
        expect(wrapper.find('[data-testid="scroll-to-top"]').exists()).toBe(true);
    });

    it('should not apply dark class when dark mode is off', async () => {
        const wrapper = createWrapper(false);
        await wrapper.setData({ scrollY: 250 });
        expect(wrapper.find('[data-testid="scroll-to-top"]').classes('dark')).toBe(false);
    });

    it('should apply dark class when dark mode is on', async () => {
        const wrapper = createWrapper(true);
        await wrapper.setData({ scrollY: 250 });
        expect(wrapper.find('[data-testid="scroll-to-top"]').classes('dark')).toBe(true);
    });

    it('should scroll to top when scroll icon is clicked', async () => {
        const wrapper = createWrapper(false);

        await wrapper.setData({ scrollY: 250 });
        expect(wrapper.vm.scrollY).toBe(250);

        await wrapper.find('[data-testid="scroll-to-top"]').trigger('click');
        expect(methods.scrollToTop).toHaveBeenCalledTimes(1);
    });
});

const methods = {
    scrollToTop: jest.fn()
};

function createWrapper(isDarkModeOn) {
    return mount(ScrollToTop, {
        computed: { isDarkModeOn: () => isDarkModeOn },
        methods
    });
}