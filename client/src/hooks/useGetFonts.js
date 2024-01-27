import { useCallback, useEffect, useState } from "react";

import { httpGetFonts } from "./requests";

function useGetFonts() {
  const [fonts, saveFonts] = useState([]);

  const getFonts = useCallback(async () => {
    const fetchedFonts = await httpGetFonts();
    saveFonts(fetchedFonts);
  }, []);

  useEffect(() => {
    getFonts();
  }, [getFonts]);

  return fonts;
}

export default useGetFonts;
