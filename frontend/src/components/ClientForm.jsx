import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const ClientForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      service: '',
      date: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Obrigatório'),
      phone: Yup.string().required('Obrigatório'),
      service: Yup.string().required('Obrigatório'),
      date: Yup.date().required('Obrigatório')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/.netlify/functions/agendamento', values);
        if (response.status === 200) {
          // Redireciona para o WhatsApp com o link gerado no backend
          const { whatsappLink } = response.data;
          window.location.href = whatsappLink;
        }
      } catch (error) {
        console.error('Erro ao agendar:', error);
      }
    }
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agende seu Serviço
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nome"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Telefone"
            margin="normal"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            fullWidth
            id="service"
            name="service"
            label="Serviço"
            margin="normal"
            value={formik.values.service}
            onChange={formik.handleChange}
            error={formik.touched.service && Boolean(formik.errors.service)}
            helperText={formik.touched.service && formik.errors.service}
          />
          <TextField
            fullWidth
            id="date"
            name="date"
            label="Data do Agendamento"
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
            Agendar
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ClientForm;
