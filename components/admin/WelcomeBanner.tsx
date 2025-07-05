import { motion } from "framer-motion";

const WelcomeBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col gap-2 lg:flex-row items-center p-4 text-[30px] text-center md:text-start md:text-[40px] font-semibold font-montserrat mb-4 max-w-[600px] text-white">
        <span>¡Coordinamos juntos!</span>
        <span className="md:text-[30px] ml-3">🌈</span>
      </div>
      <p className="px-4 mb-10 md:mb-14 text-lg text-white">
        Accede a tu espacio para gestionar sesiones, inscripciones... y
        multiplicar tu impacto.
      </p>
    </motion.div>
  );
};

export default WelcomeBanner;



