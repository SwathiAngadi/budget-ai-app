import { useTransactionStore } from "../store/transactionStore";

export default function TransactionList() {
    const transactions = useTransactionStore((state) => state.transactions);
    const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);


    return (
        <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-semibold mb-4">Recent Transactions</h3>

            {transactions.map((tx) => (
                <div
                    key={tx.id}
                    className="flex justify-between items-center py-2 border-b last:border-none"
                >
                    <div>
                        <p className="font-medium">{tx.name}</p>
                        <p className="text-sm text-gray-500">{tx.date}</p>
                    </div>
                    <p
                        className={`font-semibold ${tx.type === 'expense' ? "text-red-500" : "text-green-500"
                            }`}
                    >
                        {tx.type === 'expense' ? "-" : "+"}${Math.abs(tx.amount)}
                    </p>
                    <button className="bg-red-500 p-2 border-gray-300 rounded text-white m-1"
                        onClick={() => deleteTransaction(tx.id)}> Delete</button>
                </div>
            ))}
        </div>
    );
}

