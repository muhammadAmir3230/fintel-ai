import React, { useState } from 'react';

type MonthPoint = { month: string; income: number; expenses: number };
type ExpenseSlice = { name: string; amount: number; value: number; color: string };

const k = (n: number) => (n / 1000).toFixed(1) + 'k';

export const IncomeVsExpensesChart: React.FC<{ data?: MonthPoint[] }> = ({ data = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chartHeight = 180;
  const maxVal = Math.max(1, ...data.map((d) => Math.max(d.income, d.expenses)));
  const hasData = data.some((d) => d.income > 0 || d.expenses > 0);

  if (!hasData) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
        No income or expense data yet.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full select-none">
      <div className="flex items-center justify-end gap-4 mb-3 text-xs">
        <div className="flex items-center gap-1.5 font-medium text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span>Income</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-600">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span><span>Expenses</span>
        </div>
      </div>

      <div className="relative flex-1 flex items-end pb-6 pt-2">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 pr-2">
          {[1, 0.75, 0.5, 0.25, 0].map((f) => (
            <div key={f} className="w-full flex items-center gap-2">
              <span className="text-[10px] text-slate-400 w-8 text-right font-medium">{k(maxVal * f)}</span>
              <div className="flex-1 border-b border-gray-200"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full pl-10 pr-2 flex justify-between items-end h-[180px]">
          {data.map((item, idx) => {
            const incomeHeight = (item.income / maxVal) * chartHeight;
            const expenseHeight = (item.expenses / maxVal) * chartHeight;
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={item.month + idx}
                className="flex-1 flex flex-col items-center group cursor-pointer relative"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {isHovered && (
                  <div className="absolute -top-12 bg-white border border-gray-200 text-slate-800 px-3 py-1.5 rounded-xl text-xs shadow-xl font-medium z-20 flex flex-col items-center pointer-events-none">
                    <span className="text-emerald-600 font-bold">{item.month}</span>
                    <span>Income: RM {item.income.toLocaleString()}</span>
                    <span className="text-slate-500">Expenses: RM {item.expenses.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-end gap-1.5 h-full">
                  <div style={{ height: `${incomeHeight}px` }} className="w-3 md:w-4 bg-emerald-500 rounded-t-md hover:brightness-110 transition-all"></div>
                  <div style={{ height: `${expenseHeight}px` }} className="w-3 md:w-4 bg-rose-400 rounded-t-md hover:brightness-110 transition-all"></div>
                </div>
                <span className={`text-xs mt-2 font-medium ${isHovered ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ExpenseBreakdownDonut: React.FC<{ data?: ExpenseSlice[]; total?: number }> = ({ data = [], total = 0 }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const radius = 70;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;
  let acc = 0;

  if (!data.length || total <= 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
        No expense data yet.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 h-full select-none">
      <div className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          {data.map((item) => {
            const dash = `${(item.value / 100) * circumference} ${circumference}`;
            const offset = -acc * (circumference / 100);
            acc += item.value;
            const isH = hovered === item.name;
            return (
              <circle key={item.name} cx="100" cy="100" r={radius} fill="transparent"
                stroke={item.color} strokeWidth={isH ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={dash} strokeDashoffset={offset}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHovered(item.name)} onMouseLeave={() => setHovered(null)} />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-bold text-lg md:text-xl text-slate-900 tracking-tight">RM {k(total)}</span>
          <span className="text-[11px] text-slate-500 font-medium">Total Expenses</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 min-w-[150px]">
        {data.map((item) => {
          const isH = hovered === item.name;
          return (
            <div key={item.name} onMouseEnter={() => setHovered(item.name)} onMouseLeave={() => setHovered(null)}
              className={`flex items-center justify-between gap-3 text-xs p-1.5 rounded-xl cursor-pointer transition-all ${isH ? 'bg-gray-100 font-semibold' : 'text-slate-600 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-900 font-bold">{item.value}%</span>
                <span className="text-[10px] text-slate-500 block">RM {k(item.amount)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};