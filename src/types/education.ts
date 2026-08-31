export interface DecisionOption {
  id: string;
  label: string;
  sublabel?: string;
  isSafe: boolean;
  classification?: "safe" | "unsafe" | "conditional";
  feedback: string;
  explanation: string;
}

export interface DecisionPoint {
  id: string;
  phase: string;
  title: string;
  description: string;
  options: DecisionOption[];
}

export interface LessonCardData {
  id: string;
  title: string;
  takeaway: string;
  detail: string;
  category: string;
  iconName: string;
}

export interface ScenarioMeta {
  id: string;
  title: string;
  badge: "AVAILABLE" | "COMING SOON";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  image: string;
  isPlayable: boolean;
}
