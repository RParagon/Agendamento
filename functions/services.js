const { saveBookingToDB, fetchAllBookings } = require('./utils/db');

async function createBooking(data) {
  // Possíveis validações adicionais podem ser aplicadas aqui
  const booking = await saveBookingToDB(data);
  return booking;
}

async function getAllBookings() {
  const bookings = await fetchAllBookings();
  return bookings;
}

module.exports = { createBooking, getAllBookings };
