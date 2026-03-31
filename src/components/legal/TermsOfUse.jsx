import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

export function TermsOfUse() {
  return (
    <div className="legal-page">
      <div className="legal-content">
        <Link to="/" className="legal-back-link">Voltar ao formulário</Link>

        <h1 className="legal-title">Termos de <span>Uso</span></h1>
        <p className="legal-updated">Última atualização: 31 de março de 2026</p>

        <section className="legal-section">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao preencher e enviar o formulário de Acesso Antecipado, você declara ter lido, 
            compreendido e concordado com estes Termos de Uso em sua totalidade. Caso não 
            concorde com qualquer disposição, não utilize o formulário.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Elegibilidade</h2>
          <p>
            O programa de Acesso Antecipado é destinado a estudantes regularmente matriculados 
            nos cursos técnicos listados no formulário. Ao se inscrever, você confirma que as 
            informações fornecidas são verdadeiras e que possui vínculo ativo com a instituição.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Uso do Serviço</h2>
          <p>Ao participar do programa, você concorda em:</p>
          <ul>
            <li>Fornecer informações verdadeiras e atualizadas</li>
            <li>Não utilizar o serviço para finalidades ilícitas</li>
            <li>Não compartilhar credenciais de acesso com terceiros</li>
            <li>Respeitar as diretrizes e regras do programa</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo disponibilizado através do programa — incluindo textos, imagens, 
            interfaces e materiais — é de propriedade exclusiva dos organizadores e está protegido 
            por leis de propriedade intelectual. É proibida a reprodução sem autorização prévia.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Limitação de Responsabilidade</h2>
          <p>
            O programa de Acesso Antecipado é oferecido no estado em que se encontra. Não garantimos 
            disponibilidade ininterrupta do serviço e nos reservamos o direito de modificar, suspender 
            ou encerrar o programa a qualquer momento, com aviso prévio quando possível.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Modificações nos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. As alterações 
            entram em vigor imediatamente após a publicação. O uso continuado do serviço após 
            as alterações indica sua aceitação dos novos termos.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Contato</h2>
          <p>
            Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco através 
            do e-mail disponibilizado no programa.
          </p>
        </section>

        <hr className="legal-divider" />
        <p className="legal-footer-note">
          Ao utilizar nosso formulário, você concorda com estes Termos de Uso.
        </p>
      </div>
    </div>
  );
}
