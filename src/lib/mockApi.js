const defaultData = [
    { id: 1, name: 'Grocery Store', category: 'Food & Dining', date: '2025-01-12', amount: -84.20, type: 'expense' },
    { id: 2, name: 'Salary', category: 'Income', date: '2025-01-10', amount: 3200.00, type: 'income' },
    { id: 3, name: 'Netflix', category: 'Entertainment', date: '2025-01-08', amount: -15.99, type: 'expense' },
    { id: 4, name: 'Uber', category: 'Transport', date: '2025-01-06', amount: -12.50, type: 'expense' },
    { id: 5, name: 'Freelance Payment', category: 'Freelance', date: '2025-01-04', amount: 650.00, type: 'income' },
    { id: 6, name: 'Amazon Shopping', category: 'Shopping', date: '2025-01-15', amount: -134.99, type: 'expense' },
    { id: 7, name: 'Gym Membership', category: 'Health', date: '2025-01-14', amount: -45.00, type: 'expense' },
    { id: 8, name: 'Electricity Bill', category: 'Utilities', date: '2025-01-13', amount: -92.50, type: 'expense' },
    { id: 9, name: 'Online Course', category: 'Education', date: '2025-01-11', amount: -29.99, type: 'expense' },
    { id: 10, name: 'Flight Ticket', category: 'Travel', date: '2025-01-09', amount: -320.00, type: 'expense' },
    { id: 11, name: 'Mutual Fund', category: 'Savings', date: '2025-01-07', amount: -500.00, type: 'expense' },
    { id: 12, name: 'Bonus', category: 'Income', date: '2025-01-05', amount: 1500.00, type: 'income' },
    { id: 13, name: 'Zomato', category: 'Food & Dining', date: '2025-01-03', amount: -38.75, type: 'expense' },
    { id: 14, name: 'Spotify', category: 'Entertainment', date: '2025-01-02', amount: -9.99, type: 'expense' },
    { id: 15, name: 'Bus Pass', category: 'Transport', date: '2025-01-01', amount: -55.00, type: 'expense' },
    { id: 16, name: 'Client Payment', category: 'Freelance', date: '2025-02-01', amount: 850.00, type: 'income' },
    { id: 17, name: 'Pharmacy', category: 'Health', date: '2025-02-03', amount: -22.40, type: 'expense' },
    { id: 18, name: 'Water Bill', category: 'Utilities', date: '2025-02-05', amount: -18.00, type: 'expense' },
    { id: 19, name: 'Hotel Booking', category: 'Travel', date: '2025-02-07', amount: -210.00, type: 'expense' },
    { id: 20, name: 'Flipkart', category: 'Shopping', date: '2025-02-09', amount: -76.50, type: 'expense' },
    { id: 21, name: 'YouTube Premium', category: 'Entertainment', date: '2025-02-11', amount: -13.99, type: 'expense' },
    { id: 22, name: 'Salary', category: 'Income', date: '2025-02-10', amount: 3200.00, type: 'income' },
    { id: 23, name: 'Udemy Course', category: 'Education', date: '2025-02-13', amount: -14.99, type: 'expense' },
    { id: 24, name: 'Rapido', category: 'Transport', date: '2025-02-15', amount: -8.25, type: 'expense' },
    { id: 25, name: 'Fixed Deposit', category: 'Savings', date: '2025-02-17', amount: -1000.00, type: 'expense' },
    { id: 26, name: 'Restaurant', category: 'Food & Dining', date: '2025-02-19', amount: -62.00, type: 'expense' },
    { id: 27, name: 'Dividend', category: 'Income', date: '2025-02-21', amount: 240.00, type: 'income' },
    { id: 28, name: 'Misc Expense', category: 'Other', date: '2025-02-23', amount: -33.00, type: 'expense' },
];

const getDB = () => {
    if (typeof window === 'undefined') return defaultData;
    return JSON.parse(localStorage.getItem('transactions')) || defaultData;
};

const save = (data) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('transactions', JSON.stringify(data));
    }
};

let mockDB = getDB();

export const mockApi = {
    getAll: async () => {
        mockDB = getDB();
        return [...mockDB];
    },
    create: async (item) => {
        const newItem = { ...item, id: Date.now() };
        mockDB = [newItem, ...mockDB];
        save(mockDB);
        return newItem;
    },
    update: async (id, changes) => {
        mockDB = mockDB.map(t => t.id === id ? { ...t, ...changes } : t);
        save(mockDB);
        return mockDB.find(t => t.id === id);
    },
    delete: async (id) => {
        mockDB = mockDB.filter(t => t.id !== id);
        save(mockDB);
        return id;
    },
};