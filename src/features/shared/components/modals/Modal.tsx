import { useClickOutside } from "@/features/shared/hooks/useClickOutside";
import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  showModal: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  showModal,
  children,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    if (onClose) {
      onClose();
    }
  };
  useClickOutside(modalRef, handleClickOutside);
  return (
    <AnimatePresence>
      {showModal && (
        <div
          className={`${
            showModal ? "flex" : "hidden"
          } fixed top-0 left-0 w-full h-full bg-black/50 justify-center items-center z-1000 transition-all duration-300 ease-in-out`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div
              ref={modalRef}
              className="bg-white p-5 rounded-lg w-[350px] relative md:w-[450px]"
            >
              <motion.button
                onClick={onClose}
                whileTap={{ y: 1 }}
                className="absolute top-[25px] right-5 border-none bg-transparent text-xl cursor-pointer font-extrabold hover:text-red"
              >
                <img src="/images/icon-close-modal.svg" alt="close" />
              </motion.button>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
