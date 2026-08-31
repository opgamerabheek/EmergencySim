import { create } from 'zustand';
import { CameraState } from '../types/camera';

export const useCameraStore = create<CameraState>((set) => ({
  activePresetId: 'overview',
  isTransitioning: false,
  setPreset: (activePresetId) => set({ activePresetId }),
  setTransitioning: (isTransitioning) => set({ isTransitioning }),
}));
