import React from 'react';
import { 
  Euro, 
  HardHat, 
  CalendarCheck, 
  ShieldCheck, 
  ArrowUpRight, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { useCRMStore } from '../../stores/crmStore';
import { formatEUR, formatDate } from '../../lib/utils';

export const DashboardView: React.FC = () => {
  const { projects, artisans, setActiveTab, setSelectedProject, setNewProjectModalOpen } = useCRMStore();

  const inProgressProjects = projects.filter((p) => p.status === 'in_progress');
  const surveyProjects = projects.filter((p) => p.status === 'survey_scheduled');
  const completedProjects = projects.filter((p) => p.status === 'completed');

  const totalRevenue = projects.reduce((acc, p) => acc + (p.finalAmountTTC || p.estimatedBudget), 0);

  // Collect latest logs across all projects
  const allLogs = projects.flatMap((p) => 
    p.logs.map((l) => ({ ...l, projectTitle: p.title, projectRef: p.reference }))
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0f1024] via-[#151630] to-[#0f1024] border border-[rgba(197,160,89,0.3)] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(197,160,89,0.12)] border border-[rgba(197,160,89,0.3)] text-[#e8c77a] text-xs font-semibold uppercase tracking-wider mb-3">
            Atelier &amp; Maîtrise d'Œuvre
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond'] text-[#f5f3ef]">
            Centre de Contrôle Opérationnel
          </h2>
          <p className="text-sm text-[rgba(245,243,239,0.65)] mt-1 max-w-xl">
            Suivi temps réel des chantiers de plomberie d'art, approvisionnements en marbre et respect strict des normes DTU.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('quotes')}
            className="px-4 py-2.5 rounded-lg border border-[rgba(197,160,89,0.4)] bg-[rgba(197,160,89,0.1)] text-[#fae7b9] hover:bg-[rgba(197,160,89,0.2)] text-sm font-semibold transition-all cursor-pointer"
          >
            Nouveau Devis BTP
          </button>
          <button
            onClick={() => setNewProjectModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#dfbd7c] via-[#c5a059] to-[#9e7a32] text-[#120e06] font-semibold text-sm hover:brightness-110 shadow-lg transition-all cursor-pointer"
          >
            <Plus size={18} />
            <span>Nouveau Dossier</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1 */}
        <div className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] hover:border-[#c5a059] rounded-xl p-5 transition-all shadow-md">
          <div className="flex items-center justify-between text-[rgba(245,243,239,0.45)] text-xs font-medium uppercase tracking-wider">
            <span>CA Total Engagé</span>
            <Euro size={18} className="text-[#c5a059]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#fae7b9] mt-3">
            {formatEUR(totalRevenue)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#22c55e] mt-2 font-mono">
            <ArrowUpRight size={14} />
            <span>+18.4% vs trimestre précédent</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] hover:border-[#c5a059] rounded-xl p-5 transition-all shadow-md">
          <div className="flex items-center justify-between text-[rgba(245,243,239,0.45)] text-xs font-medium uppercase tracking-wider">
            <span>Chantiers en Cours</span>
            <HardHat size={18} className="text-[#00bcd4]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#00bcd4] mt-3">
            {inProgressProjects.length}
          </div>
          <div className="text-xs text-[rgba(245,243,239,0.55)] mt-2">
            Brahem &amp; Ibrahim sur site
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] hover:border-[#c5a059] rounded-xl p-5 transition-all shadow-md">
          <div className="flex items-center justify-between text-[rgba(245,243,239,0.45)] text-xs font-medium uppercase tracking-wider">
            <span>Visites à Réaliser</span>
            <CalendarCheck size={18} className="text-[#eab308]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#eab308] mt-3">
            {surveyProjects.length}
          </div>
          <div className="text-xs text-[rgba(245,243,239,0.55)] mt-2">
            Relevés de cotes &amp; pression
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] hover:border-[#c5a059] rounded-xl p-5 transition-all shadow-md">
          <div className="flex items-center justify-between text-[rgba(245,243,239,0.45)] text-xs font-medium uppercase tracking-wider">
            <span>Décennale &amp; DTU</span>
            <ShieldCheck size={18} className="text-[#22c55e]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#22c55e] mt-3">
            {completedProjects.length} Réceptionné{completedProjects.length > 1 ? 's' : ''}
          </div>
          <div className="text-xs text-[rgba(245,243,239,0.55)] mt-2 font-mono truncate">
            100% Décennale Allianz
          </div>
        </div>
      </div>

      {/* Main Split: Active Chantiers + Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Projects Focus */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#f5f3ef] flex items-center gap-2">
              <span>Chantiers en Exécution Immédiate</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(197,160,89,0.15)] text-[#e8c77a]">
                {inProgressProjects.length}
              </span>
            </h3>
            <button 
              onClick={() => setActiveTab('kanban')}
              className="text-xs text-[#e8c77a] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Voir tout le pipeline</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {inProgressProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] hover:border-[#c5a059] rounded-xl p-5 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs text-[#e8c77a]">{p.reference}</span>
                    <span className="text-xs text-[rgba(245,243,239,0.4)]">•</span>
                    <span className="text-xs text-[rgba(245,243,239,0.6)]">{p.clientName}</span>
                  </div>
                  <h4 className="text-base font-semibold text-[#f5f3ef] group-hover:text-[#fae7b9] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[rgba(245,243,239,0.5)] mt-1">
                    {p.address} • Surface : {p.surfaceM2} m²
                  </p>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center w-full sm:w-auto shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[rgba(255,255,255,0.06)]">
                  <div className="font-mono text-base font-bold text-[#22c55e]">
                    {formatEUR(p.finalAmountTTC || p.estimatedBudget)}
                  </div>
                  <div className="text-xs text-[#e8c77a] mt-0.5">
                    Artisan : {p.assignedArtisanName}
                  </div>
                </div>
              </div>
            ))}

            {inProgressProjects.length === 0 && (
              <div className="bg-[#0f1024] border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl p-8 text-center text-sm text-[rgba(245,243,239,0.5)]">
                Aucun chantier en cours d'exécution. Consultez le pipeline pour démarrer un nouveau chantier.
              </div>
            )}
          </div>

          {/* Artisans Quick Status */}
          <div className="pt-4">
            <h4 className="text-sm font-semibold text-[#f5f3ef] mb-3">Statut des Maîtres Artisans</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {artisans.map((artisan) => (
                <div key={artisan.id} className="bg-[#0f1024] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 flex items-center gap-3">
                  <img 
                    src={artisan.avatarUrl} 
                    alt={artisan.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#c5a059]"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100';
                    }}
                  />
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-[#f5f3ef]">{artisan.name}</div>
                    <div className="text-[10px] text-[#e8c77a] truncate">{artisan.role.split('&')[0]}</div>
                    <div className="text-[10px] text-[#22c55e] flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
                      {artisan.currentStatus === 'on_site' ? 'Sur Chantier' : 'Disponible'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Journal & Activity Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#f5f3ef]">
              Journal de Chantier
            </h3>
            <span className="text-xs text-[rgba(245,243,239,0.4)]">Flux terrain</span>
          </div>

          <div className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 space-y-4 max-h-[560px] overflow-y-auto">
            {allLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="border-b border-[rgba(255,255,255,0.06)] pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#e8c77a]">{log.authorName}</span>
                  <span className="text-[rgba(245,243,239,0.4)] font-mono">{formatDate(log.createdAt)}</span>
                </div>
                <div className="text-xs text-[rgba(245,243,239,0.5)] mb-1 font-mono">
                  {log.projectRef} — {log.projectTitle}
                </div>
                <p className="text-xs text-[rgba(245,243,239,0.85)] leading-relaxed">
                  {log.content}
                </p>
                {log.photoUrls && log.photoUrls.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {log.photoUrls.map((url, i) => (
                      <img 
                        key={i} 
                        src={url} 
                        alt="Photo de suivi" 
                        className="w-14 h-14 rounded-md object-cover border border-[rgba(255,255,255,0.1)]"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
