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
  command: number | null | undefined;
  query: number | null | undefined;
  update: number | null | undefined;
  delete: number | null | undefined;
  getmore: number | null | undefined;
  insert: number | null | undefined;
}

export const OpcountersChart: React.FC<Props> = () => {
  const [hideCommand, setHideCommand] = useState(false);
  const [hideQuery, setHideQuery] = useState(false);
  const [hideUpdate, setHideUpdate] = useState(false);
  const [hideDelete, setHideDelete] = useState(false);
  const [hideGetmore, setHideGetmore] = useState(false);
  const [hideInsert, setHideInsert] = useState(false);

  const realData = data.metrics.status["fixed-opcounters-chart"];
  const toPlot: datapoint[] = [];
  for (let i = 0; i < 200; i++) {
    toPlot.push({
      ts: data.meta.window.since + i * 20000,
      command: realData?.[0]?.["command"]?.[i],
      query: realData?.[1]?.["query"]?.[i],
      update: realData?.[2]?.["update"]?.[i],
      delete: realData?.[3]?.["delete"]?.[i],
      getmore: realData?.[4]?.["getmore"]?.[i],
      insert: realData?.[4]?.["insert"]?.[i],
    });
  }

  const dateFormatter = (value: number) => {
    return new Date(value).toLocaleTimeString();
  };

  const onClick = (data: Payload) => {
    switch (data.value) {
      case "Command":
        setHideCommand(!hideCommand);
        return;
      case "Query":
        setHideQuery(!hideQuery);
        return;
      case "Update":
        setHideUpdate(!hideUpdate);
        return;
      case "Delete":
        setHideDelete(!hideDelete);
        return;
      case "Getmore":
        setHideGetmore(!hideGetmore);
        return;
      case "Insert":
        setHideInsert(!hideInsert);
        return;
    }
  };

  return (
    <div>
      <H3>Opcounters</H3>
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
          <Tooltip animationDuration={0} content={<OpcountersTooltip />} />
          <Legend onClick={onClick} />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideCommand}
            dot={false}
            type="monotone"
            dataKey="command"
            stroke="#1A567E"
            activeDot={{ r: 8 }}
            name="Command"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideQuery}
            dot={false}
            type="monotone"
            dataKey="query"
            stroke="#09804C"
            name="Query"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideUpdate}
            dot={false}
            type="monotone"
            dataKey="update"
            stroke="#B1371F"
            name="Update"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideDelete}
            dot={false}
            type="monotone"
            dataKey="delete"
            stroke="#86681D"
            name="Delete"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideGetmore}
            dot={false}
            type="monotone"
            dataKey="getmore"
            stroke="#5D6C74"
            name="Getmore"
          />
          <Line
            connectNulls
            animationDuration={500}
            hide={hideInsert}
            dot={false}
            type="monotone"
            dataKey="insert"
            stroke="#0D324F"
            name="Insert"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const OpcountersTooltip: React.FC<TooltipProps<number, number>> = (props) => {
  const { active } = props;
  if (active) {
    return (
      <>
        {/* @ts-expect-error */}
        <StyledCard>
          <div>Command: {props.payload?.[0]?.value?.toPrecision(4)}</div>
          <div>Query: {props.payload?.[1]?.value?.toPrecision(4)}</div>
          <div>Update: {props.payload?.[2]?.value?.toPrecision(4)}</div>
          <div>Delete: {props.payload?.[3]?.value?.toPrecision(4)}</div>
          <div>Getmore: {props.payload?.[4]?.value?.toPrecision(4)}</div>
          <div>Insert: {props.payload?.[5]?.value?.toPrecision(4)}</div>
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
