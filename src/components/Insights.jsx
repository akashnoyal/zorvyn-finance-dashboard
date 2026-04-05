import { useEffect, useState } from "react";
import { mockApi } from "../lib/mockApi";
import InsightCard from "./insights/InsightCard";
import MonthlyComparison from "./insights/MonthlyComparison";
import TopSpendingCategories from "./insights/TopSpendingCategories";
import CashFlowTimeline from "./insights/CashFlowTimeline";
import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.15 }
    })
};

export default function Insights() {

    const [transactions, setTransactions] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        mockApi.getAll().then(data => setTransactions(data));
        setMounted(true);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>

            <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={cardVariants}>
                <InsightCard transactions={transactions} />
            </motion.div>

            {mounted && (
                <>
                    <div className="grid grid-col-1 md:grid-cols-2 gap-4 mt-4">
                        <motion.div
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl min-h-[380px]">
                            <p className="pb-1 font-medium">Monthly Comparison</p>
                            <p className="text-xs text-[var(--text-muted)] pb-4">Income vs Expenses by month</p>
                            <MonthlyComparison transactions={transactions} />
                        </motion.div>

                        <motion.div
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl min-h-[380px]">
                            <p className="pb-1 font-medium">Top Spending Categories</p>
                            <p className="text-xs text-[var(--text-muted)] pb-4">Ranked by total amount</p>
                            <TopSpendingCategories transactions={transactions} />
                        </motion.div>
                    </div>

                    <motion.div
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl mt-4 min-h-[360px]">
                        <p className="pb-1 font-medium">Cash Flow Timeline</p>
                        <p className="text-xs text-[var(--text-muted)] pb-4">Running balance over time</p>
                        <CashFlowTimeline transactions={transactions} />
                    </motion.div>
                </>
            )}

        </motion.div>
    );
}