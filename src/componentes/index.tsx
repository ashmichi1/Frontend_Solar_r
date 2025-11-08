import { useState } from "react";
import { Link } from "react-router-dom";
import '../index.css'



type RenewableEnergy = {
  key: string;
  title: string;
  img: string;
  description: string;
  background?: string;
};

const renewableData: RenewableEnergy[] = [
  {
    key: 'eolica',
    title: 'Eólica',
    img: '/eolica.jpeg',
    description: `Es la que aprovecha la fuerza del viento para mover aerogeneradores y producir electricidad.
    En Colombia hay un gran potencial en La Guajira (vientos constantes y fuertes). Proyectos como Jepírachi y nuevos parques eólicos buscan diversificar la matriz eléctrica y reducir dependencia de hidroeléctricas.`,
  },
  {
    key: 'solar',
    title: 'Solar',
    img: '/solar.jpg',
    description: `Usa la radiación del sol para generar electricidad (fotovoltaica) o calor (solar térmica).
    En Colombia, con su ubicación ecuatorial, hay altos niveles de radiación solar todo el año, especialmente en regiones como La Guajira, Cesar, Meta y el altiplano cundiboyacense. Es clave para electrificar zonas no interconectadas y mejorar la seguridad energética.`,
  },
  {
    key: 'hidroelectrica',
    title: 'Hidroeléctrica',
    img: '/hidroelectrica.jpg',
    description: `Se obtiene del agua en movimiento (ríos, represas).
    Es la principal fuente de electricidad en Colombia (alrededor del 65–70 % de la generación). Aunque es limpia en emisiones, depende del clima y puede causar impactos sociales y ambientales si no se gestiona bien. Se está complementando con otras renovables para mayor resiliencia.`,
  },
  {
    key: 'geotermica',
    title: 'Geotérmica',
    img: '/geotermica.jpg',
    description: `Aprovecha el calor interno de la Tierra para producir electricidad o calefacción.
    En Colombia existe potencial en zonas volcánicas del cinturón andino (como el Volcán Nevado del Ruiz). Aún está en fase exploratoria, pero podría ser una fuente constante y confiable.`,
  },
  {
    key: 'biomasa',
    title: 'Biomasa',
    img: '/biomasa.webp',
    description: `Consiste en usar residuos orgánicos (agrícolas, forestales, urbanos) para producir calor, electricidad o biocombustibles.
    En Colombia hay potencial enorme por la agroindustria (caña, palma, café, arroz) y los residuos sólidos. Ayuda a reducir desechos, generar empleo rural y diversificar la matriz energética.`,
  },
  {
    key: 'biogas',
    title: 'Biogás',
    img: '/biogas.jpg',
    description: `El biogás se obtiene de residuos orgánicos como residuos agrícolas, estiércol y desechos de alimentos sirve para generar energía limpia. En Colombia ayuda a reducir desechos, bajar emisiones y llevar electricidad renovable a comunidades rurales.`,
  },
];

function Index() {
  
  const [selectedEnergy, setSelectedEnergy] = useState<RenewableEnergy | null>(null);

  const handleSelectEnergy = (key: string) => {
    const energy = renewableData.find(e => e.key === key) || null;
    setSelectedEnergy(energy);
  };

  const handleBack = () => {
    setSelectedEnergy(null);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img
            src="/logofondo.png"
            alt="logo Revolución Solar"
            className="logo-img"
          />
        </div>
        <div className="menu">
          <Link to="/usuarios/crear">Registrarse</Link>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </div>

      <section className="hero" id="inicio">
        <div className="hero-text">
          <h1><strong>Mundo innovador!!</strong></h1>
          <h2>
            Únete a nosotros o sé un inversionista en proyectos revolucionarios
            y originales de nuestra comunidad.
          </h2>
          <div className="buttons">
            <a href="#nosotros" className="btn primary">Sobre nosotros</a>
            <a href="#aprende" className="btn secondary">Aprende con nosotros</a>
            <a href="#info" className="btn primary">Más información</a>
          </div>
        </div>
      </section>
      
      <section className="bloque" id="nosotros">
        <div className="bloque-contenido">
          <h2>Sobre nosotros</h2>
          <p>
            Somos una comunidad interactiva y accesible que centraliza, organiza
            y difunde información sobre iniciativas de innovación y oportunidades
            de financiamiento en energías renovables...
          </p>
        </div>
        <div className="bloque-imagen">
          <img src="/panel.avif" alt="Equipo Revolución Solar" />
        </div>
      </section>

       <section className="bloque" id="info">
        <div className="bloque-contenido">
          <h2>¿Por qué ser inversionista y apoyar proyectos verdes?</h2>
          <p>
            Invertir en proyectos verdes no es solo una decisión financiera inteligente,
            sino también un compromiso con el futuro del planeta.
          </p>
          <p>
            Al financiar estos proyectos, promueves innovación tecnológica y generación de empleo verde,
            reduces emisiones contaminantes y avanzas hacia una transición energética justa.
          </p>
        </div>
        <div className="bloque-imagen">
          <img src="/inversionista.jpeg" alt="Inversionista Revolución Solar" />
        </div>
      </section>

      {!selectedEnergy ? (
        <section className="bloque" id="aprende">
          <div className="energy-grid">
            {renewableData.map(({ key, title, img }) => (
              <div
                key={key}
                className="energy-item"
                onClick={() => handleSelectEnergy(key)}
              >
                <img src={img} alt={title} />
                <div className="energy-info">
                  <h3>{title}</h3>
                  <span>›</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section
          className="energy-detail"
          style={{ backgroundImage: `url(${selectedEnergy.background || ''})` }}
        >
          <button
            onClick={handleBack}
            aria-label="Cerrar detalle"
            className="btn-close"
          >
            ✕
          </button>
          <h1>La energía {selectedEnergy.title.toLowerCase()}</h1>
          <p>{selectedEnergy.description}</p>
        </section>
      
      )}

      

      <footer className="footer">
        ⚡ Revolución Solar — Impulsando proyectos verdes desde 2025 💚 |
        Todos los derechos reservados
      </footer>
    </>
  );
}

export default Index;


