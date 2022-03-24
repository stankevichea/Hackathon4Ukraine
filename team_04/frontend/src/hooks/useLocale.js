import { useState } from "react";

const useLocale = () => {
  const [locale, setLocale] = useState("en");

  return { locale, setLocale };
};

export default useLocale;
