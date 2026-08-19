const STORAGE_KEY = "finova_transactions";

export function getTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load transactions:", error);
    return [];
  }
}

export function saveTransactions(transactions) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    );
  } catch (error) {
    console.error("Failed to save transactions:", error);
  }
}

export function addTransaction(transaction) {
  const transactions = getTransactions();

  const newTransaction = {
    ...transaction,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  const updatedTransactions = [
    newTransaction,
    ...transactions,
  ];

  saveTransactions(updatedTransactions);

  return newTransaction;
}