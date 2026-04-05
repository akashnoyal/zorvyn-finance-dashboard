import { motion } from "framer-motion";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

const gridColor = '#2a2a3e';
const labelColor = '#6b6b8e';
const fmt = (v) => `₹${(v / 1000).toFixed(0)}k`;

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        return (
            <div style={{
                background: '#1e1e2e',
                border: '1px solid #383860',
                borderRadius: '10px',
                padding: '12px 16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}>
                <p style={{ color: '#a0a0c0', fontSize: 12, marginBottom: 6 }}>{label}</p>
                <p style={{ color: value >= 0 ? '#22c55e' : '#ef4444', fontSize: 14, fontWeight: 600 }}>
                    Balance: <span style={{ color: '#fff' }}>₹{value.toLocaleString('en-IN')}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function CashFlowTimeline({ transactions = [] }) {

    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    let running = 0;
    const data = sorted.map(t => {
        running += t.amount;
        return {
            date: new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            balance: parseFloat(running.toFixed(2)),
            name: t.name,
        };
    });

    const isNegative = data.length > 0 && data[data.length - 1].balance < 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={isNegative ? '#ef4444' : '#22c55e'} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={isNegative ? '#ef4444' : '#22c55e'} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="date" tick={{ fill: labelColor, fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                    <YAxis tickFormatter={fmt} tick={{ fill: labelColor, fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.5} />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        stroke={isNegative ? '#ef4444' : '#22c55e'}
                        strokeWidth={2.5}
                        fill="url(#balanceGrad)"
                        dot={false}
                        activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </motion.div>
    );
}