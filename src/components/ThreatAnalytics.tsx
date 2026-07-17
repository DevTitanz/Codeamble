"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { BarChart3 } from "lucide-react";

const attackTypeData = [
  { name: 'Flash Loan', value: 45 },
  { name: 'Reentrancy', value: 25 },
  { name: 'Oracle Manipulation', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#111111', '#666666', '#a3a3a3', '#d4d4d4'];

const threatTimelineData = [
  { time: '00:00', threats: 2 },
  { time: '04:00', threats: 5 },
  { time: '08:00', threats: 12 },
  { time: '12:00', threats: 8 },
  { time: '16:00', threats: 24 },
  { time: '20:00', threats: 15 },
  { time: '24:00', threats: 6 },
];

export default function ThreatAnalytics() {
  return (
    <div className="bg-white p-6 h-full flex flex-col border border-gray-200 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold font-sans flex items-center gap-2 text-gray-900">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          Threat Analytics
        </h2>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
        
        {/* Area Chart: Threat Timeline */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-4 tracking-wider">Threat Timeline (24h)</p>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatTimelineData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                <XAxis dataKey="time" stroke="#a3a3a3" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#a3a3a3" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e5e5', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#111', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="threats" stroke="#111" fillOpacity={0.1} fill="#111" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Attack Types */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center">
          <div className="flex-1">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-wider">Attack Vectors Blocked</p>
            <div className="space-y-2 mt-4">
              {attackTypeData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-gray-600 font-medium">{entry.name}</span>
                  <span className="ml-auto font-mono font-bold text-gray-900">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-28 h-28 ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attackTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={45}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {attackTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e5e5', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  itemStyle={{ color: '#111', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
