import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';
import { colors, typography } from '../../styles/theme';


ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetContainer = styled.div`
  width: 100%;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  margin: 1.5rem 0;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);


  @media (min-width: 600px){
    flex-direction: row;
    align-items: center;
    margin: 2rem auto;
    height: 350px;
  }

  @media (min-width: 670px){
    max-width: 95%;
  }

`
const ChartContainer = styled.div`
  width: 250px;
  height: 250px;
  margin: 0 auto;

  @media (min-width: 600px){
    width: 200px;
    height: 200px;
  }

  @media (min-width: 670px){
    width: 300px;
    height: 250px;
  }
`

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column; 
  margin-top: 20px;

  h2{
    margin: 20px 0;
    font-size: ${typography.textPreset2.size};
    line-height: ${typography.textPreset2.lineHeight}; 
    font-weight: 900;
    color: ${colors.greyDark};
  }

  @media (min-width: 670px){
    margin-top: 0;
    flex-grow: .5;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 10px;
  width: 300px;
  border-bottom: 1px solid ${colors.greyLight};
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  .color-box {
    width: 4px;
    height: 21px;
    margin-right: 10px;
  }

  .label {
    font-size: .750rem;
    color: ${colors.greyNormal};
    font-weight: 600;
    margin-left: .25rem;
  }

  @media (min-width: 670px){
    margin: 0;
  }
`;

const LegendContent = styled.div`
  display: flex;
`

const LegendInfo = styled.article`
  display: flex;
  gap: .25rem;
`

export const Chart = () => {
  const { items } = useSelector((state: RootState) => state.budget);
  const { transactions } = useSelector((state: RootState) => state.transaction);

  const data = {
    labels: items.map(budget => budget.category),
    datasets: [
      {
        data: items.map(budget => budget.maximum),
        backgroundColor: items.map(budget => budget.theme),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },

    },
    cutout: '70%',
  };

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: any) => {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      const totalBudget = chart.data.datasets[0].data.reduce((acc: number, value: number) => acc + Number(value), 0);
      const totalSpent = transactions.reduce((acc: number, transaction: any) => acc + parseFloat(transaction.amount), 0);

      ctx.font = 'bold 2rem Manrope';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = colors.greyDark;
      ctx.fillText(`$${totalBudget}`, width / 2, height / 2);

      ctx.font = 'bold 12px Manrope';
      ctx.fillStyle = colors.greyMedium;
      ctx.fillText(`of ${totalSpent} limit`, width / 2, height / 2 + 35);


      ctx.save();
    },
  };

  ChartJS.register(centerTextPlugin);
  return (

    <div>
      {items.length > 0 ? (
        <BudgetContainer>
          <ChartContainer>
            <Doughnut data={data} options={options} />
          </ChartContainer>
          <LegendContainer>
            <h2>Spending Summary</h2>
            {items.map((budget, index) => (
              <LegendItem key={index}>
                <LegendContent>
                  <div
                    className="color-box"
                    style={{ backgroundColor: budget.theme }}
                  ></div>
                  <span className="label">{budget.category}</span>
                </LegendContent>
                <LegendInfo>
                  <strong>
                    {transactions.filter(transaction => transaction.category === budget.category).reduce((acc, transaction) => acc + Number(transaction.amount), 0)}$
                  </strong>
                  <span className='label'>
                    of {budget.maximum}$
                  </span>
                </LegendInfo>
              </LegendItem>
            ))}
          </LegendContainer>
        </BudgetContainer>
      ) : (
        <p>No budgets yet</p>
      )}
    </div>
  );
};