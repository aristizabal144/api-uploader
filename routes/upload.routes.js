const {Router} = require('express');
const {upload} = require('../controllers/upload.controller');
const {getFilesByHour} = require('../controllers/upload.controller');
const {getFilesByDate} = require('../controllers/upload.controller');
const {verifyFile} = require('../middlewares/verifyFile');
const router = Router();

router.post('/',verifyFile,upload);
router.get('/',getFilesByDate);
router.get('/by-hour',getFilesByHour);

module.exports = router;