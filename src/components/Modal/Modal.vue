<template>
    <div>
        <modal-backdrop v-if="!isPlayerNameSet" />

        <transition 
            name="move-fade" 
            appear
        >
            <div 
                v-if="!isPlayerNameSet" 
                class="modal" 
                data-testid="modal"
            >
                <modal-header />
                <modal-main />
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    import ModalBackdrop from "./ModalBackdrop.vue";
    import ModalHeader from "./ModalHeader.vue";
    import ModalMain from "./ModalMain.vue";

    export default {
        components: {
            ModalBackdrop,
            ModalHeader,
            ModalMain,
        },
        computed: {
            ...mapGetters({ isPlayerNameSet: "playerName" }),
        },
    };
</script>

<style scoped>
    .modal {
        position: fixed;
        top: 7rem;
        left: calc(50% - 15rem);
        width: 30rem;
        z-index: 2;
    }

    .move-fade-enter-active {
        animation: modal 500ms ease-out;
    }

    .move-fade-leave-active {
        animation: modal 500ms ease-in reverse;
    }

    @keyframes modal {
        from {
            opacity: 0;
            transform: translateY(-7rem);
        }

        to {
            transform: translateY(0);
        }
    }

    @media (max-width: 30rem) {
        .modal {
            width: 20rem;
            left: calc(50% - 10rem);
        }
    }

    @media (max-width: 20rem) {
        .modal {
            width: 15rem;
            top: 9.9rem;
            left: calc(50% - 7.5rem);
            text-align: center;
        }
    }
</style>