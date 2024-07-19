import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { day: "2024-07-01", income: 186 },
  { day: "2024-07-02", income: 205 },
  { day: "2024-07-03", income: 90 },
  { day: "2024-07-04", income: 100 },
  { day: "2024-07-05", income: 80 },
  { day: "2024-07-06", income: 230 },
  { day: "2024-07-07", income: 2 },
  // Agrega más datos según sea necesario
];

function BalanceStats() {
  return (
    <ResponsiveContainer width="95%" height={200}>
      <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${new Date(value).getMonth() + 1}/${new Date(value).getDate()}`}
            />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="income" name="Ingresos" fill="#82ca9d" stroke="#82ca9d" />
          </AreaChart>
    </ResponsiveContainer>
    
  );
}

export default BalanceStats;
