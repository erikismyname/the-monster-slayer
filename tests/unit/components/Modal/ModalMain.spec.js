import Vuex from 'vuex';
import { createLocalVue, mount } from '@vue/test-utils';

import ModalMain from '@/components/Modal/ModalMain';

describe('ModalMain.vue', () => {
    let wrapper;
    let input;
    let button;
    let checkbox;

    beforeEach(() => {
        wrapper = createWrapper();
        input = wrapper.find('[data-testid="player-name"]');
        button = wrapper.find('[data-testid="start-game"]');
        checkbox = wrapper.find('[data-testid="generate-random-name"]');
    });

    it('should not apply invalid class initially', async () => {
        expect(input.classes('invalid')).toBe(false);
    });

    it('should apply invalid class when player name is invalid', async () => {
        await button.trigger('click');
        expect(input.classes('invalid')).toBe(true);

        await input.setValue('Test1');
        await button.trigger('click');
        expect(input.classes('invalid')).toBe(true);
    });

    it('should render correct placeholder text initially', () => {
        expect(input.attributes('placeholder')).toBe('Please enter your name here');
    });

    it('should render correct placeholder text when player name is invalid', async () => {
        await button.trigger('click');
        expect(input.attributes('placeholder')).toBe('Why play the rebel?');
    });

    it('should generate a random name when the checkbox is clicked and toggle invalid class ', async () => {
        await button.trigger('click');
        expect(input.classes('invalid')).toBe(true);

        await checkbox.setChecked();
        expect(input.classes('invalid')).toBe(false);

        await checkbox.setChecked(false);
        expect(input.classes('invalid')).toBe(true);
    });

    it('should dispatch correct action when name is valid', async () => {
        await input.setValue('Test');
        await button.trigger('click');

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith('player/setName', 'Test');
    });
});

let store;

function createWrapper() {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store();
    store.dispatch = jest.fn();

    return mount(ModalMain, {
        localVue,
        store,
    });
}