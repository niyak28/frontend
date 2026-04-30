import React, { useRef, useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/main';
const DEFAULT_USER_ID = 1;

export default function ScreenCapture({ autoStart = false, onResponse }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!autoStart) return;
    startCapture().catch((e) => {
      console.debug('Auto-start capture blocked or failed:', e?.message || e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  const startCapture = async () => {
    setError(null);
    try {
      const s = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: 'always' } });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        try {
          await videoRef.current.play();
        } catch (_) {
          // ignore autoplay errors
        }
      }
    } catch (err) {
      setError(err?.message || String(err));
    }
  };

  const handleImageUpload = async (imageBlob) => {
    const formData = new FormData();
    formData.append('image', new File([imageBlob], 'screenshot.png', { type: 'image/png' }));
    formData.append('user_id', DEFAULT_USER_ID);

    try {
      const res = await fetch(`${BASE_URL}/gemini-image/`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      onResponse?.(data.output);
    } catch (err) {
      console.error('Image upload error:', err);
      setError('Failed to send screenshot to backend');
    }
  };

  const takeScreenshot = async () => {
    setError(null);
    const video = videoRef.current;
    if (!video) return setError('No video source available');

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return setError('Failed to capture image');
      setPreviewUrl(URL.createObjectURL(blob));
      stopCapture();
      await handleImageUpload(blob);
    }, 'image/png', 0.95);
  };

  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  return (
    <div style={{ padding: 8 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button onClick={startCapture} disabled={!!stream}>Start Capture</button>
        <button onClick={takeScreenshot} disabled={!stream}>Take Screenshot</button>
        <button onClick={stopCapture} disabled={!stream}>Stop</button>
      </div>

      <video ref={videoRef} style={{ display: 'none' }} muted playsInline />

      {previewUrl && (
        <div>
          <h4>Preview</h4>
          <img src={previewUrl} alt="screenshot preview" style={{ maxWidth: '100%' }} />
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
