const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const sampleRecipes = [
  {
    title: "Classic Spaghetti Carbonara",
    description: "A traditional Italian pasta dish with eggs, cheese, and pancetta",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale",
      "4 large eggs",
      "100g Pecorino Romano cheese",
      "Black pepper",
      "Salt"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti",
      "Cut pancetta into small cubes and fry until crispy",
      "Beat eggs with grated cheese and black pepper",
      "Drain pasta, reserving 1 cup of pasta water",
      "Mix hot pasta with pancetta",
      "Remove from heat and quickly mix in egg mixture",
      "Add pasta water to reach desired consistency",
      "Serve immediately with extra cheese"
    ],
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    category: "Dinner",
    difficulty: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3"
  },
  {
    title: "Fluffy Pancakes",
    description: "Light and fluffy breakfast pancakes that melt in your mouth",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tablespoons sugar",
      "2 teaspoons baking powder",
      "1 teaspoon salt",
      "2 eggs",
      "1 3/4 cups milk",
      "1/4 cup melted butter",
      "1 teaspoon vanilla extract"
    ],
    instructions: [
      "Mix dry ingredients in a large bowl",
      "Whisk eggs, milk, melted butter, and vanilla in another bowl",
      "Pour wet ingredients into dry ingredients and mix until just combined",
      "Heat a griddle or pan over medium heat",
      "Pour 1/4 cup batter for each pancake",
      "Cook until bubbles form on surface, then flip",
      "Cook until golden brown on both sides",
      "Serve with maple syrup and butter"
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    category: "Breakfast",
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
  },
  {
    title: "Fresh Garden Salad",
    description: "A colorful and healthy salad packed with fresh vegetables",
    ingredients: [
      "2 cups mixed lettuce",
      "1 cup cherry tomatoes, halved",
      "1 cucumber, sliced",
      "1 bell pepper, diced",
      "1/4 red onion, thinly sliced",
      "1/2 cup croutons",
      "1/4 cup olive oil",
      "2 tablespoons balsamic vinegar",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Wash all vegetables thoroughly",
      "Tear lettuce into bite-sized pieces",
      "Combine all vegetables in a large bowl",
      "Mix olive oil, balsamic vinegar, salt, and pepper for dressing",
      "Toss salad with dressing just before serving",
      "Top with croutons",
      "Serve immediately"
    ],
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    category: "Lunch",
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
  },
  {
    title: "Chocolate Lava Cake",
    description: "Decadent individual chocolate cakes with a molten center",
    ingredients: [
      "4 oz dark chocolate",
      "1/2 cup butter",
      "2 eggs",
      "2 egg yolks",
      "1/4 cup sugar",
      "2 tablespoons flour",
      "Butter and cocoa powder for ramekins",
      "Vanilla ice cream for serving"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C)",
      "Butter and dust ramekins with cocoa powder",
      "Melt chocolate and butter together",
      "Beat eggs, yolks, and sugar until thick",
      "Fold melted chocolate into egg mixture",
      "Gently fold in flour",
      "Pour batter into prepared ramekins",
      "Bake for 12-14 minutes until edges are firm but center is soft",
      "Let stand 1 minute, then invert onto plates",
      "Serve immediately with ice cream"
    ],
    prepTime: 15,
    cookTime: 14,
    servings: 4,
    category: "Dessert",
    difficulty: "Hard",
    imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51"
  },
  {
    title: "Chicken Caesar Wrap",
    description: "A quick and delicious wrap filled with grilled chicken and Caesar salad",
    ingredients: [
      "2 large tortillas",
      "2 grilled chicken breasts, sliced",
      "2 cups romaine lettuce",
      "1/4 cup Caesar dressing",
      "1/4 cup parmesan cheese",
      "Croutons"
    ],
    instructions: [
      "Warm tortillas slightly",
      "Chop romaine lettuce",
      "Mix lettuce with Caesar dressing",
      "Place chicken in center of tortilla",
      "Add dressed lettuce",
      "Sprinkle with parmesan and croutons",
      "Fold sides and roll tightly",
      "Cut in half and serve"
    ],
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    category: "Lunch",
    difficulty: "Easy",
    imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipeDB');
    console.log('Connected to MongoDB');

    console.log('\nIMPORTANT: You need to update the createdBy field with your admin user ID');
    console.log('1. Create an admin account in the app first');
    console.log('2. Find the user ID in MongoDB');
    console.log('3. Replace the createdBy value below\n');

    const adminUserId = '000000000000000000000000'; 

    if (adminUserId === '000000000000000000000000') {
      console.log('Please update the adminUserId in this script before running!');
      process.exit(1);
    }

    const recipesWithUser = sampleRecipes.map(recipe => ({
      ...recipe,
      createdBy: adminUserId
    }));

    await Recipe.insertMany(recipesWithUser);
    console.log('Sample recipes added successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
