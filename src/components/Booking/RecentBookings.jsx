import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";


export default function RecentBookings({ data = [], showModify = false, onModifyClick, onDeleteClick}) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/recent-bookings")
      .then((res) => res.json())
      .then((data) => setRows(data))
      .catch((err) => console.error("Error fetching data", err));
  }, []);

  // Assuming you have columns already rendered as <th> with data keys

  // Styles used in your existing code for cells etc.
  const tdStyle = {
    border: "1px solid #ccc",
    padding: "10px 12px",
    fontSize: 10,
    fontFamily:"Tahoma",
    whiteSpace: "nowrap",
  };

  // add modify button style
  const modifyBtnStyle = {
    padding: "6px 10px",
    fontSize: "13px",
    cursor: "pointer",
  };

  return (
    <div style={{ width: "100%", overflowX: "auto", marginTop: "10%" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          backgroundColor: "#ffffff",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0b5ee3", color: "#fff" }}>
            <th style={{ ...tdStyle }}>Booking ID</th>
            <th style={{ ...tdStyle }}>Guest Name</th>
            <th style={{ ...tdStyle }}>Phone</th>
            <th style={{ ...tdStyle }}>Email</th>
            <th style={{ ...tdStyle }}>Nationality</th>
            <th style={{ ...tdStyle }}>Check-in</th>
            <th style={{ ...tdStyle }}>Check-out</th>
            <th style={{ ...tdStyle }}>Status</th>
            <th style={{ ...tdStyle }}>Booking Date</th>
            <th style={{ ...tdStyle }}>Payment Status</th>
             {showModify && <th style={tdStyle}>Modify/Delete</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const bgColor = index % 2 === 0 ? "#d0def5" : "#fff";
            return (
              <tr key={row.booking_id} style={{ backgroundColor: bgColor }}>
                <td style={tdStyle}>{row.booking_id}</td>
                <td style={tdStyle}>{row.guestName}</td>
                <td style={tdStyle}>{row.phone}</td>
                <td style={tdStyle}>{row.email}</td>
                <td style={tdStyle}>{row.nationality}</td>
                <td style={tdStyle}>{row.checkin_date}</td>
                <td style={tdStyle}>{row.checkout_date}</td>
                <td style={tdStyle}>{row.booking_status}</td>
                <td style={tdStyle}>{row.booking_date}</td>
                <td style={tdStyle}>{row.payment_status}</td>
                {showModify && (
                  <td style={tdStyle}>
                    <button style={modifyBtnStyle} onClick={() => onModifyClick && onModifyClick(row) } >
                      <GrUpdate style={{color: "#0b5ee3"}} />
                    </button>
                    <button style={modifyBtnStyle} onClick={() => onDeleteClick && onDeleteClick(row.booking_id)} >
                         <MdDeleteForever style={{color: "red"}} />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
