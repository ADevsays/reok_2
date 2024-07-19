import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function BalanceStats({ orders }: any) {
  const chartData = orders.map((order: any) => ({
    day: new Date(order.timestamp).toISOString().split('T')[0],
    income: parseFloat(order.price) // Asegúrate de que sea un número
  }));

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
        <Tooltip
          formatter={(value: number) => value.toFixed(2)} // Redondea en el Tooltip
        />
        <Area type="monotone" dataKey="income" name="Ingresos" fill="#82ca9d" stroke="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default BalanceStats;
