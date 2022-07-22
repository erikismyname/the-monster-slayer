import { mount } from '@vue/test-utils';

import HealthDashboard from '@/components/HealthDashboard/HealthDashboard.vue';

describe('HealthDashboard.vue', () => {
    it('should have the correct section title, images and potion counter when contender is the player', () => {
        const wrapper = mount(HealthDashboard, {
            propsData: {
                contender: 'player',
                contenderHealth: 100,
                contenderHealthPotions: 5,
                hasContenderSecondWind: false
            },
            slots: {
                default: '<h2></h2>',
            }
        });

        expect(wrapper.find('h2').text()).toBe('');
        expect(wrapper.findAll('img')).toHaveLength(2);
        expect(wrapper.find('#health-potions-counter').text()).toBe('5')
    });

    it('should have the correct section title and image when contender is the monster', async () => {
        const wrapper = mount(HealthDashboard, {
            propsData: {
                contender: 'monster',
                contenderHealth: 100,
                hasContenderSecondWind: false
            },
            slots: {
                default: '<h2>Monster</h2>',
            }
        });

        expect(wrapper.find('h2').text()).toBe('Monster');
        expect(wrapper.findAll('img')).toHaveLength(1);
    });
});