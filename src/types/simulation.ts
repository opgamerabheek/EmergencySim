export enum SimulationPhase {
  EXPLORE = "explore",           // Know Your Environment mode
  DETECTION = "detection",       // Alarm triggers (T+0:00)
  SMALL_FIRE = "small_fire",     // Kitchen fire visible (T+0:30)
  GROWING = "growing",           // Smoke spreads, lights flicker (T+1:30)
  CRITICAL = "critical",         // Heavy smoke, emergency strobes (T+3:00)
  COMPLETED = "completed"        // Stairwell exit reached
}

export type SmokeQualityLevel = 1 | 2 | 3;

export interface DecisionRecord {
  decisionId: string;
  selectedOptionId: string;
  optionLabel: string;
  isSafe: boolean;
  timestamp: number;
  feedback: string;
}

export interface SimulationState {
  phase: SimulationPhase;
  elapsedTime: number;
  smokeLevel: number;             // 0.0 to 1.0
  visibility: number;             // 1.0 to 0.0
  selectedRoom: string;           // "overview" | "living" | "kitchen" | "bedroom" | "bathroom" | "hallway"
  activeHotspotPanel: string | null;
  activeDecisionModalId: string | null;
  phoneCallActive: boolean;
  phoneCallCompleted: boolean;
  decisions: DecisionRecord[];
  crouchActive: boolean;
  wetTowelAcquired: boolean;
  smokeQualityLevel: SmokeQualityLevel;
  
  // Actions
  setPhase: (phase: SimulationPhase) => void;
  setSelectedRoom: (room: string) => void;
  setActiveHotspotPanel: (id: string | null) => void;
  setActiveDecisionModalId: (id: string | null) => void;
  openPhoneCallUI: () => void;
  closePhoneCallUI: (completed?: boolean) => void;
  recordDecision: (record: DecisionRecord) => void;
  tickTimer: () => void;
  toggleCrouch: () => void;
  acquireWetTowel: () => void;
  setSmokeQualityLevel: (level: SmokeQualityLevel) => void;
  resetSimulation: () => void;
}
