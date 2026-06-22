import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function AccordionFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: '¿Es un pago único o hay mensualidades?',
      a: 'Es un pago único de $197 USD. No tendrás que pagar mensualidades ni costos ocultos. Al inscribirte hoy, tienes acceso ilimitado y de por vida a todo el material del curso y sus futuras actualizaciones.'
    },
    {
      q: '¿Cuánto tiempo tengo de acceso al curso?',
      a: 'El acceso es vitalicio (de por vida). Puedes ingresar a la plataforma a la hora que quieras y repasar las 58 lecciones a tu propio ritmo, adaptándolo al tiempo libre de tu agenda diaria.'
    },
    {
      q: '¿Qué pasa si no tengo habilidades manuales o creativas?',
      a: 'No te preocupes. El método de Vanessa Salazar está diseñado de forma mecánica. Aprenderás reglas de proporción, color y simetría paso a paso, de manera que puedas crear arreglos espectaculares sin necesidad de tener un "talento natural".'
    },
    {
      q: '¿Cómo funciona la garantía de devolución?',
      a: 'Cuentas con una garantía incondicional de 7 días respaldada por Hotmart. Si entras y consideras que el material no cumple tus expectativas, solicitas el reembolso y el 100% de tu dinero te será devuelto de inmediato, sin preguntas.'
    },
    {
      q: '¿Cómo recibiré el curso una vez realizado el pago?',
      a: 'De forma inmediata. Tan pronto el pago sea aprobado, recibirás un correo automático de Hotmart con tu enlace de acceso exclusivo a la plataforma de alumnos para comenzar hoy mismo.'
    }
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div style={{ margin: '30px 0' }}>
      <div className="text-center" style={{ marginBottom: '24px' }}>
        <div className="exclusive-badge" style={{ background: 'rgba(107, 45, 92, 0.1)', color: 'var(--primary-deep)', borderColor: 'var(--primary-deep)' }}>
          <HelpCircle size={14} />
          Preguntas Frecuentes
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Resuelve tus dudas</h2>
      </div>

      <div className="curriculum-accordion">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`curriculum-item ${isOpen ? 'active' : ''}`}>
              <div className={`curriculum-header ${isOpen ? 'active' : ''}`} onClick={() => toggle(idx)}>
                <h4>{faq.q}</h4>
                {isOpen ? (
                  <ChevronUp size={16} style={{ color: 'var(--accent-rose)', flexShrink: 0 }} />
                ) : (
                  <ChevronDown size={16} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
                )}
              </div>
              {isOpen && (
                <div className="curriculum-content">
                  <p style={{ textAlign: 'justify' }}>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
