import React from "react";
import { DashboardAsideNav, DashboardContent, Layout } from "../../components";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard">
        <DashboardAsideNav />
        <DashboardContent />
        <aside className="aside-right">aside-right</aside>
      </div>
    </Layout>
  );
};

export default Dashboard;
