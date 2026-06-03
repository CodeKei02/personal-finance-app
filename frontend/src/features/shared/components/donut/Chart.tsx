import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { colors } from "@/styles/colors";
import { ListItem } from "@/features/shared/components/textElements/types";
import { Budget } from "@/features/budgets/types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  items: Budget[];
  transactions: ListItem[];
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
    <div className="w-[250px] h-[250px] mx-auto min-[600px]:w-[200px] min-[600px]:h-[200px] min-[670px]:w-[300px] min-[670px]:h-[250px] chart">
      <Doughnut data={data} options={options} />
    </div>
  );
};
