import React, { useState } from 'react';
import { Wallet, ArrowUp, ArrowDown, Send, DollarSign } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: number;
  from: string;
  to: string;
  date: string;
  status: 'completed' | 'pending';
}

export const PaymentComponent: React.FC = () => {
  const [balance, setBalance] = useState(15500);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'deposit',
      amount: 5000,
      from: 'Bank Account',
      to: 'Wallet',
      date: '2026-04-24',
      status: 'completed',
    },
    {
      id: '2',
      type: 'transfer',
      amount: 2500,
      from: 'You',
      to: 'Sarah Entrepreneur',
      date: '2026-04-23',
      status: 'completed',
    },
    {
      id: '3',
      type: 'withdraw',
      amount: 1000,
      from: 'Wallet',
      to: 'Bank Account',
      date: '2026-04-22',
      status: 'completed',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'transfer'>('deposit');
  const [formData, setFormData] = useState({
    amount: '',
    recipient: '',
    paymentMethod: 'credit-card',
  });

  const handleTransaction = () => {
    if (!formData.amount || isNaN(parseFloat(formData.amount))) return;

    const amount = parseFloat(formData.amount);
    let newTransaction: Transaction;

    if (activeTab === 'deposit') {
      newTransaction = {
        id: Date.now().toString(),
        type: 'deposit',
        amount,
        from: 'Bank Account',
        to: 'Wallet',
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
      };
      setBalance(balance + amount);
    } else if (activeTab === 'withdraw') {
      if (amount > balance) {
        alert('Insufficient balance');
        return;
      }
      newTransaction = {
        id: Date.now().toString(),
        type: 'withdraw',
        amount,
        from: 'Wallet',
        to: 'Bank Account',
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
      };
      setBalance(balance - amount);
    } else {
      if (amount > balance) {
        alert('Insufficient balance');
        return;
      }
      newTransaction = {
        id: Date.now().toString(),
        type: 'transfer',
        amount,
        from: 'You',
        to: formData.recipient || 'Recipient',
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
      };
      setBalance(balance - amount);
    }

    setTransactions([newTransaction, ...transactions]);
    setFormData({ amount: '', recipient: '', paymentMethod: 'credit-card' });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDown className="w-6 h-6 text-green-600" />;
      case 'withdraw':
        return <ArrowUp className="w-6 h-6 text-red-600" />;
      case 'transfer':
        return <Send className="w-6 h-6 text-blue-600" />;
      default:
        return null;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'withdraw':
        return 'text-red-600';
      case 'transfer':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Wallet className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Payments & Wallet</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Wallet & Transactions */}
          <div className="lg:col-span-2">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-white mb-6">
              <p className="text-indigo-100 text-sm font-semibold mb-2">WALLET BALANCE</p>
              <div className="flex items-baseline gap-2">
                <DollarSign className="w-10 h-10" />
                <span className="text-5xl font-bold">{balance.toLocaleString()}</span>
              </div>
              <p className="text-indigo-100 text-sm mt-4">Available for transactions</p>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
              </div>

              <div className="divide-y">
                {transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="px-6 py-4 hover:bg-gray-50 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 rounded-full p-3">
                        {getTransactionIcon(txn.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 capitalize">
                          {txn.type === 'transfer'
                            ? `Transfer to ${txn.to}`
                            : `${txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}`}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(txn.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getTransactionColor(txn.type)}`}>
                        {txn.type === 'deposit' ? '+' : '-'}${txn.amount.toLocaleString()}
                      </p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                        {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {transactions.length === 0 && (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No transactions yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Transaction Forms */}
          <div className="lg:col-span-1">
            {/* Tabs */}
            <div className="flex gap-2 mb-4 bg-gray-200 rounded-lg p-1">
              {(['deposit', 'withdraw', 'transfer'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-3 py-2 rounded font-semibold text-sm capitalize transition ${
                    activeTab === tab
                      ? 'bg-white text-indigo-600 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Forms */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 capitalize">
                {activeTab === 'deposit' && 'Add Money'}
                {activeTab === 'withdraw' && 'Withdraw Money'}
                {activeTab === 'transfer' && 'Send Money'}
              </h3>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xl text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Payment Method (for deposit) */}
              {activeTab === 'deposit' && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                    <option value="bank-transfer">Bank Transfer</option>
                  </select>
                </div>
              )}

              {/* Recipient (for transfer) */}
              {activeTab === 'transfer' && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    placeholder="Investor or Entrepreneur name"
                    value={formData.recipient}
                    onChange={(e) =>
                      setFormData({ ...formData, recipient: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleTransaction}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition capitalize"
              >
                {activeTab === 'deposit' && 'Add Funds'}
                {activeTab === 'withdraw' && 'Withdraw'}
                {activeTab === 'transfer' && 'Send Money'}
              </button>

              {/* Fee Info */}
              <p className="text-xs text-gray-500 text-center mt-4">
                {activeTab === 'deposit' && 'No fees for deposits'}
                {activeTab === 'withdraw' && '2% fee applies'}
                {activeTab === 'transfer' && '1% fee applies'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;