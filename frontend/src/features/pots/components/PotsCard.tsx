import { CardHeader } from "@/features/shared/components/textElements/CardHeader";
import { ProgressBar } from "@/features/shared/components/textElements/ProgressBar";
import { Button } from "@/components";
import { colors } from "@/styles/colors";
import React, { useState } from "react";
import { PotActionModal } from "./PotActionModal";
import { usePotStore } from "@/store/usePotStore";
import { DropdownEditDelete } from "@/features/shared/components/dropdown/DropdownEditDelete";
import { Motion } from "@/features/shared/components/textElements/Motion";

interface ItemsInput {
  id: string;
  potName: string;
  amount: number;
  target: number;
  theme: string;
}

interface FormPot {
  pots: ItemsInput[] | any;
  validationSchema: any;
}

export const PotsCard: React.FC<FormPot> = ({ pots, validationSchema }) => {
  const items = usePotStore((state) => state.items);
  const selectedItem = usePotStore((state) => state.selectedItem);
  const updatePot = usePotStore((state) => state.updatePot);
  const deletePot = usePotStore((state) => state.deletePot);
  const [isOpenActionModal, setIsOpenActionModal] = useState<string | null>(
    null
  );
  const [action, setAction] = useState<"add" | "withdraw" | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(null);

  const handleDropdownToggle = (id: any) => {
    setIsOpenDropdown((prevId) => (prevId === id ? null : id));
  };

  const handleActionModal = (id: string, actionType: "add" | "withdraw") => {
    setAction(actionType);
    setIsOpenActionModal(id);
  };

  return (
    <>
      {items.length > 0 ? (
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 PotsCard">
          {items.map((item: any) => (
            <Motion key={item.id} card={item} index={item.id}>
              <div
                key={item.id}
                className="w-full bg-white p-6 my-6 relative rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.1)] min-[670px]:my-4 min-[670px]:mr-14 min-[670px]:mt-0"
              >
                <CardHeader
                  type={item}
                  name={item.potName}
                  handleDropdownToggle={() => {
                    handleDropdownToggle(item.id);
                  }}
                />

                <div className="flex items-center justify-between">
                  <p className="text-beigeNormal my-4 tracking-wide">
                    Total saved
                  </p>
                  <h1>{`$${item.amount.toFixed(2)}`}</h1>
                </div>
                <ProgressBar
                  amount={item.amount}
                  target={item.target}
                  backgroundColor={item.theme}
                ></ProgressBar>
                <div className="flex items-center justify-between">
                  <p className="text-beigeNormal my-4 tracking-wide">
                    <strong>
                      {((item.amount * item.target) / 100).toFixed(2)}%
                    </strong>
                  </p>
                  <p className="text-beigeNormal my-4 tracking-wide">
                    Target of ${item.target}
                  </p>
                </div>
                <div className="flex justify-center gap-4 my-4 [&_button]:w-full">
                  <Button
                    children="+ Add Money"
                    background={colors.greyLight}
                    backgroundhover={colors.greyMedium}
                    color={colors.greyDark}
                    weight="bold"
                    border="transparent"
                    size="1rem"
                    width="auto"
                    onClick={() => {
                      handleActionModal(item.id, "add");
                    }}
                  ></Button>
                  <Button
                    children="Withdraw"
                    background={colors.greyLight}
                    backgroundhover={colors.greyMedium}
                    color={colors.greyDark}
                    weight="bold"
                    border="transparent"
                    size="1rem"
                    width="auto"
                    onClick={() => {
                      handleActionModal(item.id, "withdraw");
                    }}
                  ></Button>
                </div>

                {action === "add" && isOpenActionModal === item.id && (
                  <PotActionModal
                    showModal={true}
                    onClose={() => setIsOpenActionModal(null)}
                    title="Add Money"
                    action="add"
                    selectedPot={item}
                  />
                )}
                {action === "withdraw" && isOpenActionModal === item.id && (
                  <PotActionModal
                    showModal={true}
                    onClose={() => setIsOpenActionModal(null)}
                    title="Withdraw Money"
                    action="withdraw"
                    selectedPot={item}
                  />
                )}

                {isOpenDropdown === item.id && (
                  <DropdownEditDelete
                    method="pot"
                    name="Pot"
                    category={item.potName}
                    title="Edit Pot"
                    paragraph="If your savings targets change, feel free to update your pots."
                    item={item}
                    onEdit={updatePot}
                    onDelete={() => deletePot(item.id)}
                    inputs={pots}
                    initialValues={{
                      id: item.id,
                      potName: selectedItem?.potName ?? "",
                      amount: selectedItem?.amount ?? 0,
                      target: selectedItem?.target ?? 0,
                      theme: selectedItem?.theme ?? "",
                    }}
                    validationSchema={validationSchema}
                  />
                )}
              </div>
            </Motion>
          ))}
        </div>
      ) : (
        <p className="text-beigeNormal my-4 tracking-wide">
          You don't have a pot account yet.
        </p>
      )}
    </>
  );
};
