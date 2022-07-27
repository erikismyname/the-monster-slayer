import config from '@/config';
import getRandomValueBetween from '@/utils/getRandomValueBetween';
// namespace modules?
export default {
    state: {
        playerName: null,
        playerHealth: config.PLAYER_MAX_HEALTH_POINTS,
        playerHealthPotions: config.PLAYER_HEALTH_POTIONS_NUMBER,
        hasPlayerSecondWind: false,
        hasPlayerUsedSecondWind: false,
        lastPlayerDamagePointsTaken: null,
        lastPlayerHealthPointsGained: null
    },
    getters: {
        playerName(state) {
            return state.playerName;
        },
        playerHealth(state) {
            return state.playerHealth;
        },
        playerHealthPotions(state) {
            return state.playerHealthPotions
        },
        isPlayerHealthDisabled(state) {
            return state.playerHealth === 100 || state.playerHealthPotions === 0;
        },
        lastPlayerDamagePointsTaken(state) {
            return state.lastPlayerDamagePointsTaken;
        },
        lastPlayerHealthPointsGained(state) {
            return state.lastPlayerHealthPointsGained;
        }
    },
    mutations: {
        SET_PLAYER_NAME(state, playerName) {
            state.playerName = playerName;
        },
        ATTACK_PLAYER(state, attackPoints) {
            state.playerHealth -= attackPoints;

            if (state.playerHealth < 0) {
                state.playerHealth = 0;
            }
        },
        HEAL_PLAYER(state, healPoints) {
            state.playerHealth += healPoints;

            if (state.playerHealth > 100) {
                state.playerHealth = 100;
            }
        },
        SET_LAST_PLAYER_DAMAGE_POINTS_TAKEN(state, points) {
            state.lastPlayerDamagePointsTaken = points;
        },
        SET_LAST_PLAYER_HEALTH_POINTS_GAINED(state, points) {
            state.lastPlayerHealthPointsGained = points;
        },
        DECREMENT_PLAYER_HEALTH_POTIONS(state) {
            state.playerHealthPotions--;
        },
        RESET_PLAYER_DATA(state) {
            state.playerHealth = 100;
            state.playerHealthPotions = config.PLAYER_HEALTH_POTIONS_NUMBER;
            state.hasPlayerSecondWind = false;
            state.hasPlayerUsedSecondWind = false;
            state.lastPlayerDamagePointsTaken = null;
            state.lastPlayerHealthPointsGained = null;
        }
    },
    actions: {
        setPlayerName({ commit }, playerName) {
            commit('SET_PLAYER_NAME', playerName);
        },
        attackPlayer({ commit }) {
            const attackPoints = getRandomValueBetween(
                config.MONSTER_MIN_ATTACK_POINTS,
                config.MONSTER_MAX_ATTACK_POINTS
            );

            commit('ATTACK_PLAYER', attackPoints);
            commit('SET_LAST_PLAYER_DAMAGE_POINTS_TAKEN', attackPoints);
        },
        healPlayer({ commit }) {
            const healPoints = getRandomValueBetween(
                config.PLAYER_MIN_HEAL_POINTS,
                config.PLAYER_MAX_HEAL_POINTS
            );

            commit('HEAL_PLAYER', healPoints);
            commit('DECREMENT_PLAYER_HEALTH_POTIONS');
            commit('SET_LAST_PLAYER_HEALTH_POINTS_GAINED', healPoints);
        },
        resetPlayerData({ commit }) {
            commit('RESET_PLAYER_DATA');
        }
    }
};