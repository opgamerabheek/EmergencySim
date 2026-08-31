import React, { useState } from 'react';
import { Phone, PhoneOff, CheckCircle2, ShieldAlert } from 'lucide-react';
import { EMERGENCY_CONFIG } from '../../utils/constants';
import { Button } from '../shared/Button';

interface PhoneCallUIProps {
  onClose: (completed?: boolean) => void;
}

export const PhoneCallUI: React.FC<PhoneCallUIProps> = ({ onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [emergencyType, setEmergencyType] = useState<string>('');
  const [locationProvided, setLocationProvided] = useState<string>('');
  const [conditionsProvided, setConditionsProvided] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => {
      onClose(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#050608]/85 backdrop-blur-lg" />

      {/* Interface Panel */}
      <div className="relative w-full max-w-lg glass-panel-elevated rounded-2xl p-6 md:p-8 z-10 border border-[#3F4826]/30 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#7D8995]/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00E676]/20 border border-[#00E676]/40 flex items-center justify-center animate-pulse">
              <Phone className="w-5 h-5 text-[#00E676]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#F1F4F6]">
                {EMERGENCY_CONFIG.label} ({EMERGENCY_CONFIG.number})
              </h3>
              <span className="text-xs font-mono-data text-[#00E676] flex items-center gap-1.5">
                ● Connected to Dispatcher
              </span>
            </div>
          </div>
          <button
            onClick={() => onClose(false)}
            className="p-2 rounded-lg bg-[#050608]/50 text-[#7D8995] hover:text-[#FF7043] transition-colors cursor-pointer"
            title="Hang Up"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>

        {/* Call Dialogue Flow */}
        {!completed ? (
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#050608]/60 border border-[#3F4826]/20">
                  <div className="text-xs font-mono-data text-[#3F4826] mb-1">DISPATCHER:</div>
                  <p className="text-sm text-[#F1F4F6]">
                    "Emergency Services 112. What is the nature of your emergency?"
                  </p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setEmergencyType('Residential Fire');
                      setStep(2);
                    }}
                    className="w-full text-left p-3.5 rounded-xl bg-[#10161D] border border-[#7D8995]/20 hover:border-[#3F4826] hover:bg-[#3F4826]/10 text-sm text-[#F1F4F6] transition-all cursor-pointer"
                  >
                    "There is an active fire in my apartment kitchen."
                  </button>
                  <button
                    onClick={() => {
                      setEmergencyType('Smoke Alarm Only');
                      setStep(2);
                    }}
                    className="w-full text-left p-3.5 rounded-xl bg-[#10161D] border border-[#7D8995]/20 hover:border-[#3F4826] hover:bg-[#3F4826]/10 text-sm text-[#F1F4F6] transition-all cursor-pointer"
                  >
                    "A smoke alarm is sounding in my hallway."
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#050608]/60 border border-[#3F4826]/20">
                  <div className="text-xs font-mono-data text-[#3F4826] mb-1">DISPATCHER:</div>
                  <p className="text-sm text-[#F1F4F6]">
                    "Understood. What is your exact location and address?"
                  </p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setLocationProvided('Apt 4B, 12 Parkview Heights');
                      setStep(3);
                    }}
                    className="w-full text-left p-3.5 rounded-xl bg-[#10161D] border border-[#7D8995]/20 hover:border-[#3F4826] hover:bg-[#3F4826]/10 text-sm text-[#F1F4F6] transition-all cursor-pointer"
                  >
                    "Apartment 4B, 4th Floor, 12 Parkview Heights."
                  </button>
                  <button
                    onClick={() => {
                      setLocationProvided('Vague location');
                      setStep(3);
                    }}
                    className="w-full text-left p-3.5 rounded-xl bg-[#10161D] border border-[#7D8995]/20 hover:border-[#3F4826] hover:bg-[#3F4826]/10 text-sm text-[#F1F4F6] transition-all cursor-pointer"
                  >
                    "I am in a building near downtown."
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#050608]/60 border border-[#3F4826]/20">
                  <div className="text-xs font-mono-data text-[#3F4826] mb-1">DISPATCHER:</div>
                  <p className="text-sm text-[#F1F4F6]">
                    "Are you in immediate danger, and are occupants evacuating?"
                  </p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setConditionsProvided('Evacuating via stairs');
                      handleComplete();
                    }}
                    className="w-full text-left p-3.5 rounded-xl bg-[#10161D] border border-[#7D8995]/20 hover:border-[#3F4826] hover:bg-[#3F4826]/10 text-sm text-[#F1F4F6] transition-all cursor-pointer"
                  >
                    "Smoke is thickening. I am proceeding to the emergency stairwell now."
                  </button>
                </div>
              </div>
            )}

            <div className="p-3 rounded-lg bg-[#050608]/40 border border-[#7D8995]/15 flex items-center gap-2 text-xs text-[#7D8995]">
              <ShieldAlert className="w-4 h-4 text-[#F5B416] shrink-0" />
              <span>Educational tip: Always state exact address, floor level, and current exit route.</span>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#00E676] mx-auto animate-bounce" />
            <h4 className="font-display font-bold text-xl text-[#F1F4F6]">
              Emergency Call Logged
            </h4>
            <p className="text-sm text-[#7D8995]">
              Dispatchers notified. Returning to simulation view...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
