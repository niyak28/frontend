import React, { useRef, useState, useEffect } from 'react';

export default function ScreenCapture({ autoStart = true, uploadUrl = 'http://localhost:4000/upload' }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  // Attempt to auto-start capture on mount when requested. Note: browsers may block automatic
  // display capture prompts unless triggered by a user gesture.
  useEffect(() => {
    if (!autoStart) return;
    // fire-and-forget; errors are caught inside startCapture
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

  const takeScreenshot = async () => {
    setError(null);
    const video = videoRef.current;
    if (!video) return setError('No video source available');

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return setError('Failed to capture image');
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      // stop sharing after capture
      stopCapture();

      // send to backend (if configured)
      try {
        const fd = new FormData();
        fd.append('screenshot', blob, 'screenshot.png');
        const res = await fetch(uploadUrl, { method: 'POST', body: fd });
        const data = await res.json();
        console.log('Upload response', data);
      } catch (err) {
        console.error('Upload failed', err);
      }
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

// Auto-start behavior: attempt to start capturing when component mounts if `autoStart` is true.
// Note: most browsers require a user gesture to show the screen-sharing prompt; auto-start may be blocked.
export function AutoScreenCaptureWrapper(props) {
  useEffect(() => {
    if (props.autoStart === false) return;
    // No-op; start is triggered inside the component mount via ref if possible.
  }, [props.autoStart]);

  return <ScreenCapture {...props} />;
}
