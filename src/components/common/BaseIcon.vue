<template>
    <i></i>
</template>

<style scoped>
    .fa-solid {
        font-size: 1.2rem;
    }

    .fa-solid:hover {
        cursor: pointer;
    }

    .fa-circle-arrow-up {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        font-size: 2rem;
        border-radius: 50%;
        background-color: white;
    }

    .fa-circle-arrow-up.dark {
        background-color: black;
        color: white;
    }

    .fa-circle-arrow-up:hover {
        transform: scale(1.1);
    }

    .fa-sun,
    .fa-moon {
        position: absolute;
        right: 3rem;
        padding: 0.3rem;
        border-radius: 50%;
    }

    .fa-sun:hover,
    .fa-moon:hover {
        background-color: white;
        color: black;
    }

    @media (max-width: 28.12rem) {
        .fa-sun,
        .fa-moon {
            right: 1rem;
        }
    }

    @media (max-width: 24.37rem) {
        .fa-sun,
        .fa-moon {
            right: 0;
        }
    }

    @media (max-width: 21.56rem) {
        .fa-sun,
        .fa-moon {
            right: 0.8rem;
            top: 5.5rem;
        }
    }

    @media (max-width: 16.93rem) {
        .fa-sun,
        .fa-moon {
            top: 7.8rem;
        }
    }
</style>