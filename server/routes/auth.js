const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createId, readDatabase, writeDatabase } = require('../storage');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

function publicUser(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const database = await readDatabase();
    const normalizedEmail = email.toLowerCase();

    if (database.users.some((user) => user.email === normalizedEmail || user.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = {
      _id: createId(),
      username,
      email: normalizedEmail,
      password: await bcrypt.hash(password, 10),
      role: role || 'user',
      createdAt: new Date().toISOString(),
    };

    database.users.push(user);
    await writeDatabase(database);

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: publicUser(user),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const database = await readDatabase();
    const user = database.users.find((candidate) => candidate.email === email.toLowerCase());

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Login successful', token, user: publicUser(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
