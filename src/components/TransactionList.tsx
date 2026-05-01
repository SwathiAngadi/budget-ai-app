const mockTransactions: Transaction[] = [
    { id: "1", title: "Groceries", amount: -120, date: "Apr 10" },
    { id: "2", title: "Salary", amount: 3000, date: "Apr 01" },
    { id: "3", title: "Uber", amount: -25, date: "Apr 11" },
];
export default function TransactionList() {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-semibold mb-4">Recent Transactions</h3>

            {mockTransactions.map((tx) => (
                <div
                    key={tx.id}
                    className="flex justify-between items-center py-2 border-b last:border-none"
                >
                    <div>
                        <p className="font-medium">{tx.title}</p>
                        <p className="text-sm text-gray-500">{tx.date}</p>
                    </div>
                    <p
                        className={`font-semibold ${tx.amount < 0 ? "text-red-500" : "text-green-500"
                            }`}
                    >
                        {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount)}
                    </p>
                </div>
            ))}
        </div>
    );
}
type Transaction = {
    id: string;
    title: string;
    amount: number;
    date: string;
};
