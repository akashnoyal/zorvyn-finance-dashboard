import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentTransactions({ transactions = [], setMenu }) {

    const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7);

    return (
        <div className="grid grid-cols-1 grid-row-1 pt-4">
            <div className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl">
                <div className="flex justify-between items-center pb-3">
                    <div>
                        <p className="pb-1 font-medium">Recent Transactions</p>
                        <p className="text-xs text-[var(--text-muted)]">Latest activity</p>
                    </div>
                    <p className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer" onClick={() => setMenu("transactions")}>View all</p>
                </div>

                {recent.map((t, i) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex justify-between items-center border-b border-[var(--border)] py-2 pt-3">
                        <div className="flex items-center gap-3">
                            <div className={`flex justify-center items-center ${t.type === 'expense' ? 'bg-[rgba(239,68,68,0.1)]' : 'bg-[rgba(34,197,94,0.1)]'} h-10 w-10 rounded-xl`}>
                                {t.type === 'expense'
                                    ? <ArrowDownLeft size={15} className="text-red-500" />
                                    : <ArrowUpRight size={15} className="text-green-500" />}
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">{t.name}</p>
                                <p className="text-xs text-[var(--text-muted)]">
                                    {t.category} · {new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                </p>
                            </div>
                        </div>
                        <div className={`font-jetbrainsmono font-bold text-sm ${t.type === 'expense' ? 'text-red-400' : 'text-emerald-400'}`}>
                            {t.type === 'expense' ? '-' : '+'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}