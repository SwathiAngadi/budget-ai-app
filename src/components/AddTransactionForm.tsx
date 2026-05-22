import { useForm } from 'react-hook-form';
import { type Transaction } from '../types/transaction';
import { useTransactionStore } from '../store/transactionStore';

export default function AddTransactionForm() {

    const { register, handleSubmit } = useForm<Transaction>();
    const addTransaction = useTransactionStore(
        (state) => state.addTransaction
    );

    const onSub = (data: Transaction) => {
        addTransaction(data);
    }

    return (
        <div className='bg-white shadow-md rounded-2xl p-6 max-w-md w-full mx-auto'>
            <h2 className='text-l font-semibold p-2 m-2'>Add Transactions</h2>
            <form className='space-y-4' onSubmit={handleSubmit(onSub)}>
                <input className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="name" {...register('name')} />
                <input className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder='amount' type='number' {...register("amount", { valueAsNumber: true })} />
                <select className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("type")}>
                    <option value="Food">Food</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Investment">Investment</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Health">Health</option>
                    <option value="Housing">Housing</option>
                    <option value="Job">Job</option>
                </select>
                <select className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("type")}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <button className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition'>Add</button>
            </form>
        </div>
    )
}