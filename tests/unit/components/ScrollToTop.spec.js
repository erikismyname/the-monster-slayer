import createWrapper from 'tests/unit/utils/setupTests';
import ScrollToTop from '@/components/ScrollToTop';

describe('ScrollToTop', () => {
    let game;

    beforeEach(() => game = createGameModule());

    it('should not render scroll icon when scrollY < 250', () => {
        const wrapper = createWrapper(ScrollToTop, { game });

        expect(wrapper.find('[data-testid="scroll-to-top"]').exists()).toBe(false);
    });

    it('should render scroll icon when scrollY >= 250', async () => {
        const wrapper = createWrapper(ScrollToTop, { game });

        await wrapper.setData({ scrollY: 250 });
        expect(wrapper.find('[data-testid="scroll-to-top"]').exists()).toBe(true);
    });

    it('should not apply dark class when dark mode is off', async () => {
        const wrapper = createWrapper(ScrollToTop, { game });

        await wrapper.setData({ scrollY: 250 });
        expect(wrapper.find('[data-testid="scroll-to-top"]').classes('dark')).toBe(false);
    });

    it('should apply dark class when dark mode is on', async () => {
        game.getters.isDarkModeOn = () => true;
        const wrapper = createWrapper(ScrollToTop, { game });

        await wrapper.setData({ scrollY: 250 });
        expect(wrapper.find('[data-testid="scroll-to-top"]').classes('dark')).toBe(true);
    });

    it('should scroll to top when scroll icon is clicked', async () => {
        window.scrollTo = jest.fn();
        const wrapper = createWrapper(ScrollToTop, { game });

        await wrapper.setData({ scrollY: 250 });
        expect(wrapper.vm.scrollY).toBe(250);

        await wrapper.find('[data-testid="scroll-to-top"]').trigger('click');
        setTimeout(() => expect(wrapper.vm.scrollY).toBe(0), 1000);
    });
});

function createGameModule() {
    return {
        namespaced: true,
        getters: { isDarkModeOn: () => false }
    };
}