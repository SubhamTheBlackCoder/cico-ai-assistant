import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      marginTop: '3%'
    }}>
      <div style={{
        background: '#232b47', borderRadius: 20, width: 350, height: 650,padding: 32,
        display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 24px #0006'
      }}>
      
You said:
<div
  style={{
    position: 'relative',
    width: 210,
    height: 210,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden'
  }}
>
  {/* Background Wireframe Mesh SVG */}
  <svg
    className="mirror-animate"
    width="210"
    height="210"
    viewBox="0 0 210 210"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1
    }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="105" cy="110" rx="80" ry="95" stroke="#45c6ff" strokeWidth="2"/>
    <line x1="105" y1="20" x2="105" y2="200" stroke="#45c6ff" strokeWidth="1"/>
    <line x1="25" y1="110" x2="185" y2="110" stroke="#45c6ff" strokeWidth="1"/>
    <path d="M50,60 Q105,40 160,60" stroke="#45c6ff" strokeWidth="1"/>
    <path d="M60,140 Q105,180 150,140" stroke="#45c6ff" strokeWidth="1"/>
   
  </svg>

  {/* Main FaceID Icon SVG */}
  <svg
    className="mirror-animate"
    width="120"
    height="160"
    viewBox="0 0 60 80"
    style={{
      position: "relative",
      zIndex: 2
    }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="30" cy="38" rx="28" ry="36"
      stroke="#45c6ff" strokeDasharray="4 4" strokeWidth="2" />
    <path d="M10 40 L50 40" stroke="#45c6ff" strokeWidth="2" />
    <path d="M30 10 L30 75" stroke="#45c6ff" strokeWidth="2" />
  </svg>

<style>
{`
  .mirror-animate {
  animation: mirrorMove 2.5s ease-in-out infinite;
}
@keyframes mirrorMove {
  0%   { transform: translateX(0); }
  25%  { transform: translateX(25px); }
  50%  { transform: translateX(0); }
  75%  { transform: translateX(-25px); }
  100% { transform: translateX(0); }
}


`}
</style>


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
