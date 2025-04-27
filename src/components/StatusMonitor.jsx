
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const StatusMonitor = () => {
  const data = [
    { name: '00:00', threats: 4, resolved: 3 },
    { name: '04:00', threats: 3, resolved: 3 },
    { name: '08:00', threats: 7, resolved: 5 },
    { name: '12:00', threats: 2, resolved: 2 },
    { name: '16:00', threats: 6, resolved: 4 },
    { name: '20:00', threats: 4, resolved: 3 },
    { name: '24:00', threats: 5, resolved: 4 },
  ];

  return (
    <div className="w-full h-[300px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-xl -z-10"></div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF" 
            tick={{ fill: '#9CA3AF' }}
            axisLine={{ stroke: '#4B5563' }} 
          />
          <YAxis 
            stroke="#9CA3AF" 
            tick={{ fill: '#9CA3AF' }}
            axisLine={{ stroke: '#4B5563' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(17, 24, 39, 0.9)', 
              borderColor: '#4B5563',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            labelStyle={{ color: '#F9FAFB' }}
            itemStyle={{ color: '#F9FAFB' }}
          />
          <Legend 
            iconType="circle"
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span style={{ color: '#E5E7EB' }}>{value}</span>}
          />
          <Line 
            type="monotone" 
            dataKey="threats" 
            name="Threats Detected"
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 8, fill: '#60A5FA', stroke: '#1E3A8A' }}
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="resolved" 
            name="Threats Resolved"
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ fill: '#10B981', r: 4 }}
            activeDot={{ r: 8, fill: '#34D399', stroke: '#065F46' }}
            animationDuration={2000}
            animationBegin={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusMonitor;
