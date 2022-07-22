import { mount } from '@vue/test-utils';

import HealthDashboardSecondWindBadge from '@/components/HealthDashboard/HealthDashboardSecondWindBadge.vue';

describe('HealthDashboardSecondWindBadge.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(HealthDashboardSecondWindBadge, {
            propsData: {
                hasContenderSecondWind: false
            }
        });
    });

    it('does not render when props is false', () => {
        expect(wrapper.find('.second-wind-badge').exists()).toBe(false);
    });

    it('renders when prop is true', async () => {
        await wrapper.setProps({ hasContenderSecondWind: true });

        expect(wrapper.find('.second-wind-badge').exists()).toBe(true);
    });
});