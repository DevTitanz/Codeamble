"use client";

import { Eye, Network, ShieldAlert, CheckCircle, Loader2 } from "lucide-react";

export type SimulationState = 'idle' | 'monitoring' | 'verifying' | 'remediating' | 'paused';

interface AgentWorkflowPanelProps {
  simulationState: SimulationState;
}

export default function AgentWorkflowPanel({ simulationState }: AgentWorkflowPanelProps) {
  
  const getAgentStatus = (agent: 'monitor' | 'exploiter' | 'remediation') => {
    switch(agent) {
      case 'monitor':
        if (simulationState === 'idle') return 'waiting';
        if (simulationState === 'monitoring') return 'active';
        return 'completed';
      case 'exploiter':
        if (['idle', 'monitoring'].includes(simulationState)) return 'waiting';
        if (simulationState === 'verifying') return 'active';
        return 'completed';
      case 'remediation':
        if (['idle', 'monitoring', 'verifying'].includes(simulationState)) return 'waiting';
        if (simulationState === 'remediating') return 'active';
        return 'completed';
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold font-sans mb-6 text-gray-900 px-2">Agent Swarm Workflow</h2>

      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
        
        {/* Monitor Agent */}
        <AgentCard 
          title="Monitor Agent"
          icon={<Eye className="w-6 h-6" />}
          status={getAgentStatus('monitor')}
          details={[
            "Listening to mempool",
            "Risk Score: 12%",
            "Anomaly Detection: Active"
          ]}
          overrideDetails={simulationState === 'monitoring' ? [
            "Analyzing incoming tx...",
            "Risk Score: 98% (CRITICAL)",
            "Anomaly Detected: Flash Loan"
          ] : ['verifying', 'remediating', 'paused'].includes(simulationState) ? [
            "Suspicious tx flagged",
            "Risk Score: 98%",
            "Handed off to Sandbox"
          ] : undefined}
        />

        {/* Arrow 1 */}
        <FlowArrow active={['verifying', 'remediating', 'paused'].includes(simulationState)} />

        {/* White-Hat Exploiter */}
        <AgentCard 
          title="White-Hat Exploiter"
          icon={<Network className="w-6 h-6" />}
          status={getAgentStatus('exploiter')}
          details={[
            "Sandbox fork: Ready",
            "Replay engine: Standby",
            "Verification status: Pending"
          ]}
          overrideDetails={simulationState === 'verifying' ? [
            "Launching sandbox fork...",
            "Replaying transaction...",
            "Verifying exploit..."
          ] : ['remediating', 'paused'].includes(simulationState) ? [
            "Sandbox fork: Destroyed",
            "Replay engine: Finished",
            "Exploit Verified: 99.9% Confidence"
          ] : undefined}
        />

        {/* Arrow 2 */}
        <FlowArrow active={['remediating', 'paused'].includes(simulationState)} />

        {/* Remediation Agent */}
        <AgentCard 
          title="Remediation Agent"
          icon={<ShieldAlert className="w-6 h-6" />}
          status={getAgentStatus('remediation')}
          details={[
            "Emergency Pause: Armed",
            "Contract Status: Active",
            "MultiSig: Connected"
          ]}
          overrideDetails={simulationState === 'remediating' ? [
            "Triggering Emergency Pause...",
            "Generating Incident Report...",
            "Notifying MultiSig..."
          ] : simulationState === 'paused' ? [
            "Contract Status: PAUSED",
            "Attack Prevented",
            "Incident Report Generated"
          ] : undefined}
        />

      </div>
    </div>
  );
}

function FlowArrow({ active }: { active: boolean }) {
  return (
    <div className="hidden md:flex flex-col items-center justify-center w-8">
      <svg className={`w-6 h-6 ${active ? 'text-black' : 'text-gray-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );
}

function AgentCard({ 
  title, 
  icon, 
  status, 
  details, 
  overrideDetails
}: { 
  title: string, 
  icon: React.ReactNode, 
  status: 'waiting' | 'active' | 'completed',
  details: string[],
  overrideDetails?: string[]
}) {
  
  const displayDetails = overrideDetails || details;
  
  return (
    <div 
      className={`w-full md:w-1/3 border rounded-2xl p-6 flex flex-col bg-white shadow-sm transition-all duration-300
        ${status === 'active' ? 'border-gray-900 shadow-md ring-1 ring-gray-900' : 'border-gray-200'}
      `}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-2.5 rounded-xl ${status === 'active' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          {status === 'active' && <Loader2 className="w-4 h-4 animate-spin text-black" />}
          {status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
          <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full tracking-wider
            ${status === 'active' ? 'bg-gray-900 text-white' : 
              status === 'completed' ? 'bg-gray-100 text-gray-500' : 
              'bg-gray-100 text-gray-400'}
          `}>
            {status}
          </span>
        </div>
      </div>
      
      <h3 className={`font-bold font-sans mb-4 text-lg ${status === 'active' ? 'text-black' : 'text-gray-800'}`}>
        {title}
      </h3>
      
      <div className="space-y-3 mt-auto">
        {displayDetails.map((detail, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === 'active' ? 'bg-black' : 'bg-gray-300'}`} />
            <p className="text-sm font-medium text-gray-500 leading-tight">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
