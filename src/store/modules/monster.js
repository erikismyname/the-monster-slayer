import config from '@/config';
import getRandomValueBetween from "@/utils/getRandomValueBetween";
import hasContenderSecondWind from '@/utils/hasContenderSecondWind';

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
            const newHealth = state.health - points;
            state.health = newHealth >= 0 ? newHealth : 0;
        },
        SET_LAST_DAMAGE_POINTS_TAKEN(state, points) {
            state.lastDamagePointsTaken = points;
        },
        REVIVE(state) {
            state.health = config.MONSTER_MAX_HEALTH_POINTS_SECOND_WIND;
            state.hasSecondWind = true;
            state.hasUsedSecondWind = true;
        },
        RESET_DATA(state) {
            state.health = config.MONSTER_MAX_HEALTH_POINTS;
            state.hasSecondWind = false;
            state.hasUsedSecondWind = false;
            state.lastDamagePointsTaken = null;
        }
    },
    actions: {
        processAction({ dispatch, commit, rootGetters }) {
            dispatch('attack');

            commit('battleLog/ADD_ENTRY', {
                contender: 'Monster',
                action: 'attack',
                points: rootGetters['player/lastDamagePointsTaken']
            }, { root: true });
        },
        attack({ commit }) {
            const attackPoints = getRandomValueBetween(
                config.MONSTER_MIN_ATTACK_POINTS,
                config.MONSTER_MAX_ATTACK_POINTS
            );

            commit('player/DECREASE_HEALTH', attackPoints, { root: true });
            commit('player/SET_LAST_DAMAGE_POINTS_TAKEN', attackPoints, { root: true });
        },
        processDying({ getters, commit }) {
            hasContenderSecondWind(getters.hasUsedSecondWind)
                ? commit('REVIVE')
                : commit('game/SET_WINNER', 'player', { root: true });
        },
    }
};