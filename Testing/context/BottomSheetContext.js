import { createContext, useContext, useState } from "react";

const BottomSheetContext = createContext();

export const useBottomSheet = () => useContext(BottomSheetContext);

export const BottomSheetProvider = ({ children }) => {
  const [sheetData, setSheetData] = useState(null);

  const openSheet = (data) => setSheetData(data);
  const closeSheet = () => setSheetData(null);

  return (
    <BottomSheetContext.Provider value={{sheetData, openSheet, closeSheet }}>
      {children}
    </BottomSheetContext.Provider>
  );
};