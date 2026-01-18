"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// 自定义 Tooltip 样式
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 shadow-xl">
        <p className="text-zinc-400 text-xs mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 流量趋势图
interface TrendChartProps {
  data: { name: string; views: number; likes: number }[];
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
        <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} />
        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ paddingTop: "10px" }}
          formatter={(value) => <span className="text-zinc-400 text-sm">{value}</span>}
        />
        <Area
          type="monotone"
          dataKey="views"
          name="访问量"
          stroke="#8B5CF6"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorViews)"
        />
        <Area
          type="monotone"
          dataKey="likes"
          name="点赞数"
          stroke="#EC4899"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorLikes)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// 文章统计柱状图
interface BarChartProps {
  data: { name: string; value: number; color: string }[];
}

export function StatsBarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
        <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} />
        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" name="数量" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// 内容分布饼图
interface PieChartProps {
  data: { name: string; value: number; color: string }[];
}

export function ContentPieChart({ data }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width={160} height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex-1 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-zinc-400">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-white">{item.value}</span>
              <span className="text-xs text-zinc-500 ml-1">
                ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 环形进度指示器
interface ProgressRingProps {
  value: number;
  max: number;
  label: string;
  color: string;
}

export function ProgressRing({ value, max, label, color }: ProgressRingProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#27272a"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{Math.round(percentage)}%</span>
        </div>
      </div>
      <span className="text-sm text-zinc-400 mt-2">{label}</span>
      <span className="text-xs text-zinc-500">
        {value.toLocaleString()} / {max.toLocaleString()}
      </span>
    </div>
  );
}

// 热力指示条
interface HeatBarProps {
  items: { label: string; value: number; max: number; color: string }[];
}

export function HeatBar({ items }: HeatBarProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const percentage = item.max > 0 ? (item.value / item.max) * 100 : 0;
        return (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-zinc-400">{item.label}</span>
              <span className="text-sm font-medium text-white">{item.value.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${Math.min(percentage, 100)}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
