import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Certifique-se de que o token admin esteja configurado no ambiente
        const response = await axios.get('/.netlify/functions/admin', {
          headers: { authorization: process.env.REACT_APP_ADMIN_TOKEN }
        });
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Administrativo</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Serviço</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.email}</td>
                <td>{booking.service}</td>
                <td>{booking.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum agendamento encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
