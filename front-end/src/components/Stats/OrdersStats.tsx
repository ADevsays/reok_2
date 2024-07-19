import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


function OrderStats({ orders }: any) {
    const chartData = orders.map((order:any, index:number) => ({
        day: new Date(order.timestamp).toISOString().split('T')[0],
        income: index + 1 
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
                <Tooltip />
                <Area type="monotone" dataKey="income" name="Vehículos" fill="#82ca9d" stroke="#82ca9d" />
            </AreaChart>
        </ResponsiveContainer>

    );
}

export default OrderStats;
