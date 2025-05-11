/** @enum {string} */
export enum DateFormat {
  SPACE_dd_MMM = "dd MMM",
  SPACE_dd_MMMM_yyyy = "dd MMMM yyyy",
  SPACE_dd_MMM_yyyy = "dd MMM yyyy",
  SPACE_dd_MMM_yyyy_hh_mm_ss = "dd MMM yyyy HH:mm:ss",
  SPACE_MMMM_yyyy = "MMMM yyyy",
  HYPHEN_yyyy_MM_dd = "yyyy-MM-dd",
  HYPHEN_dd_MM_yyyy = "dd-MM-yyyy",
  HYPHEN_MM_ddd_yyyy = "MM-ddd-yyyy",
  SLASH_dd_MM_yyyy = "dd/MM/yyyy",
  FORMAT = "yyyy MM dd",
}

export default DateFormat;
