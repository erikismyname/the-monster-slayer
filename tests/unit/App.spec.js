import { shallowMount } from '@vue/test-utils';

import App from '@/App';

describe('App.vue', () => {
    it('should not apply dark class when dark mode is off', () => {
        const wrapper = createWrapper(false);
        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should apply dark class dark mode is on', () => {
        const wrapper = createWrapper(true);
        expect(wrapper.classes('dark')).toBe(true);
    });
});

function createWrapper(isDarkModeOn) {
    return shallowMount(App, {
        computed: { isDarkModeOn: () => isDarkModeOn }
    });
}