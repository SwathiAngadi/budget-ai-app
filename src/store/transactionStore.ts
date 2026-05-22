import { create } from "zustand";
import { type Transaction } from "../types/transaction";
import { mockData } from "../data/mockTransactions";

type TransactionStore = {
    transactions: Transaction[];

    addTransaction: (
        transaction: Omit<Transaction, "id">
    ) => void;

    deleteTransaction: (id: string) => void;
};

export const useTransactionStore =
    create<TransactionStore>((set) => ({
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
    }));