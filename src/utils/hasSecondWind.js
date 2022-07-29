export default function hasSecondWind(hasUsedSecondWind) {
    return !hasUsedSecondWind && Math.random() > 0.5;
};