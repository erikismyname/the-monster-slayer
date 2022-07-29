import config from '@/config';
import getRandomValueBetween from "@/utils/getRandomValueBetween";
import hasSecondWind from '@/utils/hasSecondWind';

export default {
    namespaced: true,
    state: {
        health: config.MONSTER_MAX_HEALTH_POINTS,
        hasSecondWind: false,
        hasUsedSecondWind: false,
        lastDamagePointsTaken: null
    },
    getters: {
        health(state) {
            return state.health;
        },
        hasSecondWind(state) {
            return state.hasSecondWind;
        },
        hasUsedSecondWind(state) {
            return state.hasUsedSecondWind;
        },
        lastDamagePointsTaken(state) {
            return state.lastDamagePointsTaken;
        }
    },
    mutations: {
        DECREASE_HEALTH(state, points) {
            state.health -= points;

            if (state.health < 0) {
                state.health = 0;
            }
        },
        SET_LAST_DAMAGE_POINTS_TAKEN(state, points) {
            state.lastDamagePointsTaken = points;
        },
        SET_SECOND_WIND(state) {
            state.hasSecondWind = true;
            state.hasUsedSecondWind = true;
            state.health = 50;
        },
        RESET_DATA(state) {
            state.health = 100;
            state.hasSecondWind = false;
            state.hasUsedSecondWind = false;
            state.lastDamagePointsTaken = null;
        }
    },
    actions: {
        processAction({ dispatch, rootGetters }) {
            dispatch('attack');
            dispatch('addEntry', {
                contender: 'Monster',
                action: 'attack',
                points: rootGetters['player/lastDamagePointsTaken']
            }, { root: true });
        },
        attack({ commit }) {
            // extract the logic for attack points in a separate func in utils?
            const attackPoints = getRandomValueBetween(
                config.MONSTER_MIN_ATTACK_POINTS,
                config.MONSTER_MAX_ATTACK_POINTS
            );

            commit('player/DECREASE_HEALTH', attackPoints, { root: true });
            commit('player/SET_LAST_DAMAGE_POINTS_TAKEN', attackPoints, { root: true });
        },
        processDying({ getters, commit }) {
            hasSecondWind(getters.hasUsedSecondWind)
                ? commit('SET_SECOND_WIND')
                : commit('SET_WINNER', 'player', { root: true });
        },
    }
};