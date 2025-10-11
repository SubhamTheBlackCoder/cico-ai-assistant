import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScanningScreen = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(prev => prev + 2), 30);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => navigate('/success'), 800); // slight delay to show 100%
    }
  }, [progress, navigate]);

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
          width: 120, height: 145, background: "#222a41",
          borderRadius: 70, border: "3px dashed #45c6ff", marginBottom: 24,
          overflow: "hidden", display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img
            src="/your-face-placeholder-image.jpg"
            alt="Face Scanning"
            style={{ width: 110, height: 130, objectFit: 'cover' }}
          />
        </div>
        <div style={{ width: '100%', marginTop: 20 }}>
          <div style={{
            background: '#2d3757', borderRadius: 8, height: 18, marginBottom: 12,
            width: '90%', marginLeft: '5%', overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #45c6ff 0%, #38a0f1 100%)',
              width: `${progress}%`, height: '100%', transition: 'width 0.3s'
            }} />
          </div>
          <div style={{ textAlign: 'center', color: '#45c6ff', fontWeight: 'bold' }}>
            {progress}%<br />
            <span style={{ fontWeight: 500, color: '#d2e2fa', fontSize: 15 }}>Scanning...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanningScreen;
