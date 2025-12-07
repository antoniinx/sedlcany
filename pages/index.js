import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { routes } from '../data/routes';
import RouteCard from '../components/RouteCard';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg pb-32 relative overflow-hidden">

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-accent-primary/5 rounded-b-[50%] blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto px-4 pt-24 sm:pt-32 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-accent-primary font-bold tracking-widest text-xs uppercase mb-2 block">Objevuj & Soutěž</span>
          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Cyklistické trasy<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Sedlčanska</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-sm mx-auto leading-relaxed">
            Vyber si trasu, dojeď na místo a odpověz na otázky. Sbírej body a objevuj krásy okolí.
          </p>
        </motion.div>

        {/* Routes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6"
        >
          {routes.map((route) => (
            <motion.div key={route.id} variants={itemVariants}>
              <RouteCard route={route} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom spacer for navbar */}
        <div className="h-4" />
      </div>
    </div>
  );
}

