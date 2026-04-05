import { ArrowDownLeft, ArrowDownUp, ArrowUpRight, ChevronDown, Download, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { mockApi } from "../lib/mockApi";
import AddTransaction from "./models/AddTransaction";
import UpdateTransaction from "./models/UpdateTransaction";
import DeleteTransaction from "./models/DeleteTransaction";
import { motion, AnimatePresence } from "framer-motion";

export default function Transactions({ role }) {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        mockApi.getAll().then(data => setTransactions(data));
    }, []);

    const categoryColors = {
        'Food & Dining': 'bg-orange-500/20 text-orange-500',
        'Income': 'bg-green-500/20 text-green-500',
        'Entertainment': 'bg-purple-500/20 text-purple-500',
        'Transport': 'bg-blue-500/20 text-blue-500',
        'Freelance': 'bg-yellow-500/20 text-yellow-500',
        'Shopping': 'bg-pink-500/20 text-pink-500',
        'Health': 'bg-red-500/20 text-red-500',
        'Education': 'bg-indigo-500/20 text-indigo-500',
        'Utilities': 'bg-cyan-500/20 text-cyan-500',
        'Travel': 'bg-teal-500/20 text-teal-500',
        'Savings': 'bg-emerald-500/20 text-emerald-500',
        'Other': 'bg-gray-500/20 text-gray-500',
    };

    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const filtered = transactions.filter(t => {
        const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
        const matchType = typeFilter ? t.type === typeFilter : true;
        const matchCategory = categoryFilter ? t.category === categoryFilter : true;
        return matchSearch && matchType && matchCategory;
    });

    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleExport = () => {
        const headers = ['Name', 'Category', 'Date', 'Amount', 'Type'];
        const rows = filtered.map(t => [t.name, t.category, t.date, t.amount, t.type]);
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="">
            <AnimatePresence>
                {showModal && (
                    <AddTransaction setTransactions={setTransactions} setShowModal={setShowModal} />
                )}
                {showUpdateModal && selectedTransaction && (
                    <UpdateTransaction
                        setTransactions={setTransactions}
                        setShowModal={setShowUpdateModal}
                        transaction={selectedTransaction}
                    />
                )}
                {showDeleteModal && selectedTransaction && (
                    <DeleteTransaction
                        setTransactions={setTransactions}
                        setShowModal={setShowDeleteModal}
                        transaction={selectedTransaction}
                    />
                )}
            </AnimatePresence>

            <div className="flex flex-wrap gap-3 items-stretch">

                {/* Search */}
                <div className="relative flex-1 min-w-[160px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none flex items-center">
                        <Search size={16} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search transaction..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-10 w-full pl-9 pr-4 text-[var(--text)] border border-[var(--border)] bg-[var(--surface-2)] rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                    />
                </div>

                {/* Type Filter */}
                <div className="relative">
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="h-10 appearance-none pl-4 pr-9 text-[var(--text)] border border-[var(--border)] bg-[var(--surface-2)] rounded-xl text-sm outline-none cursor-pointer transition-all duration-200 focus:border-[var(--accent)]">
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                        <ChevronDown size={15} />
                    </span>
                </div>

                {/* Category Filter */}
                <div className="relative">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="h-10 appearance-none pl-4 pr-9 text-[var(--text)] border border-[var(--border)] bg-[var(--surface-2)] rounded-xl text-sm outline-none cursor-pointer transition-all duration-200 focus:border-[var(--accent)]">
                        <option value="">All Categories</option>
                        {Object.keys(categoryColors).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                        <ChevronDown size={15} />
                    </span>
                </div>

                {role === 'admin' && (
                    <>
                        {/* Export button */}
                        <button onClick={handleExport} className="h-10 flex items-center justify-center px-3 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl transition-all duration-200 hover:border-[var(--accent)] active:scale-95 group">
                            <Download size={15} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-200" />
                        </button>

                        {/* Add button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="h-10 flex items-center gap-2 px-4 font-medium bg-[var(--accent)] border border-[var(--accent)] rounded-xl transition-all duration-200 active:scale-95">
                            <Plus size={16} className="text-[#0a0f1e]" />
                            <span className="text-[#0a0f1e] text-sm">Add</span>
                        </button>
                    </>
                )}
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-[var(--border)] hover:border-[var(--border-hover)] mt-5">
                <table className="w-full text-sm">

                    {/* Header */}
                    <thead>
                        <tr className="border-b border-[var(--border)] bg-[var(--surface-2)]">
                            <th className="text-left px-4 py-3 font-semibold text-[var(--text-secondary)]">
                                <div className="flex items-center gap-1"><span>Description</span><ArrowDownUp size={12} /></div>
                            </th>
                            <th className="hidden md:table-cell text-left px-4 py-3 font-semibold text-[var(--text-secondary)]">
                                <div className="flex items-center gap-1"><span>Category</span></div>
                            </th>
                            <th className="hidden md:table-cell text-left px-4 py-3 font-semibold text-[var(--text-secondary)]">
                                <div className="flex items-center gap-1"><span>Date</span><ArrowDownUp size={12} /></div>
                            </th>
                            <th className="text-left px-4 py-3 font-semibold text-[var(--text-secondary)]">
                                <div className="flex items-center gap-1"><span>Amount</span><ArrowDownUp size={12} /></div>
                            </th>
                            {role === 'admin' && (
                                <th className="text-left px-4 py-3 font-semibold text-[var(--text-secondary)]">
                                    <div className="flex items-center gap-1"><span>Action</span></div>
                                </th>
                            )}
                        </tr>
                    </thead>

                    {/* Rows */}
                    <tbody>
                        <AnimatePresence>
                            {filtered.map((t, index) => (
                                <motion.tr
                                    key={t.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2, delay: index * 0.03 }}
                                    className="border-b border-[var(--border)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] transition-colors duration-150"
                                >
                                    {/* Description */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`flex justify-center items-center ${t.type === 'expense' ? 'bg-[rgba(239,68,68,0.1)]' : 'bg-[rgba(34,197,94,0.1)]'} h-10 w-10 rounded-xl`}>
                                                {t.type === 'expense' ? (
                                                    <ArrowDownLeft size={15} className="text-red-500" />
                                                ) : (
                                                    <ArrowUpRight size={15} className="text-green-500" />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-[var(--text-primary)]">{t.name}</span>
                                                <span className="text-xs text-[var(--text-muted)] sm:hidden">{t.category}</span>
                                                <span className="text-xs text-[var(--text-muted)] sm:hidden">{new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="hidden md:table-cell px-4 py-3">
                                        <span className={`${categoryColors[t.category] || 'bg-gray-500/20 text-gray-500'} rounded-full px-2.5 py-0.5 text-xs font-medium`}>
                                            {t.category}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="hidden md:table-cell px-4 py-3 text-sm text-[var(--text-secondary)]">
                                        {new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
                                    </td>

                                    {/* Amount */}
                                    <td className={`px-4 py-3 font-jetbrainsmono font-bold ${t.type === 'expense' ? "text-red-400" : "text-emerald-400"}`}>
                                        {t.type === 'expense' ? "-" : "+"}₹{Math.abs(t.amount).toFixed(2)}
                                    </td>

                                    {/* Actions */}
                                    {role === 'admin' && (
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => { setSelectedTransaction(t); setShowUpdateModal(true); }} className="text-[var(--text-muted)] hover:text-green-500 transition-colors duration-150">
                                                    <Pencil size={14} />
                                                </button>
                                                <button onClick={() => { setSelectedTransaction(t); setShowDeleteModal(true); }} className="text-[var(--text-muted)] hover:text-red-500 transition-colors duration-150">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>

                </table>
            </div>

        </div>
    );
};