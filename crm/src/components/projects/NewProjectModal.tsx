import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useCRMStore } from '../../stores/crmStore';
import type { ProjectCategory, FinishGrade } from '../../types/crm';

export const NewProjectModal: React.FC = () => {
  const { isNewProjectModalOpen, setNewProjectModalOpen, addProject, artisans } = useCRMStore();

  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('bathroom');
  const [finishGrade, setFinishGrade] = useState<FinishGrade>('prestige');
  const [surfaceM2, setSurfaceM2] = useState<number>(18);
  const [estimatedBudget, setEstimatedBudget] = useState<number>(35000);
  const [assignedArtisanId, setAssignedArtisanId] = useState<string>(artisans[0]?.id || 'art-1');

  if (!isNewProjectModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !clientName.trim() || !address.trim()) return;

    const selectedArtisan = artisans.find((a) => a.id === assignedArtisanId);

    addProject({
      clientId: `cli-${Date.now()}`,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim() || '01 89 40 52 30',
      clientEmail: clientEmail.trim() || 'contact@client.fr',
      address: address.trim(),
      title: title.trim(),
      category,
      status: 'lead',
      surfaceM2: Number(surfaceM2) || 15,
      finishGrade,
      estimatedBudget: Number(estimatedBudget) || 25000,
      assignedArtisanId,
      assignedArtisanName: selectedArtisan ? selectedArtisan.name : 'Issam (Conducteur TCE)',
      decennialPolicy: 'Allianz AZ-98421-DEC'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060610]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0f0f20] border border-[rgba(197,160,89,0.3)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)] bg-[#14142a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[rgba(197,160,89,0.15)] border border-[#c5a059] flex items-center justify-center text-[#e8c77a]">
              <Plus size={20} />
            </div>
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-white">
                Nouveau Chantier &bull; Enregistrement Dossier
              </h2>
              <p className="text-xs text-[rgba(240,237,232,0.5)]">
                Ouverture d'un dossier sous garantie décennale Allianz
              </p>
            </div>
          </div>
          <button
            onClick={() => setNewProjectModalOpen(false)}
            className="p-2 rounded-lg text-[rgba(240,237,232,0.6)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Project Title */}
          <div>
            <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Intitulé du Projet</label>
            <input
              type="text"
              required
              placeholder="Ex: Suite Parentale Marbre &amp; Plomberie Cuivre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] focus:border-[#c5a059] rounded-xl text-white outline-none"
            />
          </div>

          {/* Client Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Nom du Client (Maître d'Ouvrage)</label>
              <input
                type="text"
                required
                placeholder="Mme &amp; M. de Montmirail"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] focus:border-[#c5a059] rounded-xl text-white outline-none"
              />
            </div>
            <div>
              <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Téléphone</label>
              <input
                type="tel"
                placeholder="06 12 34 56 78"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] focus:border-[#c5a059] rounded-xl text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="client@domaine.fr"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] focus:border-[#c5a059] rounded-xl text-white outline-none"
              />
            </div>
            <div>
              <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Adresse du Chantier</label>
              <input
                type="text"
                required
                placeholder="18, Rue de la Paix, 75002 Paris"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] focus:border-[#c5a059] rounded-xl text-white outline-none"
              />
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Corps de Métier</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full px-3 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] rounded-xl text-white outline-none cursor-pointer"
              >
                <option value="bathroom">Salle de Bain &amp; Marbre</option>
                <option value="plumbing">Plomberie &amp; Réseau Cuivre</option>
                <option value="plaster">Plâtrerie &amp; Faux-Plafonds</option>
                <option value="turnkey">Rénovation Complète Clé en Main</option>
              </select>
            </div>

            <div>
              <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Gamme de Finition</label>
              <select
                value={finishGrade}
                onChange={(e) => setFinishGrade(e.target.value as FinishGrade)}
                className="w-full px-3 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] rounded-xl text-white outline-none cursor-pointer"
              >
                <option value="prestige">Prestige (Standard Luxe)</option>
                <option value="hautecouture">Haute Couture (Marbre Réf.)</option>
                <option value="signature">Signature Aqua Nova</option>
              </select>
            </div>

            <div>
              <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Compagnon Référent</label>
              <select
                value={assignedArtisanId}
                onChange={(e) => setAssignedArtisanId(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] rounded-xl text-white outline-none cursor-pointer"
              >
                {artisans.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Surface Estimée (m&sup2;)</label>
              <input
                type="number"
                min="3"
                max="500"
                value={surfaceM2}
                onChange={(e) => setSurfaceM2(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] focus:border-[#c5a059] rounded-xl text-white font-mono outline-none"
              />
            </div>
            <div>
              <label className="text-[rgba(240,237,232,0.7)] block mb-1 font-medium">Budget Estimatif (&euro; TTC)</label>
              <input
                type="number"
                step="500"
                min="2000"
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#090a18] border border-[rgba(255,255,255,0.1)] focus:border-[#c5a059] rounded-xl text-white font-mono outline-none"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setNewProjectModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] text-[rgba(240,237,232,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#140e00] font-semibold hover:brightness-110 transition-all cursor-pointer shadow-lg"
            >
              <Plus size={16} />
              <span>Créer le Dossier Chantier</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
