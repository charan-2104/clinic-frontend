import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
    amount: 0.1,
  });

  return { ref, isInView };
};
