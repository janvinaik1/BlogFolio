import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const ContactAndSocialView = ({ contact = {}, socialLinks = [] }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Contact & Social</h2>
      <motion.ul
        className="space-y-3 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {contact.email && (
          <li className="flex items-center gap-2">
            <FaEnvelope /> <span>{contact.email}</span>
          </li>
        )}
        {contact.phone && (
          <li className="flex items-center gap-2">
            <FaPhone /> <span>{contact.phone}</span>
          </li>
        )}
        {contact.website && (
          <li className="flex items-center gap-2">
            <FaGlobe />{" "}
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-400"
            >
              {contact.website}
            </a>
          </li>
        )}
        {contact.address && (
          <li className="flex items-center gap-2">
            <FaMapMarkerAlt /> <span>{contact.address}</span>
          </li>
        )}
      </motion.ul>

      <motion.div
        className="mt-5 flex flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {socialLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 text-blue-400 px-3 py-1 rounded-full hover:bg-white/10 transition-all text-sm font-medium"
          >
            {link.platform}
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default ContactAndSocialView;
