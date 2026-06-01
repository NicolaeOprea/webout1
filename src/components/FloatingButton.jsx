import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  return <><AnimatePresence>{isOpen && <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="fixed bottom-24 right-6 md:right-8 flex flex-col gap-3 z-40"
  ><motion.a
    href="https://wa.me/498104889110?text=Hallo%20Sapore%20Mediterraneo"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
  ><MessageCircle size={20} /><span className="text-sm font-medium">WhatsApp</span></motion.a><motion.a
    href="tel:+498104889110"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-3 bg-terracotta text-cream px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
  ><Phone size={20} /><span className="text-sm font-medium">Anrufen</span></motion.a></motion.div>}</AnimatePresence><motion.button
    onClick={() => setIsOpen(!isOpen)}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 md:right-8 w-14 h-14 bg-terracotta text-cream rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center z-40 transition-shadow"
    aria-label="Contact options"
  >{isOpen ? <X size={24} /> : <MessageCircle size={24} />}</motion.button></>;
}
export {
  FloatingButton as default
};
