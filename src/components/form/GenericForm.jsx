import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GenericForm.css';

export function GenericForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    grade: '',
    isAccepted: false
  });

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (type !== 'checkbox') setActiveDropdown(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.isAccepted) {
      alert('Você precisa aceitar os termos para prosseguir.');
      return;
    }
    console.log('Form Submit:', formData);
    alert('Formulário enviado com sucesso!');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">Acesso <span style={{ color: 'var(--color-primary)' }}>antecipado</span></h2>
      
      <div className="form-group">
        <label htmlFor="name" className="form-label">Nome Completo</label>
        <input 
          type="text" 
          id="name"
          name="name"
          className="form-input" 
          placeholder="Digite seu nome completo"
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
        <label htmlFor="phone" className="form-label">Telefone</label>
        <input 
          type="tel" 
          id="phone"
          name="phone"
          className="form-input" 
          placeholder="(11) 99999-9999"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="course" className="form-label">Curso</label>
        <div className={`form-select-wrapper ${activeDropdown === 'course' ? 'is-open' : ''}`}>
          <select 
            id="course"
            name="course"
            className="form-input" 
            value={formData.course}
            onClick={() => setActiveDropdown(prev => prev === 'course' ? null : 'course')}
            onBlur={() => setActiveDropdown(null)}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecione um curso</option>
            <option value="Administração">Administração</option>
            <option value="Logística">Logística</option>
            <option value="Desenvolvimento de Sistemas">Desenvolvimento de Sistemas</option>
            <option value="Desenvolvimento de Sistemas - AMS">Desenvolvimento de Sistemas - AMS</option>
            <option value="Eletrônica">Eletrônica</option>
            <option value="Eletrotécnica">Eletrotécnica</option>
            <option value="Mecânica">Mecânica</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="grade" className="form-label">Série</label>
        <div className={`form-select-wrapper ${activeDropdown === 'grade' ? 'is-open' : ''}`}>
          <select 
            id="grade"
            name="grade"
            className="form-input" 
            value={formData.grade}
            onClick={() => setActiveDropdown(prev => prev === 'grade' ? null : 'grade')}
            onBlur={() => setActiveDropdown(null)}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecione sua série</option>
            <option value="1º">1º</option>
            <option value="2º">2º</option>
            <option value="3º">3º</option>
          </select>
        </div>
      </div>

      <div className="form-group-checkbox">
        <input 
          type="checkbox" 
          id="isAccepted" 
          name="isAccepted"
          checked={formData.isAccepted}
          onChange={handleChange}
          required
        />
        <label htmlFor="isAccepted">
          Eu li e aceito a <Link to="/privacidade" className="form-legal-link">Política de Privacidade</Link> e os <Link to="/termos" className="form-legal-link">Termos de Uso</Link>
        </label>
      </div>

      <button type="submit" className="form-submit-btn" disabled={!formData.isAccepted}>
        Aplicar para demo
      </button>

    </form>
  );
}
