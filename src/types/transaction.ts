export type Transaction = {
    id?: string,
    name: string,
    amount: number,
    type: "income" | "expense",
    category?: string,
    date?: string,
}