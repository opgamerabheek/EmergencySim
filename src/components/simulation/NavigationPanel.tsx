import React from 'react';
import { Home, Utensils, Bed, Bath, Compass, Maximize2 } from 'lucide-react';

interface NavigationPanelProps {
  selectedRoom: string;
  onSelectRoom: (room: string) => void;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  selectedRoom,
  onSelectRoom,
}) => {
  const rooms = [
    { id: 'overview', label: 'Overview', icon: <Maximize2 className="w-4 h-4" /> },
    { id: 'living', label: 'Living Room', icon: <Home className="w-4 h-4" /> },
    { id: 'kitchen', label: 'Kitchen', icon: <Utensils className="w-4 h-4" /> },
    { id: 'bedroom', label: 'Bedroom', icon: <Bed className="w-4 h-4" /> },
    { id: 'bathroom', label: 'Bathroom', icon: <Bath className="w-4 h-4" /> },
    { id: 'hallway', label: 'Hallway / Exit', icon: <Compass className="w-4 h-4" /> },
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 w-full md:w-56 flex flex-col gap-3 border border-[#3F4826]/20 shadow-2xl backdrop-blur-xl">
      <div className="text-[11px] font-mono-data tracking-wider uppercase text-[#7D8995] px-2 py-0.5 font-semibold">
        Room Viewpoints
      </div>
      <div className="flex flex-col gap-2">
        {rooms.map((room) => {
          const isSelected = selectedRoom === room.id;
          return (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`h-10 px-3.5 flex items-center gap-3 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-cyan text-white shadow-md shadow-[#3F4826]/25 font-semibold'
                  : 'bg-[#050608]/40 text-[#7D8995] hover:text-[#F1F4F6] hover:bg-[#10161D] border border-transparent hover:border-[#3F4826]/25'
              }`}
            >
              {room.icon}
              <span>{room.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
