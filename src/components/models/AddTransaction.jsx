import { useState } from "react";
import { mockApi } from "../../lib/mockApi";
import { categoryColors } from "../../lib/categoryColors";
import { motion } from "framer-motion";

export default function AddTransaction({ setTransactions, setShowModal }) {

    const [form, setForm] = useState({ name: '', category: '', date: new Date().toISOString().split('T')[0], amount: '', type: 'expense' });

    const handleAdd = async () => {
        if (!form.name || !form.category || !form.date || !form.amount) return;
        const newItem = await mockApi.create({
            ...form,
            amount: form.type === 'expense' ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount)),
        });
        setTransactions(prev => [newItem, ...prev]);
        setShowModal(false);
        setForm({ name: '', category: '', date: new Date().toISOString().split('T')[0], amount: '', type: 'expense' });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-5">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-[var(--surface-1)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-md flex flex-col gap-4">

                <h2 className="text-[var(--text-primary)] font-semibold text-lg">Add Transaction</h2>

                <div className="flex gap-1 items-center bg-[var(--surface-2)] h-10 rounded-xl p-1">
                    <button
                        type="button"
                        onClick={() => setForm({ ...form, type: 'expense' })}
                        className={`flex-1 h-full rounded-lg text-sm font-medium transition-all duration-200 ${form.type === 'expense'
                            ? 'bg-red-500/20 text-red-400'
                            : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                            }`}>
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => setForm({ ...form, type: 'income' })}
                        className={`flex-1 h-full rounded-lg text-sm font-medium transition-all duration-200 ${form.type === 'income'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                            }`}>
                        Income
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="h-10 px-4 bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] rounded-xl text-sm outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-muted)]"
                />

                <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="h-10 px-4 bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] rounded-xl text-sm outline-none focus:border-[var(--accent)]">
                    <option value="">Select Category</option>
                    {Object.keys(categoryColors).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="h-10 px-4 bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] rounded-xl text-sm outline-none focus:border-[var(--accent)]"
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })}
                    className="h-10 px-4 bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] rounded-xl text-sm outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-muted)]"
                />

                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 h-10 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-sm hover:border-[var(--accent)] transition-all duration-200">
                        Cancel
                    </button>
                    <button
                        onClick={handleAdd}
                        className="flex-1 h-10 rounded-xl bg-[var(--accent)] text-[#0a0f1e] text-sm font-medium active:scale-95 transition-all duration-200">
                        Add
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};