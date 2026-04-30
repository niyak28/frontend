import React from 'react';
import './App.css';

// --- STYLES ---
// Using inline styles here for structural purposes so you can see the layout immediately.
// You can move these to a separate CSS file later!
const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    // keep the content container flexible; use a separate fixed background layer
    minHeight: '100vh',
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
    padding: '8px', // slight page padding
    overflowX: 'hidden',
    overflowY: 'auto',
    color: 'white',
    fontFamily: 'LazyDog, sans-serif',
  },
  background: {
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    backgroundColor: '#3b4b6bff', // Dark blue background that fills viewport
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: '#3b4b6bff',
    height: '64px',
    boxSizing: 'border-box',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    padding: '8px',
    gap: '16px',
    width: '100%',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    /* fill remaining vertical space but never exceed viewport */
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
    flex: '2', // Takes up 2 parts of the space (wider than the duck)
    backgroundColor: '#fffbe6', // Light yellow background
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
    backgroundColor: '#fde68a', // Yellow widget box
    borderRadius: '10px',
    padding: '20px',
    color: 'black',
  },
  bluePanel: {
    flex: 1,
    backgroundColor: '#bfdbfe', // Light blue panel
    borderRadius: '10px',
    padding: '20px',
    color: 'black',
  }
};

// --- COMPONENTS ---

// 1. Header Component
const Header = () => (
  <header style={styles.header}>
    <div>
      <img src="/icons/logo.png" alt="Logo" style={{width: '170px', top: '5%' }}></img>
    </div>
    <div style={{ display: 'flex', gap: '15px', fontSize: '24px' }}>
      <img src="/icons/full_walk.png" alt="Walk" style={{ width: '80px' }} />
      <img src="/icons/full_water.png" alt="Water" style={{ width: '80px' }} />
      <img src="/icons/full_fire.png" alt="Fire" style={{ width: '80px' }} />
   </div>
  </header>
);

// 2. Left Column (Duck & Speech Bubble)
// 2. Left Column (Duck & Speech Bubble)
const DuckArea = () => (
  <div style={styles.leftColumn}>
    {/* Speech Bubble */}
    <div
      style={{
        position: 'relative',
        width: '135%',
        maxWidth: '860px',
        marginBottom: '-95px',
        transform: 'translate(-80px, 30px)',
        aspectRatio: '3 / 1.25',
        // marginBottom: '-35px',
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
          color: 'black',
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
        Quack! Describe your bug to me.
      </p>
    </div>

    {/* Goose Image */}
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <img
        src="/duck/body.png"
        alt="Goose"
        style={{
          width: '82%',
          maxWidth: '510px',
          maxHeight: '66vh',
          height: 'auto',
          objectFit: 'contain',
          marginTop: '-5px',
        }}
      />
    </div>
  </div>
);

// 3. Right Panel (The tools and widgets)
const WorkspacePanel = () => (
  <div style={styles.rightPanelContainer}>
    
    {/* Top Row: Pomodoro & Stats */}
    <div style={styles.topRowWidgets}>
      <div style={styles.widgetBox}>
        <h3>Pomodoro</h3>
        <p>25:00</p>
      </div>
      <div style={styles.widgetBox}>
        <h3>Session Stats</h3>
        <p>Bugs squashed: 0</p>
      </div>
    </div>

    {/* Middle Row: Code/Debug */}
    <div style={styles.bluePanel}>
      <h3>Code/Debug Panel</h3>
      <p>Paste your broken code here...</p>
    </div>

    {/* Bottom Row: Terminal */}
    <div style={styles.bluePanel}>
      <h3>Terminal/Command Suggestion</h3>
      <p>Try running: npm run dev</p>
    </div>

  </div>
);

// --- MAIN APP ---
// This brings all the pieces together
export default function App() {
  return (
    <div style={styles.appContainer}>
      {/* Full-viewport background layer */}
      <div style={styles.background} />
      <Header />
      <div style={styles.mainContent}>
        <DuckArea />
        <WorkspacePanel />
      </div>
    </div>
  );
}