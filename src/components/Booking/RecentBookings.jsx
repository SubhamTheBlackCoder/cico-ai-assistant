import React, { useEffect, useState } from "react";

export default function RecentBookings() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://10.116.20.114:5000/api/recent-bookings")
      .then((res) => res.json())
      .then((data) => setRows(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const columns = [
    "Booking ID",
    "Guest Name",
    "Phone",
    "Email",
    "Nationality",
    "Check-in",
    "Check-out",
    "Status",
    "Booking Date",
    "Payment Status",
    "Total Amt",
    "Rooms",
    "Guests",
    "OTA",
    "Room Type",
    "Meal Plan",
    "Rate/Night",
    "Paid",
    "Pay Mode",
  ];

  return (
    <div style={{ width: "100%", overflowX: "auto", marginTop: "100px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          backgroundColor: "#ffffff",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0b5ee3", color: "#fff" }}>
            {columns.map((col, index) => (
              <th
                key={index}
                style={{
                  border: "1px solid black",
                  padding: "10px 12px",        // ✅ cell spacing
                  textAlign: "left",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.booking_id}
              style={{
                backgroundColor: index % 2 === 0 ? "#d0def5" : "#fff",border: "1px solid black",  // ✅ striped rows
              }}
            >
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
              <td style={tdStyle}>{row.total_amount}</td>
              <td style={tdStyle}>{row.no_of_rooms}</td>
              <td style={tdStyle}>{row.no_of_guests}</td>
              <td style={tdStyle}>{row.ota_name}</td>
              <td style={tdStyle}>{row.room_type}</td>
              <td style={tdStyle}>{row.meal_plan}</td>
              <td style={tdStyle}>{row.ratePerNight}</td>
              <td style={tdStyle}>{row.amount_paid}</td>
              <td style={tdStyle}>{row.payment_mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ✅ Common cell style
const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px 12px",
  fontSize: "13px",
  whiteSpace: "nowrap",
};
