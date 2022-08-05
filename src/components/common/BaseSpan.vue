<template>
    <span>
        <slot></slot>
    </span>
</template>

<style scoped>
    .health-potions-counter {
        position: absolute;
    }

    .health-potions-counter {
        right: 0.3rem;
        top: -0.05rem;
        border-radius: 50%;
        width: 1rem;
        font-size: 0.6rem;
    }

    .healthbar-percentage {
        position: absolute;
        top: 0;
        transform: translateX(-50%);
    }

    .second-wind-badge {
        position: absolute;
        top: 0;
        right: 0;
        transform: rotateZ(45deg) translateX(2.2rem) translateY(-0.3rem);
        width: 8rem;
        padding: 0.1rem;
    }
</style>