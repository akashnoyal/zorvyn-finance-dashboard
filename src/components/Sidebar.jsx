"use client";

import { ArrowLeftRight, LayoutDashboard, Lightbulb, Store } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
    { id: "insights", label: "Insights", icon: Lightbulb },
];

// console.log(navItems);

export default function Sidebar({ menu, setMenu }) {
    const baseClass = "flex items-center gap-2 px-4 py-3 w-full rounded-xl transition-all duration-150 cursor-pointer";
    const activeClass = "bg-green-400 text-black";
    const inactiveClass = "text-gray-400 hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]";

    return (
        <>
            <aside className="hidden md:block fixed top-0 left-0 z-50 w-64 h-full bg-[var(--surface-1)] text-[var(--text-primary)] p-6 border-r border-[var(--border)] shadow-lg">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="bg-green-400 p-2 rounded-xl">
                        <Store size={28} color="black" />
                    </div>
                    <div>
                        <h1 className="font-zen-dots font-bold text-[var(--text-primary)]">Zorvyn</h1>
                        <h4 className="text-xs font-poppins tracking-widest uppercase text-gray-400">Finance</h4>
                    </div>
                </div>

                {/* Nav */}
                <nav className="mt-10 flex flex-col gap-1">
                    {navItems.map(({ id, label, icon: Icon }, index) => (
                        <motion.div
                            key={id}
                            onClick={() => setMenu(id)}
                            className={`${baseClass} ${menu === id ? activeClass : inactiveClass}`}
                            // Staggered entrance on load
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
                            // Press feedback
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ x: 4 }}
                        >
                            <Icon size={20} />
                            <span className="ml-2">{label}</span>
                        </motion.div>
                    ))}
                </nav>
            </aside>

            {/* Mobile Sidebar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-[var(--surface-1)] text-[var(--text-primary)] p-4 border-t border-[var(--border)] shadow-lg flex justify-around">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <div
                        key={id}
                        onClick={() => setMenu(id)}
                        className={`flex flex-col items-center ${menu === id ? "text-green-400" : "text-gray-400"}`}
                    >
                        <Icon size={20} />
                        <span className="text-xs mt-1">{label}</span>
                    </div>
                ))}
            </div>
        </>
    );
}