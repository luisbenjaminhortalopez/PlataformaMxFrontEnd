"use client";

import { Plus } from "lucide-react";

type Props = {
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
};

export const FloatingActionButton = ({ onClick, label, icon }: Props) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        className="group flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white py-3 pl-4 pr-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-blue-900/30 hover:shadow-xl"
        title={label}
      >
        <span className="bg-zinc-800 rounded-full p-1 group-hover:bg-zinc-700 transition-colors">
          {icon || <Plus size={20} />}
        </span>
        <span className="font-medium">{label}</span>
      </button>
    </div>
  );
};
