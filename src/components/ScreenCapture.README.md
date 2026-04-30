# ScreenCapture — Integration Notes

This document explains how the `ScreenCapture` React component works and how to integrate it with a backend for processing/storing screenshots.

Files
- Component: [src/components/ScreenCapture.jsx](src/components/ScreenCapture.jsx)
- Example usage in app: [src/App.jsx](src/App.jsx)

Summary
- The `ScreenCapture` component uses the Screen Capture API (`navigator.mediaDevices.getDisplayMedia`) to obtain a MediaStream for a user-selected screen/window.
- It draws a single frame from the video stream to an offscreen `canvas`, converts that to a PNG `Blob`, shows a preview (object URL), and sends the `Blob` to your backend as `multipart/form-data` with field name `screenshot`.
- By default the component posts to `http://localhost:4000/upload`. You can change the URL in the component or add a prop (recommended).

Important constraints & privacy
- Browsers require an explicit user gesture and consent to share the screen. The user must select which screen/window/tab to share; you cannot silently capture the display.
- `getDisplayMedia` requires a secure context (HTTPS) except for `localhost` during development.
- Screenshots can contain sensitive data. Always ask for explicit consent before uploading, and use HTTPS + server-side protections (authentication, short retention, redaction) in production.

Quick usage
1. Import and render the component where you want the capture UI:

```jsx
import ScreenCapture from './components/ScreenCapture';

function Page() {
  return <ScreenCapture />;
}
```

2. Default flow:
- Click `Start Capture` → choose screen/window → click `Take Screenshot` → preview appears and component sends the image to the backend.

Backend contract
- HTTP method: POST
- Path: `/upload` (component defaults to `http://localhost:4000/upload`)
- Request body: `multipart/form-data` with one file field named `screenshot` (image/png)
- Response: JSON. Suggested shape:

```json
{ "success": true, "url": "https://your.cdn/path/to/screenshot.png" }
```

Minimal Express example (index.js)

```js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + (file.originalname || 'screenshot.png'))
});

const upload = multer({ storage });
const app = express();
app.use(cors()); // configure origin to restrict in prod

app.post('/upload', upload.single('screenshot'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file received' });
  const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  return res.json({ success: true, url: publicUrl });
});

app.use('/uploads', express.static(UPLOAD_DIR));

app.listen(4000, () => console.log('screenshot server listening on http://localhost:4000'));
```

Run locally (example)

```bash
# create a tiny server folder, install deps and run
mkdir screenshot-server
cd screenshot-server
npm init -y
npm install express multer cors
# paste the snippet above into index.js
node index.js

# in another terminal run your frontend dev server (Vite/dev server):
npm install
npm run dev
```

Integration tips & improvements
- Make the upload URL configurable: accept an `uploadUrl` prop and/or `onUploadComplete` callback so you can integrate without editing the component file.
- Client-side resizing/compression: for large displays you may want to compress to JPEG via `canvas.toBlob(..., 'image/jpeg', quality)` before upload.
- UX: add upload progress, disable buttons while uploading, show success/error messages and let users retry.
- Security: never auto-upload without a clear opt-in. Consider scanning/obfuscating screenshots for PII before saving.

Debugging & browser notes
- Use `localhost` for dev to avoid HTTPS requirement.
- Chrome/Edge/Firefox support `getDisplayMedia` but UX differs. The browser will show a sharing indicator overlay while the stream is active.
- If `video.videoWidth` or `video.videoHeight` are zero, wait for the stream to be ready, or play the video element briefly before drawing to the canvas.

Next steps (suggested)
- Make the component accept `uploadUrl` and `onUploadComplete` props.
- Add optional client-side resizing/compression before upload.
- Add server-side sample code or a small starter `screenshot-server/` if you want me to scaffold one.

For the current implementation see [src/components/ScreenCapture.jsx](src/components/ScreenCapture.jsx).
