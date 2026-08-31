export interface CameraPreset {
  id: string;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
  description: string;
}

export interface CameraState {
  activePresetId: string;
  isTransitioning: boolean;
  setPreset: (presetId: string) => void;
  setTransitioning: (status: boolean) => void;
}
