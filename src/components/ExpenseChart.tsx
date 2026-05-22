import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../store/transactionStore";


export default function ExpenseChart() {
    const transactions = useTransactionStore((state) => state.transactions);
    const colorMap = {};

    const generateColor = () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 50%, 50%)`;
    }
    const categoryMap = transactions.reduce((acc, item) => {
        if (item.type === "expense") {
            acc[item.category] = (acc[item.category] || 0) + item.amount;
        }
        if (!colorMap[item.category]) {
            colorMap[item.category] = generateColor();
        }
        return acc;
    }, {});

    const data = Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value,
        fill: colorMap[name],
    }));

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md w-full h-[300px]  min-w-0">
            <h2 className="text-center font-semibold mb-4"> Expense Breakdown</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart className="m-auto" width="100%" height='100%'>
                    <Pie data={data} dataKey="value"
                        outerRadius={100} />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )

}