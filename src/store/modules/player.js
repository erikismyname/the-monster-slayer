import config from '@/config';
import getRandomValueBetween from '@/utils/getRandomValueBetween';
import hasSecondWind from '@/utils/hasSecondWind';

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
            state.health -= points;

            if (state.health < 0) {
                state.health = 0;
            }
        },
        INCREASE_HEALTH(state, points) {
            state.health += points;

            if (state.health > 100) {
                state.health = 100;
            }
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
        processAction({ dispatch, getters, rootGetters }, { action, isSpecialAttack }) {
            action === 'attack' ? dispatch('attack', isSpecialAttack) : dispatch('heal');

            dispatch('addEntry', {
                contender: 'Player',
                action,
                points: action === 'attack' ? rootGetters['monster/lastDamagePointsTaken'] : getters.lastHealthPointsGained
            }, { root: true });
        },
        attack({ commit }, isSpecialAttack) {
            const attackPoints = isSpecialAttack
                ? getRandomValueBetween(
                    config.PLAYER_MIN_SPECIAL_ATTACK_POINTS,
                    config.PLAYER_MAX_SPECIAL_ATTACK_POINTS
                )
                : getRandomValueBetween(
                    config.PLAYER_MIN_ATTACK_POINTS,
                    config.PLAYER_MAX_ATTACK_POINTS
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
        processDying({ getters, commit }) {
            hasSecondWind(getters.hasUsedSecondWind)
                ? commit('SET_SECOND_WIND')
                : commit('SET_WINNER', 'monster', { root: true });
        },
    }
};