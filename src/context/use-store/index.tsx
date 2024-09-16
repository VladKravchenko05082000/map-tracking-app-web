import React, { createContext, useContext } from "react";

import { rootStore } from "store/rootStore";

const StoreContext = createContext(rootStore);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};

export const useStoreContext = () => {
  const storeContext = useContext(StoreContext);

  if (storeContext === null) {
    throw new Error("Socket context is not found");
  }
  return storeContext;
};
