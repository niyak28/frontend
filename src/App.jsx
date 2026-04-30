import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
    padding: '8px',
    overflowX: 'hidden',
    overflowY: 'auto',
    color: 'white',
    fontFamily: 'LazyDog, sans-serif',
  },

  background: {
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    backgroundColor: '#3B4C6C',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    paddingTop: '18px',
    backgroundColor: '#3B4C6C',
    height: '76px',
    boxSizing: 'border-box',
  },

  mainContent: {
    display: 'flex',
    flex: 1,
    padding: '8px',
    paddingTop: '22px',
    gap: '16px',
    width: '100%',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    minHeight: 'calc(100vh - 64px - 16px)',
  },

  leftColumn: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '360px',
    paddingLeft: '6px',
    paddingRight: '6px',
    minHeight: 0,
  },

  rightPanelContainer: {
    flex: '2',
    backgroundColor: '#fffbe6',
    borderRadius: '15px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    minWidth: '260px',
    height: '100%',
    minHeight: 0,
    overflowY: 'auto',
  },

  topRowWidgets: {
    display: 'flex',
    gap: '15px',
  },

  widgetBox: {
    flex: 1,
    backgroundColor: '#fde68a',
    borderRadius: '10px',
    padding: '20px',
    color: 'black',
    textAlign: 'center',
  },

  bluePanel: {
    flex: 1,
    backgroundColor: '#bfdbfe',
    borderRadius: '10px',
    padding: '20px',
    color: 'black',
    textAlign: 'center',
  },

  terminalOutput: {
    width: '100%',
    minHeight: '70%',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    resize: 'none',
    textAlign: 'center',
    color: 'black',
    fontFamily: 'LazyDog, sans-serif',
    fontSize: '22px',
    letterSpacing: '1px',
    whiteSpace: 'pre-wrap',
  },

  fakeButton: {
    marginTop: '10px',
    backgroundColor: '#fde68a',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 18px',
    fontFamily: 'LazyDog, sans-serif',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const leftoverSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(leftoverSeconds).padStart(2, '0')}`;
};

const formatTotalTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const leftoverSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(leftoverSeconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(leftoverSeconds).padStart(2, '0')}`;
};

const Header = ({ waterBreakActive, walkBreakActive, iconPrompt }) => {
  const breakActive = waterBreakActive || walkBreakActive;

  return (
    <header style={styles.header}>
      <div>
        <img src="/icons/logo.png" alt="Logo" style={{ width: '170px' }} />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          fontSize: '24px',
        }}
      >
        <div
          style={{
            minWidth: '290px',
            textAlign: 'right',
            color: 'white',
            fontFamily: 'LazyDog, sans-serif',
            fontSize: 'clamp(24px, 2.7vw, 46px)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            lineHeight: '1',
            opacity: iconPrompt ? 1 : 0,
            transition: 'opacity 0.25s ease',
            transform: 'translateY(-3px)',
          }}
        >
          {iconPrompt}
        </div>

        <img
          src={walkBreakActive ? '/icons/full_walk.png' : '/mt_icons/mt_walk.png'}
          alt="Walk"
          style={{ width: '80px' }}
        />

        <img
          src={waterBreakActive ? '/icons/full_water.png' : '/mt_icons/mt_water.png'}
          alt="Water"
          style={{ width: '80px' }}
        />

        <img
          src={breakActive ? '/mt_icons/mt_fire.png' : '/icons/full_fire.png'}
          alt="Fire"
          style={{ width: '80px' }}
        />
      </div>
    </header>
  );
};

const DuckArea = ({ beakOpen, eyeState, bubbleText, isRecording, onDuckClick }) => (
  <div style={styles.leftColumn}>
    <div
      style={{
        position: 'relative',
        width: '135%',
        maxWidth: '860px',
        marginBottom: '-95px',
        transform: 'translate(-80px, 30px)',
        aspectRatio: '3 / 1.25',
      }}
    >
      <img
        src="/icons/speech-bubble.png"
        alt="Speech bubble"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />

      <p
        style={{
          position: 'absolute',
          top: '26%',
          left: '30%',
          width: '42%',
          height: '28%',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#a3c3ffff',
          fontFamily: 'LazyDog, sans-serif',
          textTransform: 'uppercase',
          fontSize: 'clamp(20px, 2vw, 34px)',
          letterSpacing: '1px',
          fontWeight: 'normal',
          lineHeight: '1.05',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        {bubbleText}
      </p>
    </div>

    <div
      onClick={onDuckClick}
      title={isRecording ? 'Click to stop recording' : 'Click to talk to the duck'}
      style={{
        position: 'relative',
        width: '82%',
        maxWidth: '510px',
        maxHeight: '66vh',
        aspectRatio: '1 / 1.35',
        marginTop: '-5px',
        cursor: 'pointer',
        filter: isRecording ? 'drop-shadow(0 0 18px rgba(255, 80, 80, 0.85))' : 'none',
        transition: 'filter 0.2s ease',
      }}
    >
      <img
        src="/duck/body.png"
        alt="Duck body"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 1,
        }}
      />

      <img
        src={`/duck/eyes_${eyeState}.png`}
        alt="Duck eyes"
        style={{
          position: 'absolute',
          top: '12%',
          left: '85%',
          width: '5%',
          height: 'auto',
          objectFit: 'contain',
          zIndex: 2,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <img
        src={beakOpen ? '/duck/beak_open.png' : '/duck/beak_closed.png'}
        alt="Duck beak"
        style={{
          position: 'absolute',
          top: '16%',
          left: '97%',
          width: '19%',
          height: 'auto',
          objectFit: 'contain',
          zIndex: 3,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {isRecording && (
        <div
          style={{
            position: 'absolute',
            bottom: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#ff4444',
            zIndex: 4,
            animation: 'pulse 1s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  </div>
);

const PomodoroTimer = ({ onStudySessionComplete, onTimeSpentTick }) => {
  const STUDY_TIME = 2 * 60;
  const BREAK_TIME = 15;
  const ANNOUNCEMENT_TIME = 1800;

  const [mode, setMode] = useState('study');
  const [timeLeft, setTimeLeft] = useState(STUDY_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const transitionTimeout = useRef(null);

  useEffect(() => {
    if (!isRunning || announcement) return;

    const timer = setInterval(() => {
      onTimeSpentTick();

      setTimeLeft((previousTime) => {
        if (previousTime > 1) {
          return previousTime - 1;
        }

        clearInterval(timer);

        if (mode === 'study') {
          onStudySessionComplete();
          setAnnouncement('BREAK TIME!');

          transitionTimeout.current = setTimeout(() => {
            setMode('break');
            setTimeLeft(BREAK_TIME);
            setAnnouncement('');
          }, ANNOUNCEMENT_TIME);

          return 0;
        }

        setAnnouncement('STUDY TIME!');

        transitionTimeout.current = setTimeout(() => {
          setMode('study');
          setTimeLeft(STUDY_TIME);
          setAnnouncement('');
        }, ANNOUNCEMENT_TIME);

        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, mode, announcement, onStudySessionComplete, onTimeSpentTick]);

  useEffect(() => {
    return () => {
      clearTimeout(transitionTimeout.current);
    };
  }, []);

  const startPomodoro = () => {
    setIsRunning(true);
  };

  const stopPomodoro = () => {
    setIsRunning(false);
    setAnnouncement('');
    clearTimeout(transitionTimeout.current);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '9px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '40%',
          minWidth: '125px',
        }}
      >
        <img
          src="/pomo/pomo_clock.png"
          alt="Pomodoro clock"
          style={{
            width: '100%',
            display: 'block',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#5a3b1f',
            fontFamily: 'LazyDog, sans-serif',
            fontSize: announcement ? 'clamp(12px, 1.2vw, 19px)' : 'clamp(22px, 2.2vw, 36px)',
            letterSpacing: '2px',
            textAlign: 'center',
            textTransform: 'uppercase',
            transform: 'translateY(2px)',
            padding: '0 10px',
            boxSizing: 'border-box',
          }}
        >
          {announcement || formatTime(timeLeft)}
        </div>
      </div>

      <div
        style={{
          width: '15%',
          minWidth: '54px',
          maxWidth: '76px',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0px',
        }}
      >
        <button
          onClick={startPomodoro}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
            marginBottom: '-4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <img
            src="/pomo/pomo_start.png"
            alt="Start"
            style={{
              width: '100%',
              display: 'block',
            }}
          />
        </button>

        <button
          onClick={stopPomodoro}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
            marginTop: '-4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <img
            src="/pomo/pomo_end.png"
            alt="Stop"
            style={{
              width: '100%',
              display: 'block',
            }}
          />
        </button>
      </div>

      <div
        style={{
          flex: 1,
          color: '#b59b00',
          fontFamily: 'LazyDog, sans-serif',
          fontSize: 'clamp(22px, 2.15vw, 36px)',
          letterSpacing: '3px',
          lineHeight: '1.05',
          textAlign: 'center',
          textTransform: 'uppercase',
          whiteSpace: 'pre-line',
          transform: 'translateX(-2px)',
        }}
      >
        {'Pomodoro\nTimer'}
      </div>
    </div>
  );
};

const SessionStats = ({ totalTimeSpent, pomodoroSessions }) => (
  <div
    style={{
      ...styles.widgetBox,
      position: 'relative',
      padding: '8px 18px',
      minHeight: '105px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <h3
      style={{
        margin: '0 0 5px 0',
        color: '#b59b00',
        fontSize: 'clamp(20px, 1.9vw, 32px)',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        lineHeight: '1',
      }}
    >
      Session Stats
    </h3>

    <div
      style={{
        textAlign: 'left',
        paddingLeft: '52px',
        fontSize: 'clamp(15px, 1.25vw, 23px)',
        letterSpacing: '1.5px',
        lineHeight: '1.1',
        textTransform: 'uppercase',
      }}
    >
      <p style={{ margin: '3px 0' }}>
        Total time spent:{' '}
        <span style={{ color: '#b3261e' }}>{formatTotalTime(totalTimeSpent)}</span>
      </p>

      <p style={{ margin: '3px 0' }}>
        Pomodoro sessions:{' '}
        <span style={{ color: '#b3261e' }}>{pomodoroSessions}</span>
      </p>
    </div>
  </div>
);

const WorkspacePanel = ({
  terminalText,
  generateDuckResponse,
  totalTimeSpent,
  pomodoroSessions,
  incrementPomodoroSessions,
  incrementTotalTimeSpent,
}) => (
  <div style={styles.rightPanelContainer}>
    <div style={styles.topRowWidgets}>
      <div
        style={{
          ...styles.widgetBox,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '105px',
        }}
      >
        <PomodoroTimer
          onStudySessionComplete={incrementPomodoroSessions}
          onTimeSpentTick={incrementTotalTimeSpent}
        />
      </div>

      <SessionStats
        totalTimeSpent={totalTimeSpent}
        pomodoroSessions={pomodoroSessions}
      />
    </div>

    <div style={styles.bluePanel}>
      <h3>Code/Debug Panel</h3>
      <p>Paste your broken code here...</p>
    </div>

    <div style={styles.bluePanel}>
      <h3>Terminal/Command Suggestion</h3>

      <div style={styles.terminalOutput}>
        {terminalText || 'Try running: npm run dev'}
      </div>

      <button style={styles.fakeButton} onClick={generateDuckResponse}>
        Generate duck response
      </button>
    </div>
  </div>
);

export default function App() {
  const [waterBreakActive, setWaterBreakActive] = useState(false);
  const [walkBreakActive, setWalkBreakActive] = useState(false);
  const [iconPrompt, setIconPrompt] = useState('');

  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [pomodoroSessions, setPomodoroSessions] = useState(0);

  const bubbleMessages = [
    'Debug and destress with Sir Ducksworth II',
    "Keep going duckling, you've got this!",
    'What the duck!',
    "Don't let bugs bother you, you're a mighty duck afterall.",
  ];

  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [bubbleText, setBubbleText] = useState(bubbleMessages[0]);
  const [isBubbleTyping, setIsBubbleTyping] = useState(false);

  const [eyeState, setEyeState] = useState('neutral');
  const blinkTimeout = useRef(null);

  const [terminalText, setTerminalText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [beakOpen, setBeakOpen] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const typingInterval = useRef(null);
  const bubbleTypingInterval = useRef(null);
  const beakInterval = useRef(null);
  const iconPromptTimeout = useRef(null);

  const previousIconState = useRef({
    waterBreakActive: false,
    walkBreakActive: false,
    breakActive: false,
  });

  const incrementPomodoroSessions = useCallback(() => {
    setPomodoroSessions((previous) => previous + 1);
  }, []);

  const incrementTotalTimeSpent = useCallback(() => {
    setTotalTimeSpent((previous) => previous + 1);
  }, []);

  const showIconPrompt = (message) => {
    clearTimeout(iconPromptTimeout.current);

    setIconPrompt(message);

    iconPromptTimeout.current = setTimeout(() => {
      setIconPrompt('');
    }, 3000);
  };

  useEffect(() => {
    const waterInterval = setInterval(() => {
      setWaterBreakActive(true);

      setTimeout(() => {
        setWaterBreakActive(false);
      }, 10000);
    }, 30000);

    const walkInterval = setInterval(() => {
      setWalkBreakActive(true);

      setTimeout(() => {
        setWalkBreakActive(false);
      }, 15000);
    }, 50000);

    return () => {
      clearInterval(waterInterval);
      clearInterval(walkInterval);
    };
  }, []);

  useEffect(() => {
    const previous = previousIconState.current;
    const currentBreakActive = waterBreakActive || walkBreakActive;

    if (!previous.walkBreakActive && walkBreakActive) {
      showIconPrompt('Walk break?');
    } else if (!previous.waterBreakActive && waterBreakActive) {
      showIconPrompt('Hydrate!');
    } else if (previous.breakActive && !currentBreakActive) {
      showIconPrompt('Lock in!');
    }

    previousIconState.current = {
      waterBreakActive,
      walkBreakActive,
      breakActive: currentBreakActive,
    };
  }, [waterBreakActive, walkBreakActive]);

  const generateTextLetterByLetter = (fullText) => {
    clearInterval(typingInterval.current);

    setTerminalText('');
    setIsGenerating(true);

    let index = 0;

    typingInterval.current = setInterval(() => {
      setTerminalText(fullText.slice(0, index + 1));
      index += 1;

      if (index >= fullText.length) {
        clearInterval(typingInterval.current);
        setIsGenerating(false);
      }
    }, 45);
  };

  const typeBubbleTextLetterByLetter = (fullText) => {
    clearInterval(bubbleTypingInterval.current);

    setBubbleText('');
    setIsBubbleTyping(true);
    setEyeState('happy');

    let index = 0;

    bubbleTypingInterval.current = setInterval(() => {
      setBubbleText(fullText.slice(0, index + 1));
      index += 1;

      if (index >= fullText.length) {
        clearInterval(bubbleTypingInterval.current);
        setIsBubbleTyping(false);
        setEyeState('neutral');
      }
    }, 75);
  };

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      setBubbleIndex((previousIndex) => {
        const nextIndex = (previousIndex + 1) % bubbleMessages.length;
        typeBubbleTextLetterByLetter(bubbleMessages[nextIndex]);
        return nextIndex;
      });
    }, 45000);

    return () => {
      clearInterval(bubbleInterval);
    };
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (isBubbleTyping) return;

      setEyeState('closed');

      blinkTimeout.current = setTimeout(() => {
        setEyeState('neutral');
      }, 180);
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
      clearTimeout(blinkTimeout.current);
    };
  }, [isBubbleTyping]);

  const sendAudioToBackend = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    // TODO: replace with real backend URL
    const response = await fetch('/api/voice', { method: 'POST', body: formData });
    const data = await response.json();

    if (data.text) {
      generateTextLetterByLetter(data.text);
    }

    if (data.audioUrl) {
      const audio = new Audio(data.audioUrl);
      audio.play();
    }
  };

  const handleDuckClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
        setEyeState('neutral');
        typeBubbleTextLetterByLetter('Let me think...');

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        sendAudioToBackend(audioBlob).catch(console.error);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setEyeState('happy');
      typeBubbleTextLetterByLetter('Listening...');
    } catch (err) {
      console.error('Mic access denied:', err);
      typeBubbleTextLetterByLetter('Mic blocked :(');
    }
  };

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const connectSerial = async () => {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    const reader = port.readable.getReader();
    let buffer = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += new TextDecoder().decode(value);
      if (buffer.includes('DUCK')) {
        handleDuckClick();
        buffer = '';
      }
    }
  };

  const generateDuckResponse = () => {
    const response =
      'Try running npm install first, then run npm run dev again. If that fails, check whether your package.json has a dev script.';

    generateTextLetterByLetter(response);
  };

  useEffect(() => {
    const duckIsTalking = isGenerating || isBubbleTyping;

    if (duckIsTalking) {
      beakInterval.current = setInterval(() => {
        setBeakOpen((previous) => !previous);
      }, 160);
    } else {
      clearInterval(beakInterval.current);
      setBeakOpen(false);
    }

    return () => {
      clearInterval(beakInterval.current);
    };
  }, [isGenerating, isBubbleTyping]);

  useEffect(() => {
    return () => {
      clearInterval(typingInterval.current);
      clearInterval(bubbleTypingInterval.current);
      clearInterval(beakInterval.current);
      clearTimeout(blinkTimeout.current);
      clearTimeout(iconPromptTimeout.current);
    };
  }, []);

  return (
    <div style={styles.appContainer}>
      <div style={styles.background} />

      <Header
        waterBreakActive={waterBreakActive}
        walkBreakActive={walkBreakActive}
        iconPrompt={iconPrompt}
      />

      <button
        onClick={connectSerial}
        style={{ position: 'fixed', bottom: '12px', right: '12px', fontFamily: 'LazyDog, sans-serif', fontSize: '14px', padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: 0.6 }}
      >
        connect esp32
      </button>

      <main style={styles.mainContent}>
        <DuckArea
          beakOpen={beakOpen}
          eyeState={eyeState}
          bubbleText={bubbleText}
          isRecording={isRecording}
          onDuckClick={handleDuckClick}
        />

        <WorkspacePanel
          terminalText={terminalText}
          generateDuckResponse={generateDuckResponse}
          totalTimeSpent={totalTimeSpent}
          pomodoroSessions={pomodoroSessions}
          incrementPomodoroSessions={incrementPomodoroSessions}
          incrementTotalTimeSpent={incrementTotalTimeSpent}
        />
      </main>
    </div>
  );
}