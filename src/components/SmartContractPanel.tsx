"use client";

import { FileCode2, ShieldCheck, PauseCircle, Activity } from "lucide-react";

interface SmartContractPanelProps {
  isPaused: boolean;
}

export default function SmartContractPanel({ isPaused }: SmartContractPanelProps) {
  return (
    <div className="bg-white p-6 h-full flex flex-col border border-gray-200 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold font-sans flex items-center gap-2 text-gray-900">
          <FileCode2 className="w-5 h-5 text-gray-400" />
          Target Contract
        </h2>
        <div className={`px-3 py-1.5 rounded-full border ${isPaused ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'} flex items-center gap-1.5`}>
          {isPaused ? <PauseCircle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
          <span className="text-xs font-bold uppercase tracking-wider">
            {isPaused ? "Paused" : "Active"}
          </span>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Contract Address</p>
          <p className="font-mono text-sm font-semibold break-all text-gray-700">0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Network</p>
            <p className="font-semibold text-gray-900">Ethereum Mainnet</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">TVL</p>
            <p className="font-bold text-gray-900">$142,500,000</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Last AI Audit</p>
            <p className="font-semibold text-sm text-gray-700">Continuous</p>
          </div>
          <ShieldCheck className="w-6 h-6 text-green-500" />
        </div>
        
        <div className={`p-4 rounded-xl border ${isPaused ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Emergency Intervention</p>
          <p className={`font-semibold text-sm ${isPaused ? 'text-red-600' : 'text-gray-700'}`}>
            {isPaused ? "PAUSE TRIGGERED (Remediation Agent)" : "Armed & Ready"}
          </p>
        </div>
      </div>
    </div>
  );
}
