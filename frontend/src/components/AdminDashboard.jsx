// frontend/src/components/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [config, setConfig] = useState({ whatsappRedirect: '' });
  const [servicos, setServicos] = useState([]);
  const [novoServico, setNovoServico] = useState({ nome: '' });

  // Carrega config
  useEffect(() => {
    fetch('/.netlify/functions/admin')
      .then(res => res.json())
      .then(data => {
        if (data) setConfig(data);
      })
      .catch(err => console.error(err));
  }, []);

  // Carrega serviços
  useEffect(() => {
    fetch('/.netlify/functions/services')
      .then(res => res.json())
      .then(data => setServicos(data))
      .catch(err => console.error(err));
  }, []);

  const salvarConfig = () => {
    fetch('/.netlify/functions/admin', {
      method: 'POST',
      body: JSON.stringify(config),
    })
      .then(res => res.json())
      .then(data => {
        alert('Configurações salvas!');
        setConfig(data);
      })
      .catch(err => console.error(err));
  };

  const criarServico = () => {
    fetch('/.netlify/functions/services', {
      method: 'POST',
      body: JSON.stringify(novoServico),
    })
      .then(res => res.json())
      .then(data => {
        alert('Serviço criado!');
        setServicos([...servicos, data]);
        setNovoServico({ nome: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Dashboard Admin</h1>

      <section>
        <h2>Configurações</h2>
        <label>WhatsApp Redirect:
          <input
            type="text"
            value={config.whatsappRedirect || ''}
            onChange={(e) => setConfig({ ...config, whatsappRedirect: e.target.value })}
          />
        </label>
        <button onClick={salvarConfig}>Salvar Config</button>
      </section>

      <section>
        <h2>Serviços</h2>
        <ul>
          {servicos.map(s => <li key={s._id}>{s.nome}</li>)}
        </ul>
        <input
          type="text"
          value={novoServico.nome}
          onChange={(e) => setNovoServico({ nome: e.target.value })}
        />
        <button onClick={criarServico}>Adicionar Serviço</button>
      </section>
    </div>
  );
}

export default AdminDashboard;
