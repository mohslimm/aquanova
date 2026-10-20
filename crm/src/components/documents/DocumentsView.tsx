import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  FileCheck2, 
  Printer, 
  Lock
} from 'lucide-react';
import { useCRMStore } from '../../stores/crmStore';
import { formatDate } from '../../lib/utils';

export const DocumentsView: React.FC = () => {
  const { projects } = useCRMStore();
  const [selectedDocType, setSelectedDocType] = useState<'decennale' | 'pv_reception' | 'dtu_conformity'>('decennale');
  const [activeProjectForPV, setActiveProjectForPV] = useState<string>(projects[0]?.id || '');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const currentProject = projects.find((p) => p.id === activeProjectForPV) || projects[0];

  const handlePrint = (title: string) => {
    setDownloadSuccess(`Exportation de "${title}" générée avec succès.`);
    setTimeout(() => {
      window.print();
    }, 300);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-[rgba(15,15,32,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[rgba(197,160,89,0.15)] border border-[#c5a059] flex items-center justify-center text-[#e8c77a]">
              <ShieldCheck size={22} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#c5a059]">
              Conformité Juridique BTP &bull; Garantie Décennale
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-2xl lg:text-3xl font-semibold text-white">
            Coffre-Fort &amp; Actes Juridiques BTP
          </h2>
          <p className="text-sm text-[rgba(240,237,232,0.65)] mt-1 max-w-2xl">
            Génération immédiate des attestations décennales nominatives, procès-verbaux de réception (Art. 1792-6 C.Civ) et fiches de contrôle DTU certifiées.
          </p>
        </div>

        {/* Insurance Badge */}
        <div className="p-4 rounded-xl bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.25)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.15)] text-[#4ade80] flex items-center justify-center shrink-0">
            <Lock size={20} />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#4ade80] block">
              Police Active Allianz
            </span>
            <span className="text-sm font-semibold text-white font-mono">
              N&deg; AZ-98421-DEC-2026
            </span>
          </div>
        </div>
      </div>

      {/* Success Notification if any */}
      {downloadSuccess && (
        <div className="p-4 rounded-xl bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.3)] text-[#4ade80] text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} />
            <span>{downloadSuccess}</span>
          </div>
        </div>
      )}

      {/* Tabs Selector */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedDocType('decennale')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            selectedDocType === 'decennale'
              ? 'bg-[rgba(197,160,89,0.2)] text-[#fae7b9] border border-[rgba(197,160,89,0.5)] shadow-md'
              : 'bg-[rgba(255,255,255,0.03)] text-[rgba(240,237,232,0.6)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)]'
          }`}
        >
          <ShieldCheck size={18} className="text-[#c5a059]" />
          <span>1. Attestation Décennale Nominative</span>
        </button>

        <button
          onClick={() => setSelectedDocType('pv_reception')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            selectedDocType === 'pv_reception'
              ? 'bg-[rgba(197,160,89,0.2)] text-[#fae7b9] border border-[rgba(197,160,89,0.5)] shadow-md'
              : 'bg-[rgba(255,255,255,0.03)] text-[rgba(240,237,232,0.6)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)]'
          }`}
        >
          <FileCheck2 size={18} className="text-[#c5a059]" />
          <span>2. Procès-Verbal de Réception (PV)</span>
        </button>

        <button
          onClick={() => setSelectedDocType('dtu_conformity')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            selectedDocType === 'dtu_conformity'
              ? 'bg-[rgba(197,160,89,0.2)] text-[#fae7b9] border border-[rgba(197,160,89,0.5)] shadow-md'
              : 'bg-[rgba(255,255,255,0.03)] text-[rgba(240,237,232,0.6)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)]'
          }`}
        >
          <FileText size={18} className="text-[#c5a059]" />
          <span>3. Fiches de Contrôle DTU 60.1 / 52.2</span>
        </button>
      </div>

      {/* Main Document Viewer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Project Selector & Meta */}
        <div className="space-y-6">
          <div className="bg-[rgba(15,15,32,0.8)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
            <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-white mb-4">
              Sélectionner le Chantier Cible
            </h3>
            <p className="text-xs text-[rgba(240,237,232,0.6)] mb-4">
              L'acte sélectionné sera automatiquement personnalisé aux coordonnées du maître d'ouvrage et du chantier.
            </p>
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectForPV(proj.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    activeProjectForPV === proj.id
                      ? 'bg-[rgba(197,160,89,0.15)] border-[rgba(197,160,89,0.4)] text-white'
                      : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] text-[rgba(240,237,232,0.7)] hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-[#e8c77a]">{proj.reference}</span>
                    <span className="text-[10px] uppercase font-mono text-[rgba(240,237,232,0.5)]">{proj.status}</span>
                  </div>
                  <div className="font-medium text-sm text-white truncate">{proj.title}</div>
                  <div className="text-xs text-[rgba(240,237,232,0.5)] truncate">{proj.clientName} &bull; {proj.address}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[rgba(15,15,32,0.8)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[rgba(240,237,232,0.5)]">
              Actions d'Édition
            </h4>
            <button
              onClick={() => handlePrint(selectedDocType)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#140e00] font-semibold text-sm hover:brightness-110 transition-all cursor-pointer shadow-lg"
            >
              <Printer size={16} />
              <span>Imprimer l'Acte Officiel (PDF)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Printable Sheet Preview */}
        <div className="lg:col-span-2">
          {/* Paper View Container */}
          <div className="bg-[#ffffff] text-[#111827] rounded-2xl p-8 lg:p-12 shadow-2xl border border-[rgba(255,255,255,0.2)] font-sans relative overflow-hidden print:p-0 print:border-none print:shadow-none">
            
            {/* Stamp Badge */}
            <div className="absolute top-6 right-6 border-2 border-red-700 text-red-700 font-mono text-xs px-3 py-1 rounded rotate-6 uppercase tracking-wider font-bold opacity-80 pointer-events-none">
              Certifié Conforme &bull; DTU BTP
            </div>

            {/* Document 1: Attestation Décennale Nominative */}
            {selectedDocType === 'decennale' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b pb-6">
                  <div>
                    <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#0c0d1e] tracking-wide">
                      AQUA NOVA RENOVATION
                    </h1>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
                      Société d'Artisanat de Luxe &bull; SIRET 912 458 721 00018
                    </p>
                    <p className="text-xs text-gray-500">
                      12, Avenue Victor Hugo, 75116 Paris &bull; Tél: 01 89 40 52 30
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono bg-blue-50 text-blue-800 px-2 py-1 rounded font-bold">
                      ALLIANZ IARD
                    </span>
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      Réf: {currentProject?.decennialPolicy || 'AZ-98421-DEC-2026'}
                    </p>
                  </div>
                </div>

                <div className="text-center py-2">
                  <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 border-y py-2 bg-gray-50">
                    ATTESTATION D'ASSURANCE DE RESPONSABILITÉ DÉCENNALE
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Délivrée en application des articles L. 241-1 et suivants du Code des Assurances
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 text-xs bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div>
                    <span className="font-bold block text-gray-700 mb-1">SOUSCRIPTEUR / ENTREPRISE :</span>
                    <p className="font-medium text-gray-900">SAS AQUA NOVA RENOVATION</p>
                    <p className="text-gray-600">Activités couvertes : Plomberie sanitaire, Réseaux d'eau, Pose de marbre, Revêtements faïence &amp; mosaïque, Plâtrerie et plafonds techniques.</p>
                  </div>
                  <div>
                    <span className="font-bold block text-gray-700 mb-1">BÉNÉFICIAIRE / MAÎTRE D'OUVRAGE :</span>
                    <p className="font-medium text-gray-900">{currentProject?.clientName}</p>
                    <p className="text-gray-600">{currentProject?.address}</p>
                    <p className="font-mono text-gray-500 mt-1">Dossier Chantier : {currentProject?.reference}</p>
                  </div>
                </div>

                <div className="text-xs text-gray-700 space-y-3 leading-relaxed">
                  <p>
                    La compagnie d'assurance ALLIANZ IARD certifie que la société <strong>AQUA NOVA</strong> est titulaire d'un contrat d'assurance garantissant les travaux relevant de la responsabilité décennale sur l'ensemble du territoire français métropolitain.
                  </p>
                  <p>
                    Les travaux réalisés à l'adresse <strong>{currentProject?.address}</strong> bénéficient de la garantie de dix ans à compter de la réception prononcée par les parties, couvrant la réparation des dommages affectant la solidité de l'ouvrage ou le rendant impropre à sa destination.
                  </p>
                </div>

                <div className="pt-8 border-t flex items-end justify-between text-xs">
                  <div>
                    <p className="text-gray-500">Fait à Paris, le {formatDate(new Date().toISOString())}</p>
                    <p className="font-medium text-gray-700 mt-1">Pour la direction générale Aqua Nova</p>
                    <div className="mt-4 font-['Cormorant_Garamond'] text-xl italic text-gray-800">
                      Issam &amp; Brahem (Associés BTP)
                    </div>
                  </div>
                  <div className="w-32 h-16 border border-dashed border-gray-400 rounded flex items-center justify-center text-gray-400 text-[10px] text-center p-1">
                    Cachet officiel &amp; signature électronique
                  </div>
                </div>
              </div>
            )}

            {/* Document 2: Procès-Verbal de Réception (PV) */}
            {selectedDocType === 'pv_reception' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b pb-6">
                  <div>
                    <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#0c0d1e] tracking-wide">
                      AQUA NOVA RENOVATION
                    </h1>
                    <p className="text-xs text-gray-500">
                      Rénovations Sanitaires &amp; Suites Parentales de Prestige
                    </p>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <p className="font-bold text-gray-900">RÉCEPTION CHANTIER</p>
                    <p className="text-gray-500">Réf: PV-{currentProject?.reference}</p>
                  </div>
                </div>

                <div className="text-center py-2">
                  <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 border-y py-2 bg-gray-50">
                    PROCÈS-VERBAL DE RÉCEPTION DE TRAVAUX
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Établi conformément à l'article 1792-6 du Code Civil &bull; Prise d'effet des garanties légales
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-lg border">
                  <div>
                    <span className="font-bold block text-gray-600">MAÎTRE D'OUVRAGE (Client) :</span>
                    <p className="font-semibold text-gray-900">{currentProject?.clientName}</p>
                    <p className="text-gray-600">{currentProject?.clientPhone} &bull; {currentProject?.clientEmail}</p>
                  </div>
                  <div>
                    <span className="font-bold block text-gray-600">LIEU DES TRAVAUX :</span>
                    <p className="font-semibold text-gray-900">{currentProject?.title}</p>
                    <p className="text-gray-600">{currentProject?.address}</p>
                  </div>
                </div>

                {/* Checklist de réception */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-gray-800 block">DÉCISION DU MAÎTRE D'OUVRAGE :</span>
                  
                  <div className="flex items-center gap-2 p-2.5 rounded bg-green-50 border border-green-200">
                    <input type="checkbox" defaultChecked className="rounded text-green-600" />
                    <span className="font-medium text-green-900">
                      Réception prononcée SANS RÉSERVE. Les ouvrages sont acceptés en parfait état d'achèvement et de propreté.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 rounded bg-gray-50 border border-gray-200 opacity-60">
                    <input type="checkbox" disabled className="rounded text-gray-400" />
                    <span className="text-gray-600">
                      Réception prononcée AVEC RÉSERVES (détaillées dans l'annexe ci-après, à lever sous 15 jours).
                    </span>
                  </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-8 pt-8 border-t text-xs">
                  <div>
                    <p className="font-bold text-gray-800">Le Maître d'Ouvrage (Client)</p>
                    <p className="text-gray-500 italic mt-0.5">"Lu et approuvé, bon pour réception"</p>
                    <div className="mt-8 border-b border-gray-300 pb-1">
                      <span className="text-gray-400 text-[10px]">Signature :</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">L'Entrepreneur (Aqua Nova)</p>
                    <p className="text-gray-500 italic mt-0.5">Conducteur de Travaux TCE</p>
                    <div className="mt-8 border-b border-gray-300 pb-1">
                      <span className="font-['Cormorant_Garamond'] text-lg text-gray-800">Issam (Certifié DTU)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Document 3: Fiches DTU */}
            {selectedDocType === 'dtu_conformity' && (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h1 className="font-['Cormorant_Garamond'] text-2xl font-bold text-gray-900">
                    FICHE DE CONTRÔLE &amp; ESSAIS DTU
                  </h1>
                  <p className="text-xs text-gray-500">
                    Procédure d'épreuve hydrostatique &amp; calepinage &bull; Chantier: {currentProject?.reference}
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-gray-50 rounded border">
                    <span className="font-bold text-gray-800 block mb-1">1. DTU 60.1 — Réseau Plomberie Sanitaire</span>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Épreuve hydrostatique sous pression de 6 bars maintenue pendant 2 heures : <strong>CONFORME (0 fuite)</strong>.</li>
                      <li>Colliers de fixation isophoniques et dilatation respectée : <strong>CONFORME</strong>.</li>
                      <li>Pentes d'évacuation &ge; 1,5 cm/m conformes au schéma d'écoulement : <strong>VALIDÉ</strong>.</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-gray-50 rounded border">
                    <span className="font-bold text-gray-800 block mb-1">2. DTU 52.2 — Marbrerie &amp; Revêtement Mural</span>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Système d'Étanchéité sous Carrelage (SPEC) avec bandes d'armature aux angles : <strong>APPLIQUÉ</strong>.</li>
                      <li>Double encollage colle C2S1 haute déformabilité pour grands formats : <strong>RÉALISÉ</strong>.</li>
                      <li>Planéité sous règle de 2 mètres inférieure à 2 mm : <strong>CONFORME</strong>.</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-gray-50 rounded border">
                    <span className="font-bold text-gray-800 block mb-1">3. DTU 25.41 — Plafonds Suspendus &amp; Gorges Lumineuses</span>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Plaques hydrofuges (vertes) de type H1 posées en pièces humides : <strong>CONFORME</strong>.</li>
                      <li>Enduit de finition 3 passes et ponçage lumière rasante : <strong>QUALITÉ Q4 OPTIMALE</strong>.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t flex items-center justify-between text-xs text-gray-500 font-mono">
                  <span>Auditeur Technique: Brahem (Maître Plombier)</span>
                  <span>Date d'épreuve: {formatDate(new Date().toISOString())}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
