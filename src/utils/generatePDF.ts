import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate, formatDateTime } from "./dateFormat";

export const generatePDF = (data: any, date: any, total: number) => {
  const doc = new jsPDF("p", "pt", "a4");
  const dataBody = data?.map((elt: any) => [
    formatDate(elt.createdAt.seconds * 1000),
    formatDateTime(elt.createdAt.seconds * 1000),
    elt.table || elt.custumer.name,
    elt.total.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  ]);

  !date
    ? doc.text("Histórico de Venda", 40, 50)
    : doc.text(
        `Histórico de Venda (${formatDate(date[0])} - ${formatDate(date[1])})`,
        40,
        50
      );

  autoTable(doc, {
    startY: 60,
    head: [["Data", "Hora", "Pedido", "Valor"]],
    body: dataBody,
    theme: "grid",
    foot: [
      [
        " ",
        " ",
        "Total",
        `${total?.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      ],
    ],
  });

  doc.save("table.pdf");
};
