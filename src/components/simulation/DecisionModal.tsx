import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { DecisionPoint, DecisionOption } from '../../types/education';
import { Button } from '../shared/Button';

interface DecisionModalProps {
  decision: DecisionPoint;
  onDecisionMade: (option: DecisionOption) => void;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({ decision, onDecisionMade }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const selectedOption = decision.options.find((o) => o.id === selectedId);

  const handleConfirm = () => {
    if (!selectedOption) return;
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (selectedOption) {
      onDecisionMade(selectedOption);
    }
    setSelectedId(null);
    setShowFeedback(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#050608]/85 backdrop-blur-lg" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="relative w-full max-w-2xl glass-panel-elevated rounded-2xl p-8 z-10"
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl bg-[#F5B416]/15 border border-[#F5B416]/30 shrink-0">
            <AlertTriangle className="w-7 h-7 text-[#F5B416]" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-[#F1F4F6]">{decision.title}</h2>
            <p className="text-sm text-[#7D8995] mt-1 leading-relaxed">{decision.description}</p>
          </div>
        </div>

        {/* Question Label */}
        <div className="text-xs font-mono-data tracking-wider uppercase text-[#3F4826] mb-4 pl-1">
          What would you do?
        </div>

        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key="choices"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {/* Choice Options */}
              {decision.options.map((option) => {
                const isSelected = selectedId === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedId(option.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer group ${
                      isSelected
                        ? 'bg-[#3F4826]/10 border-[#3F4826]/60 shadow-lg shadow-[#3F4826]/10'
                        : 'bg-[#050608]/40 border-[#7D8995]/20 hover:border-[#3F4826]/30 hover:bg-[#050608]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-[#3F4826] bg-[#3F4826]'
                            : 'border-[#7D8995]/50 group-hover:border-[#3F4826]/60'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-[#F1F4F6]">{option.label}</span>
                        {option.sublabel && (
                          <p className="text-xs text-[#7D8995] mt-0.5">{option.sublabel}</p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Confirm Button */}
              <div className="pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!selectedId}
                  onClick={handleConfirm}
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  MAKE DECISION
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Feedback State */
            <motion.div
              key="feedback"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              {selectedOption && (
                <div
                  className={`p-5 rounded-xl border ${
                    selectedOption.isSafe
                      ? 'bg-[#3F4826]/10 border-[#3F4826]/30'
                      : 'bg-[#F5B416]/10 border-[#F5B416]/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {selectedOption.isSafe ? (
                      <CheckCircle className="w-6 h-6 text-[#3F4826] shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-[#F5B416] shrink-0" />
                    )}
                    <span className="font-display font-bold text-lg text-[#F1F4F6]">
                      {selectedOption.isSafe ? 'Safer Choice' : 'Increased Risk'}
                    </span>
                  </div>
                  <p className="text-sm text-[#F1F4F6] leading-relaxed mb-2">
                    {selectedOption.feedback}
                  </p>
                  <p className="text-xs text-[#7D8995] leading-relaxed italic">
                    {selectedOption.explanation}
                  </p>
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleContinue}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                CONTINUE
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
