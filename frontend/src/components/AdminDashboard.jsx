import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Certifique-se de enviar o token de autorização conforme a implementação do backend.
        const res = await axios.get('/.netlify/functions/admin', {
          headers: {
            Authorization: 'SEU_TOKEN_AQUI'
          }
        });
        setAppointments(res.data.appointments);
      } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Painel Administrativo
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Serviço</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((apt) => (
              <TableRow key={apt._id}>
                <TableCell>{apt.name}</TableCell>
                <TableCell>{apt.phone}</TableCell>
                <TableCell>{apt.service}</TableCell>
                <TableCell>{new Date(apt.date).toLocaleDateString()}</TableCell>
                <TableCell>{apt.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
