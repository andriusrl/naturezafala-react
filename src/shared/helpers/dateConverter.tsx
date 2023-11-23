import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

const convertDate = (date) => {
  const dateString = new Date(date).toDateString();

  const data = new Date(dateString);

  const dateFormated = format(data, "dd/MM/yyyy", {
    locale: ptBR,
    useAdditionalDayOfYearTokens: true,
  });
  return dateFormated;
};

export default convertDate;
