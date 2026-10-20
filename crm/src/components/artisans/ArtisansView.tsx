import React from 'react';
import { 
  Users, 
  Phone, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  HardHat, 
  MessageSquare
} from 'lucide-react';
import { useCRMStore } from '../../stores/crmStore';
import type { Artisan } from '../../types/crm';

export const ArtisansView: React.FC = () => {
  const { artisans, projects } = useCRMStore();

  const getStatusBadge = (status: Artisan['currentStatus']) => {
    switch (status) {
      case 'on_site':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[rgba(34,197,94,0.15)] text-[#4ade80] border border-[rgba(34,197,94,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
            Sur Chantier
          </span>
        );
      case 'on_survey':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
            Visite Technique
          </span>
        );
      case 'available':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[rgba(197,160,89,0.15)] text-[#e8c77a] border border-[rgba(197,160,89,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#c5a059]"></span>
            Disponible Atelier
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[rgba(15,15,32,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[rgba(197,160,89,0.15)] border border-[#c5a059] flex items-center justify-center text-[#e8c77a]">
              <Users size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#c5a059]">
              Corps d'État Intégrés &bull; DTU 60.1 &amp; 52.2
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-2xl lg:text-3xl font-semibold text-white">
            Compagnons &amp; Maîtres Artisans Aqua Nova
          </h2>
          <p className="text-sm text-[rgba(240,237,232,0.65)] mt-1 max-w-2xl">
            Gestion du planning des compagnons d'art. Zéro sous-traitance non qualifiée, affectations directes et suivi des interventions chantiers de prestige.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-right">
            <span className="text-xs text-[rgba(240,237,232,0.5)] block">Taux d'occupation</span>
            <span className="font-mono text-lg font-bold text-[#e8c77a]">100% Déployés</span>
          </div>
        </div>
      </div>

      {/* Artisans Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {artisans.map((artisan) => {
          // Find projects assigned to this artisan
          const assignedProjects = projects.filter(
            (p) => p.assignedArtisanId === artisan.id || p.assignedArtisanName.includes(artisan.name.split(' ')[0])
          );

          return (
            <div 
              key={artisan.id}
              className="bg-[rgba(15,15,32,0.85)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 flex flex-col justify-between hover:border-[rgba(197,160,89,0.4)] transition-all shadow-xl group"
            >
              <div>
                {/* Avatar & Status Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="relative">
                    <img 
                      src={artisan.avatarUrl} 
                      alt={artisan.name}
                      className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-[rgba(197,160,89,0.5)] shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-[#0c0d1e] border border-[rgba(197,160,89,0.5)] flex items-center justify-center text-[#e8c77a]">
                      <HardHat size={14} />
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(artisan.currentStatus)}
                  </div>
                </div>

                {/* Identity */}
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-white group-hover:text-[#e8c77a] transition-colors">
                  {artisan.name}
                </h3>
                <p className="text-sm font-medium text-[#c5a059] mb-1">
                  {artisan.role}
                </p>
                <p className="text-xs text-[rgba(240,237,232,0.6)] line-clamp-2 mb-4">
                  {artisan.specialty}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                    <span className="text-[10px] text-[rgba(240,237,232,0.5)] uppercase flex items-center gap-1">
                      <Award size={12} className="text-[#c5a059]" /> Expérience
                    </span>
                    <span className="font-mono text-sm font-semibold text-white mt-0.5 block">
                      {artisan.experienceYears} Ans d'Art
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                    <span className="text-[10px] text-[rgba(240,237,232,0.5)] uppercase flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-[#22c55e]" /> Chantiers
                    </span>
                    <span className="font-mono text-sm font-semibold text-white mt-0.5 block">
                      {assignedProjects.length} Actif(s)
                    </span>
                  </div>
                </div>

                {/* Current Active Mission */}
                <div className="p-3.5 rounded-xl bg-[rgba(197,160,89,0.06)] border border-[rgba(197,160,89,0.18)] mb-6">
                  <div className="flex items-center justify-between text-xs text-[rgba(240,237,232,0.6)] mb-1">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#e8c77a]" /> Mission Actuelle
                    </span>
                    <span className="text-[10px] font-mono text-[#e8c77a]">DTU Conforme</span>
                  </div>
                  <p className="text-sm font-medium text-white truncate">
                    {artisan.activeProjectTitle || 'En attente d\'affectation'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-3">
                <a 
                  href={`tel:${artisan.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(197,160,89,0.2)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(197,160,89,0.4)] text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  <Phone size={14} className="text-[#c5a059]" />
                  {artisan.phone}
                </a>
                <a 
                  href={`https://wa.me/${artisan.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[rgba(34,197,94,0.12)] hover:bg-[rgba(34,197,94,0.25)] border border-[rgba(34,197,94,0.3)] text-[#4ade80] transition-all cursor-pointer"
                  title="WhatsApp Chantier"
                >
                  <MessageSquare size={16} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Schedule Calendar Strip */}
      <div className="bg-[rgba(15,15,32,0.7)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#c5a059]" />
            <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-white">
              Planning Hebdomadaire des Interventions
            </h3>
          </div>
          <span className="text-xs font-mono text-[rgba(240,237,232,0.5)]">
            Semaine S43 &bull; Octobre 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.08)] text-[rgba(240,237,232,0.5)] font-mono">
                <th className="py-3 px-4 font-normal">Compagnon</th>
                <th className="py-3 px-3 font-normal">Lundi</th>
                <th className="py-3 px-3 font-normal">Mardi</th>
                <th className="py-3 px-3 font-normal">Mercredi</th>
                <th className="py-3 px-3 font-normal">Jeudi</th>
                <th className="py-3 px-3 font-normal">Vendredi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)] font-sans">
              <tr>
                <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c5a059]"></span>
                  Brahem (Plomberie)
                </td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Pose réseau cuivre Neuilly</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Épreuve pression DTU 60.1</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Raccordement thermostatique</td>
                <td className="py-3 px-3 text-[rgba(245,158,11,0.1)] text-[#fbbf24] rounded">Visite technique Passy</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Pose robinetterie or brossé</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c5a059]"></span>
                  Ibrahim (Marbrerie)
                </td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Découpe Calacatta atelier</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Pose dalles 120x240cm</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Livre ouvert douche à l'italienne</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Jointoiement résine époxy</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Cristallisation &amp; Traitement</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c5a059]"></span>
                  Issam (Conducteur TCE)
                </td>
                <td className="py-3 px-3 text-[rgba(245,158,11,0.1)] text-[#fbbf24] rounded">Métré laser Trocadéro</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Contrôle faux-plafond acoustique</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Coordination électricien LED</td>
                <td className="py-3 px-3 text-[rgba(240,237,232,0.8)] bg-[rgba(197,160,89,0.05)] rounded">Calepinage gorges lumineuses</td>
                <td className="py-3 px-3 text-[rgba(34,197,94,0.1)] text-[#4ade80] rounded">Signature PV Réception Client</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
