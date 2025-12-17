const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const recipes = await Recipe.find(query)
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('createdBy', 'username email');

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      category,
      difficulty,
      imageUrl,
    } = req.body;

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      category,
      difficulty,
      imageUrl,
      createdBy: req.user._id,
    });

    await recipe.save();

    const populatedRecipe = await Recipe.findById(recipe._id)
      .populate('createdBy', 'username');

    res.status(201).json({
      message: 'Recipe created successfully',
      recipe: populatedRecipe,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      category,
      difficulty,
      imageUrl,
    } = req.body;

    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        ingredients,
        instructions,
        prepTime,
        cookTime,
        servings,
        category,
        difficulty,
        imageUrl,
        updatedAt: Date.now(),
      },
      { new: true }
    ).populate('createdBy', 'username');

    res.json({
      message: 'Recipe updated successfully',
      recipe,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
