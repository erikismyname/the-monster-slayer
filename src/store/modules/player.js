import config from '@/config';
import getRandomValueBetween from '@/utils/getRandomValueBetween';
import hasContenderSecondWind from '@/utils/hasContenderSecondWind';

export default {
    namespaced: true,
    state: {
        name: null,
        health: config.PLAYER_MAX_HEALTH_POINTS,
        healthPotions: config.PLAYER_MAX_HEALTH_POTIONS_NUMBER,
        hasSecondWind: false,
        hasUsedSecondWind: false,
        lastDamagePointsTaken: null,
        lastHealthPointsGained: null
    },
    getters: {
        name(state) {
            return state.name;
        },
        health(state) {
            return state.health;
        },
        healthPotions(state) {
            return state.healthPotions;
        },
        isHealingDisabled(state) {
            return state.health === 100 || state.healthPotions === 0;
        },
        hasSecondWind(state) {
            return state.hasSecondWind;
        },
        hasUsedSecondWind(state) {
            return state.hasUsedSecondWind;
        },
        lastDamagePointsTaken(state) {
            return state.lastDamagePointsTaken;
        },
        lastHealthPointsGained(state) {
            return state.lastHealthPointsGained;
        }
    },
    mutations: {
        SET_NAME(state, name) {
            state.name = name;
        },
        DECREASE_HEALTH(state, points) {
            const newHealth = state.health - points;
            state.health = newHealth >= 0 ? newHealth : 0;
        },
        INCREASE_HEALTH(state, points) {
            const newHealth = state.health + points;
            state.health = newHealth <= 100 ? newHealth : 100;
        },
        SET_LAST_DAMAGE_POINTS_TAKEN(state, points) {
            state.lastDamagePointsTaken = points;
        },
        SET_LAST_HEALTH_POINTS_GAINED(state, points) {
            state.lastHealthPointsGained = points;
        },
        DECREASE_HEALTH_POTIONS(state) {
            state.healthPotions--;
        },
        SET_SECOND_WIND(state) {
            state.health = 50;
            state.hasSecondWind = true;
            state.hasUsedSecondWind = true;
        },
        RESET_DATA(state) {
            state.health = config.PLAYER_MAX_HEALTH_POINTS;
            state.healthPotions = config.PLAYER_MAX_HEALTH_POTIONS_NUMBER;
            state.hasSecondWind = false;
            state.hasUsedSecondWind = false;
            state.lastDamagePointsTaken = null;
            state.lastHealthPointsGained = null;
        }
    },
    actions: {
        setName({ commit }, name) {
            commit('SET_NAME', name);
        },
        processAction({ commit, dispatch, getters, rootGetters }, action) {
            switch (action) {
                case 'attack':
                    dispatch('attack');
                    break;
                case 'specialAttack':
                    dispatch('specialAttack');
                    break;
                case 'heal':
                    dispatch('heal');
                    break;
            }

            commit('battleLog/ADD_ENTRY', {
                contender: 'Player',
                action,
                points: action === 'attack' ? rootGetters['monster/lastDamagePointsTaken'] : getters.lastHealthPointsGained
            }, { root: true });
        },
        attack({ commit }) {
            const attackPoints = getRandomValueBetween(
                config.PLAYER_MIN_ATTACK_POINTS,
                config.PLAYER_MAX_ATTACK_POINTS
            );

            commit('monster/DECREASE_HEALTH', attackPoints, { root: true });
            commit('monster/SET_LAST_DAMAGE_POINTS_TAKEN', attackPoints, { root: true });
        },
        specialAttack({ commit }) {
            const attackPoints = getRandomValueBetween(
                config.PLAYER_MIN_SPECIAL_ATTACK_POINTS,
                config.PLAYER_MAX_SPECIAL_ATTACK_POINTS
            );

            commit('monster/DECREASE_HEALTH', attackPoints, { root: true });
            commit('monster/SET_LAST_DAMAGE_POINTS_TAKEN', attackPoints, { root: true });
        },
        heal({ commit }) {
            const healPoints = getRandomValueBetween(
                config.PLAYER_MIN_HEAL_POINTS,
                config.PLAYER_MAX_HEAL_POINTS
            );

            commit('INCREASE_HEALTH', healPoints);
            commit('SET_LAST_HEALTH_POINTS_GAINED', healPoints);
            commit('DECREASE_HEALTH_POTIONS');
        },
        processDying({ commit, getters }) {
            hasContenderSecondWind(getters.hasUsedSecondWind)
                ? commit('SET_SECOND_WIND')
                : commit('game/SET_WINNER', 'monster', { root: true });
        },
    }
};