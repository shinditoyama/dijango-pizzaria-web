import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: any) =>
  format(new Date(date), "dd/MM/yyyy - HH':'mm':'ss", {
    locale: ptBR,
  });

/*export const formatDateTime = (date: any) =>
  format(new Date(date), "HH':'mm':'ss", {
    locale: ptBR,
  });*/

export const getCurrentMonth = () =>
  format(new Date(), "yyyy-M", {
    locale: ptBR,
  });

// export const monthName = () => format(new Date(), "MMMM", { locale: ptBR });
