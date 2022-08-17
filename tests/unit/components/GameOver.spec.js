import createWrapper from '../utils/setupTests';
import GameOver from '@/components/GameOver';

describe('GameOver.vue', () => {
    let game;

    beforeEach(() => {
        game = createGameModule();
    });

    it('should not render component when game is not over', () => {
        game.getters.isGameOver = () => false;
        const wrapper = createWrapper(GameOver, { game });

        expect(wrapper.find('[data-testid="game-over"]').exists('dark')).toBe(false);
    });

    it('should render component when game is over', () => {
        const wrapper = createWrapper(GameOver, { game });

        expect(wrapper.find('[data-testid="game-over"]').exists()).toBe(true);
    });

    it('should not apply dark class when dark mode is off', () => {
        const wrapper = createWrapper(GameOver, { game });

        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should apply dark class when dark mode is on', () => {
        game.getters.isDarkModeOn = () => true;
        const wrapper = createWrapper(GameOver, { game });

        expect(wrapper.classes('dark')).toBe(true);
    });

    it('should display appropriate message when there is no winner', () => {
        const wrapper = createWrapper(GameOver, { game });

        expect(wrapper.find('[data-testid="lost-message"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="win-message"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="draw-message"]').exists()).toBe(true);
    });

    it('should display appropriate message when winner is monster', () => {
        game.getters.isMonsterWinner = () => true;
        const wrapper = createWrapper(GameOver, { game });

        expect(wrapper.find('[data-testid="lost-message"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="win-message"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="draw-message"]').exists()).toBe(false);
    });

    it('should display appropriate message when winner is player', () => {
        game.getters.isPlayerWinner = () => true;
        const wrapper = createWrapper(GameOver, { game });

        expect(wrapper.find('[data-testid="lost-message"]').exists()).toBe(false);
        expect(wrapper.find('[data-testid="win-message"]').exists()).toBe(true);
        expect(wrapper.find('[data-testid="draw-message"]').exists()).toBe(false);
    });

    it('should call restart action when start new game button is clicked', async () => {
        const wrapper = createWrapper(GameOver, { game });

        await wrapper.find('[data-testid="start-new-game"]').trigger('click');

        expect(game.actions.restart).toHaveBeenCalledTimes(1);
    });
});

function createGameModule() {
    return {
        namespaced: true,
        getters: {
            isGameOver: () => true,
            isDarkModeOn: () => false,
            isPlayerWinner: () => false,
            isMonsterWinner: () => false
        },
        actions: { restart: jest.fn() }
    }
}