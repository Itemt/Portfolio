
import React from 'react';

const Hero = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Developer
          </h1>
          <p className="text-xl text-mono-text-secondary mb-8 max-w-2xl">
            I build exceptional digital experiences that are fast, accessible, and designed with best practices.
            My focus is on creating innovative solutions that solve real-world problems.
          </p>
          <div className="space-x-4">
            <a
              href="#projects"
              className="inline-block px-6 py-3 bg-mono-surface border border-mono-border rounded-lg hover:bg-mono-card transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-block px-6 py-3 text-mono-background bg-mono-text rounded-lg hover:bg-mono-accent transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
