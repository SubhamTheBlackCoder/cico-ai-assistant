import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

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
    fetch("/api/recent-bookings")
      .then(res => res.json())
      .then(data => setRows(data));
  }, []);
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={row => row.booking_id}
        pageSize={10}
      />
    </div>
  );
}
