import { motion } from "framer-motion";

const categoryColors = {
    'Food & Dining': '#f97316',
    'Income': '#22c55e',
    'Entertainment': '#a855f7',
    'Transport': '#3b82f6',
    'Freelance': '#eab308',
    'Shopping': '#ec4899',
    'Health': '#ef4444',
    'Education': '#6366f1',
    'Utilities': '#06b6d4',
    'Travel': '#14b8a6',
    'Savings': '#22c55e',
    'Other': '#6b7280',
};

export default function TopSpendingCategories({ transactions = [] }) {

    const expenseMap = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + Math.abs(t.amount);
    });

    const total = Object.values(expenseMap).reduce((sum, v) => sum + v, 0);

    const data = Object.entries(expenseMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([category, amount], i) => ({
            rank: i + 1,
            category,
            amount,
            percent: total > 0 ? ((amount / total) * 100).toFixed(1) : 0,
            color: categoryColors[category] || '#6b7280',
        }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-3">
            {data.map((item, i) => (
                <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-[var(--text-muted)] w-4">{item.rank}</span>
                            <span className="text-sm font-medium text-[var(--text-primary)]">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-[var(--text-muted)]">{item.percent}%</span>
                            <span className="text-sm font-bold font-jetbrainsmono" style={{ color: item.color }}>
                                ₹{item.amount.toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--surface-2)] rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percent}%` }}
                            transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: item.color }}
                        />
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}