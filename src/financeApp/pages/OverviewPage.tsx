import styled from "styled-components";
import {
  Header,
  Container,
  Headline,
  ListElements,
  Summary,
} from "../components/textElements";
import { breakpoints, colors, typography } from "../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import arrow from "../../../public/images/icon-caret-right.svg";
import iconPot from "../../../public/images/icon-pot.svg";
import { Chart } from "../components/donut/Chart";
import { LegendContent } from "../components/donut/LegendContent";
import { Button } from "../../components/Button";
import IconLogout from "../../../public/images/logout.png";
import { onLogout } from "../../firebase/config";
import { logout } from "../../store/auth";
import { motion } from "framer-motion";

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0 0 0;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const DetailsCard = styled.div<{ background: string; color: string }>`
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  border-radius: 8px;
  min-width: 350px;
  padding: 1rem;
  line-height: 1.5;
  p {
    font-size: 0.8rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: 100%;
    flex-direction: row;
    min-width: 240px;
    margin: 0 auto;
  }
`;

const Features = styled.div`
  background-color: ${colors.white};
  margin: 1.5rem 0;
  border-radius: 8px;
  padding: 1rem;

  .totalSavedPots {
    background-color: ${colors.greyLight};
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;

    img {
      width: 35px;
      height: 35px;
    }
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: 1rem 1.5rem;

    .totalSavedPots {
      width: 250px;
      height: 100px;

      .saved-amount {
        font-size: 2rem;
        margin-top: 0.5rem;
      }
    }
  }
`;

const Flex = styled.div`
  background-color: ${colors.white};
  margin: 1.5rem 0;
  border-radius: 8px;
  padding: 1rem;

  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 200px);
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const ListPots = styled.div<{ border?: string }>`
  border-left: 5px solid ${({ border }) => border || colors.greyLight};
  margin: 0.5rem 0;

  div {
    margin-left: 1rem;
  }
`;

const Title = styled.h2`
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-size: 0.8rem;
  color: ${colors.greyDark};
`;

const HeaderFeature = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

  a {
    text-decoration: none;
    color: ${colors.greyDark};
    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
      width: 10px;
      height: 10px;
    }
  }
`;

const HeaderStyled = styled(Header)`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ListElementsStyled = styled(ListElements)`
  margin: 0 1rem;
`;

const DestopkGrid = styled.div`
  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
    gap: 2rem;

    .pots {
      min-width: 500px;
      height: 300px;

      .totalSavedPots {
        width: 250px;
        height: 100px;

        .saved-amount {
          font-size: 2rem;
          margin-top: 0.5rem;
        }
      }
    }

    .transactions {
      height: 550px;
    }

    .budgets {
      min-width: 450px;
      height: 400px;

      strong {
        margin-left: 1rem;
      }

      .budgetChart {
        gap: 0rem;
      }

      .chart {
        width: 200px;
        height: 200px;
        margin-right: 1rem;
      }

      .legend-item {
        justify-content: start;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .bills {
      height: 450px;
    }
  }
`;

export const OverviewPage = () => {
  const { items: pots } = useSelector((state: RootState) => state.pot);
  const { items: budgets } = useSelector((state: RootState) => state.budget);
  const { transactions } = useSelector((state: RootState) => state.transaction);
  const totalIncome = transactions
    .filter((transaction) => transaction.transactiontype === "income")
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.transactiontype === "expense")
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  const currentBalance = totalIncome + totalExpenses;

  const details = [
    {
      title: "Current Balance",
      amount: ` ${currentBalance.toFixed(2)}$`,
      background: colors.greyDark,
      color: colors.white,
    },
    {
      title: "Income",
      amount: ` ${totalIncome.toFixed(2)}$`,
      background: colors.green,
      color: colors.white,
    },
    {
      title: "Expenses",
      amount: ` ${totalExpenses.toFixed(2)}$`,
      background: colors.red,
      color: colors.white,
    },
  ];

  const handleLogout = async () => {
    const result = await onLogout();
    const dispatch = useDispatch();
    dispatch(logout(result));
  };

  return (
    <Container>
      <HeaderStyled>
        <Headline title="Overview" />
        <Button
          children={
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img src={IconLogout} alt="Logout" />
              Logout
            </div>
          }
          background={colors.greyDark}
          backgroundhover={colors.greyMedium}
          color={colors.white}
          weight="700"
          border="transparent"
          size={typography.textPreset4Bold.size}
          width="auto"
          onClick={handleLogout}
        />
      </HeaderStyled>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Details>
          {details.map((detail, index) => (
            <DetailsCard
              key={index}
              background={detail.background}
              color={detail.color}
            >
              <p>{detail.title}</p>
              <h2>{detail.amount}</h2>
            </DetailsCard>
          ))}
        </Details>
        <DestopkGrid>
          <section className="column-1">
            <Features className="pots">
              <HeaderFeature>
                <Title>Pots</Title>
                <Link to="/finance/pots">
                  See Details <img src={arrow} alt="" />
                </Link>
              </HeaderFeature>

              <Flex>
                <div className="totalSavedPots">
                  <img src={iconPot} alt="Icon Pot Saved" />
                  <div>
                    <Subtitle>Total Saved</Subtitle>
                    <h2 className="saved-amount">{`$${pots.reduce(
                      (acc: number, item: any) => acc + item.amount,
                      0
                    )}`}</h2>
                  </div>
                </div>
                <Grid className="potsLegend">
                  {pots.slice(0, 4).map((item: any) => (
                    <ListPots key={item.id} border={item.theme}>
                      <div>
                        <Subtitle>{item.potName}</Subtitle>
                        <strong>{`$${item.amount}`}</strong>
                      </div>
                    </ListPots>
                  ))}
                </Grid>
              </Flex>
            </Features>
            <Features className="transactions">
              <HeaderFeature>
                <Title>Transactions</Title>
                <Link to="/finance/transactions">
                  See Details <img src={arrow} alt="Direct to transaction" />
                </Link>
              </HeaderFeature>

              <ListElementsStyled items={transactions.slice(0, 8)} repeat="3" />
            </Features>
          </section>
          <section className="column-2">
            <Features className="budgets">
              <HeaderFeature>
                <Title>Budgets</Title>
                <Link to="/finance/budgets">
                  See Details <img src={arrow} alt="Direct to budgets" />
                </Link>
              </HeaderFeature>
              <Flex className="budgetChart">
                <Chart items={budgets} transactions={transactions} />
                <LegendContent
                  align="center"
                  title={false}
                  items={budgets.slice(0, 4)}
                  transactions={transactions}
                />
              </Flex>
            </Features>
            <Features className="bills">
              <HeaderFeature>
                <Title>Recurring Bills</Title>
                <Link to="/finance/bills">
                  See Details{" "}
                  <img src={arrow} alt="Direct to recurring Bills" />
                </Link>
              </HeaderFeature>
              <Summary transactions={transactions} />
            </Features>
          </section>
        </DestopkGrid>
      </motion.div>
    </Container>
  );
};
