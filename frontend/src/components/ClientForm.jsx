import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ClientForm = () => {
  const initialValues = {
    name: '',
    phone: '',
    email: '',
    service: '',
    date: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    phone: Yup.string().required('Telefone é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    service: Yup.string().required('Serviço é obrigatório'),
    date: Yup.date().required('Data é obrigatória')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Chama a função serverless para criar o agendamento
      const response = await axios.post('/.netlify/functions/agendamento', values);
      if (response.data && response.data.whatsappUrl) {
        // Redireciona para o WhatsApp
        window.location.href = response.data.whatsappUrl;
      }
    } catch (error) {
      console.error('Erro ao agendar serviço:', error);
      alert('Erro ao agendar serviço. Tente novamente.');
    }
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="client-form">
      <h1>Agende seu Serviço</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <Field type="text" name="name" id="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone:</label>
              <Field type="text" name="phone" id="phone" placeholder="(xx) xxxxx-xxxx" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="service">Serviço:</label>
              <Field as="select" name="service" id="service">
                <option value="">Selecione um serviço</option>
                <option value="servico1">Serviço 1</option>
                <option value="servico2">Serviço 2</option>
                <option value="servico3">Serviço 3</option>
              </Field>
              <ErrorMessage name="service" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="date">Data:</label>
              <Field type="date" name="date" id="date" />
              <ErrorMessage name="date" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Agendar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ClientForm;
