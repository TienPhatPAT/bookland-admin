import moment from "moment";

const DMYFormat = "DD MMM yyyy";
export const formatDate = (ISOString: string, format?: string) =>
  moment(ISOString).format(format || DMYFormat);
