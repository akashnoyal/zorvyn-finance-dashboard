import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const pieColors = {
    'Food & Dining': '#f97316',
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

const CustomTooltip = ({ active, payload, total }) => {
    if (active && payload?.length) {
        const d = payload[0].payload;
        return (
            <div style={{
                background: '#1e1e2e',
                border: '1px solid #383860',
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: 12,
            }}>
                <p style={{ color: d.color, fontWeight: 600 }}>{d.name}</p>
                <p style={{ color: '#fff' }}>
                    ₹{d.value.toLocaleString('en-IN')} &nbsp;·&nbsp;
                    {Math.round((d.value / total) * 100)}%
                </p>
            </div>
        );
    }
    return null;
};

export default function SpendingBreakdown({ transactions = [] }) {

    const expenseMap = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + Math.abs(t.amount);
    });

    const data = Object.entries(expenseMap).map(([name, value]) => ({
        name,
        value,
        color: pieColors[name] || '#6b7280',
    })).sort((a, b) => b.value - a.value);

    const total = data.reduce((sum, d) => sum + d.value, 0);

    if (data.length === 0) return (
        <p className="text-xs text-[var(--text-muted)] text-center py-8">No expense data</p>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center">

            {/* Donut chart */}
            <div className="relative w-44 h-44 shrink-0">
                <PieChart width={176} height={176}>
                    <Pie
                        data={data}
                        innerRadius={52}
                        outerRadius={76}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}>
                        {data.map((d, i) => (
                            <Cell key={i} fill={d.color} />
                        ))}
                    </Pie>
                    <Tooltip content={(props) => <CustomTooltip {...props} total={total} />} />
                </PieChart>

                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-[10px] text-[var(--text-muted)]">Total</p>
                    <p className="text-sm font-bold font-mono text-[var(--text-primary)]">
                        {new Intl.NumberFormat('en-IN', {
                            notation: 'compact',
                            compactDisplay: 'short',
                            maximumFractionDigits: 1,
                        }).format(total)}
                    </p>
                </div>
            </div>

            {/* Legend list */}
            <div className="flex flex-col gap-2 flex-1 w-full">
                {data.slice(0, 7).map((d, i) => (
                    <motion.div
                        key={d.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                        <span className="text-xs text-[var(--text-secondary)] flex-1 truncate">{d.name}</span>
                        <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                            {Math.round((d.value / total) * 100)}%
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}