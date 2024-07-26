import { parseISO } from "date-fns";

const formatDate = (isoDate) => {
  const formattedDate = parseISO(isoDate);

  return formattedDate.toLocaleString();
};

export default formatDate;
