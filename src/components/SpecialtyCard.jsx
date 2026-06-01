import { motion } from "framer-motion";
function SpecialtyCard({
  title,
  description,
  icon,
  delay = 0
}) {
  return <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="card-hover bg-white rounded-lg p-6 md:p-8 border-b-4 border-terracotta"
  ><div className="flex justify-center mb-4"><div className="text-terracotta">{icon}</div></div><h3 className="font-serif text-xl font-bold text-stone text-center mb-3">{title}</h3><p className="text-center text-stone-light text-sm leading-relaxed">{description}</p></motion.div>;
}
export {
  SpecialtyCard as default
};
