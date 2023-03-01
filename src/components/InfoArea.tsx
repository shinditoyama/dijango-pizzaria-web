import ResumeItem from "@/components/ResumeItem";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

interface Props {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
  income: number;
  expense: number;
}

export default function InfoArea({
  currentMonth,
  onMonthChange,
  income,
  expense,
}: Props) {
  const handlePrevMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(format(new Date(currentDate), "yyyy-M"));
  };

  const handleNextMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    onMonthChange(format(new Date(currentDate), "yyyy-M"));
  };

  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center">
        <button
          onClick={handlePrevMonth}
          className="hover:bg-gray-100 rounded-full p-1"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center text-base">{currentMonth}</div>
        <button
          onClick={handleNextMonth}
          className="hover:bg-gray-100 rounded-full p-1"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-[2]">
        <ResumeItem title="Receitas" value={income} />
        <ResumeItem title="Despesas" value={expense} />
        <ResumeItem
          title="Balanço"
          value={income - expense}
          color={income - expense < 0 ? "red" : "green"}
        />
      </div>
    </div>
  );
}
