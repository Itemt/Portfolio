
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-mono-border mt-24" id="contact">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-mono-text-secondary mb-6">
              I'm currently available for freelance work and full-time positions.
              If you have a project that needs some creative engineering, I'd love to hear about it.
            </p>
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center px-6 py-3 bg-mono-surface border border-mono-border rounded-lg hover:bg-mono-card transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              contact@example.com
            </a>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Connect</h2>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-mono-surface rounded-full hover:bg-mono-card transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-mono-surface rounded-full hover:bg-mono-card transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="mailto:contact@example.com"
                className="p-3 bg-mono-surface rounded-full hover:bg-mono-card transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-mono-border text-center text-mono-text-secondary">
          <p>© {new Date().getFullYear()} - Built with React, TypeScript, and TailwindCSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
