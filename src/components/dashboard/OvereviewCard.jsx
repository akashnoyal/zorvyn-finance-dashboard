import { ArrowDownRight, ArrowUpRight, TrendingDown, TrendingUp, Wallet } from "lucide-react";
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

const blinkVariants = {
    animate: {
        opacity: [1, 0.2, 1],
        transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    }
};

export default function OverviewCard({ transactions = [] }) {

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const totalBalance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? ((totalBalance / totalIncome) * 100).toFixed(0) : 0;
    const isNegative = totalBalance < 0;

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, delay: i * 0.1 }
        })
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4">
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl">
                    <div className="flex justify-between items-start">
                        <div className={`flex justify-center items-center rounded-xl h-12 w-12 ${isNegative ? 'text-red-400 bg-[rgba(239,68,68,0.1)]' : 'text-[var(--accent)] bg-[var(--accent-muted)]'}`}>
                            <Wallet size={24} />
                        </div>
                        <div className={`flex items-center gap-2 ${isNegative ? 'text-red-400' : 'text-[var(--accent)]'}`}>
                            {isNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                            <span className="text-xs">{savingsRate}% savings rate</span>
                        </div>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] pt-4 pb-2 uppercase">total balance</p>
                    {isNegative ? (
                        <motion.p className="text-2xl font-bold font-jetbrainsmono text-red-400" variants={blinkVariants} animate="animate">
                            <CountUp value={totalBalance} />
                        </motion.p>
                    ) : (
                        <p className="text-2xl font-bold text-[var(--text-primary)] font-jetbrainsmono">
                            <CountUp value={totalBalance} />
                        </p>
                    )}
                </motion.div>

                <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl">
                    <div className="flex justify-between items-start">
                        <div className="flex justify-center items-center rounded-xl text-[var(--accent)] bg-[rgba(34,197,94,0.1)] h-12 w-12"><TrendingUp size={24} /></div>
                        <div className="flex items-center gap-2 text-[var(--accent)]">
                            <ArrowUpRight size={14} />
                            <span className="text-xs">All time</span>
                        </div>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] pt-4 pb-2 uppercase">total Income</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)] font-jetbrainsmono">
                        <CountUp value={totalIncome} />
                    </p>
                </motion.div>

                <motion.div
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl">
                    <div className="flex justify-between items-start">
                        <div className="flex justify-center items-center rounded-xl text-[#ef4444] bg-[rgba(239,68,68,0.1)] h-12 w-12"><TrendingDown size={24} /></div>
                        <div className="flex items-center gap-2 text-[#ef4444]">
                            <ArrowDownRight size={14} />
                            <span className="text-xs">All time</span>
                        </div>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] pt-4 pb-2 uppercase">total Expenses</p>
                    <p className="text-2xl font-bold text-[var(--text-primary)] font-jetbrainsmono">
                        <CountUp value={totalExpense} />
                    </p>
                </motion.div>
            </div>
        </div>
    );
};