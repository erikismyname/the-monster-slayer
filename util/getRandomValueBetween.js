export default function getRandomValueBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}