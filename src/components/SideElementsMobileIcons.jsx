import React from "react";
import { motion } from "framer-motion";

export default function SideElementsMobileIcons({ socialLinks, onIconClick }) {
    return (
        <div
            className="lg:hidden w-full flex justify-center items-end pb-6 gap-5"
        >            style={{ pointerEvents: 'auto', background: 'transparent' }}

            {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                    <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-red-600 transition-colors duration-300 shadow-lg rounded-full bg-white/80 backdrop-blur-sm border border-gray-200"
                        style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
                        whileHover={{ scale: 1.18, y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => onIconClick && onIconClick(social.label)}
                        aria-label={social.label}
                    >
                        <span className="flex items-center justify-center w-9 h-9">
                            {social.isCustom ? (
                                <Icon size={18} />
                            ) : (
                                <Icon size={18} strokeWidth={2} />
                            )}
                        </span>
                    </motion.a>
                );
            })}
        </div>
    );
}