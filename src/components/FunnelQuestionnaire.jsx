import React, { useState, useEffect } from 'react';
import { Flower, Mail, ArrowRight, Lock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FunnelQuestionnaire({ onComplete }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
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
      text: '¿Te genera frustración gastar en arreglos florales que se marchitan en pocos días por no conocer los secretos para cuidarlos?',
      btnText1: 'Sí, me da mucha rabia',
      btnText2: 'Quiero aprender a preservarlos'
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
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
      onComplete({ name: name || 'Invitada', email });
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
            className={`progress-dot ${step === i ? 'active' : ''} ${
              step > i ? 'completed' : ''
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
              Para enviarte tu <strong>Video Taller de Regalo</strong> y activar tu <strong>50% de Descuento Especial</strong>, ingresa tus datos a continuación:
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="form-group">
              <label htmlFor="name">Tu Nombre (opcional)</label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Ej. María Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <button type="submit" className="btn btn-primary pulse-btn" style={{ marginTop: '10px' }}>
              Obtener Video Taller + Descuento
              <ArrowRight size={18} />
            </button>
          </form>

          <p style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '15px' }}>
            🔒 Respetamos tu privacidad. Tu correo está 100% seguro.
          </p>
        </div>
      )}
    </div>
  );
}
