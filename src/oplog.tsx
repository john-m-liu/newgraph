import { H3 } from "@leafygreen-ui/typography";
import React from "react";
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
import { data } from "./data";
import styled from "@emotion/styled";
import Card from "@leafygreen-ui/card";

interface Props {}

interface datapoint {
  ts: number;
  oplog: number | null | undefined;
}

export const OplogChart: React.FC<Props> = () => {
  const realData = data.metrics.status["oplog-rate-chart"];
  const toPlot: datapoint[] = [];
  for (let i = 0; i < 41; i++) {
    toPlot.push({
      ts: data.meta.window.since + i * 90000,
      oplog: realData?.[0]?.["oplog gb/hour"]?.[i],
    });
  }
  console.log(toPlot)

  const dateFormatter = (value: number) => {
    return new Date(value).toLocaleTimeString();
  };

  return (
    <div>
      <H3>Oplog GB/Hour</H3>
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
          <Tooltip animationDuration={0} content={<OplogTooltip />} />
          <Legend />
          <Line
            connectNulls
            animationDuration={500}
            dot={false}
            type="monotone"
            dataKey="oplog"
            stroke="#1A567E"
            activeDot={{ r: 8 }}
            name="Oplog GB/Hour"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const OplogTooltip: React.FC<TooltipProps<number, number>> = (props) => {
  const { active } = props;
  if (active) {
    return (
      <>
        {/* @ts-expect-error */}
        <StyledCard>
          <div>Oplog: {props.payload?.[0]?.value?.toPrecision(4)} GB/hr</div>
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
