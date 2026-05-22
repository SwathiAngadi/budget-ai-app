import { useState } from 'react';

import SummaryCard from "../components/SummaryCard";
import ExpenseChart from "../components/ExpenseChart";
import TransactionList from "../components/TransactionList";
import { mockData } from "../data/mockTransactions";
import AddTransactionForm from "../components/AddTransactionForm";
import { type Transaction } from "../types/transaction";

export default function Dashboard() {
    // Moving AddData to parent hence to pass it to TransacationList as prop
    const [transactions, setTransactions] = useState<Transaction[]>(mockData);

    const income = transactions.filter(d => d.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions.filter(d => d.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);
    const savings = income - expenses;

    //Delete Transaction
    const deleteTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((tx) => tx.id != id))
    }

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Add Transacation Form */}
                <AddTransactionForm />
                {/* Charts & Transactions */}
                <ExpenseChart />
                <TransactionList />
            </div>
        </div>
    )
}