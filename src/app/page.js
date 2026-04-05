"use client";

import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import Insights from "@/components/Insights";
import Sidebar from "@/components/Sidebar";
import Transactions from "@/components/Transactions";
import { useState } from "react";

export default function Home() {
  const [menu, setMenu] = useState("dashboard");
  const [role, setRole] = useState('admin');


  return (
    <div className="flex h-screen bg-[var(--surface-0)]">
      <Sidebar menu={menu} setMenu={setMenu} />

      <div className="ml-0 md:ml-64 flex-1 flex flex-col">
        <Header role={role} setRole={setRole} title={menu === "dashboard" ? "Overeview" : menu === "transactions" ? "Transactions" : "Insights"} />
        <main className="flex-1 overflow-y-auto py-6 px-5 md:px-10 text-[var(--text-primary)] w-full pb-40">
          {menu === "dashboard" && <Dashboard menu={menu} setMenu={setMenu} />}
          {menu === "transactions" && <Transactions role={role} />}
          {menu === "insights" && <Insights />}
        </main>
      </div>
    </div>
  );
}