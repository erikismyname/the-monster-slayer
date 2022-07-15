export default function formatBattleLogEntry({ target, action, points }) {
    let formattedEntry;

    if (action === 'attack') {
        formattedEntry = `${target} attacked and ` + (points ? `dealt ${points} damage.` : 'missed.')
    } else {
        formattedEntry = `${target} ` + (points ? `healed for ${points} points.` : 'dropped his potion and couldn\'t heal.');
    }

    return formattedEntry;
}