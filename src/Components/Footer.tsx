import React from 'react';
import { FaTwitter, FaGithub } from 'react-icons/fa'; // Import icons
import { motion } from 'framer-motion'; // Import Framer Motion for animations

const Footer: React.FC = () => {
    // Animation variant for icons
    const iconVariant = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
        },
    };

    return (
        <motion.footer
            className="w-[90%] bg-[#1A1A1A]  text-white py-8 mt-8 px-12 flex justify-between items-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            style={{position: 'relative', bottom: 0}}
            animate="visible"
            variants={iconVariant}
        >
            {/* Twitter Link */}
            <motion.a
                href="https://x.com/sentio_AR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
            >
                <FaTwitter size={28} className="mr-3" />
                <span className="hidden sm:inline">Twitter</span>
            </motion.a>

            {/* Heading in Center */}
            <motion.h3
                className="text-2xl font-extrabold text-white tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
                SENTIO
            </motion.h3>

            {/* GitHub Link */}
            <motion.a
                href="https://github.com/haard18/SAM-v1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
            >
                <FaGithub size={28} className="mr-3" />
                <span className="hidden sm:inline">GitHub</span>
            </motion.a>
        </motion.footer>
    );
};

export default Footer;
