
import React from 'react';
import BentoCard from './BentoCard';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Job Portal",
      description: "Portal de trabajo desarrollado con Laravel, incluyendo un sistema de autenticación, gestión de usuarios y búsqueda de trabajos.",
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1568598035424-7070b67317d2",
      link: "https://github.com/itemt/job-portal",
    },
    {
      title: "Financial Dashboard",
      description: "Panel de control financiero que permite visualizar y analizar datos económicos en tiempo real.",
      tags: ["React", "TypeScript", "Node.js", "Chart.js"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      link: "https://github.com/itemt/financial-dashboard",
    },
    {
      title: "E-commerce Platform",
      description: "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos y panel de administración.",
      tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
      link: "https://github.com/itemt/ecommerce-platform",
    },
    {
      title: "Weather App",
      description: "Aplicación que muestra información meteorológica en tiempo real utilizando la API de OpenWeatherMap.",
      tags: ["Vue.js", "JavaScript", "API REST", "CSS3"],
      imageUrl: "https://images.unsplash.com/photo-1530563885674-66db50a1af19",
      link: "https://github.com/itemt/weather-app",
    },
    {
      title: "Task Manager",
      description: "Aplicación de gestión de tareas con funciones de arrastrar y soltar, categorías personalizables y recordatorios.",
      tags: ["React", "Firebase", "Redux", "Material UI"],
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
      link: "https://github.com/itemt/task-manager",
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
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
