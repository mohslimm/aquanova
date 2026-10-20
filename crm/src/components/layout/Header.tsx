import React from 'react';
import { Search, Plus, Bell, Calendar } from 'lucide-react';
import { useCRMStore } from '../../stores/crmStore';

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, setNewProjectModalOpen, projects } = useCRMStore();

  const activeCount = projects.filter((p) => p.status === 'in_progress').length;

  return (
    <header className="h-20 bg-[#090a18] border-b border-[rgba(255,255,255,0.08)] px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative w-96">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(245,243,239,0.4)]" size={18} />
        <input
          type="text"
          placeholder="Rechercher un client, référence chantier (ex: CH-2026), adresse..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#121326] border border-[rgba(255,255,255,0.08)] focus:border-[#c5a059] rounded-lg pl-10 pr-4 py-2 text-sm text-[#f5f3ef] placeholder-[rgba(245,243,239,0.35)] outline-none transition-all shadow-inner"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(0,188,212,0.1)] border border-[rgba(0,188,212,0.3)] text-xs text-[#00bcd4]">
          <span className="w-2 h-2 rounded-full bg-[#00bcd4] animate-pulse"></span>
          <span>{activeCount} chantiers en cours d'exécution</span>
        </div>

        {/* Date Today */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-[rgba(245,243,239,0.5)] font-mono">
          <Calendar size={14} className="text-[#c5a059]" />
          <span>{new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}</span>
        </div>

        {/* Notifications Icon */}
        <button 
          title="Notifications de chantier"
          className="w-10 h-10 rounded-lg bg-[#121326] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[rgba(245,243,239,0.7)] hover:text-white hover:border-[#c5a059] transition-all cursor-pointer relative"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#c5a059]"></span>
        </button>

        {/* Primary New Project CTA */}
        <button
          onClick={() => setNewProjectModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#dfbd7c] via-[#c5a059] to-[#9e7a32] text-[#120e06] font-semibold text-sm hover:brightness-110 shadow-[0_4px_15px_rgba(197,160,89,0.25)] transition-all cursor-pointer active:scale-98"
        >
          <Plus size={18} />
          <span>Nouveau Chantier</span>
        </button>
      </div>
    </header>
  );
};
