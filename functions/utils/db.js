// Armazenamento em memória
let bookings = [];

async function saveBookingToDB(data) {
  const newBooking = { id: bookings.length + 1, ...data };
  bookings.push(newBooking);
  return newBooking;
}

async function fetchAllBookings() {
  return bookings;
}

module.exports = { saveBookingToDB, fetchAllBookings };
