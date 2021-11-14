import React from "react";
import {
  DashboardAsideInfo,
  DashboardAsideNav,
  DashboardContent,
  Layout,
} from "../../components";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard">
        <DashboardAsideNav />
        <DashboardContent />
        <DashboardAsideInfo />
      </div>
    </Layout>
  );
};

export default Dashboard;
