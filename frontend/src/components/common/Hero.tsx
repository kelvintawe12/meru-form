import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, cta }) => {
  return (
    <section className="bg-teal-100 py-12 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{subtitle}</p>
        <Link to="/order">
          <Button>{cta}</Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;