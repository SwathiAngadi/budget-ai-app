import { useState } from 'react';

import SummaryCard from "../components/SummaryCard";
import ExpenseChart from "../components/ExpenseChart";
import TransactionList from "../components/TransactionList";
import AddTransactionForm from "../components/AddTransactionForm";
import { useTransactionStore } from '../store/transactionStore';

export default function Dashboard() {
    const transactions = useTransactionStore((state) => state.transactions);

    const income = transactions.filter(d => d.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions.filter(d => d.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);
    const savings = income - expenses;

    return (
        <div className=' flex flex-col gap-3 overflow-x-auto'>
            <div className="bg-green-500 text-white text-3xl text-center p-10">
                <h1> Dashboard</h1>
            </div>
            {/* Summary Cards */}
            <div className="flex gap-3">
                <SummaryCard title="Income" amount={income} />
                <SummaryCard title="Expenses" amount={expenses} />
                <SummaryCard title="Savings" amount={savings} />
            </div>

            <div className="flex gap-6">
                {/* Add Transacation Form */}
                <AddTransactionForm />
                {/* Charts & Transactions */}
                <ExpenseChart />
                <TransactionList />
            </div>
        </div>
    )
}