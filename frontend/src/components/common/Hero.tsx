// src/components/common/Hero.tsx
import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, cta }) => {
  return (
    <div className="bg-blue-600 text-white py-16 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-lg">{subtitle}</p>
      <button className="mt-6 px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100">
        {cta}
      </button>
    </div>
  );
};

export default Hero;