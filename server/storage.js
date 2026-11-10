const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const dataDirectory = process.env.DATA_DIR || path.join(__dirname, 'data');
const dataFile = path.join(dataDirectory, 'database.json');

const emptyDatabase = { users: [], recipes: [] };

async function ensureDatabase() {
  await fs.mkdir(dataDirectory, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await writeDatabase(emptyDatabase);
  }
}

async function readDatabase() {
  await ensureDatabase();
  return JSON.parse(await fs.readFile(dataFile, 'utf8'));
}

async function writeDatabase(database) {
  const temporaryFile = `${dataFile}.tmp`;
  await fs.writeFile(temporaryFile, JSON.stringify(database, null, 2));
  await fs.rename(temporaryFile, dataFile);
}

function createId() {
  return crypto.randomUUID();
}

module.exports = {
  createId,
  readDatabase,
  writeDatabase,
};
