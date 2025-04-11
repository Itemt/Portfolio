
import React from 'react';

const Header = () => {
  return (
    <header className="py-6">
      <div className="container">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Portafolio</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#projects" className="hover:text-mono-accent transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-mono-accent transition-colors">
                  Habilidades
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-mono-accent transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
