import data from "../../data.json" with { type: "json" };

function chooseDifficulty(category = "general", level = "easy") {
    // Handle missing category or level by using defaults
    const selectedCategory = data[category] || data.general;
    
    switch(level) 
    {
        case 'easy':
            return selectedCategory.easy[Math.floor(Math.random() * selectedCategory.easy.length)];
        case 'medium':
            return selectedCategory.medium[Math.floor(Math.random() * selectedCategory.medium.length)];
        case 'hard':
            return selectedCategory.hard[Math.floor(Math.random() * selectedCategory.hard.length)];
        default:
            return selectedCategory.medium[Math.floor(Math.random() * selectedCategory.medium.length)];
    }
}

export default chooseDifficulty;
