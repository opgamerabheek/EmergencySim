export interface HotspotInfo {
  id: string;
  name: string;
  room: string;
  description: string;
  importance: string;
  safetyTip: string;
  positionLabel: string;
}

export const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'extinguisher',
    name: 'Fire Extinguisher',
    room: 'hallway',
    description: 'ABC Dry Chemical Extinguisher suitable for trash, wood, paper, liquids, and electrical fires.',
    importance: 'Small Initial Fires Only',
    safetyTip: 'Remember PASS: Pull pin, Aim nozzle low, Squeeze lever, Sweep side-to-side. Keep exit behind you.',
    positionLabel: 'Hallway Wall Mount'
  },
  {
    id: 'stairs',
    name: 'Emergency Stairs Exit',
    room: 'hallway',
    description: 'Fire-rated enclosed stairwell leading directly to exterior ground level.',
    importance: 'Primary Evacuation Route',
    safetyTip: 'Stairwell doors are heavy self-closing fire doors. Keep them closed to keep stairs smoke-free.',
    positionLabel: 'Exterior Corridor Exit'
  },
  {
    id: 'detector',
    name: 'Smoke Detector',
    room: 'kitchen',
    description: 'Photoelectric smoke sensor mounted on ceiling for early combustion particle detection.',
    importance: 'Early Warning System',
    safetyTip: 'Test monthly. When alarm sounds, treat every alert as a real emergency immediately.',
    positionLabel: 'Kitchen Ceiling'
  },
  {
    id: 'phone',
    name: 'Emergency Services Phone',
    room: 'living',
    description: 'Simulated emergency phone interface for contacting 112 Dispatchers.',
    importance: 'Emergency Communication',
    safetyTip: 'Call when safe to do so. Provide exact address, building floor, apartment number, and nature of hazard.',
    positionLabel: 'Living Room Side Table'
  }
];
