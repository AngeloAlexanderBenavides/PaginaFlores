import React from 'react';
import { Star, MessageCircle } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      author: 'Julieta M.',
      role: 'Emprendedora Independiente',
      avatar: '/images/Diseno-sin-titulo-22.jpg',
      stars: 5,
      text: 'Esta experiencia en este curso ha sido muy gratificante, he aprendido como realizar varios arreglos para eventos como centros de mesa, gracias a la profesora Vanessa por su apoyo y por enseñarnos de manera muy profesional, también aprendí a como tener un negocio, manejar mis clientes, sacar costos y mucho más, les recomiendo al 100%.',
      creationImage: '/images/2.jpg'
    },
    {
      id: 2,
      author: 'Jhon B.',
      role: 'Diseñador Floral en Hotel',
      avatar: '/images/testimonio_flower_pro-1.jpg',
      stars: 5,
      text: 'Es un curso donde se aprende las herramientas suficientes para realizar varios arreglos para distintos tipos de eventos. La explicación es excelente y el paso a paso muy sencillo y claro. Gracias a este curso estoy trabajando en un hotel realizando diseños florales para eventos, me encanta lo que hago.',
      creationImage: '/images/1.jpg'
    },
    {
      id: 3,
      author: 'Charlotte',
      role: 'Decoradora de Eventos Sociales',
      avatar: '/images/testimonio_flower_pro.jpg',
      stars: 5,
      text: 'Gracias Vanessa, que sigas siendo motivo de inspiración para muchas mujeres y puedan emprender exitosamente gracias a tu conocimiento que nos compartes, super feliz por haber adquirido este curso y poder decorar para eventos, muchos éxitos y bendiciones.',
      creationImage: '/images/3.jpg'
    }
  ];

  return (
    <div style={{ margin: '30px 0' }}>
      <div className="text-center" style={{ marginBottom: '24px' }}>
        <div className="exclusive-badge" style={{ background: 'rgba(107, 45, 92, 0.1)', color: 'var(--primary-deep)', borderColor: 'var(--primary-deep)' }}>
          <MessageCircle size={14} />
          Prueba Social
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Historias de Éxito</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: '1.4' }}>
          Mira lo que nuestras alumnas y alumnos han logrado tras completar las lecciones y aplicar nuestro método de trabajo.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {reviews.map((rev) => (
          <div key={rev.id} className="testimonial-card">
            <div className="testimonial-header">
              <img
                src={rev.avatar}
                alt={rev.author}
                className="testimonial-avatar"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop';
                }}
              />
              <div className="testimonial-info">
                <h4>{rev.author}</h4>
                <span>{rev.role}</span>
                <div className="stars">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', lineHeight: '1.6', fontStyle: 'italic', textAlign: 'justify', marginBottom: '15px' }}>
              "{rev.text}"
            </p>

            {rev.creationImage && (
              <div style={{ marginTop: '12px', borderTop: '1px solid var(--primary-lavender)', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', display: 'block', marginBottom: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  📸 Arreglo diseñado por {rev.author}:
                </span>
                <img
                  src={rev.creationImage}
                  alt={`Diseño de ${rev.author}`}
                  style={{
                    width: '100%',
                    maxHeight: '260px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
