'use client';
import { useState, useEffect } from 'react';
import { mockApi } from '@/lib/mockApi';

const LS_KEY = 'transactions';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── LOAD ──────────────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);

    if (stored) {
      // localStorage has data → use it instantly, skip API
      setTransactions(JSON.parse(stored));
      setLoading(false);
    } else {
      // first visit → fetch from mock API, then cache it
      mockApi.getAll().then(data => {
        setTransactions(data);
        localStorage.setItem(LS_KEY, JSON.stringify(data));
        setLoading(false);
      });
    }
  }, []);

  // ── PERSIST (save to state + localStorage together) ───
  const persist = (data) => {
    setTransactions(data);
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  };

  // ── ADD ───────────────────────────────────────────────
  const add = async (item) => {
    const created = await mockApi.create(item);
    persist([created, ...transactions]);   // newest first
  };

  // ── REMOVE ────────────────────────────────────────────
  const remove = async (id) => {
    await mockApi.delete(id);
    persist(transactions.filter(t => t.id !== id));
  };

  // ── UPDATE ────────────────────────────────────────────
  const update = async (id, changes) => {
    const updated = await mockApi.update(id, changes);
    persist(transactions.map(t => t.id === id ? updated : t));
  };

  // ── CLEAR ALL ─────────────────────────────────────────
  const clearAll = () => {
    localStorage.removeItem(LS_KEY);
    setTransactions([]);
  };

  return { transactions, loading, add, remove, update, clearAll };
}