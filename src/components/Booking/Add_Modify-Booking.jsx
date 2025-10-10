import React, { useState, useEffect } from "react";
import RecentBookings from "./RecentBookings";
import { Modal, Box, Button, TextField } from "@mui/material";
import { LuUserRoundPlus } from "react-icons/lu";

// Overlay Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(255,255,255,0.3)",
  zIndex: 1400,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalStyle = {
  position: "relative",
  width: 500,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
  padding: "36px 32px",
  zIndex: 1500,
};

const initialFormState = {
  booking_id: "",
  guestName: "",
  phone: "",
  email: "",
  nationality: "",
  checkin_date: "",
  checkout_date: "",
  booking_status: "",
  booking_date: "",
  payment_status: "",
  ota_id: "",
  total_amount: "",
  no_of_rooms: "",
  no_of_guests: "",
};

export default function AddModifyBooking() {
  const [bookings, setBookings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(initialFormState);

  const fetchBookings = () => {
    fetch("/api/recent-bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAddClick = () => {
    setForm(initialFormState);
    setEditMode(false);
    setOpenModal(true);
  };

  const handleModifyClick = (booking) => {
    setForm(booking);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleDeleteClick = (booking_id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    fetch("/api/delete-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_id }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const resp = await res.json();
          alert(resp.error || "Delete failed");
          throw new Error("Delete failed");
        }
        fetchBookings();
      })
      .catch(console.error);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editMode ? "/api/modify-booking" : "/api/add-booking";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        fetchBookings();
        setOpenModal(false);
      })
      .catch(console.error);
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* 🔹 Button absolutely positioned - doesn't affect table layout */}
      <div
        style={{
          position: "absolute",
          marginTop: "80px",
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <Button variant="contained" onClick={handleAddClick}>
          <LuUserRoundPlus style={{ fontSize: "22px", color: "white" }} /> Add Booking
        </Button>
      </div>

      {/* 🔹 Table centered below */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
        <RecentBookings data={bookings} showModify={true} onModifyClick={handleModifyClick} onDeleteClick={handleDeleteClick} />
      </div>

      {/* Modal */}
      {openModal && (
        <>
          <Modal open={openModal} onClose={handleClose} style={{display: "flex",
          alignItems: "center",
          justifyContent: "center",}}>
            <Box
              component="form"
              sx={{
                ...modalStyle,
                width: 700,
                
                padding: 4,
                bgcolor: "background.paper",
              }}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <h2 style={{ textAlign: "center", marginBottom: 16 }}>
                {editMode ? "Modify Booking" : "Add Booking"}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "18px",
                  marginBottom: "24px",
                }}
              >
                <TextField
                  label="Booking ID"
                  name="booking_id"
                  value={form.booking_id}
                  onChange={handleChange}
                  required
                  disabled={editMode}
                />
                <TextField
                  label="Guest Name"
                  name="guestName"
                  value={form.guestName}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Nationality"
                  name="nationality"
                  value={form.nationality}
                  onChange={handleChange}
                />
                <TextField
                  label="OTA Channel"
                  name="ota_id"
                  value={form.ota_id}
                  onChange={handleChange}
                />
                <TextField
                  label="Check-in Date"
                  name="checkin_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={form.checkin_date}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Check-out Date"
                  name="checkout_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={form.checkout_date}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Booking Status"
                  name="booking_status"
                  value={form.booking_status}
                  onChange={handleChange}
                />
                <TextField
                  label="Booking Date"
                  name="booking_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={form.booking_date}
                  onChange={handleChange}
                />
                <TextField
                  label="Payment Status"
                  name="payment_status"
                  value={form.payment_status}
                  onChange={handleChange}
                />
                <TextField
                  label="Total Amount"
                  name="total_amount"
                  type="number"
                  value={form.total_amount}
                  onChange={handleChange}
                />
                <TextField
                  label="Number of Rooms"
                  name="no_of_rooms"
                  type="number"
                  value={form.no_of_rooms}
                  onChange={handleChange}
                />
                <TextField
                  label="Number of Guests"
                  name="no_of_guests"
                  type="number"
                  value={form.no_of_guests}
                  onChange={handleChange}
                />
              </div>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button variant="contained" type="submit">
                  {editMode ? "Modify" : "Add"}
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}
