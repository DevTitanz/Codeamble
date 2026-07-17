"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import LiveTransactionFeed, { Transaction } from "@/components/LiveTransactionFeed";
import AgentWorkflowPanel, { SimulationState } from "@/components/AgentWorkflowPanel";
import SmartContractPanel from "@/components/SmartContractPanel";
import ThreatAnalytics from "@/components/ThreatAnalytics";
import IncidentReport from "@/components/IncidentReport";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NORMAL_TXS: Omit<Transaction, "id" | "timestamp">[] = [
  { wallet: "0x1a2...3f4", functionCalled: "swap()", amount: "1.2 ETH", status: "normal" },
  { wallet: "0x9b4...2a1", functionCalled: "addLiquidity()", amount: "5,000 USDC", status: "normal" },
  { wallet: "0x7c2...8d5", functionCalled: "stake()", amount: "10,000 ONC", status: "normal" },
];

const SUSPICIOUS_TX: Omit<Transaction, "id" | "timestamp"> = {
  wallet: "0xBAD...E01", 
  functionCalled: "flashLoan(10000 ETH)", 
  amount: "10,000 ETH", 
  status: "suspicious"
};

export default function Home() {
  const [simulationState, setSimulationState] = useState<SimulationState>("idle");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [threatsDetected, setThreatsDetected] = useState(142);
  const [fundsProtected, setFundsProtected] = useState(12400000);

  // Background random normal transactions
  useEffect(() => {
    if (simulationState === "paused") return;
    
    const interval = setInterval(() => {
      const randomTx = NORMAL_TXS[Math.floor(Math.random() * NORMAL_TXS.length)];
      addTransaction(randomTx);
    }, 3000);

    return () => clearInterval(interval);
  }, [simulationState]);

  const addTransaction = (tx: Omit<Transaction, "id" | "timestamp">) => {
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
    };
    setTransactions((prev) => [newTx, ...prev].slice(0, 50));
    return newTx.id;
  };

  const simulateAttack = async () => {
    if (simulationState !== "idle") return;
    
    setSimulationState("monitoring");
    
    // 1. Add suspicious transaction
    const susId = addTransaction(SUSPICIOUS_TX);

    // 2. Monitor detects it and hands to Exploiter
    setTimeout(() => {
      setSimulationState("verifying");
      
      // 3. Exploiter verifies and hands to Remediation
      setTimeout(() => {
        setSimulationState("remediating");
        
        // 4. Remediation pauses contract
        setTimeout(() => {
          setSimulationState("paused");
          setIsReportVisible(true);
          setThreatsDetected(prev => prev + 1);
          setFundsProtected(prev => prev + 10000000); // Added $10M from flash loan attempt
          
          // Update the suspicious tx to 'blocked'
          setTransactions(prev => prev.map(t => 
            t.id === susId ? { ...t, status: 'blocked' } : t
          ));
        }, 2000);
      }, 3000);
    }, 2000);
  };

  const resetSimulation = () => {
    setSimulationState("idle");
    setIsReportVisible(false);
    setTransactions([]);
  };

  return (
    <main className="min-h-screen relative pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <HeroSection 
          simulationState={simulationState} 
          onSimulateAttack={simulateAttack}
          onDemoMode={simulateAttack}
          onReset={resetSimulation}
        />
        
        {/* Dashboard Mockup Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
          <div className="bg-white rounded-t-3xl border border-gray-200 border-b-0 shadow-2xl overflow-hidden">
            {/* Top Bar */}
            <div className="bg-[#f5f5f7] px-6 py-4 border-b border-gray-200 flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-sm font-semibold text-gray-700 ml-4 flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                Swarm Dashboard
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="p-6 md:p-8 bg-white min-h-[600px]">
              <AgentWorkflowPanel simulationState={simulationState} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] mb-8 mt-8">
                <div className="md:col-span-1 md:row-span-2">
                  <LiveTransactionFeed transactions={transactions} />
                </div>
                <div className="md:col-span-2 md:row-span-1">
                  <SmartContractPanel isPaused={simulationState === "paused"} />
                </div>
                <div className="md:col-span-2 md:row-span-1">
                  <ThreatAnalytics />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <IncidentReport 
        isVisible={isReportVisible} 
        onClose={() => setIsReportVisible(false)} 
      />
    </main>
  );
}
