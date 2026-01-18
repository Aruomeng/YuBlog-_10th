"use client";

import {
  TrendChart,
  ContentPieChart,
  HeatBar,
} from "@/components/admin/dashboard-charts";

interface DashboardChartsProps {
  type: "trend" | "pie" | "heatbar";
  data: any;
}

export function DashboardCharts({ type, data }: DashboardChartsProps) {
  switch (type) {
    case "trend":
      return <TrendChart data={data} />;
    case "pie":
      return <ContentPieChart data={data} />;
    case "heatbar":
      return <HeatBar items={data} />;
    default:
      return null;
  }
}
