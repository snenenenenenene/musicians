import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '../music-player.components/music-player-widget.component';

export default function Container({ children, className }: any) {
  return (
    // SPOTIFY/INSTAGRAM VARIANT
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.01, duration: 0.1 } }}
      exit={{ x: '-100vw', transition: { ease: 'easeInOut' } }}
      className={`min-h-screen relative flex-col bg-main-1 transition-colors h-auto sm:p-5 flex xs:px-12 px-4 md:px-20 md:pt-10 pb-32 md:ml-72 xs:pt-10 pt-4 sm:pt-12 md:pb-32 sm:px-12 dark:bg-main-dark-2 dark:text-main-1 ${className}`}>
      {children}
    </motion.div>
  );

  // MODERN VARIANT
  // return (
  //   <motion.div
  //     initial={{ opacity: 0 }}
  //     animate={{ opacity: 1, transition: { delay: 0.01, duration: 0.1 } }}
  //     exit={{ x: '-100vw', transition: { ease: 'easeInOut' } }}
  //     className={`w-screen min-h-screen flex-col bg-main-1 transition-colors h-auto  sm:p-5 flex md:pl-48 dark:bg-main-dark-1`}>
  //     <div
  //       className={`bg-gradient-to-t sm:rounded-xl from-main-1 via-main-1 to-main-2 dark:from-main-dark-1 dark:via-main-dark-1 px-3 dark:to-main-dark-2 w-full text-main-text dark:text-main-dark-text ${className}`}>
  //       {children}
  //     </div>
  //   </motion.div>
  // );
}
