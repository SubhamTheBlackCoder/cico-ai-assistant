import React from 'react';

const SuccessScreen = () => {
  // Demo data, replace with your backend/user data as needed.
  const user = {
    name: "John Smith",
    empID: "OC-Prm-12004",
    designation: "Manager",
    entry: "9:54 AM",
    exit: "--PM",
    photo: "/your-user-photo.jpg",
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        background: '#232b47', borderRadius: 20, width: 300, padding: 32,
        display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 24px #0006'
      }}>
        <div style={{ fontSize: 44, marginBottom: 10 }}>👍</div>
        <div style={{
          color: '#45c6ff', fontWeight: 'bold', fontSize: 20,
          marginBottom: 4, textAlign: 'center'
        }}>Successful!</div>
        <div style={{
          color: '#fff', fontWeight: 500, fontSize: 13,
          marginBottom: 22, textAlign: 'center'
        }}>ID Confirmed. You may Enter.</div>
        <div style={{
          background: '#2a355b', borderRadius: '50%', width: 72, height: 72, marginBottom: 18,
          display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid #45c6ff"
        }}>
          <img src={user.photo} alt={user.name}
            style={{
              width: 64, height: 64, borderRadius: "50%", objectFit: 'cover'
            }}
          />
        </div>
        <div style={{ color: '#49c1ff', fontWeight: 700, fontSize: 20 }}>{user.name}</div>
        <div style={{ width: "100%", marginTop: 18 }}>
          <div style={{ color: "#bacff4", fontSize: 14, fontWeight: 400 }}>Employee ID: <span style={{ color: "#45c6ff" }}>{user.empID}</span></div>
          <div style={{ color: "#bacff4", fontSize: 14, fontWeight: 400 }}>Designation: <span style={{ color: "#45c6ff" }}>{user.designation}</span></div>
          <div style={{ color: "#bacff4", fontSize: 14, fontWeight: 400 }}>Enter: <span style={{ color: "#45c6ff" }}>{user.entry}</span></div>
          <div style={{ color: "#bacff4", fontSize: 14, fontWeight: 400 }}>Exit: <span style={{ color: "#45c6ff" }}>{user.exit}</span></div>
        </div>
        <div style={{
          color: "#6e8bbf", fontSize: 10, marginTop: 18, textAlign: 'center'
        }}>
          Copyright © 2024 OneClick IT Consultancy. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
