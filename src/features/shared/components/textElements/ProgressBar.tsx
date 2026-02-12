import { ProgressBarProps } from "./types";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  backgroundColor,
  amount,
  target,
}) => {
  const calculateProgress = (amount: number, target?: number): number => {
    if (!target || target <= 0) return 0;
    return Math.min(Math.max((amount / target) * 100, 0), 100);
  };
  const progress = calculateProgress(amount, target);

  return (
    <div className="bg-[#e0e0e0] rounded-[10px] w-full h-2 relative">
      <div
        className="h-full max-w-full rounded-[10px] transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: backgroundColor,
          width: `${progress}%`,
        }}
      />
    </div>
  );
};
