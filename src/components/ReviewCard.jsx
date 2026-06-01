import { motion } from "framer-motion";
import { Star } from "lucide-react";
function ReviewCard({
  name,
  text,
  rating,
  delay = 0
}) {
  return <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
  ><div className="flex gap-1 mb-3">{Array.from({ length: rating }).map((_, i) => <Star
    key={i}
    size={16}
    className="fill-terracotta text-terracotta"
  />)}</div><p className="text-stone text-sm mb-4 leading-relaxed italic">
        &ldquo;{text}&rdquo;
      </p><p className="font-medium text-stone">{name}</p></motion.div>;
}
export {
  ReviewCard as default
};
