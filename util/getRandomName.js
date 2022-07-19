export default function getRandomName(gender) {
    return ['Arne', 'Bjorn', 'Harald', 'Leif', 'Torsten'][Math.floor(Math.random() * 5)];
}