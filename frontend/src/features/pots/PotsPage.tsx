import { useState } from "react";
import { Button } from "@/components";
import { Headline } from "@/features/shared/components/textElements/Headline";
import { Container } from "@/features/shared/components/textElements/Container";
import { Header } from "@/features/shared/components/textElements/Header";
import { PotsCard } from "./components/PotsCard";
import { colors } from "@/styles/colors";
import { typography } from "@/styles/typography";
import { PlanModal } from "@/features/shared/components/modals/PlanModal";
import * as Yup from "yup";
import { addPotItem } from "@/store/slices/potsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import type { FormInput } from "@/features/shared/components/modals/type";

export const PotsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { items } = useSelector((state: RootState) => state.pot);
  const usedColors = items.map((item: { theme: string }) => item.theme);
  const inputsPots: FormInput[] = [
    {
      id: "pot-name",
      type: "text",
      label: "Pot Name",
      name: "potName",
      placeholder: "$ e.g Rainy Days",
    },
    {
      id: "pot-target",
      type: "number",
      label: "Target",
      name: "target",
      placeholder: "$ e.g 2000",
    },
  ];

  const potValidationSchema = Yup.object({
    potName: Yup.string().required("Name is required"),
    target: Yup.number().positive().required(),
  });

  return (
    <Container>
      <Header>
        <Headline title="Pots" />
        <Button
          children="+Add New Pot"
          background={colors.greyDark}
          backgroundhover={colors.greyMedium}
          color={colors.white}
          weight={typography.textPreset4Bold.fontWeight}
          border="transparent"
          size={typography.textPreset4Bold.size}
          width="auto"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </Header>
      <PlanModal
        title="Add New Pot"
        paragraph="lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id erat ut nisi efficitur facilisis. Donec ac ligula a nunc efficitur tincidunt."
        buttonText="Add Pot"
        dispatchAction={addPotItem}
        inputs={inputsPots}
        initialValues={{ potName: "", target: 0, amount: 0 }}
        validationSchema={potValidationSchema}
        showModal={openModal}
        usedColors={usedColors}
        onClose={() => setOpenModal(false)}
      />
      <PotsCard pots={inputsPots} validationSchema={potValidationSchema} />
    </Container>
  );
};
