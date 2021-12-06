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
  in: number | null | undefined;
  out: number | null | undefined;
  maxIn: number | null | undefined;
  maxOut: number | null | undefined;
}

export const NetworkChart: React.FC<Props> = () => {
  const [hideIn, setHideIn] = useState(false);
  const [hideOut, setHideOut] = useState(false);
  const [hideMaxIn, setHideMaxIn] = useState(false);
  const [hideMaxOut, setHideMaxOut] = useState(false);

  const realData = data.metrics.process["system-network"];
  const toPlot: datapoint[] = [];
  for (let i = 0; i < 41; i++) {
    toPlot.push({
      ts: data.meta.window.since + i * 90000,
      in: realData?.[0]?.["bytes in"]?.[i],
      out: realData?.[1]?.["bytes out"]?.[i],
      maxIn: realData?.[2]?.["max bytes in"]?.[i],
      maxOut: realData?.[3]?.["max bytes out"]?.[i],
    });
  }

  const dateFormatter = (value: number) => {
    return new Date(value).toLocaleTimeString();
  };

  const onClick = (data: Payload) => {
    switch (data.value) {
      case "Bytes In":
        setHideIn(!hideIn);
        return;
      case "Bytes Out":
        setHideOut(!hideOut);
        return;
      case "Max Bytes In":
        setHideMaxIn(!hideMaxIn);
        return;
      case "Max Bytes Out":
        setHideMaxOut(!hideMaxOut);
        return;
    }
  };

  return (
    <div>
      <H3>System Network</H3>
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
          <Tooltip animationDuration={0} content={<NetworkTooltip />} />
          <Legend onClick={onClick} />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideIn}
            dot={false}
            type="monotone"
            dataKey="in"
            stroke="#1A567E"
            activeDot={{ r: 8 }}
            name="Bytes In"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideOut}
            dot={false}
            type="monotone"
            dataKey="out"
            stroke="#09804C"
            name="Bytes Out"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideMaxIn}
            dot={false}
            type="monotone"
            dataKey="maxIn"
            stroke="#B1371F"
            name="Max Bytes In"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideMaxOut}
            dot={false}
            type="monotone"
            dataKey="maxOut"
            stroke="#86681D"
            name="Max Bytes Out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const NetworkTooltip: React.FC<TooltipProps<number, number>> = (props) => {
  const { active } = props;
  if (active) {
    return (
      <>
        {/* @ts-expect-error */}
        <StyledCard>
          <div>in: {props.payload?.[0]?.value?.toPrecision(4)} bytes/sec</div>
          <div>out: {props.payload?.[1]?.value?.toPrecision(4)} bytes/sec</div>
          <div>
            max in: {props.payload?.[2]?.value?.toPrecision(4)} bytes/sec
          </div>
          <div>
            max out: {props.payload?.[3]?.value?.toPrecision(4)} bytes/sec
          </div>
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
