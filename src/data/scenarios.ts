import { ScenarioMeta } from '../types/education';

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const SCENARIOS: ScenarioMeta[] = [
  {
    id: 'fire',
    title: 'APARTMENT FIRE',
    badge: 'AVAILABLE',
    difficulty: 'Beginner',
    duration: 'A few minutes',
    description: 'A fire breaks out in your kitchen. Learn spatial evacuation procedures and door safety.',
    image: assetUrl('assets/apartment-fire.png'),
    isPlayable: true,
  },
  {
    id: 'flood',
    title: 'FLASH FLOOD',
    badge: 'COMING SOON',
    difficulty: 'Intermediate',
    duration: 'A few minutes',
    description: 'Rapidly rising water threatens a urban residence. Learn vertical shelter decisions.',
    image: assetUrl('assets/reference/scenario-reference.png'),
    isPlayable: false,
  },
  {
    id: 'weather',
    title: 'SEVERE WEATHER',
    badge: 'COMING SOON',
    difficulty: 'Intermediate',
    duration: 'A few minutes',
    description: 'A tornado alert is issued. Find structural safety in interior reinforced spaces.',
    image: assetUrl('assets/reference/hero-reference.png'),
    isPlayable: false,
  },
  {
    id: 'electrical',
    title: 'ELECTRICAL EMERGENCY',
    badge: 'COMING SOON',
    difficulty: 'Beginner',
    duration: 'A few minutes',
    description: 'Power grid spark failure in residential wiring. Identify electrical isolation steps.',
    image: assetUrl('assets/reference/scenario-reference.png'),
    isPlayable: false,
  },
  {
    id: 'school',
    title: 'SCHOOL EVACUATION',
    badge: 'COMING SOON',
    difficulty: 'Advanced',
    duration: 'A few minutes',
    description: 'Coordinate clear assembly navigation across multi-wing educational facilities.',
    image: assetUrl('assets/reference/hero-reference.png'),
    isPlayable: false,
  },
];
