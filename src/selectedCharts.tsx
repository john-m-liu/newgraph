import React from "react";
import { Item } from "./container";

const defaultContext: selectedCharts = {
  selectedCharts: [],
  setSelected: (selectedCharts: Item[]) => {},
};

export const SelectedChartsContext = React.createContext(defaultContext);

export const SelectedChartsProvider: React.FC = ({ children }) => {
  return (
    <SelectedChartsContext.Provider value={defaultContext}>
      {children}
    </SelectedChartsContext.Provider>
  );
};

type selectedCharts = {
  selectedCharts: Item[];
  setSelected: (selectedCharts: Item[]) => void;
};
