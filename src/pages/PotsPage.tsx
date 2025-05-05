import { useState } from "react"
import { Button } from "../components/form"
import { Headline, Container, Header, PotsCard } from "../components/textElements"
import { colors, typography } from "../styles/theme"
import { PlanModal } from "../components/modals"
import { useSelector } from "react-redux"
import * as Yup from "yup"
import { addPotItem } from "../store/slices/potsSlice"

export const PotsPage = () => {
  const [openModal, setOpenModal] = useState(false)

  const inputsPots = [
    {
      id: 'pot-name',
      type: 'text',
      label: 'Pot Name',
      name: 'potName',
      placeholder: '$ e.g Rainy Days',
    },
    {
      id: 'pot-target',
      type: 'number',
      label: 'Target',
      name: 'target',
      placeholder: '$ e.g 2000',
    },
  ]

  const potValidationSchema = Yup.object({
      potName: Yup.string().required('Name is required'),
      target: Yup.number().positive().required(),
    });


  return (
    <Container >
      <Header>
        <Headline title="Pots" />
        <Button
          children="+Add New Pot"
          background={colors.greyDark}
          color={colors.white}
          weight={typography.textPreset4Bold.fontWeight}
          border="transparent"
          size={typography.textPreset4Bold.size}
          width="auto"
          onClick={() => { setOpenModal(true) }}
        />
      </Header>
      <PlanModal
        title="Add New Pot"
        paragraph="lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id erat ut nisi efficitur facilisis. Donec ac ligula a nunc efficitur tincidunt."
        buttonText="Add Pot"
        dispatchAction={addPotItem}
        inputs={inputsPots}
        initialValues={{ potName: '', target: 0, amount: 0 }}
        validationSchema={potValidationSchema}
        showModal={openModal}
        onClose={() => setOpenModal(false)}
      />

      <PotsCard />
    </Container>
  )
}