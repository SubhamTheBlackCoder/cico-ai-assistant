import React, { useState, useEffect } from "react";
import RecentBookings from "./RecentBookings";
import { Modal, Box, Button, TextField } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  zIndex: 1500,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backdropFilter: "blur(6px)",
  backgroundColor: "rgba(0,0,0,0.3)",
  zIndex: 1400,
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

  // Fetch bookings list -- this is optional if RecentBookings fetches internally
  const fetchBookings = () => {
    fetch("/api/recent-bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Open add modal with empty form
  const handleAddClick = () => {
    setForm(initialFormState);
    setEditMode(false);
    setOpenModal(true);
  };

  // Open modify modal with selected booking data
  const handleModifyClick = (booking) => {
    setForm(booking);
    setEditMode(true);
    setOpenModal(true);
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
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 16 }}>
        <Button variant="contained" onClick={handleAddClick}>
          Add Booking
        </Button>
      </div>

      {/* Render table, pass handleModifyClick as prop to allow Modify button callback */}
      <RecentBookings showModify={true} onModifyClick={handleModifyClick} />


      {openModal && (
        <>
          <div style={overlayStyle} onClick={handleClose}></div>
          <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box component="form" sx={modalStyle} onSubmit={handleSubmit} autoComplete="off">
              <h2>{editMode ? "Modify Booking" : "Add Booking"}</h2>
              <TextField
                label="Booking ID"
                name="booking_id"
                value={form.booking_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                disabled={editMode}
              />
              <TextField
                label="Guest Name"
                name="guestName"
                value={form.guestName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Nationality" name="nationality" value={form.nationality} onChange={handleChange} fullWidth margin="normal" />
              <TextField
                label="Check-in Date"
                name="checkin_date"
                type="date"
                value={form.checkin_date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Check-out Date"
                name="checkout_date"
                type="date"
                value={form.checkout_date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField label="Booking Status" name="booking_status" value={form.booking_status} onChange={handleChange} fullWidth margin="normal" />
              <TextField
                label="Booking Date"
                name="booking_date"
                type="date"
                value={form.booking_date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField label="Payment Status" name="payment_status" value={form.payment_status} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="OTA Channel" name="ota_id" value={form.ota_id} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Total Amount" name="total_amount" type="number" value={form.total_amount} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Number of Rooms" name="no_of_rooms" type="number" value={form.no_of_rooms} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Number of Guests" name="no_of_guests" type="number" value={form.no_of_guests} onChange={handleChange} fullWidth margin="normal" />

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
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
