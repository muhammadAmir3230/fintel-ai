import React, { useState } from 'react';
import { monthlyChartData, expenseBreakdownData } from '../data/mockData';

export const IncomeVsExpensesChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = 140; // in thousands
  const chartHeight = 180;

  return (
    <div className="w-full flex flex-col h-full select-none">
      {/* Legend & Subtitle */}
      <div className="flex items-center justify-end gap-4 mb-3 text-xs">
        <div className="flex items-center gap-1.5 font-medium text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Income</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Expenses</span>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative flex-1 flex items-end pb-6 pt-2">
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 pr-2">
          {[140, 100, 60, 20, 0].map((val) => (
            <div key={val} className="w-full flex items-center gap-2">
              <span className="text-[10px] text-slate-500 w-6 text-right font-medium">{val}k</span>
              <div className="flex-1 border-b border-gray-200/80"></div>
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="relative z-10 w-full pl-8 pr-2 flex justify-between items-end h-[180px]">
          {monthlyChartData.map((item, idx) => {
            const incomeHeight = (item.income / maxVal) * chartHeight;
            const expenseHeight = (item.expenses / maxVal) * chartHeight;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-11 bg-white/95 backdrop-blur-md border border-gray-200 text-slate-800 px-3 py-1.5 rounded-xl text-xs shadow-2xl font-medium z-20 flex flex-col items-center pointer-events-none transition-all glow-indigo">
                    <span className="text-emerald-400 font-bold">{item.month} Summary</span>
                    <span className="text-slate-600">Income: RM {item.income}k</span>
                    <span className="text-slate-600">Expenses: RM {item.expenses}k</span>
                    <div className="w-2 h-2 bg-white border-r border-b border-gray-200 rotate-45 -mb-1 absolute -bottom-1"></div>
                  </div>
                )}

                {/* Bars Pair */}
                <div className="flex items-end gap-1.5 h-full">
                  {/* Income bar */}
                  <div
                    style={{ height: `${incomeHeight}px` }}
                    className="w-3 md:w-4 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md hover:brightness-125 transition-all duration-300 shadow-sm"
                  ></div>
                  {/* Expense bar */}
                  <div
                    style={{ height: `${expenseHeight}px` }}
                    className="w-3 md:w-4 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md hover:brightness-125 transition-all duration-300 shadow-sm"
                  ></div>
                </div>

                {/* X-Axis Label */}
                <span className={`text-xs mt-2 font-medium transition-colors ${
                  isHovered ? 'text-emerald-400 font-bold' : 'text-slate-500'
                }`}>
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ExpenseBreakdownDonut: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Calculate SVG Pie/Donut slices
  let accumulatedAngle = 0;
  const totalVal = 100;
  const radius = 70;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  // Sleek vibrant neon palette for categories
  const sleekColors: Record<string, string> = {
    'Rent': '#6366f1',
    'Salaries': '#a855f7',
    'Inventory': '#38bdf8',
    'Marketing': '#f43f5e',
    'Utilities': '#10b981'
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 h-full select-none">
      {/* SVG Donut */}
      <div className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          {expenseBreakdownData.map((item) => {
            const strokeDasharray = `${(item.value / totalVal) * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedAngle * (circumference / totalVal);
            accumulatedAngle += item.value;
            const isHovered = hoveredCategory === item.name;
            const color = sleekColors[item.name] || item.color;

            return (
              <circle
                key={item.name}
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredCategory(item.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              />
            );
          })}
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-bold text-lg md:text-xl text-slate-800 tracking-tight">RM 68k</span>
          <span className="text-[11px] text-slate-600 font-medium">Total Expenses</span>
        </div>
      </div>

      {/* Legend Column */}
      <div className="flex flex-col gap-2 min-w-[140px]">
        {expenseBreakdownData.map((item) => {
          const isHovered = hoveredCategory === item.name;
          const color = sleekColors[item.name] || item.color;
          return (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredCategory(item.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`flex items-center justify-between gap-3 text-xs p-1.5 rounded-xl cursor-pointer transition-all ${
                isHovered ? 'bg-gray-50/80 font-semibold scale-105 shadow-sm border border-gray-200/60' : 'text-slate-600 hover:bg-gray-50/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                ></span>
                <span className="text-slate-600">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-800 font-bold">{item.value}%</span>
                <span className="text-[10px] text-slate-600 block">RM {(item.amount / 1000).toFixed(1)}k</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
