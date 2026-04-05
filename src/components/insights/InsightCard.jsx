import { TrendingUp, TrendingDown, PiggyBank, Flame, Calendar, Wallet, BarChart2, Target } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

function CountUp({ value }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) =>
        '₹' + v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    );

    useEffect(() => {
        const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
        return () => controls.stop();
    }, [value]);

    return <motion.span>{rounded}</motion.span>;
}

export default function InsightCard({ transactions = [] }) {

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const totalBalance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? ((totalBalance / totalIncome) * 100).toFixed(1) : 0;
    const isPositiveSavings = Number(savingsRate) >= 0;

    // Top spending category
    const expenseMap = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + Math.abs(t.amount);
    });
    const topCategory = Object.entries(expenseMap).sort((a, b) => b[1] - a[1])[0];

    // Avg monthly spend & income
    const months = new Set(transactions.map(t => t.date.slice(0, 7))).size || 1;
    const avgMonthlySpend = totalExpense / months;
    const avgMonthlyIncome = totalIncome / months;

    // Month-on-month expense change
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const thisMonthExp = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && t.type === 'expense';
    }).reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const lastMonthExp = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === prevMonth.getMonth() && d.getFullYear() === prevMonth.getFullYear() && t.type === 'expense';
    }).reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const momChange = lastMonthExp > 0 ? (((thisMonthExp - lastMonthExp) / lastMonthExp) * 100).toFixed(1) : null;
    const isExpenseUp = momChange > 0;

    // Net savings this month
    const thisMonthIncome = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && t.type === 'income';
    }).reduce((sum, t) => sum + t.amount, 0);
    const netSavings = thisMonthIncome - thisMonthExp;
    const isNegative = netSavings < 0 || Object.is(netSavings, -0); // ← moved here
    const monthName = now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

    // Most active month
    const monthActivity = {};
    transactions.forEach(t => {
        const key = t.date.slice(0, 7);
        monthActivity[key] = (monthActivity[key] || 0) + Math.abs(t.amount);
    });
    const mostActiveMonth = Object.entries(monthActivity).sort((a, b) => b[1] - a[1])[0];
    const mostActiveLabel = mostActiveMonth
        ? new Date(mostActiveMonth[0] + '-01').toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
        : '—';

    const blinkVariants = {
        animate: {
            opacity: [1, 0.2, 1],
            transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, delay: i * 0.1 }
        })
    };

    const cards = [
        {
            icon: <PiggyBank size={24} />,
            iconClass: 'text-emerald-400 bg-[rgba(34,197,94,0.1)]',
            label: 'Savings Rate',
            value: <span className={isPositiveSavings ? 'text-emerald-400' : 'text-red-400'}>{savingsRate}%</span>,
            sub: 'Of total income saved',
        },
        {
            icon: <Flame size={24} />,
            iconClass: 'text-orange-400 bg-[rgba(251,146,60,0.1)]',
            label: 'Top Expense',
            value: <span className="text-[var(--text-primary)] truncate">{topCategory ? topCategory[0] : '—'}</span>,
            sub: topCategory ? '₹' + topCategory[1].toLocaleString('en-IN') : 'No expenses',
        },
        {
            icon: <Calendar size={24} />,
            iconClass: 'text-blue-400 bg-[rgba(96,165,250,0.1)]',
            label: 'Avg Monthly Spend',
            value: <span className="text-[var(--text-primary)]"><CountUp value={avgMonthlySpend} /></span>,
            sub: `Across ${months} month${months > 1 ? 's' : ''}`,
        },
        {
            icon: isExpenseUp ? <TrendingUp size={24} /> : <TrendingDown size={24} />,
            iconClass: isExpenseUp ? 'text-red-400 bg-[rgba(239,68,68,0.1)]' : 'text-emerald-400 bg-[rgba(34,197,94,0.1)]',
            label: 'Month-on-Month',
            value: <span className={isExpenseUp ? 'text-red-400' : 'text-emerald-400'}>{momChange !== null ? `${isExpenseUp ? '+' : ''}${momChange}%` : '—'}</span>,
            sub: 'Expense change vs last month',
        },
        {
            icon: <Wallet size={24} />,
            iconClass: isNegative ? 'text-red-400 bg-[rgba(239,68,68,0.1)]' : 'text-emerald-400 bg-[rgba(34,197,94,0.1)]',
            label: 'Net Savings This Month',
            value: isNegative ? (
                <motion.span className="text-red-400" variants={blinkVariants} animate="animate">
                    <CountUp value={netSavings} />
                </motion.span>
            ) : (
                <span className="text-emerald-400"><CountUp value={netSavings} /></span>
            ),
            sub: `Income ₹${thisMonthIncome.toLocaleString('en-IN')} minus expenses ₹${thisMonthExp.toLocaleString('en-IN')} for ${monthName}`,
        },
        {
            icon: <BarChart2 size={24} />,
            iconClass: 'text-purple-400 bg-[rgba(168,85,247,0.1)]',
            label: 'Most Active Month',
            value: <span className="text-[var(--text-primary)]">{mostActiveLabel}</span>,
            sub: 'Highest combined activity',
        },
        {
            icon: <TrendingUp size={24} />,
            iconClass: 'text-cyan-400 bg-[rgba(34,211,238,0.1)]',
            label: 'Avg Monthly Income',
            value: <span className="text-[var(--text-primary)]"><CountUp value={avgMonthlyIncome} /></span>,
            sub: 'Average across recorded months',
        },
        {
            icon: <Target size={24} />,
            iconClass: 'text-yellow-400 bg-[rgba(234,179,8,0.1)]',
            label: 'Budget Health',
            value: thisMonthExp <= avgMonthlySpend ? (
                <span className="text-emerald-400">On Track</span>
            ) : (
                <motion.span className="text-red-400" variants={blinkVariants} animate="animate">
                    Over Budget
                </motion.span>
            ),
            sub: thisMonthExp <= avgMonthlySpend
                ? `₹${(avgMonthlySpend - thisMonthExp).toLocaleString('en-IN')} under avg spend`
                : `₹${(thisMonthExp - avgMonthlySpend).toLocaleString('en-IN')} over avg spend`,
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl">
                    <div className={`flex justify-center items-center rounded-xl h-12 w-12 ${card.iconClass}`}>
                        {card.icon}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] pt-4 pb-2 uppercase">{card.label}</p>
                    <p className="text-2xl font-bold font-jetbrainsmono">{card.value}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{card.sub}</p>
                </motion.div>
            ))}
        </div>
    );
};