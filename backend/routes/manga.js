const express = require('express');
const router = express.Router();
const {
    getAllMangas,
    getMangaById,
    createManga,
    updateManga,
    deleteManga
} = require('../controllers/mangaController');

const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Public
router.get('/', getAllMangas);
router.get('/:id', getMangaById);
// routes/manga.js
router.get('/', async (req, res) => {
const mangas = await Manga.find()
res.json(mangas)
});


// Admin only
router.post('/', verifyToken, verifyAdmin, createManga);
router.put('/:id', verifyToken, verifyAdmin, updateManga);
router.delete('/:id', verifyToken, verifyAdmin, deleteManga);

module.exports = router;
