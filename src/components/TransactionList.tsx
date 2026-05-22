import { useState } from "react";
import { useTransactionStore } from "../store/transactionStore";
import { categories } from "../constants/categories";
import { type Transaction } from "../types/transaction";


export default function TransactionList() {
    const transactions = useTransactionStore((state) => state.transactions);

    const deleteTransaction = useTransactionStore(
        (state) => state.deleteTransaction
    );

    const updateTransaction = useTransactionStore(
        (state) => state.updateTransaction
    );

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [editedTransaction, setEditedTransaction] =
        useState<Transaction | null>(null);

    const handleEdit = (tx: Transaction) => {
        setEditingId(tx.id);
        setEditedTransaction(tx);
    };

    const handleSave = () => {
        if (editedTransaction) {
            updateTransaction(editedTransaction);
            setEditingId(null);
            setEditedTransaction(null);
        }
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-semibold mb-4">
                Recent Transactions
            </h3>

            {transactions.map((tx) => (
                <div className="flex items-center justify-between gap-3 py-3 border-b "
                    key={tx.id}

                >
                    {editingId === tx.id ? (
                        < div className="flex flex-col justify-between ">
                            <div className="flex items-center justify-between gap-2 py-3">
                                <input
                                    className="border p-1 rounded"
                                    value={editedTransaction?.name || ""}
                                    onChange={(e) =>
                                        setEditedTransaction((prev) =>
                                            prev
                                                ? {
                                                    ...prev,
                                                    name: e.target.value,
                                                }
                                                : null
                                        )
                                    }
                                />

                                <input
                                    type="number"
                                    className="border p-1 rounded w-24"
                                    value={editedTransaction?.amount || 0}
                                    onChange={(e) =>
                                        setEditedTransaction((prev) =>
                                            prev
                                                ? {
                                                    ...prev,
                                                    amount: Number(
                                                        e.target.value
                                                    ),
                                                }
                                                : null
                                        )
                                    }
                                />

                                <select
                                    className="border p-1 rounded"
                                    value={
                                        editedTransaction?.category || ""
                                    }
                                    onChange={(e) =>
                                        setEditedTransaction((prev) =>
                                            prev
                                                ? {
                                                    ...prev,
                                                    category: e.target.value,
                                                }
                                                : null
                                        )
                                    }
                                >
                                    {categories.map((cat) => (
                                        <option
                                            key={cat.value}
                                            value={cat.value}
                                        >
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-between gap-3 py-3">
                                <button
                                    className="bg-green-500 text-white px-3 py-2 rounded"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>

                                <button
                                    className="bg-gray-400 text-white px-3 py-2 rounded"
                                    onClick={() => {
                                        setEditingId(null);
                                        setEditedTransaction(null);
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between gap-3 py-3 ">
                                <p className="font-medium">
                                    {tx.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {tx.category}
                                </p>
                            </div>

                            <p
                                className={`font-semibold ${tx.type === "expense"
                                    ? "text-red-500"
                                    : "text-green-500"
                                    }`}
                            >
                                {tx.type === "expense"
                                    ? "-"
                                    : "+"}
                                $
                                {Math.abs(tx.amount)}
                            </p>

                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-3 py-2 rounded"
                                    onClick={() => handleEdit(tx)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="bg-red-500 text-white px-3 py-2 rounded"
                                    onClick={() =>
                                        deleteTransaction(tx.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}