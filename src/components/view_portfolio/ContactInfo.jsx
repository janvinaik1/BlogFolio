import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEnvelope, 
  FaMobileAlt, // Changed from FaPhone
  FaGlobe, 
  FaMapMarkerAlt, 
  FaCopy, 
  FaCheck,
  FaExternalLinkAlt
} from "react-icons/fa";

const ContactAndSocialView = ({ contact = [], socialLinks = [] }) => {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatPhone = (phone) => {
    return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  const getContactAction = (type, value) => {
    switch (type) {
      case 'email':
        return `mailto:${value}`;
      case 'phone':
        return `tel:${value}`;
      case 'website':
        return value.startsWith('http') ? value : `https://${value}`;
      default:
        return '#';
    }
  };

  const contactIcons = {
    email: { icon: FaEnvelope, color: 'blue', label: 'Email' },
    phone: { icon: FaMobileAlt, color: 'emerald', label: 'Phone' }, // Updated icon
    website: { icon: FaGlobe, color: 'purple', label: 'Website' },
    address: { icon: FaMapMarkerAlt, color: 'red', label: 'Address' }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="grid md:grid-cols-2 gap-8 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        <h3 className="text-3xl font-bold text-white/90">Social Presence</h3>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Cards */}
        <div>
          {Array.isArray(contact) && contact.length > 0 ? (
            <div className="space-y-4">
              {contact.map((c, idx) => (
                <motion.div
                  key={idx}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="grid gap-4">
                    {Object.entries(c).map(([key, value]) => {
                      if (!value || !contactIcons[key]) return null;

                      const { icon: Icon, color, label } = contactIcons[key];
                      const isClickable = key !== 'address';

                      return (
                        <motion.div
                          key={key}
                          className="flex items-center justify-between group/item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className={`bg-${color}-500/20 p-3 rounded-xl group-hover/item:bg-${color}-500/30 transition-all duration-300 flex-shrink-0`}>
                              <Icon className={`text-${color}-400 text-lg`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-white/60 mb-1 font-medium uppercase tracking-wider">
                                {label}
                              </p>
                              {isClickable ? (
                                <a
                                  href={getContactAction(key, value)}
                                  className="text-white/90 hover:text-white font-medium break-all hover:underline decoration-2 underline-offset-4 transition-colors duration-300"
                                  target={key === 'website' ? '_blank' : undefined}
                                  rel={key === 'website' ? 'noopener noreferrer' : undefined}
                                >
                                  {key === 'phone' ? formatPhone(value) : value}
                                  {key === 'website' && <FaExternalLinkAlt className="inline ml-2 text-xs opacity-70" />}
                                </a>
                              ) : (
                                <span className="text-white/90 font-medium break-all">
                                  {key === 'phone' ? formatPhone(value) : value}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Copy button */}
                          <motion.button
                            onClick={() => copyToClipboard(value, `${key}-${idx}`)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 opacity-0 group-hover/item:opacity-100 flex-shrink-0"
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
                                  <FaCheck className="text-green-400 text-sm" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="copy"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <FaCopy className="text-white/60 hover:text-white text-sm" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-2xl text-white/60" />
              </div>
              <p className="text-white/60 text-lg font-medium">No contact details available</p>
              <p className="text-white/40 text-sm mt-2">Contact information will appear here when added</p>
            </motion.div>
          )}
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-xl p-4 text-center transition-all duration-500 hover:shadow-lg hover:shadow-white/10"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5 + idx * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-white/80 group-hover:text-white font-semibold text-sm transition-colors duration-300">
                    {link.platform}
                  </div>
                  <FaExternalLinkAlt className="absolute top-3 right-3 text-white/40 group-hover:text-white/70 text-xs transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-500"></div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Demo component for testing
const App = () => {
  const sampleContact = [
    {
      email: "hello@example.com",
      phone: "+1234567890",
      website: "https://example.com",
      address: "123 Main St, City, State 12345"
    }
  ];

  const sampleSocialLinks = [
    { platform: "LinkedIn", link: "https://linkedin.com" },
    { platform: "Twitter", link: "https://twitter.com" },
    { platform: "GitHub", link: "https://github.com" },
    { platform: "Instagram", link: "https://instagram.com" },
    { platform: "YouTube", link: "https://youtube.com" },
    { platform: "Portfolio", link: "https://portfolio.com" }
  ];

  return (
    <div >
      <ContactAndSocialView 
        contact={sampleContact} 
        socialLinks={sampleSocialLinks} 
      />
    </div>
  );
};

export default App;
