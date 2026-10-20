import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  HardHat, 
  Image as ImageIcon,
  Send,
  Trash2
} from 'lucide-react';
import { useCRMStore } from '../../stores/crmStore';
import { formatEUR, formatDate } from '../../lib/utils';
import type { ProjectStatus } from '../../types/crm';

export const ProjectDetailModal: React.FC = () => {
  const { 
    selectedProject, 
    setSelectedProject, 
    moveProjectStatus, 
    assignArtisan, 
    artisans,
    addSiteLog,
    deleteProject 
  } = useCRMStore();

  const [newLogText, setNewLogText] = useState('');
  const [authorName, setAuthorName] = useState('Issam (TCE)');
  const [photoUrlInput, setPhotoUrlInput] = useState('');

  if (!selectedProject) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    moveProjectStatus(selectedProject.id, e.target.value as ProjectStatus);
    // keep selectedProject updated locally in view
    setSelectedProject({
      ...selectedProject,
      status: e.target.value as ProjectStatus
    });
  };

  const handleArtisanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const artisanId = e.target.value;
    assignArtisan(selectedProject.id, artisanId);
    const art = artisans.find((a) => a.id === artisanId);
    if (art) {
      setSelectedProject({
        ...selectedProject,
        assignedArtisanId: artisanId,
        assignedArtisanName: art.name
      });
    }
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogText.trim()) return;

    const photos = photoUrlInput.trim() ? [photoUrlInput.trim()] : [];
    addSiteLog(selectedProject.id, newLogText.trim(), authorName, photos);
    
    // refresh selected project with the new log
    setSelectedProject({
      ...selectedProject,
      logs: [
        {
          id: `log-${Date.now()}`,
          projectId: selectedProject.id,
          authorName,
          content: newLogText.trim(),
          photoUrls: photos,
          createdAt: new Date().toISOString(),
          isVisibleToClient: true
        },
        ...selectedProject.logs
      ]
    });

    setNewLogText('');
    setPhotoUrlInput('');
  };

  const handleDelete = () => {
    if (window.confirm(`Confirmez-vous la suppression du dossier ${selectedProject.reference} ?`)) {
      deleteProject(selectedProject.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060610]/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-fadeIn">
      <div 
        className="w-full max-w-4xl bg-[#0f0f20] border border-[rgba(197,160,89,0.3)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)] bg-[#14142a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[rgba(197,160,89,0.15)] text-[#e8c77a] border border-[rgba(197,160,89,0.3)]">
              {selectedProject.reference}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-white">
              {selectedProject.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Supprimer le dossier"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => setSelectedProject(null)}
              className="p-2 rounded-lg text-[rgba(240,237,232,0.6)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
              <span className="text-xs text-[rgba(240,237,232,0.5)] block mb-1">Maître d'Ouvrage</span>
              <p className="font-semibold text-white">{selectedProject.clientName}</p>
              <div className="mt-2 space-y-1 text-xs text-[rgba(240,237,232,0.7)]">
                <p className="flex items-center gap-1.5"><Phone size={12} className="text-[#c5a059]" /> {selectedProject.clientPhone}</p>
                <p className="flex items-center gap-1.5"><Mail size={12} className="text-[#c5a059]" /> {selectedProject.clientEmail}</p>
                <p className="flex items-center gap-1.5"><MapPin size={12} className="text-[#c5a059]" /> {selectedProject.address}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
              <span className="text-xs text-[rgba(240,237,232,0.5)] block mb-1">Budget &amp; Spécifications</span>
              <p className="font-mono text-xl font-bold text-[#e8c77a]">
                {formatEUR(selectedProject.estimatedBudget)}
              </p>
              <div className="mt-2 space-y-1 text-xs text-[rgba(240,237,232,0.7)]">
                <p>Surface : <strong className="text-white">{selectedProject.surfaceM2} m&sup2;</strong></p>
                <p>Finition : <strong className="text-white uppercase font-mono">{selectedProject.finishGrade}</strong></p>
                <p>Assurance : <span className="text-[#4ade80] font-mono">{selectedProject.decennialPolicy}</span></p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
              <span className="text-xs text-[rgba(240,237,232,0.5)] block mb-1">Gestion du Chantier</span>
              
              {/* Status Select */}
              <div className="mb-2">
                <label className="text-[10px] text-[rgba(240,237,232,0.5)] uppercase block">Étape Pipeline</label>
                <select 
                  value={selectedProject.status}
                  onChange={handleStatusChange}
                  className="w-full mt-1 px-2.5 py-1.5 bg-[#090a18] border border-[rgba(197,160,89,0.3)] rounded-lg text-xs text-white cursor-pointer"
                >
                  <option value="lead">1. Nouveau Lead</option>
                  <option value="survey_scheduled">2. Visite Technique</option>
                  <option value="quote_sent">3. Devis BTP Émis</option>
                  <option value="in_progress">4. Chantier En Cours</option>
                  <option value="completed">5. Réception &amp; Décennale</option>
                </select>
              </div>

              {/* Artisan Select */}
              <div>
                <label className="text-[10px] text-[rgba(240,237,232,0.5)] uppercase block">Compagnon Référent</label>
                <select 
                  value={selectedProject.assignedArtisanId}
                  onChange={handleArtisanChange}
                  className="w-full mt-1 px-2.5 py-1.5 bg-[#090a18] border border-[rgba(197,160,89,0.3)] rounded-lg text-xs text-white cursor-pointer"
                >
                  {artisans.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Site Log Section */}
          <div className="space-y-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-white flex items-center gap-2">
                <HardHat size={18} className="text-[#c5a059]" />
                Journal de Bord du Chantier (DTU Traçabilité)
              </h3>
              <span className="text-xs font-mono text-[rgba(240,237,232,0.5)]">
                {selectedProject.logs.length} entrée(s)
              </span>
            </div>

            {/* Add Log Form */}
            <form onSubmit={handleAddLog} className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] space-y-3">
              <div className="flex gap-3">
                <select
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="px-3 py-2 bg-[#090a18] border border-[rgba(255,255,255,0.1)] rounded-lg text-xs text-[#e8c77a] cursor-pointer"
                >
                  <option value="Issam (TCE)">Issam (TCE)</option>
                  <option value="Brahem (Plomberie)">Brahem (Plomberie)</option>
                  <option value="Ibrahim (Marbrerie)">Ibrahim (Marbrerie)</option>
                  <option value="Direction Aqua Nova">Direction Aqua Nova</option>
                </select>
                <input
                  type="text"
                  placeholder="Note d'avancement technique (ex: Épreuve hydrostatique 6 bars conforme)..."
                  value={newLogText}
                  onChange={(e) => setNewLogText(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#090a18] border border-[rgba(255,255,255,0.1)] focus:border-[#c5a059] rounded-lg text-xs text-white outline-none"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] rounded-lg text-xs">
                  <ImageIcon size={14} className="text-[rgba(240,237,232,0.4)]" />
                  <input
                    type="text"
                    placeholder="URL photo chantier (optionnel, ex: /images/img1.png)"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    className="flex-1 bg-transparent text-white outline-none text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[rgba(197,160,89,0.2)] hover:bg-[rgba(197,160,89,0.3)] border border-[rgba(197,160,89,0.4)] text-[#fae7b9] font-medium text-xs transition-colors cursor-pointer"
                >
                  <Send size={14} />
                  <span>Publier</span>
                </button>
              </div>
            </form>

            {/* Logs List */}
            <div className="space-y-3">
              {selectedProject.logs.map((log) => (
                <div 
                  key={log.id} 
                  className="p-3.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex gap-3 text-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-[rgba(197,160,89,0.15)] border border-[#c5a059] flex items-center justify-center text-[#e8c77a] shrink-0 font-bold">
                    {log.authorName.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{log.authorName}</span>
                      <span className="text-[10px] font-mono text-[rgba(240,237,232,0.4)]">
                        {formatDate(log.createdAt)}
                      </span>
                    </div>
                    <p className="text-[rgba(240,237,232,0.8)] leading-relaxed">
                      {log.content}
                    </p>
                    {log.photoUrls && log.photoUrls.length > 0 && (
                      <div className="pt-2 flex gap-2">
                        {log.photoUrls.map((url, idx) => (
                          <img 
                            key={idx} 
                            src={url} 
                            alt="Chantier" 
                            className="w-20 h-16 object-cover rounded-lg border border-[rgba(197,160,89,0.3)]" 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
