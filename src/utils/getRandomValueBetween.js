export default function getRandomValueBetween(min, max) {
    if (hasBadLuck()) {
        return 0;
    }

    return Math.floor(Math.random() * (max - min)) + min;
}

function hasBadLuck() {
    return Math.random() > 0.9 ? true : false;
}