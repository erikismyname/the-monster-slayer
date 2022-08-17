import createWrapper from '../utils/setupTests';
import ToggleTheme from '@/components/ToggleTheme';

describe('ToggleTheme.vue', () => {
    let game;

    beforeEach(() => game = createGameModule());

    it('should render dark icon only when mode is light', () => {
        const wrapper = createWrapper(ToggleTheme, { game });

        expect(wrapper.find('[data-testid="dark-mode"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="light-mode"]').exists()).toBe(false);
    });

    it('should dispatch action when dark icon is clicked', async () => {
        const wrapper = createWrapper(ToggleTheme, { game });

        await wrapper.find('[data-testid="dark-mode"]').trigger('click');
        expect(game.actions.toggleDarkMode).toHaveBeenCalledTimes(1);
    });

    it('should render light icon only when mode is dark', () => {
        game.getters.isDarkModeOn = () => true;
        const wrapper = createWrapper(ToggleTheme, { game });

        expect(wrapper.find('[data-testid="dark-mode"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="light-mode"]').exists()).toBe(true);
    });

    it('should dispatch action when light icon is clicked', async () => {
        game.getters.isDarkModeOn = () => true;
        const wrapper = createWrapper(ToggleTheme, { game });

        await wrapper.find('[data-testid="light-mode"]').trigger('click');
        expect(game.actions.toggleDarkMode).toHaveBeenCalledTimes(1);
    });
});

function createGameModule() {
    return {
        namespaced: true,
        getters: { isDarkModeOn: () => false },
        actions: { toggleDarkMode: jest.fn() }
    }
}