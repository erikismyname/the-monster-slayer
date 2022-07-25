import { mount } from '@vue/test-utils';

import HealthDashboardHealthBar from '@/components/HealthDashboard/HealthDashboardHealthBar.vue';

describe('HealthDashboardHealthBar', () => {
    let wrapper;
    let healthbarStatus;

    beforeEach(() => {
        wrapper = mount(HealthDashboardHealthBar, {
            propsData: {
                contenderHealth: 100
            }
        });
        healthbarStatus = wrapper.find('.healthbar-status');
    });

    it('renders contender health', () => {
        expect(wrapper.find('.healthbar-percentage').text()).toBe('100%')
    });

    it('attaches only high class when health is > 50', () => {
        expect(healthbarStatus.classes('high')).toBe(true);
        expect(healthbarStatus.classes('medium')).toBe(false);
        expect(healthbarStatus.classes('low')).toBe(false);
    });

    it('attaches only medium class when health is > 25 && <= 50', async () => {
        await wrapper.setProps({
            contenderHealth: 50
        });

        expect(healthbarStatus.classes('high')).toBe(false);
        expect(healthbarStatus.classes('medium')).toBe(true);
        expect(healthbarStatus.classes('low')).toBe(false);
    });

    it('attaches only low class when health is <= 25', async () => {
        await wrapper.setProps({
            contenderHealth: 25
        });

        expect(healthbarStatus.classes('high')).toBe(false);
        expect(healthbarStatus.classes('medium')).toBe(false);
        expect(healthbarStatus.classes('low')).toBe(true);
    });

    it('changes healthbar status width dynamically', async () => {
        expect(healthbarStatus.element.style.width).toBe('100%');

        await wrapper.setProps({ contenderHealth: 50 });

        expect(healthbarStatus.element.style.width).toBe('50%');
    });
});