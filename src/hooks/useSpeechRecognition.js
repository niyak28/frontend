// src/hooks/useSpeechRecognition.js
import { useEffect, useRef, useState } from 'react';

const useSpeechRecognition = ({ onResult, onError }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);
  const shouldRestartRef = useRef(true);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      onError?.('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;      // keep listening within a session
    recognition.interimResults = false; // only finalised text
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      onResult?.(transcript);
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        // User denied microphone — stop retrying
        shouldRestartRef.current = false;
        setIsListening(false);
        onError?.('Microphone permission denied');
      }
      // All other errors: let onend handle the restart
    };

    recognition.onstart = () => setIsListening(true);

    recognition.onend = () => {
      // Restart automatically unless we deliberately stopped
      if (shouldRestartRef.current) {
        try {
          recognition.start();
        } catch {
          // already starting — safe to ignore
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    // Kick off immediately on mount
    shouldRestartRef.current = true;
    recognition.start();

    return () => {
      shouldRestartRef.current = false;
      recognition.onend = null;
      recognition.stop();
    };
  }, []);

  return { isListening, isSupported };
};

export default useSpeechRecognition;