"use client";

import { ArrowRightLeft, AlertTriangle, Ban } from "lucide-react";

export interface Transaction {
  id: string;
  wallet: string;
  functionCalled: string;
  amount: string;
  status: "normal" | "suspicious" | "blocked";
  timestamp: string;
}

export default function LiveTransactionFeed({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="bg-white p-6 flex flex-col h-full border border-gray-200 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold font-sans flex items-center gap-2 text-gray-900">
          <ArrowRightLeft className="w-5 h-5 text-gray-400" />
          Live Transaction Feed
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Synced</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 relative">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className={`p-4 rounded-xl border transition-all ${
              tx.status === "normal" 
                ? "bg-white border-gray-100 hover:border-gray-200" 
                : tx.status === "suspicious" 
                  ? "bg-amber-50 border-amber-200"
                  : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-gray-700">{tx.wallet}</span>
                {tx.status === "suspicious" && (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
                {tx.status === "blocked" && (
                  <Ban className="w-4 h-4 text-red-500" />
                )}
              </div>
              <span className="text-xs text-gray-400 font-medium">{tx.timestamp}</span>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">Function</p>
                <p className="text-xs font-mono font-medium bg-gray-50 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-md">
                  {tx.functionCalled}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">Amount</p>
                <p className={`font-semibold text-sm ${tx.status === "blocked" ? "text-gray-400 line-through" : "text-gray-900"}`}>
                  {tx.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {transactions.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium text-sm">
            Waiting for transactions...
          </div>
        )}
      </div>
    </div>
  );
}
