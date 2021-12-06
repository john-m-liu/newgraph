import styled from "@emotion/styled";
import { SideNav, SideNavItem } from "@leafygreen-ui/side-nav";
import { Breadcrumb } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import "./App.css";
import "./cpu";
import { CpuChart } from "./cpu";
import { NetworkChart } from "./network";
import { OplogChart } from "./oplog";
import { SettingsMenu } from "./menu";
import { OpcountersChart } from "./opcounters";
import { H2 } from "@leafygreen-ui/typography";
import { Tab, Tabs } from "@leafygreen-ui/tabs";
import Badge from "@leafygreen-ui/badge";

function App() {
  return (
    <StyledDiv>
      <StyledSidenav>
        <SideNavItem>Projects</SideNavItem>
        <SideNavItem>Alerts</SideNavItem>
        <SideNavItem>Activity Feed</SideNavItem>
        <SideNavItem>Settings</SideNavItem>
        <SideNavItem>Integrations</SideNavItem>
        <SideNavItem>Access Manager</SideNavItem>
        <SideNavItem>Support</SideNavItem>
      </StyledSidenav>
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
        <p>
          {/* @ts-expect-error */}
          <StyledH2>db-dev-5.us-east-1.aws.cloud-dev.10gen.cc:27201</StyledH2>
          <StyledBadge variant="darkgray">Primary</StyledBadge>
        </p>
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
          <CpuChart />
          <NetworkChart />
          <OplogChart />
          <OpcountersChart />
        </div>
        <SettingsMenu />
      </MainArea>
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
