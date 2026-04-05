import { mockApi } from "../../lib/mockApi";
import { motion } from "framer-motion";

export default function DeleteTransaction({ setTransactions, setShowModal, transaction }) {

    const handleDelete = async () => {
        await mockApi.delete(transaction.id);
        setTransactions(prev => prev.filter(t => t.id !== transaction.id));
        setShowModal(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-5">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-[var(--surface-1)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-md flex flex-col gap-4">

                <h2 className="text-[var(--text-primary)] font-semibold text-lg">Delete Transaction</h2>
                <p className="text-[var(--text-secondary)] text-sm">
                    Are you sure you want to delete <span className="text-[var(--text-primary)] font-medium">{transaction.name}</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 h-10 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-sm hover:border-[var(--accent)] transition-all duration-200">
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 h-10 rounded-xl bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-medium active:scale-95 transition-all duration-200">
                        Delete
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};