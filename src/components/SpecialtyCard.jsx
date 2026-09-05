import { motion } from "framer-motion";
function SpecialtyCard({
  title,
  description,
  icon,
  image,
  delay = 0
}) {
  return <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="card-hover overflow-hidden rounded-lg border-b-4 border-terracotta bg-white"
  >{image ? <img src={image} alt={title} className="h-44 w-full object-cover" loading="lazy" /> : null}<div className="p-6 md:p-8"><div className="flex justify-center mb-4"><div className="text-terracotta">{icon}</div></div><h3 className="font-serif text-xl font-bold text-stone text-center mb-3">{title}</h3><p className="text-center text-stone-light text-sm leading-relaxed">{description}</p></div></motion.div>;
}
export {
  SpecialtyCard as default
};
