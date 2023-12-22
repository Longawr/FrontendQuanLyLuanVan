export const handleDate = (date, locale) => {
  let d = new Date(date);
  if (d == "Invalid Date") return d;

  let dd = String(d.getDate()).padStart(2, "0"),
    mm = String(d.getMonth() + 1).padStart(2, "0"), //January is 0!
    yyyy = d.getFullYear();

  switch (locale) {
    case "vn":
      return [dd, mm, yyyy].join("-");

    case "en":
      return [mm, dd, yyyy].join("-");
    default:
      return [yyyy, mm, dd].join("-");
  }
};
