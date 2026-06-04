import { useState } from "react";
import { useDispatch } from "react-redux";
import { colors } from "@/styles/colors";
import { Modal } from "../modals/Modal";
import { PlanModal } from "../modals/PlanModal";
import { Button } from "@/components/Button";
import { DropdownEditDeleteProps } from "./types";
import type { AppDispatch } from "@/store/store";

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
  const dispatch = useDispatch<AppDispatch>();
  const [action, setAction] = useState<"edit" | "delete" | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = () => {
    dispatch(onDelete(item));
    setOpenModal(false);
  };

  return (
    <>
      <div
        ref={ref}
        className="absolute bg-white shadow-[0px_5px_15px_5px_rgba(0,0,0,0.1)] rounded-md w-[150px] top-[55px] right-[15px] z-[100] flex flex-col"
      >
        <button
          onClick={() => {
            setAction("edit");
            setOpenModal(true);
          }}
          className="bg-transparent border-none cursor-pointer py-2 px-4 border-b border-greyLight text-greyDark font-semibold"
        >
          Edit {name}
        </button>
        <button
          onClick={() => {
            setAction("delete");
            setOpenModal(true);
          }}
          className="bg-transparent border-none cursor-pointer py-2 px-4 text-red font-semibold"
        >
          Delete {name}
        </button>
      </div>

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
            initialValues={initialValues as unknown as Record<string, unknown>}
            validationSchema={validationSchema}
          />
        ) : (
          <div>
            <h1>Delete '{category}'</h1>
            <p>
              Are you sure you want to delete this {method}? This action cannot
              be reversed, and all the data inside it will be removed forever.
            </p>
            <Button
              background={colors.red}
              backgroundhover="#FF7F7F"
              color={colors.white}
              weight="600"
              border="transparent"
              size="1rem"
              width="100%"
              onClick={handleDelete}
            >
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
            >
              No, Go Back
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};
