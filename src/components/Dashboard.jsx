import { useEffect, useState } from "react";
import { mockApi } from "../lib/mockApi";
import BalanceTrend from "./dashboard/chart/BalanceTrend";
import SpendingBreakdown from "./dashboard/chart/SpendingBreakdown";
import OvereviewCard from "./dashboard/OvereviewCard";
import RecentTransactions from "./dashboard/RecentTransactions";
import { motion } from "framer-motion";

export default function Dashboard({ menu, setMenu }) {

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

            <OvereviewCard transactions={transactions} />

            {mounted && (
                <div className="grid grid-cols-1 md:grid-cols-2 grid-row-1 gap-4 pt-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl">
                        <p className="pb-1 font-medium">Balance Trend</p>
                        <p className="text-xs text-[var(--text-muted)]">Monthly income vs expenses</p>
                        <BalanceTrend transactions={transactions} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="bg-[var(--surface-1)] p-6 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl shadow-xl">
                        <p className="pb-1 font-medium">Spending Breakdown</p>
                        <p className="text-xs text-[var(--text-muted)]">By category</p>
                        <div className="pt-8"><SpendingBreakdown transactions={transactions} /></div>
                    </motion.div>
                </div>
            )}

            <RecentTransactions transactions={transactions} setMenu={setMenu} />
        </motion.div>
    );
}