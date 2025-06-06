import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";
import { colors } from "../../../styles/theme";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  width: 250px;
  height: 250px;
  margin: 0 auto;

  @media (min-width: 600px) {
    width: 200px;
    height: 200px;
  }

  @media (min-width: 670px) {
    width: 300px;
    height: 250px;
  }
`;

interface ChartProps {
  items: any[];
  transactions: any[];
}

export const Chart: React.FC<ChartProps> = ({ items, transactions }) => {
  const data = {
    labels: items.map((budget) => budget.category),
    datasets: [
      {
        data: items.map((budget) => budget.maximum),
        backgroundColor: items.map((budget) => budget.theme),
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
    cutout: "70%",
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart: any) => {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();

      const totalBudget = chart.data.datasets[0].data.reduce(
        (acc: number, value: number) => acc + Number(value),
        0
      );
      const totalSpent = transactions.reduce(
        (acc: number, transaction: any) => acc + parseFloat(transaction.amount),
        0
      );

      ctx.font = "bold 2rem Manrope";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = colors.greyDark;
      ctx.fillText(`$${totalBudget}`, width / 2, height / 2);

      ctx.font = "bold 12px Manrope";
      ctx.fillStyle = colors.greyMedium;
      ctx.fillText(`of ${totalSpent} limit`, width / 2, height / 2 + 35);

      ctx.save();
    },
  };

  ChartJS.register(centerTextPlugin);
  return (
    <>
      <ChartContainer className="chart">
        <Doughnut data={data} options={options} />
      </ChartContainer>
    </>
  );
};
