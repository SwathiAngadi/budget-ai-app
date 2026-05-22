import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { type Transaction } from "../types/transaction";
import { mockData } from "../data/mockTransactions";

type TransactionStore = {
    transactions: Transaction[];

    addTransaction: (
        transaction: Omit<Transaction, "id">
    ) => void;

    deleteTransaction: (id: string) => void;

    updateTransaction: (
        updateTransaction: Transaction
    ) => void;
};

export const useTransactionStore =
    create<TransactionStore>()(
        persist((set) => ({
            transactions: mockData,

            addTransaction: (transaction) =>
                set((state) => ({
                    transactions: [
                        ...state.transactions,
                        {
                            ...transaction,
                            id: crypto.randomUUID(),
                        },
                    ],
                })),

            deleteTransaction: (id) =>
                set((state) => ({
                    transactions: state.transactions.filter(
                        (tx) => tx.id !== id
                    ),
                })),
            updateTransaction: (updateTransaction) =>
                set((state) => ({
                    transactions: state.transactions.map((tx) => tx.id === updateTransaction.id ? updateTransaction : tx)
                }))
        }),
            {
                name: "transaction-storage",
            }
        )

    );