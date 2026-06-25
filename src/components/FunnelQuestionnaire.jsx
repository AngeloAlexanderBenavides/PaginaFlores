import React, { useState, useEffect } from 'react';
import { Flower, ArrowRight, Lock, CheckCircle2, Loader } from 'lucide-react';
import confetti from 'canvas-confetti';

const FORMSPREE_ID = 'meebqyla';

export default function FunnelQuestionnaire({ onComplete }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [petals, setPetals] = useState([]);

  // Generate floating flower petals in the background
  useEffect(() => {
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 6}s`,
      scale: 0.5 + Math.random() * 0.8,
    }));
    setPetals(newPetals);
  }, []);

  const questions = [
    {
      id: 1,
      text: '¿Sientes a veces que a tu hogar le falta esa calidez, vida y elegancia que solo los detalles de flores hermosas pueden transmitir?',
      btnText1: 'Sí, totalmente',
      btnText2: 'Siento que le falta esa chispa'
    },
    {
      id: 2,
      // Paso 2 corregido: agitar el dolor puro (sin adelantar la solución)
      text: '¿Te genera frustración invertir en hermosos arreglos florales para tu casa y ver cómo se marchitan y terminan en la basura a los pocos días?',
      btnText1: 'Sí, siento que es dinero tirado a la basura.',
      btnText2: 'Totalmente, me da mucha pena verlas morir tan rápido.'
    },
    {
      id: 3,
      text: '¿Te gustaría transformar este deseo de ver tu casa hermosa en una habilidad profesional para decorar eventos o emprender un negocio?',
      btnText1: '¡Sí, me encantaría!',
      btnText2: 'Es justo lo que busco'
    }
  ];

  const handleAnswer = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Show form
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!name.trim()) {
      setError('Por favor, ingresa tu nombre.');
      return;
    }
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setSubmitting(true);

    try {
      // Enviar a Formspree
      if (FORMSPREE_ID) {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            source: 'Funnel - The Flower Studio PRO',
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          // Si falla el envío no bloqueamos al usuario — solo registramos
          console.warn('Formspree: error al enviar lead', await response.text());
        }
      } else {
        // Sin Formspree configurado: guardar en localStorage como respaldo
        const leads = JSON.parse(localStorage.getItem('fsp_leads') || '[]');
        leads.push({ name: name.trim(), email: email.trim(), date: new Date().toISOString() });
        localStorage.setItem('fsp_leads', JSON.stringify(leads));
      }
    } catch (err) {
      // Red error: no bloqueamos al usuario
      console.warn('Formspree: error de red', err);
    } finally {
      setSubmitting(false);
    }

    // Trigger Facebook Pixel event
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Lead Descuento Flower Studio PRO',
        status: 'success'
      });
    }

    // Trigger celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#d65a8a', '#6b2d5c', '#faf7f8', '#d4af37']
    });

    // Save and complete
    setTimeout(() => {
      onComplete({ name: name.trim() || 'Invitada', email: email.trim() });
    }, 1000);
  };

  return (
    <div className="funnel-container container">
      {/* Background Floating Petals */}
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="floating-petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `scale(${petal.scale})`,
            fontSize: '18px',
            color: '#d65a8a',
            opacity: 0.15
          }}
        >
          🌸
        </span>
      ))}

      {/* Progress Dots */}
      <div className="funnel-progress">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`progress-dot ${step === i ? 'active' : ''} ${step > i ? 'completed' : ''
              }`}
          />
        ))}
      </div>

      {step <= 3 ? (
        <div className="glass-card funnel-card float-anim">
          <div className="exclusive-badge">
            <Flower size={14} className="float-anim" />
            Paso {step} de 3
          </div>

          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '1.25rem', lineHeight: '1.6', margin: '20px 0' }}>
            "{questions[step - 1].text}"
          </h2>

          <div className="btn-container">
            <button className="btn btn-primary pulse-btn" onClick={handleAnswer}>
              {questions[step - 1].btnText1}
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={handleAnswer}>
              {questions[step - 1].btnText2}
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card funnel-card">
          <div>
            <div className="exclusive-badge" style={{ borderColor: 'var(--accent-rose)', color: 'var(--accent-rose)', background: 'rgba(214, 90, 138, 0.1)' }}>
              <Lock size={12} />
              Acceso Exclusivo
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>¡Acceso Desbloqueado!</h2>
            <p className="subtitle" style={{ margin: '0 0 20px 0', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Para activar tu <strong>50% de Descuento Especial</strong> y asegurar tu cupo con todos los Bonos de Regalo, ingresa tus datos a continuación:
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="form-group">
              <label htmlFor="name">Tu Nombre</label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Ej. María Pérez"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Tu Correo Electrónico</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                required
              />
              {error && <span style={{ color: 'var(--accent-rose)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{error}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary pulse-btn"
              style={{ marginTop: '10px', opacity: submitting ? 0.75 : 1 }}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Activando...
                </>
              ) : (
                <>
                  Activar mi 50% de Descuento
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Indicadores de confianza */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '14px', justifyContent: 'center' }}>
            <CheckCircle2 size={12} style={{ color: '#2e7d32', flexShrink: 0 }} />
            <p style={{ fontSize: '0.7rem', color: 'var(--text-light)', margin: 0 }}>
              🔒 Respetamos tu privacidad. Tu correo está 100% seguro y nunca será compartido.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
