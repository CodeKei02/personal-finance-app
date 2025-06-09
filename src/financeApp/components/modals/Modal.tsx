import styled from "styled-components";
import { breakpoints, colors } from "../../../styles/theme";
import iconClose from "../../../../public/images/icon-close-modal.svg";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  showModal: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

interface OverlayProps {
  show: boolean | undefined;
}

const Overlay = styled.div<OverlayProps>`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
`;
const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  position: relative;

  @media (min-width: ${breakpoints.tablet}) {
    & {
      width: 450px;
    }
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 25px;
  right: 20px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  font-weight: 800;

  &:hover {
    color: ${colors.red};
  }
`;

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
        <Overlay show={showModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ModalContainer ref={modalRef}>
              <CloseButton onClick={onClose} whileTap={{ y: 1 }}>
                <img src={iconClose} alt="close" />
              </CloseButton>
              {children}
            </ModalContainer>
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
