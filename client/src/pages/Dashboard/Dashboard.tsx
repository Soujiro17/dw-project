import React from "react";
import { DashboardContent, Layout } from "../../components";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard">
        <aside className="aside-nav">aside-nav</aside>
        <DashboardContent />
        <aside className="aside-right">aside-right</aside>
      </div>
    </Layout>
  );
};

export default Dashboard;
