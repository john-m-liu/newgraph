import IconButton from "@leafygreen-ui/icon-button";
import { Menu } from "@leafygreen-ui/menu";
/* @ts-expect-error */
import { Tools32 } from "@carbon/icons-react";
import styled from "@emotion/styled";
import Card from "@leafygreen-ui/card";
import DatePicker from "antd/lib/date-picker";
import { Label } from "@leafygreen-ui/typography";
import { TimePicker } from "antd";
import Button from "@leafygreen-ui/button";
import {
  SegmentedControl,
  SegmentedControlOption,
} from "@leafygreen-ui/segmented-control";
import Toggle from "@leafygreen-ui/toggle";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./container";
import SelectSearch, {
  fuzzySearch,
  SelectSearchOption,
} from "react-select-search";
import { chartOptions } from "./availableCharts";
import { useState } from "react";
import update from "immutability-helper";

interface Props {}

export const SettingsMenu: React.FC<Props> = () => {
  const [selectedCharts, setSelected] = useState([
    {
      id: 8,
      text: "Process CPU",
    },
    {
      id: 10,
      text: "System Network",
    },
    {
      id: 7,
      text: "Oplog GB/Hour",
    },
    {
      id: 5,
      text: "Opcounters",
    },
  ]);
  const deleteCard = (index: number) => {
    setSelected(
      selectedCharts.slice(0, index).concat(selectedCharts.slice(index + 1))
    );
  };
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = selectedCharts[dragIndex];
    setSelected(
      update(selectedCharts, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
    );
  };

  const triggerButton = (
    /* @ts-expect-error */
    <FloatingButton>
      <Wrench />
    </FloatingButton>
  );
  let selectOptions: SelectSearchOption[] = [];
  chartOptions.forEach((option) => {
    for (let selected of selectedCharts) {
      if (selected.id === option.id) {
        return;
      }
    }
    selectOptions.push({
      name: option.text,
      value: option.id,
    });
  });
  return (
    <StyledMenu align="top" trigger={triggerButton}>
      {/* @ts-expect-error */}
      <StyledCard>
        <Buttons>
          {/* @ts-expect-error */}
          <ButtonPadding size="small">Past Hour</ButtonPadding>
          {/* @ts-expect-error */}
          <ButtonPadding size="small">Past Day</ButtonPadding>
          {/* @ts-expect-error */}
          <ButtonPadding size="small">Past Week</ButtonPadding>
        </Buttons>
        <Form>
          <FormLabel htmlFor={""}>Start:</FormLabel>
          <DateTimeDiv>
            <DatePicker placeholder="Start date" />
            <TimePicker placeholder="Start time" />
          </DateTimeDiv>
          <FormLabel htmlFor={""}>End:</FormLabel>
          <DateTimeDiv>
            <DatePicker placeholder="End date" />
            <TimePicker placeholder="End time" />
          </DateTimeDiv>
          <FormLabel htmlFor={""}>Data Density:</FormLabel>
          <SegmentedControl
            name="density"
            size="small"
            darkMode={false}
            followFocus={true}
            defaultValue="2"
          >
            <SegmentedControlOption value="1">Low</SegmentedControlOption>
            <SegmentedControlOption value="2">Medium</SegmentedControlOption>
            <SegmentedControlOption value="3">High</SegmentedControlOption>
          </SegmentedControl>
          <FormLabel htmlFor={""}>Annotations:</FormLabel>
          <AnnotationsToggle size="small" aria-labelledby="" />
        </Form>
        <FormLabel htmlFor={""}>Selected Charts:</FormLabel>
        <br />
        <SelectSearch
          options={selectOptions}
          search
          placeholder="Add a chart"
          filterOptions={fuzzySearch}
          emptyMessage="No chart found"
          onChange={(v) => {
            const selected = (v as unknown) as number;
            for (let option of chartOptions) {
              if (option.id === selected) {
                setSelected(selectedCharts.concat(option));
              }
            }
          }}
        />
        <DndProvider backend={HTML5Backend}>
          <Container
            selected={selectedCharts}
            deselect={deleteCard}
            move={moveCard}
          />
        </DndProvider>
      </StyledCard>
    </StyledMenu>
  );
};

/* @ts-expect-error */
const FloatingButton = styled(IconButton)`
  position: fixed;
  left: 95%;
  top: 92%;
`;

/* @ts-expect-error */
const StyledCard = styled(Card)`
  padding: 16px 18px 6px 14px;
  height: 480px;
`;

/* @ts-expect-error */
const StyledMenu = styled(Menu)`
  position: relative;
  width: 380px;
`;

const DateTimeDiv = styled.div`
  display: grid;
  grid-template-columns: 130px 110px;
  padding-bottom: 10px;
`;

const FormLabel = styled(Label)`
  padding-top: 7px;
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 110px 160px;
  padding-bottom: 6px;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px;
  padding: 0px 5px 8px 5px;
`;

/* @ts-expect-error */
const ButtonPadding = styled(Button)`
  margin: 0 3px;
`;

/* @ts-expect-error */
const AnnotationsToggle = styled(Toggle)`
  margin-top: 5px;
`;

const Wrench = styled(Tools32)`
  fill: black;
`;
