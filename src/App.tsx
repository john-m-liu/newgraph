import styled from "@emotion/styled";
import { SideNav, SideNavItem } from "@leafygreen-ui/side-nav";
import { Breadcrumb } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import "./App.css";
import "./cpu";
import { ChartArea } from "./chartArea";
import { SettingsMenu } from "./menu";
import { SelectedChartsContext } from "./selectedCharts";
import { H2 } from "@leafygreen-ui/typography";
import { Tab, Tabs } from "@leafygreen-ui/tabs";
import Badge from "@leafygreen-ui/badge";
import { useState } from "react";

function App() {
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
  return (
    <StyledDiv>
      <StyledSidenav aria-labelledby="a">
        <SideNavItem>Projects</SideNavItem>
        <SideNavItem>Alerts</SideNavItem>
        <SideNavItem>Activity Feed</SideNavItem>
        <SideNavItem>Settings</SideNavItem>
        <SideNavItem>Integrations</SideNavItem>
        <SideNavItem>Access Manager</SideNavItem>
        <SideNavItem>Support</SideNavItem>
      </StyledSidenav>
      <SelectedChartsContext.Provider value={{ selectedCharts, setSelected }}>
        <MainArea>
          <StyledBreadcrumb>
            <BreadcrumbItem>
              <a href="#">Cloud Dev Backing DBs</a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <a href="#">Cloud-Dev</a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <a href="#">AppDB_1</a>
            </BreadcrumbItem>
          </StyledBreadcrumb>
          {/* @ts-expect-error */}
          <StyledH2>db-dev-5.us-east-1.aws.cloud-dev.10gen.cc:27201</StyledH2>
          <StyledBadge variant="darkgray">Primary</StyledBadge>
          <Tabs aria-labelledby="1">
            <Tab name="Overview"></Tab>
            <Tab name="MongoDB Metrics"></Tab>
            <Tab name="Hardware Metrics"></Tab>
            <Tab name="DB-Level Metrics"></Tab>
            <Tab name="Real-Time Stats"></Tab>
            <Tab name="Performance Profiler"></Tab>
            <Tab name="Performance Advisor"></Tab>
          </Tabs>
          <div className="App">
            <ChartArea />
          </div>
          <SettingsMenu
            selectedCharts={selectedCharts}
            setSelected={setSelected}
          />
        </MainArea>
      </SelectedChartsContext.Provider>
    </StyledDiv>
  );
}

export default App;

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-left: 10px;
`;
const StyledSidenav = styled(SideNav)`
  height: 900px;
`;
const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 90px 1600px;
`;
const MainArea = styled.div`
  margin-left: 100px;
`;
/* @ts-expect-error */
const StyledH2 = styled(H2)`
  padding-top: 6px;
  padding-bottom: 10px;
  margin-left: 8px;
  float: left;
`;
const StyledBadge = styled(Badge)`
  margin-top: 17px;
  margin-left: 10px;
`;
