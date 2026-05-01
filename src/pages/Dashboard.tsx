import SummaryCard from "../components/SummaryCard";
import ExpenseChart from "../components/ExpenseChart";
import TransactionList from "../components/TransactionList";

export default function Dashboard() {
    const income = 3000;
    const expenses = 2000;
    const savings = income - expenses;

    return (
        <div>

            <div className="bg-green-500 text-white text-3xl text-center p-10">
                <h1> Dashboard</h1>
            </div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <SummaryCard title="Income" amount={income} />
                <SummaryCard title="Expenses" amount={expenses} />
                <SummaryCard title="Savings" amount={savings} />
            </div>
            {/* Charts & Transactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ExpenseChart />
                <TransactionList />
            </div>
        </div>
    )
}