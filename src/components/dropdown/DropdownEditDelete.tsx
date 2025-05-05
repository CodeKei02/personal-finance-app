import { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components";
import { colors } from "../../styles/theme";
import { Modal, PlanModal } from "../modals";
import { Button } from "../form";

const DropdownContainer = styled.div`
    position: absolute;
    background-color: ${colors.white};
    box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 150px;
    top: 55px;
    right: 15px;
    z-index: 100;
    display: flex;
    flex-direction: column;

    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid ${colors.greyLight};
        color: ${colors.greyDark};
        font-weight: 600;
        }
      
      button:last-child {
        border-bottom: none;
        color: ${colors.red}; 
      }
`
interface DropdownEditDeleteProps<T extends { id: string }> {
  method: string
  title: string;
  paragraph: string;
  category: string;
  item: T;
  name: string;
  ref: any;
  onEdit: (value: T | any) => any;
  onDelete: (value: T | any) => any;
  inputs: any[];
  initialValues: any;
  validationSchema: any;
};


export const DropdownEditDelete = <T extends { id: string }>({
  method,
  paragraph,
  category,
  title,
  item,
  name,
  onEdit,
  onDelete,
  ref,
  inputs,
  initialValues,
  validationSchema,
}: DropdownEditDeleteProps<T>) => {
  const dispatch = useDispatch()
  const [action, setAction] = useState<"edit" | "delete" | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const handleDelete = () => {
    dispatch(onDelete(item))
    setOpenModal(false)
  }

  return (
    <>
      <DropdownContainer ref={ref}>
        <button onClick={() => { setAction("edit"); setOpenModal(true) }}>Edit {name}</button>
        <button onClick={() => { setAction("delete"); setOpenModal(true) }}>Delete {name}</button>
      </DropdownContainer>

      <Modal showModal={openModal} onClose={() => setOpenModal(false)}>
        {action === "edit" ? (
          <PlanModal
            type="edit"
            title={title}
            paragraph={paragraph}
            buttonText="Save Changes"
            dispatchAction={onEdit}
            inputs={inputs}
            showModal={openModal}
            onClose={() => setOpenModal(false)}
            initialValues={initialValues}
            validationSchema={validationSchema}
          />
        ) : (
          <div>
            <h1>Delete '{category}'</h1>
            <p>Are you sure you want to delete this {method}? This action cannot be reversed, and all the data inside it will be removed forever.</p>
            <Button
              background={colors.red}
              backgroundhover="#FF7F7F" 
              color={colors.white}
              weight="600"
              border="transparent"
              size="1rem"
              width="100%"
              onClick={handleDelete}>
              Yes, Confirm Deletion
            </Button>
            <Button
              background="transparent"
              color={colors.greyMedium}
              weight="600"
              border="transparent"
              size="1rem"
              width="100%"
              onClick={() => setOpenModal(false)}
            >No, Go Back</Button>
          </div>
        )}
      </Modal>
    </>
  )
}
