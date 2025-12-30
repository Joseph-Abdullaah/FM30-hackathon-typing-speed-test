import data from "../../data.json" with { type: "json" };

function chooseDifficulty(level) {
    switch(level) 
    {
        case 'easy':
            return data.easy[Math.floor(Math.random() * data.easy.length)];
        case 'medium':
            return data.medium[Math.floor(Math.random() * data.medium.length)];
        case 'hard':
            return data.hard[Math.floor(Math.random() * data.hard.length)];
        default:
            return data.medium[Math.floor(Math.random() * data.medium.length)];
    }
}

export default chooseDifficulty;
