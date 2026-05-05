import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function IntroNavbar({ onProgress }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const value = Math.min(elapsed / duration, 1);

      setProgress(value);
      onProgress && onProgress(value);

      if (value === 1) {
        setDone(true);
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        scale: 2.2,
      }}
      animate={{
        top: done ? 20 : '50%',
        left: done ? 20 : '50%',
        x: done ? 0 : '-50%',
        y: done ? 0 : '-50%',
        scale: done ? 1 : 2.2,
      }}
      transition={{ duration: 2, ease: 'easeInOut' }}
      className="fixed z-50 flex items-center gap-2 text-black font-bold text-2xl"
    >
    </motion.div>
  );
}