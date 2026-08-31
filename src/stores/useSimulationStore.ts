import { create } from 'zustand';
import { SimulationPhase, SimulationState, SmokeQualityLevel } from '../types/simulation';

const initialState = {
  phase: SimulationPhase.EXPLORE,
  elapsedTime: 0,
  smokeLevel: 0,
  visibility: 1.0,
  selectedRoom: 'overview',
  activeHotspotPanel: null,
  activeDecisionModalId: null,
  phoneCallActive: false,
  phoneCallCompleted: false,
  decisions: [],
  crouchActive: false,
  wetTowelAcquired: false,
  smokeQualityLevel: 2 as SmokeQualityLevel,
};

export const useSimulationStore = create<SimulationState>((set) => ({
  ...initialState,

  setPhase: (phase) =>
    set((state) => {
      let smokeLevel = state.smokeLevel;
      let visibility = state.visibility;
      let modalId: string | null = null;

      switch (phase) {
        case SimulationPhase.EXPLORE:
          smokeLevel = 0;
          visibility = 1.0;
          break;
        case SimulationPhase.DETECTION:
          smokeLevel = 0.1;
          visibility = 0.9;
          modalId = 'decision_1';
          break;
        case SimulationPhase.SMALL_FIRE:
          smokeLevel = 0.3;
          visibility = 0.75;
          modalId = 'decision_2';
          break;
        case SimulationPhase.GROWING:
          smokeLevel = 0.55;
          visibility = 0.5;
          modalId = 'decision_3';
          break;
        case SimulationPhase.CRITICAL:
          smokeLevel = 0.85;
          visibility = 0.2;
          modalId = 'decision_4';
          break;
        case SimulationPhase.COMPLETED:
          modalId = null;
          break;
      }

      return {
        phase,
        smokeLevel,
        visibility,
        activeDecisionModalId: modalId,
      };
    }),

  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
  setActiveHotspotPanel: (activeHotspotPanel) => set({ activeHotspotPanel }),
  setActiveDecisionModalId: (activeDecisionModalId) => set({ activeDecisionModalId }),
  openPhoneCallUI: () => set({ phoneCallActive: true }),
  closePhoneCallUI: (completed = true) =>
    set({ phoneCallActive: false, phoneCallCompleted: completed }),

  recordDecision: (record) =>
    set((state) => ({
      decisions: [...state.decisions.filter((d) => d.decisionId !== record.decisionId), record],
    })),

  tickTimer: () => set((state) => ({ elapsedTime: state.elapsedTime + 1 })),

  toggleCrouch: () => set((state) => ({ crouchActive: !state.crouchActive })),
  acquireWetTowel: () => set({ wetTowelAcquired: true }),
  setSmokeQualityLevel: (smokeQualityLevel) => set({ smokeQualityLevel }),

  resetSimulation: () => set({ ...initialState, decisions: [] }),
}));
