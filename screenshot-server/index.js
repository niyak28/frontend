const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + (file.originalname || 'screenshot.png'))
});

const upload = multer({ storage });
const app = express();
app.use(cors());

app.post('/upload', upload.single('screenshot'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file received' });
  const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  return res.json({ success: true, url: publicUrl });
});

app.use('/uploads', express.static(UPLOAD_DIR));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`screenshot server listening on http://localhost:${PORT}`));
