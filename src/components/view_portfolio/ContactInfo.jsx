import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaMobileAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const ContactAndSocialView = ({ contact = [], socialLinks = [] }) => {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatPhone = (phone) =>
    phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

  const getContactAction = (type, value) => {
    switch (type) {
      case "email":
        return `mailto:${value}`;
      case "phone":
        return `tel:${value}`;
      case "website":
        return value.startsWith("http") ? value : `https://${value}`;
      default:
        return "#";
    }
  };

  const contactIcons = {
    email: { icon: FaEnvelope, color: "emerald", label: "Email" },
    phone: { icon: FaMobileAlt, color: "emerald", label: "Phone" },
    website: { icon: FaGlobe, color: "emerald", label: "Website" },
    address: { icon: FaMapMarkerAlt, color: "emerald", label: "Address" },
  };

  const socialIcons = {
    GitHub: FaGithub,
    LinkedIn: FaLinkedin,
    Twitter: FaTwitter,
    Instagram: FaInstagram,
    Website: FaGlobe,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Section */}
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <motion.h2 
              className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.h2>
          </div>

          <div className="p-6">
            {Array.isArray(contact) && contact.length > 0 ? (
              <div className="space-y-4">
                {contact.map((c, idx) => (
                  <motion.div
                    key={idx}
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                  >
                    {Object.entries(c).map(([key, value]) => {
                      if (!value || !contactIcons[key]) return null;

                      const { icon: Icon, label } = contactIcons[key];
                      const isClickable = key !== "address";

                      return (
                        <motion.div
                          key={key}
                          className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                          whileHover={{ x: 2 }}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="bg-emerald-500/20 border border-emerald-400/30 p-2 rounded-lg">
                              <Icon className="text-emerald-400 text-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-emerald-300 font-medium mb-1">
                                {label}
                              </p>
                              {isClickable ? (
                                <a
                                  href={getContactAction(key, value)}
                                  className="text-white text-sm hover:text-emerald-300 transition-colors duration-300 break-all"
                                  target={key === "website" ? "_blank" : undefined}
                                  rel="noopener noreferrer"
                                >
                                  {key === "phone" ? formatPhone(value) : value}
                                  {key === "website" && (
                                    <FaExternalLinkAlt className="inline ml-1 text-xs opacity-70" />
                                  )}
                                </a>
                              ) : (
                                <span className="text-white text-sm break-all">
                                  {key === "phone" ? formatPhone(value) : value}
                                </span>
                              )}
                            </div>
                          </div>

                          <motion.button
                            onClick={() => copyToClipboard(value, `${key}-${idx}`)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <AnimatePresence mode="wait">
                              {copiedItem === `${key}-${idx}` ? (
                                <motion.div
                                  key="check"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <FaCheck className="text-emerald-400 text-xs" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="copy"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <FaCopy className="text-white/60 hover:text-white text-xs" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaEnvelope className="text-lg text-white/60" />
                </div>
                <p className="text-white/60 text-sm">
                  No contact details available
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <motion.h2 
              className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Social Links
            </motion.h2>
          </div>

          <div className="p-6">
            {socialLinks.length > 0 ? (
              <div className="space-y-3">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    whileHover={{ x: 2 }}
                  >
                    {socialIcons[link.platform] && (
                      <div className="bg-emerald-500/20 border border-emerald-400/30 p-2 rounded-lg">
                        {React.createElement(socialIcons[link.platform], {
                          className: "text-emerald-400 text-sm"
                        })}
                      </div>
                    )}
                    <span className="text-white group-hover:text-emerald-300 transition-colors duration-300 text-sm font-medium">
                      {link.platform}
                    </span>
                    <FaExternalLinkAlt className="text-white/40 text-xs ml-auto group-hover:text-emerald-300 transition-colors duration-300" />
                  </motion.a>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaGlobe className="text-lg text-white/60" />
                </div>
                <p className="text-white/60 text-sm">
                  No social links available
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactAndSocialView;
// Demo data for testing
