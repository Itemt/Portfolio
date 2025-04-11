
import React from 'react';

const Hero = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Desarrollador
          </h1>
          <p className="text-xl text-mono-text-secondary mb-8 max-w-2xl">
            Construyo experiencias digitales excepcionales que son rápidas, accesibles y diseñadas con las mejores prácticas.
            Mi enfoque está en crear soluciones innovadoras que resuelvan problemas del mundo real.
          </p>
          <div className="space-x-4">
            <a
              href="#projects"
              className="inline-block px-6 py-3 bg-mono-surface border border-mono-border rounded-lg hover:bg-mono-card transition-colors"
            >
              Ver Proyectos
            </a>
            <a
              href="#contact"
              className="inline-block px-6 py-3 text-mono-background bg-mono-text rounded-lg hover:bg-mono-accent transition-colors"
            >
              Contactarme
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
