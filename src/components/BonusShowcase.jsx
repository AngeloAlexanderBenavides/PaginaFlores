import React from 'react';
import { Gift, Check } from 'lucide-react';

export default function BonusShowcase() {
  const bonuses = [
    {
      id: 1,
      image: '/images/Bonus-1_opt_jpg.jpg',
      title: 'Bono 1: Guía de Proveedores Mayoristas',
      value: '$47 USD',
      desc: 'El listado exclusivo con contactos directos de importadores y distribuidores locales para comprar flores frescas y materiales con hasta 60% de descuento.'
    },
    {
      id: 2,
      image: '/images/Bonus-2_opt_jpg.jpg',
      title: 'Bono 2: Calculadora de Costos y Cotizaciones',
      value: '$37 USD',
      desc: 'Nuestra plantilla automatizada para calcular al centavo el costo de cada flor, tu mano de obra y el margen de ganancia antes de cotizar a un cliente.'
    },
    {
      id: 3,
      image: '/images/Bonus3.jpg',
      title: 'Bono 3: Acceso al Grupo de Soporte VIP',
      value: '$57 USD',
      desc: 'Comunidad privada en WhatsApp para resolver dudas en tiempo real directamente con Vanessa y conectar con alumnas floristas de todo el mundo.'
    },
    {
      id: 4,
      image: '/images/Bonus-4.jpg',
      title: 'Bono 4: Clases en Vivo de Actualización',
      value: '$97 USD',
      desc: 'Acceso a talleres en directo de forma periódica con especialistas invitados sobre tendencias florales globales y nuevas técnicas de conservación.'
    }
  ];

  return (
    <div style={{ margin: '30px 0' }}>
      <div className="text-center" style={{ marginBottom: '24px' }}>
        <div className="exclusive-badge" style={{ background: 'rgba(214, 90, 138, 0.1)', color: 'var(--accent-rose)', borderColor: 'var(--accent-rose)' }}>
          <Gift size={14} />
          Regalos de Acción Rápida
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', lineHeight: '1.3' }}>Actúa HOY y llévate estos 4 Regalos Premium para acelerar tu negocio</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.4' }}>
          Si te inscribes <strong>HOY</strong> al programa, te llevarás estos 4 recursos premium completamente <strong>GRATIS</strong> (Valor real acumulado de $238 USD).
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {bonuses.map((bonus) => (
          <div
            key={bonus.id}
            className="glass-card"
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            <div className="badge-float" style={{ background: 'var(--gold-details)' }}>
              GRATIS
            </div>

            {/* Bonus cover image — dimensiones explícitas para evitar CLS */}
            <div style={{ width: '150px', height: '150px', marginBottom: '15px', flexShrink: 0 }}>
              <img
                src={bonus.image}
                alt={bonus.title}
                loading="lazy"
                decoding="async"
                width="150"
                height="150"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', boxShadow: 'var(--shadow-md)', display: 'block' }}
              />
            </div>

            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: '700', color: 'var(--primary-deep)', marginBottom: '8px' }}>
              {bonus.title}
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'var(--text-light)' }}>
                Valor real: {bonus.value}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-rose)' }}>
                Hoy: $0.00
              </span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: '1.5' }}>
              {bonus.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
