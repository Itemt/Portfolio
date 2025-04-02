
import React from 'react';
import BentoCard from './BentoCard';

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with product management, cart functionality, and secure payments integration.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      featured: true,
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates and team permissions.",
      tags: ["React", "Firebase", "Material UI"],
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1", 
    },
    {
      title: "Financial Dashboard",
      description: "Interactive data visualization dashboard for financial metrics and analytics.",
      tags: ["Vue.js", "D3.js", "Node.js"],
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
      title: "AI Content Generator",
      description: "Natural language processing tool that helps create marketing content from simple prompts.",
      tags: ["Python", "TensorFlow", "React"],
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      title: "Social Media Analytics",
      description: "Platform that tracks and visualizes engagement metrics across multiple social channels.",
      tags: ["GraphQL", "Chart.js", "PostgreSQL"],
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
  ];

  return (
    <section className="py-20" id="projects">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
        
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
