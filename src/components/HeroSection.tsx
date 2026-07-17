"use client";

import { ArrowRight } from "lucide-react";
import { SimulationState } from "./AgentWorkflowPanel";

interface HeroSectionProps {
  simulationState: SimulationState;
  onSimulateAttack: () => void;
  onDemoMode: () => void;
  onReset: () => void;
}

export default function HeroSection({
  simulationState,
  onSimulateAttack,
  onDemoMode,
  onReset
}: HeroSectionProps) {
  const isIdle = simulationState === 'idle';
  const isComplete = simulationState === 'paused';

  return (
    <section className="w-full pt-16 pb-24 md:pt-24 md:pb-32 flex flex-col items-center text-center px-4 relative z-10">
      
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700 mb-8 shadow-sm">
        <span>We've raised $69M seed funding</span>
        <ArrowRight className="w-3 h-3 text-gray-400" />
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl md:text-7xl font-bold mb-6 font-sans tracking-tight text-black max-w-4xl leading-tight">
        On-Chain Audit Swarm
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium mb-12">
        Everything AI seamlessly integrated into one platform so that you can secure your web3 infrastructure with a single click.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {isComplete ? (
          <button 
            onClick={onReset}
            className="bg-black text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg"
          >
            Reset Simulation
          </button>
        ) : (
          <>
            <button 
              onClick={onSimulateAttack}
              disabled={!isIdle}
              className={`px-8 py-3.5 rounded-full font-medium transition-all shadow-lg
                ${isIdle 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
              `}
            >
              Simulate Attack
            </button>
            <button 
              onClick={onDemoMode}
              disabled={!isIdle}
              className={`px-6 py-3.5 rounded-full font-medium transition-all flex items-center gap-2
                ${isIdle 
                  ? 'bg-transparent text-gray-600 hover:text-black' 
                  : 'bg-transparent text-gray-300 cursor-not-allowed'}
              `}
            >
              Auto Demo Mode <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

    </section>
  );
}
