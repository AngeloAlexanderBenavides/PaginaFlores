import React, { useState, useEffect } from 'react';
import { 
  Lock, Play, CheckCircle2, User, Award, 
  Sparkles, ShieldCheck, Heart, Clock, 
  ChevronRight, ArrowRight, Instagram, Facebook, Phone, X, AlertCircle 
} from 'lucide-react';
import FunnelQuestionnaire from './components/FunnelQuestionnaire';
import CourseCurriculum from './components/CourseCurriculum';
import BonusShowcase from './components/BonusShowcase';
import Testimonials from './components/Testimonials';
import AccordionFAQ from './components/AccordionFAQ';

export default function App() {
  const [user, setUser] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [memberId, setMemberId] = useState('');
  const [showExitPopup, setShowExitPopup] = useState(false);

  // Check if already unlocked in this browser session
  useEffect(() => {
    const savedUser = localStorage.getItem('fsp_funnel_user');
    const savedId = localStorage.getItem('fsp_member_id');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setMemberId(savedId || 'FSP-7832');
      setUnlocked(true);
    }
  }, []);

  // Exit Intent Event Listener
  useEffect(() => {
    if (!unlocked) return;
    
    // Desktop mouseleave
    const handleMouseLeave = (e) => {
      if (e.clientY < 40) {
        const shown = sessionStorage.getItem('fsp_exit_shown');
        if (!shown) {
          setShowExitPopup(true);
          sessionStorage.setItem('fsp_exit_shown', 'true');
        }
      }
    };

    // Mobile timeout exit intent (idle/timer for 45s)
    const mobileTimeout = setTimeout(() => {
      const shown = sessionStorage.getItem('fsp_exit_shown');
      if (!shown) {
        setShowExitPopup(true);
        sessionStorage.setItem('fsp_exit_shown', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mobileTimeout);
    };
  }, [unlocked]);

  // Countdown timer logic with localStorage persistence
  useEffect(() => {
    if (!unlocked) return;

    const savedEndTime = localStorage.getItem('fsp_timer_end');
    let endTime = savedEndTime ? parseInt(savedEndTime, 10) : null;

    if (!endTime || endTime < Date.now()) {
      // Set end time to 2 hours from now and store it
      endTime = Date.now() + 7200 * 1000;
      localStorage.setItem('fsp_timer_end', String(endTime));
    }

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        // Reset to new 2 hours and save it to keep the timer active on new visit
        const newEnd = Date.now() + 7200 * 1000;
        localStorage.setItem('fsp_timer_end', String(newEnd));
        setTimeLeft(7200);
      }
    };

    updateTimer(); // initial run
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [unlocked]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: String(hrs).padStart(2, '0'),
      minutes: String(mins).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0'),
    };
  };

  const handleUnlock = (userData) => {
    const randomId = `FSP-${Math.floor(1000 + Math.random() * 9000)}`;
    localStorage.setItem('fsp_funnel_user', JSON.stringify(userData));
    localStorage.setItem('fsp_member_id', randomId);
    setUser(userData);
    setMemberId(randomId);
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkoutUrl = 'https://go.hotmart.com/K106435878N?ap=a939';
  // Montevideo, Uruguay prefix for Vanessa's support desk
  const whatsappUrl = 'https://wa.me/59899342781?text=Hola%20Vanessa%2C%20estoy%20viendo%20la%20p%C3%A1gina%20de%20The%20Flower%20Studio%20PRO%20y%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20facilidades%20de%20pago%20o%20cuotas.';

  if (!unlocked) {
    return <FunnelQuestionnaire onComplete={handleUnlock} />;
  }

  const time = formatTime(timeLeft);

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--soft-cream)', position: 'relative' }}>
      
      {/* Top Welcome Bar */}
      <div 
        style={{ 
          background: 'linear-gradient(90deg, #6b2d5c, #d65a8a)', 
          color: 'var(--white)', 
          padding: '10px 15px', 
          fontSize: '0.75rem', 
          textAlign: 'center',
          fontWeight: '500',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          flexWrap: 'wrap'
        }}
      >
        <Sparkles size={12} className="float-anim" />
        <span>¡Hola, <strong>{user.name}</strong>! ID de Miembro: <strong>{memberId}</strong> (50% Dto. Aplicado)</span>
      </div>

      {/* Main Header / Navbar */}
      <header 
        style={{ 
          padding: '15px 20px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          borderBottom: '1px solid var(--primary-lavender)',
          background: 'var(--white)'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--primary-deep)', margin: 0, letterSpacing: '0.1em' }}>
            THE FLOWER STUDIO
          </h1>
          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent-rose)', fontWeight: '600' }}>
            PRO ACADEMY
          </span>
        </div>
      </header>

      {/* Hero Cover Area */}
      <section style={{ padding: '30px 20px 20px', textAlign: 'center', background: 'var(--white)' }}>
        <div className="exclusive-badge">
          <Award size={12} style={{ color: 'var(--gold-details)' }} />
          Acceso Desbloqueado
        </div>
        
        <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-deep)', fontFamily: 'var(--font-display)', lineHeight: '1.3', marginBottom: '15px' }}>
          THE FLOWER STUDIO PRO
        </h2>
        
        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.5', marginBottom: '20px' }}>
          El nuevo sistema para convertirte en un <strong>Experto Decorador Floral</strong> y crear un negocio rentable en la industria de eventos, sin necesidad de experiencia previa.
        </p>

        {/* Main Cover Image */}
        <div style={{ position: 'relative', margin: '20px auto', maxWidth: '340px' }}>
          <img 
            src="/images/THE-FLOWER-STUDIO-PRO.jpg" 
            alt="The Flower Studio Pro" 
            className="img-responsive"
            style={{ borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}
          />
        </div>
      </section>

      {/* Gift Section (Free Video Workshop) */}
      <section style={{ padding: '25px 20px', background: '#f5ebf4', borderBottom: '1px solid var(--primary-lavender)' }}>
        <div className="glass-card" style={{ padding: '24px 20px', border: '1px solid rgba(214, 90, 138, 0.2)', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-rose)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px' }}>
            <Heart size={16} fill="currentColor" />
            <span>TU REGALO DE BIENVENIDA</span>
          </div>
          
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-deep)', marginBottom: '8px' }}>
            Video Taller: Introducción al Diseño y Cuidado Floral
          </h3>
          
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: '1.5', marginBottom: '16px' }}>
            Disfruta de la clase gratuita dictada por Vanessa Salazar incrustada a continuación para dar tus primeros pasos:
          </p>

          {/* Embedded YouTube VSL Player */}
          <div className="video-wrapper" style={{ margin: '15px 0' }}>
            <iframe
              src="https://www.youtube.com/embed/8GnGm6teFD8?rel=0&modestbranding=1"
              title="Video Taller Introducción al Diseño Floral"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', lineHeight: '1.4', margin: '10px 0 20px', fontStyle: 'italic' }}>
            🎁 Al finalizar el video taller de arriba, desplázate hacia abajo para ver el plan de estudios completo y los bonos que Vanessa tiene para ti hoy.
          </p>

          {/* Derribando Falsas Creencias (Mitos del Arte Floral) */}
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--accent-rose)', marginBottom: '10px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-deep)', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
              ¿Qué descubrirás en este Video Taller?
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.75rem', color: 'var(--text-dark)' }}>
              <p>
                🌸 <strong>Mito del Vehículo:</strong> Por qué el arte floral es el modelo de negocio más rentable, rápido de implementar y con menor necesidad de stock inicial frente a otras opciones tradicionales de trabajo.
              </p>
              <p>
                🎨 <strong>Mito del Talento:</strong> ¿No te consideras creativa o manual? Vanessa te demostrará cómo un sistema mecánico de simetría y color te permite lograr resultados profesionales desde tu primer intento.
              </p>
              <p>
                🌍 <strong>Mito del Mercado:</strong> Cómo acceder a clientes de alto poder adquisitivo (bodas, hoteles y eventos corporativos) que pagan miles de dólares en cualquier ciudad, trabajando a tiempo parcial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Investment Framing Section */}
      <section className="section-padding" style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--white)' }}>
        <h2 style={{ fontSize: '1.4rem' }}>Tu Inversión en Libertad Creativa</h2>
        
        <div className="text-justify" style={{ fontSize: '0.85rem', color: 'var(--text-dark)', lineHeight: '1.6', marginTop: '20px' }}>
          <p style={{ marginBottom: '15px' }}>
            A menudo pensamos en aprender una nueva habilidad como un gasto de dinero. Sin embargo, los negocios exitosos no se construyen adivinando, sino con un <strong>método probado</strong>.
          </p>
          <p style={{ marginBottom: '15px' }}>
            <em>The Flower Studio PRO</em> está diseñado bajo una estructura de <strong>inversión inteligente</strong>: por menos de lo que cuesta un café diario en tu rutina, adquieres un activo que te acompañará de por vida.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Aprenderás a crear más de 27 arreglos clave que te abrirán puertas en bodas, bautizos, hoteles y eventos corporativos, dándote las bases para consolidar tu propia marca y vivir de tu pasión.
          </p>
        </div>

        {/* Permission Hook */}
        <div style={{ background: '#fcf8ff', border: '1px dashed var(--primary-deep)', padding: '16px', borderRadius: '12px', margin: '20px 0', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--primary-deep)' }}>
          "Por cierto... ¿me permites mostrarte cómo puedo ayudarte a lograr esto más rápido, evitándote años de errores y miles de dólares desperdiciados?"
        </div>

        {/* Value Bullet Points */}
        <div style={{ marginTop: '25px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            'Aprende desde cero (sin necesidad de experiencia previa).',
            '58 lecciones prácticas y teóricas paso a paso.',
            'Clases en vivo periódicas con especialistas invitados.',
            'Soporte directo vía WhatsApp ante cualquier duda.',
            'Certificado oficial de finalización descargable.'
          ].map((text, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--accent-rose)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Instructor Area */}
      <section style={{ padding: '40px 20px', background: '#fcf8ff', borderTop: '1px solid var(--primary-lavender)' }}>
        <div className="text-center" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.4rem' }}>Tu Instructora</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '4px' }}>Conoce a Vanessa Salazar</p>
        </div>

        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-deep)', marginBottom: '4px' }}>Vanessa Salazar</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Diseñadora & Decoradora Floral Profesional
          </span>

          <div style={{ margin: '20px auto', maxWidth: '280px' }}>
            <img 
              src="/images/certificado-the-flower-studio-pro-2.jpg" 
              alt="Certificado Vanessa" 
              className="img-responsive"
              style={{ borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}
            />
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', lineHeight: '1.6', textAlign: 'justify' }}>
            Licenciada en Relaciones Públicas y Comunicación Organizacional, con diplomados cursados en Uruguay en <strong>Diseño de Eventos Sociales</strong>, <strong>Organización de Eventos</strong> y <strong>Wedding Planner</strong>. Vanessa ha manejado su propio negocio de decoración de eventos por más de 7 años, habiendo sido instructora y profesora en institutos de prestigio. 
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', lineHeight: '1.6', textAlign: 'justify', marginTop: '10px' }}>
            Tras haber cometido errores al inicio e invertido miles de dólares en talleres, consolidó un método y sistema de negocio rentable que hoy comparte contigo para llevarte de la mano de amateur a experto florista.
          </p>
        </div>
      </section>

      {/* Course Curriculum component */}
      <section style={{ padding: '20px 20px' }}>
        <CourseCurriculum />
      </section>

      {/* Bonuses Showcase component */}
      <section style={{ padding: '20px 20px' }}>
        <BonusShowcase />
      </section>

      {/* Testimonials component */}
      <section style={{ padding: '20px 20px', background: 'var(--white)', borderTop: '1px solid var(--primary-lavender)' }}>
        <Testimonials />
      </section>

      {/* Trust & Guarantee Area */}
      <section style={{ padding: '40px 20px', background: '#fdf9fa', borderTop: '1px solid var(--primary-lavender)', textAlign: 'center' }}>
        <div style={{ maxWidth: '100px', margin: '0 auto 15px' }}>
          <img src="/images/sellogarantia.png" alt="Garantía 7 Días" className="img-responsive" />
        </div>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-deep)', marginBottom: '8px' }}>Satisfacción 100% Garantizada</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-dark)', lineHeight: '1.6', padding: '0 10px', textAlign: 'justify' }}>
          Una vez ingreses a la plataforma de alumnos, tendrás <strong>7 días completos</strong> para evaluar la calidad del programa. Si consideras que el curso no cumple con tus expectativas, puedes solicitar el reembolso del 100% de tu dinero de forma automática y sin explicaciones a través de Hotmart.
        </p>
        
        <div style={{ maxWidth: '120px', margin: '20px auto 0' }}>
          <img src="/images/hotmart-uso-logo-azul.png" alt="Hotmart Pago Seguro" className="img-responsive" style={{ opacity: 0.8 }} />
        </div>
      </section>

      {/* Pricing and Final Call to Action */}
      <section style={{ padding: '45px 20px', background: 'linear-gradient(180deg, #ffffff 0%, #f6ebf4 100%)', textAlign: 'center', borderTop: '1px solid var(--primary-lavender)' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>¡Inscríbete Hoy!</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--accent-rose)', fontWeight: '600', marginTop: '4px' }}>
          CUPOS LIMITADOS CON EL 50% DE DESCUENTO
        </p>

        {/* Urgency countdown timer */}
        <div className="timer-container">
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Clock size={12} className="float-anim" />
            <span>El descuento de afiliado expira en:</span>
          </div>
          <div className="timer-digits">
            <div className="timer-box">
              <span className="timer-number">{time.hours}</span>
              <span className="timer-label">Horas</span>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', alignSelf: 'center', lineHeight: '1' }}>:</span>
            <div className="timer-box">
              <span className="timer-number">{time.minutes}</span>
              <span className="timer-label">Min</span>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', alignSelf: 'center', lineHeight: '1' }}>:</span>
            <div className="timer-box">
              <span className="timer-number">{time.seconds}</span>
              <span className="timer-label">Seg</span>
            </div>
          </div>
        </div>

        {/* El Value Stack (Apilamiento) */}
        <div 
          className="glass-card" 
          style={{ 
            border: '2px solid var(--gold-details)', 
            background: '#fffefb', 
            padding: '24px 20px',
            textAlign: 'left',
            maxWidth: '440px',
            margin: '25px auto'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--primary-deep)', textAlign: 'center', marginBottom: '16px', borderBottom: '2px solid var(--gold-details)', paddingBottom: '10px' }}>
            RESUMEN DE TODO LO QUE RECIBES
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {[
              { name: "Curso The Flower Studio PRO", value: "$397 USD" },
              { name: "Bono 1 (Guía de Proveedores Mayoristas)", value: "$47 USD" },
              { name: "Bono 2 (Calculadora de Costos)", value: "$37 USD" },
              { name: "Bono 3 (Grupo VIP de Soporte)", value: "$57 USD" },
              { name: "Bono 4 (Clases en vivo)", value: "$97 USD" }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifycontent: 'space-between', justifyItems: 'space-between', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '0.85rem', paddingBottom: '8px', borderBottom: '1px solid #f1e8f3', gap: '10px' }}>
                <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>
                  ⭐ {item.name}
                </span>
                <span style={{ color: 'var(--text-light)', textDecoration: 'line-through', whiteSpace: 'nowrap' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', padding: '15px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>VALOR TOTAL REAL:</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-light)', textDecoration: 'line-through', display: 'block' }}>$635 USD</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--accent-rose)', fontWeight: 'bold', display: 'block', marginTop: '5px' }}>
              TU INVERSIÓN HOY: Solo $197 USD <br /> (¡Ahorras $438 USD!)
            </span>
          </div>
        </div>

        {/* Prices stacked */}
        <div style={{ margin: '20px 0' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-deep)', fontFamily: 'var(--font-display)', margin: '5px 0' }}>
            $197 USD
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block', marginBottom: '15px' }}>
            Pago único · Acceso de por vida · Sin mensualidades
          </span>
        </div>

        {/* Pulsing Purchase Button */}
        <a 
          href={checkoutUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary pulse-btn"
          style={{ fontSize: '1rem', padding: '18px 24px', maxWidth: '380px', margin: '0 auto', letterSpacing: '0.02em' }}
        >
          Sí, quiero inscribirme por $197 de forma segura
        </a>

        {/* Order Bump Callout */}
        <div 
          style={{ 
            maxWidth: '380px', 
            margin: '15px auto 0', 
            background: '#fcf8ff', 
            border: '1px solid var(--primary-lavender)', 
            borderRadius: '12px', 
            padding: '12px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}
        >
          <AlertCircle size={16} style={{ color: 'var(--accent-rose)', flexShrink: 0, marginTop: '2px' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', lineHeight: '1.4' }}>
            <strong>💡 Tip del Miembro:</strong> En la siguiente pantalla de pago seguro podrás agregar la <em>"Guía Rápida de Contratos y Acuerdos de Flores"</em> por solo $19 USD adicionales con un solo clic.
          </span>
        </div>

        {/* Trust elements under button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-light)' }}>
            <ShieldCheck size={12} style={{ color: '#2e7d32' }} />
            <span>Pago 100% Seguro</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-light)' }}>
            <ShieldCheck size={12} style={{ color: '#2e7d32' }} />
            <span>Garantía de 7 días</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-light)' }}>
            <ShieldCheck size={12} style={{ color: '#2e7d32' }} />
            <span>Acceso Inmediato</span>
          </div>
        </div>
      </section>

      {/* FAQ Accordion component */}
      <section style={{ padding: '20px 20px' }}>
        <AccordionFAQ />
      </section>

      {/* Footer Area */}
      <footer 
        style={{ 
          padding: '30px 20px', 
          background: 'var(--primary-deep)', 
          color: 'var(--white)', 
          textAlign: 'center',
          marginTop: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <h4 style={{ color: 'var(--white)', fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '8px' }}>
          THE FLOWER STUDIO PRO
        </h4>
        <p style={{ fontSize: '0.7rem', opacity: 0.7, marginBottom: '20px', lineHeight: '1.4' }}>
          Copyright © 2026. Todos los derechos reservados.<br />
          Esta página está afiliada a la distribución de productos de Hotmart.
        </p>

        {/* Social Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <a 
            href="https://www.facebook.com/Flower-Art-494195090919840" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--white)', opacity: 0.8, transition: 'opacity var(--transition-fast)' }}
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://instagram.com/flowerartcursosflores?igshid=YmMyMTA2M2Y=" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--white)', opacity: 0.8, transition: 'opacity var(--transition-fast)' }}
          >
            <Instagram size={20} />
          </a>
        </div>
      </footer>

      {/* Exit Intent Pop-up Modal */}
      {showExitPopup && (
        <div className="exit-overlay" onClick={() => setShowExitPopup(false)}>
          <div className="exit-popup" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowExitPopup(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <div 
              style={{ 
                background: 'rgba(214, 90, 138, 0.1)', 
                color: 'var(--accent-rose)', 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <Heart size={24} fill="currentColor" />
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--primary-deep)', marginBottom: '12px' }}>
              ¡Espera! No te vayas con las manos vacías
            </h3>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-dark)', lineHeight: '1.5', marginBottom: '24px', textAlign: 'justify' }}>
              ¿El costo único de <strong>$197 USD</strong> es un obstáculo en este momento? No dejes que la economía detenga tu sueño. Vanessa puede darte facilidades o resolver tus dudas de forma personalizada por WhatsApp.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '14px 20px' }}
              >
                <Phone size={16} fill="currentColor" />
                Solicitar ayuda de pago por WhatsApp
              </a>
              <button 
                onClick={() => setShowExitPopup(false)} 
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '12px 20px' }}
              >
                Prefiero inscribirme al contado
              </button>
            </div>

            <p style={{ fontSize: '0.65rem', color: 'var(--text-light)', marginTop: '15px' }}>
              🔒 Tu conversación será 100% privada con Vanessa y su equipo.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
