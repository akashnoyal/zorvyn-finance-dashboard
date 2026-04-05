import { useEffect, useState } from "react";
import { Eye, Power, ShieldUser, Store } from "lucide-react";
import ThemeFAB from "@/components/ThemeFAB";

export default function Header({ title, role, setRole }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    return (
        <header className="sticky top-0 left-0 w-full h-18 bg-[var(--surface-0)] shadow-lg z-40 flex items-center px-6 border-b border-[var(--border)]">
            {/* Logo */}
            <div className="md:hidden flex items-center gap-2">
                <div className="bg-green-400 p-2 rounded-xl">
                    <Store size={24} color="black" />
                </div>
                <div className="flex items-center gap-1">
                    <h1 className="font-zen-dots font-medium text-sm text-[var(--text-primary)]">Zorvyn</h1>
                    <h4 className="font-medium text-sm text-gray-400">Finance</h4>
                </div>
            </div>
            <div className="flex justify-end md:justify-between items-center w-full">
                <div className="hidden md:block">
                    <h1 className="font-semibold text-2xl text-[var(--text-primary)]">{title}</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 h-10 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-3">
                        {role === 'admin' ? (
                            <ShieldUser size={15} className="text-[var(--accent)]" />
                        ) : (
                            <Eye size={15} className="text-[var(--text-muted)]" />
                        )}
                        <select
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className="bg-transparent font-semibold text-sm text-[var(--text-primary)] outline-none cursor-pointer">
                            <option value="admin">Admin</option>
                            <option value="viewer">Viewer</option>
                        </select>
                    </div>
                    <div><ThemeFAB /></div>
                    <button className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-red-400 hover:border-red-400/50 transition-all duration-200 active:scale-95">
                        <Power size={16} />
                    </button>
                </div>
            </div>
        </header>
    );
}