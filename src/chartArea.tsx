import { CpuChart } from "./cpu";
import { NetworkChart } from "./network";
import { OplogChart } from "./oplog";
import { OpcountersChart } from "./opcounters";
import { useContext } from "react";
import { SelectedChartsContext } from "./selectedCharts";

export const ChartArea: React.FC = () => {
  const { selectedCharts } = useContext(SelectedChartsContext);

  return (
    <>
      {selectedCharts.map((selected) => {
        switch (selected.id) {
          case 10:
            return <NetworkChart key={selected.id} />;
          case 8:
            return <CpuChart key={selected.id} />;
          case 7:
            return <OplogChart key={selected.id} />;
          case 5:
            return <OpcountersChart key={selected.id} />;
        }
        return <></>;
      })}
    </>
  );
};
