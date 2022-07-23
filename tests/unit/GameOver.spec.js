import { mount } from '@vue/test-utils';

import GameOver from '@/components/GameOver.vue';

describe('GameOver.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(GameOver, {
            propsData: {
                winner: ''
            }
        })
    });

    it('should not render section when winner is an empty string', () => {
        expect(wrapper.find('section').exists()).toBe(false);
    });

    it('should render section when there is a winner', async () => {
        await wrapper.setProps({ winner: 'player' });

        expect(wrapper.find('section').exists()).toBe(true);
    })

    it('should render corresponding text and icon when the player wins', async () => {
        await wrapper.setProps({ winner: 'player' });

        expect(wrapper.find('h3').text()).toBe('You WON!');
        expect(wrapper.find('.fa-face-smile').exists()).toBe(true);

        // Check if other h3s and icons do not exist?
    });

    it('should render corresponding text and icon when the monster wins', async () => {
        await wrapper.setProps({ winner: 'monster' });

        expect(wrapper.find('h3').text()).toBe('You LOST!');
        expect(wrapper.find('.fa-face-frown').exists()).toBe(true);
    });

    it('should render corresponding text and icon when a draw occurs', async () => {
        await wrapper.setProps({ winner: 'draw' });

        expect(wrapper.find('h3').text()).toBe('DRAW!');
        expect(wrapper.find('.fa-face-meh').exists()).toBe(true);
    });

    it('should emit a start new game event when the start new game button is clicked', async () => {
        await wrapper.setProps({ winner: 'player' });
        await wrapper.find('button').trigger('click');

        expect(wrapper.emitted('start-new-game')).toBeTruthy();
        expect(wrapper.emitted('start-new-game').length).toBe(1);
    });
});