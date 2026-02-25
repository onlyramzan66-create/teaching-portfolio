'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // ✅ Import Image

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/923247279379"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 transition-all duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <Image
        src="/images/whatsapp_sum1.webp"
        alt="Whatsapp"
        width={63}           // pixel width
        height={63}          // pixel height
        priority
        className="img_whats"
      />
    </motion.a>
  );
};

export default WhatsAppButton;
