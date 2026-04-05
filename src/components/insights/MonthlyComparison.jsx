import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const gridColor = '#2a2a3e';
const labelColor = '#6b6b8e';
const fmt = (v) => `₹${(v / 1000).toFixed(0)}k`;

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: '#1e1e2e',
                border: '1px solid #383860',
                borderRadius: '10px',
                padding: '12px 16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}>
                <p style={{ color: '#a0a0c0', fontSize: 12, marginBottom: 6 }}>{label}</p>
                {payload.map((entry) => (
                    <p key={entry.name} style={{ color: entry.color, fontSize: 14, fontWeight: 600, margin: '2px 0' }}>
                        {entry.name}: <span style={{ color: '#fff' }}>₹{entry.value.toLocaleString('en-IN')}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function MonthlyComparison({ transactions = [] }) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = months.map((month, i) => {
        const monthTxns = transactions.filter(t => new Date(t.date).getMonth() === i);
        const income = monthTxns.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expenses = monthTxns.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return { month, income, expenses };
    }).filter(d => d.income > 0 || d.expenses > 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: labelColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={fmt} tick={{ fill: labelColor, fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Legend
                        wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                        formatter={(val) => <span style={{ color: '#a0a0c0' }}>{val}</span>}
                    />
                    <Bar dataKey="income" name="Income" fill="#22c55e" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
}