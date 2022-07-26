<template>
    <div 
        class="backdrop" 
        data-testid="backdrop"
    >
    </div>
</template>

<style scoped>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: black;
        opacity: 0.5;
        z-index: 1;
    }
</style>