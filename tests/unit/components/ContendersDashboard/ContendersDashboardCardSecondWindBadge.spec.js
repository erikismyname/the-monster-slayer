import { mount } from '@vue/test-utils';

import ContendersDashboardCardSecondWindBadge from '@/components/ContendersDashboard/ContendersDashboardCardSecondWindBadge';

describe('ContendersDashboardCardSecondWindBadge.vue', () => {
    let wrapper;

    beforeAll(() => {
        wrapper = mount(ContendersDashboardCardSecondWindBadge, {
            propsData: { hasContenderSecondWind: false }
        });
    });

    it('should not render second wind badge when contender does not have second wind', () => {
        expect(wrapper.find('[data-testid="second-wind-badge"]').exists()).toBe(false);
    });

    it('should render second wind badge when contender has second wind', async () => {
        await wrapper.setProps({ hasContenderSecondWind: true });
        expect(wrapper.find('[data-testid="second-wind-badge"]').exists()).toBe(true);
    });
});