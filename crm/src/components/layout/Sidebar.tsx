import React from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  FileSpreadsheet, 
  Users, 
  ShieldCheck, 
  ArrowLeft,
  HardHat
} from 'lucide-react';
import { useCRMStore, type NavigationTab } from '../../stores/crmStore';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useCRMStore();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: <LayoutDashboard size={20} /> },
    { id: 'kanban', label: 'Pipeline Chantiers', icon: <KanbanSquare size={20} /> },
    { id: 'quotes', label: 'Générateur Devis DTU', icon: <FileSpreadsheet size={20} />, badge: 'BTP' },
    { id: 'artisans', label: 'Planning Artisans', icon: <Users size={20} /> },
    { id: 'documents', label: 'Dossiers & Décennale', icon: <ShieldCheck size={20} />, badge: 'Allianz' }
  ];

  return (
    <aside className="w-64 bg-[#090a18] border-r border-[rgba(255,255,255,0.08)] flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[rgba(197,160,89,0.15)] border border-[#c5a059] flex items-center justify-center text-[#e8c77a]">
            <HardHat size={22} />
          </div>
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-xl font-bold tracking-wider text-[#e8c77a]">
              AQUA NOVA
            </h1>
            <p className="text-[10px] tracking-widest text-[rgba(245,243,239,0.45)] uppercase font-medium">
              BTP Suite &amp; CRM Pro
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[rgba(197,160,89,0.18)] text-[#fae7b9] border border-[rgba(197,160,89,0.4)] shadow-[0_0_15px_rgba(197,160,89,0.1)]'
                    : 'text-[rgba(245,243,239,0.65)] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#e8c77a]' : 'text-current'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.08)] text-[#e8c77a] border border-[rgba(197,160,89,0.2)]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Exit */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)] space-y-3">
        {/* Active Session Card */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#151630] border border-[#c5a059] overflow-hidden shrink-0">
            <img 
              src="/assets/images/Issam.jpg" 
              alt="Issam" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100';
              }}
            />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-[#f5f3ef] truncate">Issam (TCE)</div>
            <div className="text-[10px] text-[#22c55e] flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
              En ligne • Conducteur
            </div>
          </div>
        </div>

        {/* Exit to Public Site */}
        <a
          href="/index.html"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] text-xs text-[rgba(245,243,239,0.6)] hover:text-white hover:border-[#c5a059] transition-all"
        >
          <ArrowLeft size={14} />
          <span>Retour au site public</span>
        </a>
      </div>
    </aside>
  );
};
