import React from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  User, 
  Layers
} from 'lucide-react';
import { useCRMStore } from '../../stores/crmStore';
import type { ProjectStatus } from '../../types/crm';
import { formatEUR } from '../../lib/utils';

interface ColumnDef {
  status: ProjectStatus;
  title: string;
  color: string;
  badgeBg: string;
}

const COLUMNS: ColumnDef[] = [
  { status: 'lead', title: 'Demandes Entrantes', color: '#3b82f6', badgeBg: 'rgba(59,130,246,0.15)' },
  { status: 'survey_scheduled', title: 'Visites Programmées', color: '#eab308', badgeBg: 'rgba(234,179,8,0.15)' },
  { status: 'quote_sent', title: 'Devis en Négociation', color: '#a855f7', badgeBg: 'rgba(168,85,247,0.15)' },
  { status: 'in_progress', title: 'Chantiers en Exécution', color: '#00bcd4', badgeBg: 'rgba(0,188,212,0.15)' },
  { status: 'completed', title: 'Réception & Décennale', color: '#22c55e', badgeBg: 'rgba(34,197,94,0.15)' }
];

export const KanbanView: React.FC = () => {
  const { projects, searchQuery, moveProjectStatus, setSelectedProject } = useCRMStore();

  const filteredProjects = projects.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.clientName.toLowerCase().includes(q) ||
      p.reference.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q)
    );
  });

  const getNextStatus = (current: ProjectStatus): ProjectStatus | null => {
    const order: ProjectStatus[] = ['lead', 'survey_scheduled', 'quote_sent', 'in_progress', 'completed'];
    const idx = order.indexOf(current);
    if (idx !== -1 && idx < order.length - 1) {
      return order[idx + 1];
    }
    return null;
  };

  const getPrevStatus = (current: ProjectStatus): ProjectStatus | null => {
    const order: ProjectStatus[] = ['lead', 'survey_scheduled', 'quote_sent', 'in_progress', 'completed'];
    const idx = order.indexOf(current);
    if (idx > 0) {
      return order[idx - 1];
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-['Cormorant_Garamond'] text-[#f5f3ef]">
            Pipeline Kanban des Chantiers
          </h2>
          <p className="text-xs text-[rgba(245,243,239,0.55)] mt-0.5">
            Suivi du cycle de vie complet de l'affaire : du premier contact à la livraison sans réserve.
          </p>
        </div>
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {COLUMNS.map((col) => {
          const colProjects = filteredProjects.filter((p) => p.status === col.status);
          const colSum = colProjects.reduce((acc, p) => acc + (p.finalAmountTTC || p.estimatedBudget), 0);

          return (
            <div 
              key={col.status}
              className="bg-[#0b0c1e] border border-[rgba(255,255,255,0.08)] rounded-xl flex flex-col min-w-[280px]"
            >
              {/* Column Header */}
              <div className="p-4 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: col.color }}
                  />
                  <span className="text-xs font-semibold text-[#f5f3ef]">
                    {col.title}
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.08)] text-[rgba(245,243,239,0.7)]">
                  {colProjects.length}
                </span>
              </div>

              {/* Total Subtotal for Column */}
              <div className="px-4 py-2 bg-[rgba(255,255,255,0.015)] border-b border-[rgba(255,255,255,0.04)] text-[11px] font-mono text-[rgba(245,243,239,0.5)] flex justify-between">
                <span>Total estimé :</span>
                <span className="text-[#e8c77a] font-semibold">{formatEUR(colSum)}</span>
              </div>

              {/* Column Cards Container */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[70vh]">
                {colProjects.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#121326] border border-[rgba(255,255,255,0.07)] hover:border-[#c5a059] rounded-lg p-4 transition-all shadow-md group relative"
                  >
                    {/* Header reference and Category */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-[#e8c77a] font-semibold">
                        {p.reference}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(197,160,89,0.12)] text-[#fae7b9] font-medium uppercase">
                        {p.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 
                      onClick={() => setSelectedProject(p)}
                      className="text-sm font-semibold text-[#f5f3ef] group-hover:text-[#fae7b9] cursor-pointer transition-colors line-clamp-2"
                    >
                      {p.title}
                    </h4>

                    {/* Client & Address */}
                    <div className="mt-2 space-y-1 text-xs text-[rgba(245,243,239,0.55)]">
                      <div className="flex items-center gap-1.5 truncate">
                        <User size={12} className="text-[#c5a059] shrink-0" />
                        <span className="truncate">{p.clientName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin size={12} className="text-[rgba(245,243,239,0.4)] shrink-0" />
                        <span className="truncate">{p.address}</span>
                      </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="mt-3 pt-2.5 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-[rgba(245,243,239,0.5)]">
                        <Layers size={12} />
                        <span>{p.surfaceM2} m²</span>
                      </div>
                      <div className="font-mono font-bold text-[#fae7b9]">
                        {formatEUR(p.finalAmountTTC || p.estimatedBudget)}
                      </div>
                    </div>

                    {/* Assigned Artisan & Navigation buttons */}
                    <div className="mt-3 pt-2 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                      <div className="text-[10px] text-[#00bcd4] truncate font-medium">
                        Artisan : {p.assignedArtisanName}
                      </div>

                      <div className="flex items-center gap-1">
                        {getPrevStatus(p.status) && (
                          <button
                            title="Rétrograder le statut"
                            onClick={() => moveProjectStatus(p.id, getPrevStatus(p.status)!)}
                            className="p-1 rounded bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.15)] text-[rgba(245,243,239,0.6)] cursor-pointer"
                          >
                            <ChevronLeft size={14} />
                          </button>
                        )}
                        {getNextStatus(p.status) && (
                          <button
                            title="Avancer au statut suivant"
                            onClick={() => moveProjectStatus(p.id, getNextStatus(p.status)!)}
                            className="p-1 rounded bg-[rgba(197,160,89,0.15)] hover:bg-[rgba(197,160,89,0.3)] text-[#e8c77a] cursor-pointer"
                          >
                            <ChevronRight size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {colProjects.length === 0 && (
                  <div className="py-12 text-center text-xs text-[rgba(245,243,239,0.3)] italic">
                    Aucun dossier à cette étape
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
