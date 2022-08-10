export default function formatEntry({ contender, action, points }) {
    const formattedEntry = action === 'heal'
        ? `${contender} ${(points ? `healed for ${points} points` : 'dropped his potion and couldn\'t heal')}.`
        : `${contender} attacked and ${(points ? `dealt ${points} damage` : 'missed')}.`;

    return {
        id: generateEntryId(),
        text: formattedEntry
    };
}

function generateEntryId() {
    return Math.random().toString(16);
}