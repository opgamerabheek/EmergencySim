import { DecisionPoint, LessonCardData } from '../types/education';

export const DECISION_POINTS: DecisionPoint[] = [
  {
    id: 'decision_1',
    phase: 'detection',
    title: 'Smoke Alarm Sounding',
    description: 'The smoke alarm in the hallway is beeping loudly. What is your immediate response?',
    options: [
      {
        id: 'opt_1_a',
        label: 'Investigate the source',
        sublabel: 'Check conditions while ensuring an open escape route',
        isSafe: true,
        classification: 'conditional',
        feedback: 'Investigating helps assess emergency scale, provided a clear escape path is maintained.',
        explanation: 'Assessing the threat quickly is useful if done safely without exposing yourself to danger.'
      },
      {
        id: 'opt_1_b',
        label: 'Evacuate immediately',
        sublabel: 'Leave the premises right away',
        isSafe: true,
        classification: 'safe',
        feedback: 'Evacuating at the first alarm is always the safest protocol.',
        explanation: 'Early evacuation minimizes exposure to toxic smoke inhalation.'
      },
      {
        id: 'opt_1_c',
        label: 'Ignore the alarm',
        sublabel: 'Assume it is cooking smoke',
        isSafe: false,
        classification: 'unsafe',
        feedback: 'Never ignore a smoke alarm. Seconds count in residential fires.',
        explanation: 'Fires spread exponentially. Delaying response increases trap hazard.'
      }
    ]
  },
  {
    id: 'decision_2',
    phase: 'small_fire',
    title: 'Kitchen Fire Discovered',
    description: 'A grease pan on the stove has ignited into active flames. Smoke is rising to the ceiling.',
    options: [
      {
        id: 'opt_2_a',
        label: 'Close kitchen door & evacuate',
        sublabel: 'Isolate the fire room and exit',
        isSafe: true,
        classification: 'safe',
        feedback: 'Closing interior doors cuts oxygen supply and slows fire spread by hundreds of degrees.',
        explanation: 'Containment gives residents critical extra minutes to reach stairwells.'
      },
      {
        id: 'opt_2_b',
        label: 'Use fire extinguisher if safe',
        sublabel: 'Attempt extinguisher if small and exit behind you',
        isSafe: true,
        classification: 'conditional',
        feedback: 'Extinguishers work on small contained fires only if an exit remains directly behind you.',
        explanation: 'Never allow a fire to get between you and your exit route.'
      },
      {
        id: 'opt_2_c',
        label: 'Throw water on grease fire',
        sublabel: 'Pour water directly onto stove fire',
        isSafe: false,
        classification: 'unsafe',
        feedback: 'Throwing water on grease causes catastrophic oil explosions!',
        explanation: 'Water vaporizes instantly under burning oil, atomizing flaming grease throughout the room.'
      }
    ]
  },
  {
    id: 'decision_3',
    phase: 'growing',
    title: 'Door Temperature Check',
    description: 'You reach a closed door leading toward the primary exit hallway. Smoke is pooling above.',
    options: [
      {
        id: 'opt_3_a',
        label: 'Feel door for heat with back of hand',
        sublabel: 'Test door knob and frame temperature',
        isSafe: true,
        classification: 'safe',
        feedback: 'Always feel closed doors with the back of your hand before opening.',
        explanation: 'Using the back of your hand prevents palm burns, preserving dexterity needed for handles.'
      },
      {
        id: 'opt_3_b',
        label: 'Open door immediately to look',
        sublabel: 'Pull handle open right away',
        isSafe: false,
        classification: 'unsafe',
        feedback: 'Unsafe — opening a hot door may expose you to extreme thermal heat or fire conditions.',
        explanation: 'Opening hot doors introduces fresh oxygen that can trigger violent fire eruption.'
      }
    ]
  },
  {
    id: 'decision_4',
    phase: 'critical',
    title: 'Exit Route Selection',
    description: 'You reach the main building corridor. Heavy smoke is present in the hallway.',
    options: [
      {
        id: 'opt_4_a',
        label: 'Use Emergency Stairs',
        sublabel: 'Proceed through green illuminated exit door',
        isSafe: true,
        classification: 'safe',
        feedback: 'Emergency stairwells are fire-rated pressurized enclosures and the safest exit path.',
        explanation: 'Stairwell enclosures block smoke infiltration and lead directly outside.'
      },
      {
        id: 'opt_4_b',
        label: 'Use Elevator',
        sublabel: 'Call building elevator for quick down ride',
        isSafe: false,
        classification: 'unsafe',
        feedback: 'NEVER use elevators during a building fire!',
        explanation: 'Elevators can lose power, trap occupants between floors, or open directly onto fire floors.'
      }
    ]
  }
];

export const LESSON_CARDS: LessonCardData[] = [
  {
    id: 'lesson_1',
    title: 'Know Multiple Exits',
    takeaway: 'Always identify primary & secondary evacuation routes.',
    detail: 'In any facility, know at least two ways out of every room. If one route is blocked by smoke or heat, proceed immediately to your secondary exit.',
    category: 'Evacuation',
    iconName: 'Compass'
  },
  {
    id: 'lesson_2',
    title: 'Feel Doors First',
    takeaway: 'Check for heat with the back of your hand.',
    detail: 'Feel the door handle and upper frame. If hot, do not open — heat indicates fire directly on the other side. Seek an alternate exit route.',
    category: 'Door Safety',
    iconName: 'ShieldAlert'
  },
  {
    id: 'lesson_3',
    title: 'Never Use Elevators',
    takeaway: 'Elevators become chimney smoke traps in fires.',
    detail: 'Building fires often cause electrical failure. Elevators can stop between floors or open doors onto flaming corridors. Always use pressurized emergency stairs.',
    category: 'Building Safety',
    iconName: 'OctagonAlert'
  },
  {
    id: 'lesson_4',
    title: 'Close Doors Behind You',
    takeaway: 'Isolating rooms starves fire of oxygen.',
    detail: 'Closing interior doors behind you as you evacuate confines smoke and limits oxygen flow, slowing thermal growth by hundreds of degrees.',
    category: 'Fire Containment',
    iconName: 'DoorClosed'
  }
];
