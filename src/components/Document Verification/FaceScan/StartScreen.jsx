import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        background: '#232b47', borderRadius: 20, width: 300, padding: 32,
        display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 24px #0006'
      }}>
        <div style={{
          background: '#162554', borderRadius: '50%', width: 105, height: 105,
          display: "flex", alignItems: 'center', justifyContent: 'center', marginBottom: 20
        }}>
          <svg width="60" height="80" fill="none" viewBox="0 0 60 80">
            <ellipse cx="30" cy="38" rx="28" ry="36"
              stroke="#45c6ff" strokeDasharray="4 4" strokeWidth="2" />
            <path d="M10 40 L50 40" stroke="#45c6ff" strokeWidth="2" />
            <path d="M30 10 L30 75" stroke="#45c6ff" strokeWidth="2" />
          </svg>
        </div>
        <h2 style={{ color: '#fff', marginBottom: 0 }}>Face<span style={{ color: '#45c6ff' }}>ID</span></h2>
        <p style={{ color: '#d2e2fa', textAlign: 'center', margin: '16px 0 24px' }}>
          FaceID is a facial recognition App which detects person through facial recognition and shows stored information.
        </p>
        <button
          style={{
            width: '100%', padding: '12px', borderRadius: 8, border: 'none',
            background: 'linear-gradient(90deg, #45c6ff 0%, #38a0f1 100%)', color: '#fff', fontWeight: 700, fontSize: 16,
            cursor: 'pointer', marginTop: 16
          }}
          onClick={() => navigate('/scan')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
