import config from '@/config';
import getRandomValueBetween from "@/utils/getRandomValueBetween";

export default {
    state: {
        monsterHealth: config.MONSTER_MAX_HEALTH_POINTS,
        hasMonsterSecondWind: false,
        hasMonsterUsedSecondWind: false,
        lastMonsterDamagePointsTaken: null
    },
    getters: {
        monsterHealth(state) {
            return state.monsterHealth;
        },
        lastMonsterDamagePointsTaken(state) {
            return state.lastMonsterDamagePointsTaken;
        }
    },
    mutations: {
        ATTACK_MONSTER(state, attackPoints) {
            state.monsterHealth -= attackPoints;

            if (state.monsterHealth < 0) {
                state.monsterHealth = 0;
            }
        },
        SET_LAST_MONSTER_DAMAGE_POINTS_TAKEN(state, points) {
            state.lastMonsterDamagePointsTaken = points;
        },
        RESET_MONSTER_DATA(state) {
            state.monsterHealth = 100;
            state.hasMonsterSecondWind = false;
            state.hasMonsterUsedSecondWind = false;
            state.lastMonsterDamagePointsTaken = null;
        }
    },
    actions: {
        attackMonster({ commit }, isSpecialAttack) {
            // extract the logic for attack points in a separate func in utils?
            const attackPoints = isSpecialAttack
                ? getRandomValueBetween(
                    config.PLAYER_MIN_SPECIAL_ATTACK_POINTS,
                    config.PLAYER_MAX_SPECIAL_ATTACK_POINTS
                )
                : getRandomValueBetween(
                    config.PLAYER_MIN_ATTACK_POINTS,
                    config.PLAYER_MAX_ATTACK_POINTS
                );

            commit('ATTACK_MONSTER', attackPoints);
            commit('SET_LAST_MONSTER_DAMAGE_POINTS_TAKEN', attackPoints);
        },
        resetMonsterData({ commit }) {
            commit('RESET_MONSTER_DATA');
        }
    }
};