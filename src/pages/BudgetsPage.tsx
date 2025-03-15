import { Button } from "../components/form"
import { Headline, Container, Header } from "../components/textElements"
import { colors, typography } from "../styles/theme"

export const BudgetsPage = () => {
  return (
    <Container >
      <Header>
        <Headline title="Budgets" />
        <Button
          children="+Add New Budget"
          background={colors.greyDark}
          color={colors.white}
          weight={typography.textPreset4Bold.fontWeight}
          border="transparent"
          size={typography.textPreset4Bold.size}
          width="auto"
        />
      </Header>

    </Container>
  )
}
