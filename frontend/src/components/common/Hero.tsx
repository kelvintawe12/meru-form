import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, cta }) => {
  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {title}
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <Link to="/order">
              <Button
                size="xl"
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-200/40 transition-all"
              >
                {cta}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] bg-indigo-100/40 rounded-full -top-64 -left-64" />
          <div className="absolute w-[400px] h-[400px] bg-indigo-200/30 rounded-full -bottom-48 -right-48" />
        </div>
      </div>
    </section>
  );
};

export default Hero;