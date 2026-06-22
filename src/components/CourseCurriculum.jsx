import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function CourseCurriculum() {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    {
      title: 'Fase 1: Fundamentos',
      modules: [
        'MÓDULO 1: Introducción y bienvenida',
        'MÓDULO 2: Recomendaciones clave para iniciar',
        'MÓDULO 3: Acceso a redes y grupo privado exclusivo',
        'MÓDULO 4: Conceptos fundamentales de flores',
        'MÓDULO 5: Medios compositivos y bases',
        'MÓDULO 6: Estilos occidentales clásicos',
        'MÓDULO 7: Estilos contemporáneos',
        'MÓDULO 8: Estilos modernos en tendencia',
        'MÓDULO 9: Estilos libres y experimentales',
        'MÓDULO 10: Materiales indispensables para el diseño floral'
      ]
    },
    {
      title: 'Fase 2: Preparación',
      modules: [
        'MÓDULO 11: Colorimetría avanzada para diseños florales',
        'MÓDULO 12: Cómo comprar flores y materiales al mejor precio',
        'MÓDULO 13: El cuidado profesional de la flor',
        'MÓDULO 14: El nuevo sistema en la decoración de eventos',
        'MÓDULO 15: La técnica de limpieza de las flores',
        'MÓDULO 16: Cómo abrir la flor a la perfección',
        'MÓDULO 17: Hidratación correcta de la hortensia',
        'MÓDULO 18: Cómo pintar rosas naturales de colores únicos',
        'MÓDULO 19: Cómo hidratar adecuadamente la espuma floral',
        'MÓDULO 20: Cómo hacer la mecánica segura del arreglo floral'
      ]
    },
    {
      title: 'Fase 3: Diseños Básicos',
      modules: [
        'MÓDULO 21: Diseño floral bajo para eventos de mesa',
        'MÓDULO 22: Arreglo floral para funeraria en cruz',
        'MÓDULO 23: Arreglo floral clásico triangular',
        'MÓDULO 24: Arreglo floral para auto de novios',
        'MÓDULO 25: Ramo de novia tipo Bouquet tradicional',
        'MÓDULO 26: Ramo de novia elegante en cascada',
        'MÓDULO 27: Confección de Boutonniere de novio',
        'MÓDULO 28: Arreglo floral de diseño lineal moderno',
        'MÓDULO 29: Arreglo floral comercial con flores artificiales',
        'MÓDULO 30: Arreglo floral estilizado con flores secas'
      ]
    },
    {
      title: 'Fase 4: Grandes Eventos',
      modules: [
        'MÓDULO 31: Diseño floral temático para bautizos',
        'MÓDULO 32: Diseño floral integral para bodas',
        'MÓDULO 33: Diseño floral para fiestas de quince años',
        'MÓDULO 34: Diseño floral tierno para Baby Shower',
        'MÓDULO 35: Mesa de dulces y golosinas para cumpleaños',
        'MÓDULO 36: Diseño floral solemne para iglesias',
        'MÓDULO 37: Arreglo floral para bancas de iglesia',
        'MÓDULO 38: Diseño floral para primera comunión',
        'MÓDULO 39: Elaboración de pulseras de flores (Corsage)',
        'MÓDULO 40: Diseño floral de ramo especial para damas'
      ]
    },
    {
      title: 'Fase 5: Estructuras y Negocio',
      modules: [
        'MÓDULO 41: Diademas florales en tendencia',
        'MÓDULO 42: Diseño floral en esfera colgante',
        'MÓDULO 43: Diseño floral tridimensional (3D)',
        'MÓDULO 44: Diseño floral conceptual con objeto integrado',
        'MÓDULO 45: Diseño floral con estructuras colgantes',
        'MÓDULO 46: Back de flores gigante para fotografías',
        'MÓDULO 47: Arco floral completo para ceremonias',
        'MÓDULO 48: Finanzas: Cómo sacar costos exactos',
        'MÓDULO 49: Cómo conseguir proveedores confiables y mayoristas',
        'MÓDULO 50: Cómo planificar tu negocio desde cero',
        'MÓDULO 51: Cómo enviar cotizaciones profesionales a clientes',
        'MÓDULO 52: Cómo proyectar y escalar tu negocio floral',
        'MÓDULO 53: Creación de alianzas estratégicas de negocio',
        'MÓDULO 54: Creando mi plan de ventas de alta conversión',
        'MÓDULO 55: Diseño floral ecológico (sin espuma/oasis)',
        'MÓDULO 56: Conclusiones finales y recomendaciones',
        'MÓDULO 57: Cómo acceder a tus 4 Bonus de Regalo',
        'MÓDULO 58: Cómo solicitar y descargar tu Certificado Oficial'
      ]
    }
  ];

  return (
    <div className="glass-card" style={{ padding: '20px 15px' }}>
      <div className="text-center" style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', lineHeight: '1.4' }}>El paso a paso exacto que dominarás en las próximas semanas</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
          58 lecciones dinámicas que te llevarán paso a paso desde el nivel principiante hasta el profesional.
        </p>
      </div>

      {/* Tabs list */}
      <div className="tabs-container">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Selected tab content */}
      <div style={{ marginTop: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {categories[activeTab].modules.map((mod, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px',
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid var(--primary-lavender)',
                borderRadius: '12px',
              }}
            >
              <div
                style={{
                  background: 'rgba(214, 90, 138, 0.1)',
                  color: 'var(--accent-rose)',
                  padding: '6px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1px'
                }}
              >
                <BookOpen size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-dark)', lineHeight: '1.4' }}>
                  {mod}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div
        className="text-center"
        style={{
          marginTop: '20px',
          paddingTop: '15px',
          borderTop: '1px solid var(--primary-lavender)',
          fontSize: '0.8rem',
          color: 'var(--text-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}
      >
        <CheckCircle size={14} style={{ color: 'var(--accent-rose)' }} />
        <span>Incluye soporte y actualizaciones de por vida</span>
      </div>
    </div>
  );
}
