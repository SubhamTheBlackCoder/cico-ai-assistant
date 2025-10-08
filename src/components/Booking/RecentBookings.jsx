import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, teal } from '@mui/material/colors';

// Required for DataGrid theme overrides

const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: teal[400],
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
      
          margin: '60px',
          '@media (max-width: 768px)': {
            margin: '20px',
            fontSize: '0.8rem',
          },
          '@media (max-width: 480px)': {
            top: '110px',
            margin: '10px',
            fontSize: '0.75rem',
          },
          fontSize: '0.9rem',
          background: `linear-gradient(135deg, ${purple[900]}, ${teal[600]})`,
          color: '#fff',
        },
        columnHeaders: {
          backgroundColor: purple[900],
          color: 'purple',
          fontWeight: 'bold',
          fontSize: '1rem',
      
          '@media (max-width: 768px)': {
            fontSize: '0.9rem',
          },
          '@media (max-width: 480px)': {
            fontSize: '0.8rem',
          },
          borderBottom: `2px solid ${teal[300]}`,
        },
        row: {
          '&:nth-of-type(odd)': {
            backgroundColor: purple[700],
          },
          '&:nth-of-type(even)': {
            backgroundColor: teal[500],
          },
          '&:hover': {
            backgroundColor: teal[700],
            cursor: 'pointer',
          },
        },
        cell: {
          borderBottom: `1px solid ${teal[300]}`,
       
          '@media (max-width: 768px)': {
            padding: '8px',
          },
          '@media (max-width: 480px)': {
            padding: '6px',
          },
        },
        footerContainer: {
          backgroundColor: purple[800],
          color: '#fff',
        },
      },
    },
  },
});
const columns = [
  { field: "booking_id", headerName: "Booking ID", width: 110 },
  { field: "guestName", headerName: "Guest Name", width: 140 },
  { field: "phone", headerName: "Phone", width: 120 },
  { field: "email", headerName: "Email", width: 160 },
  { field: "nationality", headerName: "Nationality", width: 110 },
  { field: "checkin_date", headerName: "Check-in", width: 110 },
  { field: "checkout_date", headerName: "Check-out", width: 110 },
  { field: "booking_status", headerName: "Status", width: 100 },
  { field: "booking_date", headerName: "Booking Date", width: 120 },
  { field: "payment_status", headerName: "Payment Status", width: 120 },
  { field: "total_amount", headerName: "Total Amt", width: 100 },
  { field: "no_of_rooms", headerName: "Rooms", width: 80 },
  { field: "no_of_guests", headerName: "Guests", width: 80 },
  { field: "ota_name", headerName: "OTA", width: 120 },
  { field: "room_type", headerName: "Room Type", width: 120 },
  { field: "meal_plan", headerName: "Meal Plan", width: 120 },
  { field: "ratePerNight", headerName: "Rate/Night", width: 120 },
  { field: "amount_paid", headerName: "Paid", width: 100 },
  { field: "payment_mode", headerName: "Pay Mode", width: 100 }
];


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
    <div style={{ width: "100%", overflowX: "auto", marginTop: "10%" }}>
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
