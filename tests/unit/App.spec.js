import { shallowMount } from '@vue/test-utils';

import App from '@/App';

describe('App.vue', () => {
    it('should not apply dark class when dark mode is off', () => {
        const wrapper = shallowMount(App, { computed });

        expect(wrapper.classes('dark')).toBe(false);
    });

    it('should apply dark class dark mode is on', () => {
        computed.isDarkModeOn = () => true;
        const wrapper = shallowMount(App, { computed });

        expect(wrapper.classes('dark')).toBe(true);
    });
});

const computed = { isDarkModeOn: () => false };