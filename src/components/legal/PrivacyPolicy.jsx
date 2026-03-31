import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

export function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-content">
        <Link to="/" className="legal-back-link">Voltar ao formulário</Link>

        <h1 className="legal-title">Política de <span>Privacidade</span></h1>
        <p className="legal-updated">Última atualização: 31 de março de 2026</p>

        <section className="legal-section">
          <h2>1. Informações que Coletamos</h2>
          <p>
            Ao preencher o formulário de Acesso Antecipado, coletamos as seguintes informações pessoais:
          </p>
          <ul>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Curso em que está matriculado</li>
            <li>Série atual</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. Uso das Informações</h2>
          <p>
            As informações coletadas são utilizadas exclusivamente para:
          </p>
          <ul>
            <li>Gerenciar sua inscrição no programa de Acesso Antecipado</li>
            <li>Entrar em contato sobre atualizações e novidades do programa</li>
            <li>Personalizar a experiência com base no curso e série informados</li>
            <li>Enviar comunicações relevantes sobre o projeto</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Compartilhamento de Dados</h2>
          <p>
            Não compartilhamos, vendemos ou alugamos suas informações pessoais a terceiros. 
            Seus dados são tratados com total confidencialidade e utilizados apenas para os fins descritos nesta política.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Armazenamento e Segurança</h2>
          <p>
            Seus dados são armazenados em servidores seguros e protegidos por medidas técnicas 
            e organizacionais adequadas para prevenir acesso não autorizado, perda ou alteração 
            das informações coletadas.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Seus Direitos</h2>
          <p>Você tem o direito de:</p>
          <ul>
            <li>Solicitar acesso aos seus dados pessoais</li>
            <li>Solicitar a correção de dados incorretos</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Contato</h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato 
            conosco através do e-mail <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>murilobauck2@gmail.com</span>.
          </p>
        </section>

        <hr className="legal-divider" />
        <p className="legal-footer-note">
          Ao utilizar nosso formulário, você concorda com os termos desta Política de Privacidade.
        </p>
      </div>
    </div>
  );
}
