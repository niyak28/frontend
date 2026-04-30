import React from 'react';
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
    paddingTop: '22px', // this shifts duck + panels down slightly
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
};

const Header = () => (
  <header style={styles.header}>
    <div>
      <img
        src="/icons/logo.png"
        alt="Logo"
        style={{ width: '170px' }}
      />
    </div>

    <div style={{ display: 'flex', gap: '15px', fontSize: '24px'}}>
      <img src="/icons/full_walk.png" alt="Walk" style={{ width: '80px' }} />
      <img src="/icons/full_water.png" alt="Water" style={{ width: '80px' }} />
      <img src="/icons/full_fire.png" alt="Fire" style={{ width: '80px' }} />
    </div>
  </header>
);

const DuckArea = () => (
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

const WorkspacePanel = () => (
  <div style={styles.rightPanelContainer}>
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

    <div style={styles.bluePanel}>
      <h3>Code/Debug Panel</h3>
      <p>Paste your broken code here...</p>
    </div>

    <div style={styles.bluePanel}>
      <h3>Terminal/Command Suggestion</h3>
      <p>Try running: npm run dev</p>
    </div>
  </div>
);

export default function App() {
  return (
    <div style={styles.appContainer}>
      <div style={styles.background} />

      <Header />

      <main style={styles.mainContent}>
        <DuckArea />
        <WorkspacePanel />
      </main>
    </div>
  );
}