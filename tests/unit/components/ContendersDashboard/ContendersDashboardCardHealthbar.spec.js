import { mount } from '@vue/test-utils';

import ContendersDashboardCardHealthbar from '@/components/ContendersDashboard/ContendersDashboardCardHealthbar';

describe('ContendersDashboardCardHealthbar.vue', () => {
    let wrapper;
    let healthbarStatus;

    beforeAll(() => {
        wrapper = mount(ContendersDashboardCardHealthbar, {
            propsData: { contenderHealth: 100 }
        });
        healthbarStatus = wrapper.find('[data-testid="healthbar-status"]');
    });

    it('should render health percentage', () => {
        expect(wrapper.find('[data-testid="healthbar-percentage"]').text()).toBe('100%');
    });

    it('should apply only high class when health is > 50', () => {
        expect(healthbarStatus.classes('high')).toBe(true);
        expect(healthbarStatus.classes('medium')).toBe(false);
        expect(healthbarStatus.classes('low')).toBe(false);
    });

    it('should apply only medium class when health is > 25 && <= 50', async () => {
        await wrapper.setProps({ contenderHealth: 50 });

        expect(healthbarStatus.classes('high')).toBe(false);
        expect(healthbarStatus.classes('medium')).toBe(true);
        expect(healthbarStatus.classes('low')).toBe(false);
    });

    it('should apply only low class when health is <= 25', async () => {
        await wrapper.setProps({ contenderHealth: 25 });

        expect(healthbarStatus.classes('high')).toBe(false);
        expect(healthbarStatus.classes('medium')).toBe(false);
        expect(healthbarStatus.classes('low')).toBe(true);
    });

    it('should change healthbar width depending on health', async () => {
        expect(healthbarStatus.element.style.width).toBe('25%');
        await wrapper.setProps({ contenderHealth: 15 });
        expect(healthbarStatus.element.style.width).toBe('15%');
    });
});