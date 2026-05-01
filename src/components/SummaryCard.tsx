
export default function SummaryCard({ title, amount }: Props) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-4 w-full">
            <h3 className="text-gray-500 text-sm">{title}</h3>
            <p className="text-2xl font-semibold mt-2">${amount}</p>
        </div>
    )
}
type Props = {
    title: string,
    amount: number
}