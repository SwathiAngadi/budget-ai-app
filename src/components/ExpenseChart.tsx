import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useTransactionStore } from "../store/transactionStore";
import { categories } from "../constants/categories";


export default function ExpenseChart() {
    const transactions = useTransactionStore((state) => state.transactions);

    const categoryMap = transactions.reduce((acc, item) => {
        if (item.type?.toLowerCase() === "expense") {
            const key = item.category?.toLowerCase().trim();
            acc[key] = (acc[key] || 0) + Number(item.amount);
        }
        return acc;
    }, {} as Record<string, number>);

    const data = categories
        .map((cat) => ({
            name: cat.label,
            value: categoryMap[cat.value] || 0,
            fill: cat.color,
        }))
        .filter((d) => d.value > 0);

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md w-full h-[300px]  min-w-[300px] ">
            <h2 className="text-center font-semibold mb-4"> Expense Breakdown</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart className="m-auto" width="100%" height='100%'>
                    <Pie data={data} dataKey="value"
                        outerRadius={100} />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )

}