import styled from "styled-components";
import { breakpoints, colors } from "../../styles/theme";
import { useDispatch } from "react-redux";
import { isCloseModal } from "../../store/slices/uiSlice";

interface ModalProps {
  showModal: boolean;
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
`
const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  position: relative;

  @media (min-width: ${breakpoints.tablet}){
    &{
      width: 450px;
    }
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 20px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  font-weight: 800;

  &:hover{
    color: ${colors.red};
  }
`

export const Modal: React.FC<ModalProps> = ({ showModal, children }) => {
  const dispatch = useDispatch();
  return (
    <Overlay show={showModal}>
      <ModalContainer>
        <CloseButton onClick={() => dispatch(isCloseModal())}>X</CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  )
}
