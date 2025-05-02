
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const StatusMonitor = () => {
  const data = [
    { name: '00:00', threats: 4 },
    { name: '04:00', threats: 3 },
    { name: '08:00', threats: 7 },
    { name: '12:00', threats: 2 },
    { name: '16:00', threats: 6 },
    { name: '20:00', threats: 4 },
    { name: '24:00', threats: 5 },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Line
            type="monotone"
            dataKey="threats"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusMonitor;
