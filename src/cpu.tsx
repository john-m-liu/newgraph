import { H3 } from "@leafygreen-ui/typography";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { data } from "./data";
import styled from "@emotion/styled";
import Card from "@leafygreen-ui/card";

interface Props {}

interface datapoint {
  ts: number;
  user: number | null | undefined;
  kernel: number | null | undefined;
  childrenUser: number | null | undefined;
  childrenKernel: number | null | undefined;
}

export const CpuChart: React.FC<Props> = () => {
  const [hideUser, setHideUser] = useState(false);
  const [hideKernel, setHideKernel] = useState(false);
  const [hideChildrenKernel, sethideChildrenKernel] = useState(false);
  const [hideChildrenUser, sethideChildrenUser] = useState(false);

  const realData = data.metrics.process["normalized-process-cpu"];
  const toPlot: datapoint[] = [];
  for (let i = 0; i < 41; i++) {
    toPlot.push({
      ts: data.meta.window.since + i * 90000,
      user: realData?.[0]?.user?.[i],
      kernel: realData?.[1]?.kernel?.[i],
      childrenKernel: realData?.[3]?.["children kernel"]?.[i],
      childrenUser: realData?.[2]?.["children user"]?.[i],
    });
  }

  const dateFormatter = (value: number) => {
    return new Date(value).toLocaleTimeString();
  };

  const onClick = (data: Payload) => {
    switch (data.value) {
      case "Kernel":
        setHideKernel(!hideKernel);
        return;
      case "User":
        setHideUser(!hideUser);
        return;
      case "Children Kernel":
        sethideChildrenKernel(!hideChildrenKernel);
        return;
      case "Children User":
        sethideChildrenUser(!hideChildrenUser);
        return;
    }
  };

  return (
    <div>
      <H3>Process CPU</H3>
      <ResponsiveContainer width="90%" height={380}>
        <LineChart
          width={500}
          height={300}
          data={toPlot}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="ts"
            scale="time"
            tickFormatter={dateFormatter}
            domain={[data.meta.window.since, data.meta.window.until]}
          />
          <YAxis />
          <Tooltip animationDuration={0} content={<CpuTooltip />} />
          <Legend onClick={onClick} />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideUser}
            dot={false}
            type="monotone"
            dataKey="user"
            stroke="#1A567E"
            activeDot={{ r: 8 }}
            name="User"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideKernel}
            dot={false}
            type="monotone"
            dataKey="kernel"
            stroke="#09804C"
            name="Kernel"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideChildrenUser}
            dot={false}
            type="monotone"
            dataKey="childrenUser"
            stroke="#B1371F"
            name="Children User"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideChildrenKernel}
            dot={false}
            type="monotone"
            dataKey="childrenKernel"
            stroke="#86681D"
            name="Children Kernel"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CpuTooltip: React.FC<TooltipProps<number, number>> = (props) => {
  const { active } = props;
  if (active) {
    return (
      <>
        {/* @ts-expect-error */}
        <StyledCard>
          <div>User: {props.payload?.[0]?.value?.toPrecision(4)}%</div>
          <div>Kernel: {props.payload?.[1]?.value?.toPrecision(4)}%</div>
          <div>Children User: {props.payload?.[2]?.value?.toPrecision(4)}%</div>
          <div>Children Kernel: {props.payload?.[3]?.value?.toPrecision(4)}%</div>
          <div>{new Date(props.label).toLocaleTimeString()}</div>
        </StyledCard>
      </>
    );
  }
  return null;
};

/* @ts-expect-error */
const StyledCard = styled(Card)`
  padding: 10px 8px 10px 8px;
`;
