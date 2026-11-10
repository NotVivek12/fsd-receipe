const express = require('express');
const { createId, readDatabase, writeDatabase } = require('../storage');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

function withCreator(recipe, database) {
  const creator = database.users.find((user) => user._id === recipe.createdBy);
  return {
    ...recipe,
    createdBy: creator ? { _id: creator._id, username: creator.username, email: creator.email } : null,
  };
}

router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    const database = await readDatabase();
    const searchText = search?.toLowerCase();
    const recipes = database.recipes
      .filter((recipe) => !category || recipe.category === category)
      .filter((recipe) => !difficulty || recipe.difficulty === difficulty)
      .filter((recipe) => !searchText
        || recipe.title.toLowerCase().includes(searchText)
        || recipe.description.toLowerCase().includes(searchText))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((recipe) => withCreator(recipe, database));

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const database = await readDatabase();
    const recipe = database.recipes.find((candidate) => candidate._id === req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(withCreator(recipe, database));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const database = await readDatabase();
    const recipe = {
      ...req.body,
      _id: createId(),
      createdBy: req.user._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    database.recipes.push(recipe);
    await writeDatabase(database);
    res.status(201).json({ message: 'Recipe created successfully', recipe: withCreator(recipe, database) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const database = await readDatabase();
    const index = database.recipes.findIndex((recipe) => recipe._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Recipe not found' });
    database.recipes[index] = {
      ...database.recipes[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    await writeDatabase(database);
    res.json({
      message: 'Recipe updated successfully',
      recipe: withCreator(database.recipes[index], database),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const database = await readDatabase();
    const remaining = database.recipes.filter((recipe) => recipe._id !== req.params.id);
    if (remaining.length === database.recipes.length) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    database.recipes = remaining;
    await writeDatabase(database);
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
