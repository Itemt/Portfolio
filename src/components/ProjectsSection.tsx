
import React from 'react';
import BentoCard from './BentoCard';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Plataforma E-Commerce",
      description: "Una tienda online completa con gestión de productos, funcionalidad de carrito e integración de pagos seguros.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      title: "Aplicación de Gestión de Tareas",
      description: "Herramienta de gestión de proyectos colaborativa con actualizaciones en tiempo real y permisos de equipo.",
      tags: ["React", "Firebase", "Material UI"],
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1", 
    },
    {
      title: "Panel Financiero",
      description: "Panel de visualización de datos interactivo para métricas financieras y análisis.",
      tags: ["Vue.js", "D3.js", "Node.js"],
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
      title: "Generador de Contenido IA",
      description: "Herramienta de procesamiento de lenguaje natural que ayuda a crear contenido de marketing a partir de indicaciones simples.",
      tags: ["Python", "TensorFlow", "React"],
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      title: "Análisis de Redes Sociales",
      description: "Plataforma que rastrea y visualiza métricas de participación en múltiples canales sociales.",
      tags: ["GraphQL", "Chart.js", "PostgreSQL"],
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
  ];

  return (
    <section className="py-20" id="projects">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Proyectos Destacados</h2>
        
        <div className="bento-grid">
          {projects.map((project, index) => (
            <BentoCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              featured={project.featured}
              imageUrl={project.imageUrl}
              link="#"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
