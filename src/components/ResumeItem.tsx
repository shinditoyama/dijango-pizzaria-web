interface Props {
  title: string;
  value: number;
  color?: string;
}

export default function ResumeItem({ title, value, color }: Props) {
  return (
    <div className="flex-1">
      <div className="text-center font-bold mb-1">{title}</div>
      <div
        className={`${color === "red" && "text-red-400"} ${
          color === "green" && "text-green-400"
        } text-center font-bold text-base`}
      >
        {value?.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
}
