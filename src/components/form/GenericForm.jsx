import React, { useState } from 'react';
import './GenericForm.css';

export function GenericForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submit:', formData);
    alert('Formulário enviado com sucesso!');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">Entre em Contato</h2>
      
      <div className="form-group">
        <label htmlFor="name" className="form-label">Nome Completo</label>
        <input 
          type="text" 
          id="name"
          name="name"
          className="form-input" 
          placeholder="Digite seu nome"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">E-mail</label>
        <input 
          type="email" 
          id="email"
          name="email"
          className="form-input" 
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Mensagem (Tente scrollar para ver o efeito)</label>
        <textarea 
          id="message"
          name="message"
          className="form-input" 
          placeholder="Como podemos te ajudar?"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      
      {/* Some extra fields just to force a scroll in our container for demonstration */}
      <div className="form-group">
        <label htmlFor="phone" className="form-label">Telefone (Opcional)</label>
        <input 
          type="tel" 
          id="phone"
          name="phone"
          className="form-input" 
          placeholder="(11) 99999-9999"
        />
      </div>

      <button type="submit" className="form-submit-btn">
        Enviar Mensagem
      </button>
    </form>
  );
}
