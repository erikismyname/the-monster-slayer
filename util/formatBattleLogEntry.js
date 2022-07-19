export default function formatEntry({ contender, action, points }) {
    let formattedEntry;

    if (action === 'attack') {
        formattedEntry = `${contender} attacked and ` + (points ? `dealt ${points} damage.` : 'missed.');
    } else {
        formattedEntry = `${contender} ` + (points ? `healed for ${points} points.` : 'dropped his potion and couldn\'t heal.');
    }

    return {
        id: generateEntryId(),
        text: formattedEntry
    };
}

function generateEntryId() {
    return Math.random().toString(16);
}