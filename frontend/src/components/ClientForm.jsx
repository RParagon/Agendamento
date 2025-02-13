// frontend/src/components/ClientForm.jsx
import React, { useState, useEffect } from 'react';

function ClientForm() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [servicos, setServicos] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Buscar lista de serviços no backend
  useEffect(() => {
    fetch('/.netlify/functions/services')
      .then(res => res.json())
      .then(data => setServicos(data))
      .catch(err => console.error(err));
  }, []);

  const handleAgendar = async (e) => {
    e.preventDefault();
    setMensagem('');

    const payload = {
      nomeCliente: nome,
      telefoneCliente: telefone,
      data,
      hora,
      servico: servicoSelecionado
    };

    try {
      const response = await fetch('/.netlify/functions/agendamento', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.status === 409) {
        setMensagem(result.message); // "Horário indisponível."
      } else if (response.ok) {
        // Redirecionar para o WhatsApp
        window.location.href = result.redirectUrl;
      } else {
        setMensagem('Erro ao agendar. Tente novamente.');
      }
    } catch (err) {
      setMensagem('Erro de rede: ' + err.message);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Agendamento</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleAgendar}>
        <label>Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <br />

        <label>Telefone:
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </label>
        <br />

        <label>Data:
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </label>
        <br />

        <label>Hora:
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </label>
        <br />

        <label>Serviço:
          <select
            value={servicoSelecionado}
            onChange={(e) => setServicoSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((serv) => (
              <option key={serv._id} value={serv.nome}>
                {serv.nome}
              </option>
            ))}
          </select>
        </label>
        <br />

        <button type="submit">Agendar</button>
      </form>
    </div>
  );
}

export default ClientForm;
