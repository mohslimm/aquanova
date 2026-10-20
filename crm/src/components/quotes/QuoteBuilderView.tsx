import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Send, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { PRESET_WORK_ITEMS } from '../../lib/constants';
import type { QuoteItem, VATRate } from '../../types/crm';
import { calculateQuoteTotals, formatEUR } from '../../lib/utils';

export const QuoteBuilderView: React.FC = () => {
  const [clientName, setClientName] = useState('M. François Roche');
  const [clientAddress, setClientAddress] = useState('14 Avenue de la Grille, 92210 Saint-Cloud');
  const [projectTitle, setProjectTitle] = useState('Rénovation Salle de Bain Prestige Marbre Calacatta');
  const [quoteRef] = useState(`DEV-2026-${Math.floor(100 + Math.random() * 900)}`);
  
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: 'item-1',
      category: 'bathroom',
      title: 'Dépose sanitaire et carrelage existant',
      description: 'Démolition soignée, tri sélectif et évacuation en déchetterie agréée avec protection des parties communes.',
      materialsCostHT: 150,
      laborCostHT: 850,
      vatRate: 10,
      quantity: 1
    },
    {
      id: 'item-2',
      category: 'plumbing',
      title: 'Réseau d\'alimentation cuivre et collecteurs hydro-câblés',
      description: 'Pose encastrée sous fourreaux, nourrices avec vannes d\'arrêt individuelles et test de pression 6 bars.',
      materialsCostHT: 1450,
      laborCostHT: 1800,
      vatRate: 10,
      quantity: 1
    },
    {
      id: 'item-3',
      category: 'bathroom',
      title: 'Étanchéité sous carrelage (SEL) & receveur encastré',
      description: 'Système d\'étanchéité liquide bi-composant avec bandes d\'armature d\'angles selon DTU 52.2.',
      materialsCostHT: 650,
      laborCostHT: 950,
      vatRate: 10,
      quantity: 1
    },
    {
      id: 'item-4',
      category: 'bathroom',
      title: 'Placage marbre grand format Calacatta (Sols & Murs)',
      description: 'Pose au mortier-colle C2S haute déformabilité et jointoiement ton sur ton hydrofuge.',
      materialsCostHT: 3400,
      laborCostHT: 2600,
      vatRate: 10,
      quantity: 1
    }
  ]);

  const depositPercent = 30;

  const totals = calculateQuoteTotals(items, depositPercent);

  const handleAddItemFromPreset = (preset: typeof PRESET_WORK_ITEMS[number]) => {
    const newItem: QuoteItem = {
      ...preset,
      id: `item-${Date.now()}`,
      quantity: 1
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<QuoteItem>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[rgba(197,160,89,0.15)] text-[#fae7b9] border border-[rgba(197,160,89,0.3)]">
              {quoteRef}
            </span>
            <span className="text-xs text-[rgba(245,243,239,0.5)]">Norme BTP DTU 52.2 / 60.1</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Cormorant_Garamond'] text-[#f5f3ef] mt-1.5">
            Éditeur de Devis &amp; Chiffrage Réglementaire
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] hover:border-[#c5a059] text-xs font-semibold text-[rgba(245,243,239,0.7)] hover:text-white transition-all cursor-pointer"
          >
            <Printer size={16} />
            <span>Imprimer</span>
          </button>
          <button
            onClick={() => alert(`Devis ${quoteRef} envoyé avec succès à ${clientName} avec lien de signature électronique Yousign.`)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#dfbd7c] via-[#c5a059] to-[#9e7a32] text-[#120e06] font-semibold text-xs hover:brightness-110 shadow-lg transition-all cursor-pointer"
          >
            <Send size={16} />
            <span>Envoyer pour Signature</span>
          </button>
        </div>
      </div>

      {/* Client & Project Details Card */}
      <div className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#e8c77a] mb-1.5 uppercase tracking-wider">
            Client / Maître d'Ouvrage
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-[#151630] border border-[rgba(255,255,255,0.08)] focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-sm text-[#f5f3ef] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#e8c77a] mb-1.5 uppercase tracking-wider">
            Adresse du Chantier
          </label>
          <input
            type="text"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            className="w-full bg-[#151630] border border-[rgba(255,255,255,0.08)] focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-sm text-[#f5f3ef] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#e8c77a] mb-1.5 uppercase tracking-wider">
            Intitulé de l'Ouvrage
          </label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full bg-[#151630] border border-[rgba(255,255,255,0.08)] focus:border-[#c5a059] rounded-lg px-3.5 py-2 text-sm text-[#f5f3ef] outline-none"
          />
        </div>
      </div>

      {/* Preset Library Work Items */}
      <div className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[#e8c77a] uppercase tracking-wider">
          <Sparkles size={14} />
          <span>Bibliothèque d'Ouvrages Prédéfinis (Ajout rapide en 1 clic)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_WORK_ITEMS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleAddItemFromPreset(preset)}
              className="text-xs bg-[#151630] hover:bg-[rgba(197,160,89,0.15)] border border-[rgba(255,255,255,0.08)] hover:border-[#c5a059] text-[rgba(245,243,239,0.8)] hover:text-[#fae7b9] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus size={12} className="text-[#c5a059]" />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#f5f3ef]">
            Ventilation des Lignes de Travaux
          </h3>
          <span className="text-xs text-[rgba(245,243,239,0.5)]">
            {items.length} postes d'ouvrages
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[rgba(255,255,255,0.03)] text-[rgba(245,243,239,0.6)] font-mono uppercase tracking-wider border-b border-[rgba(255,255,255,0.06)]">
                <th className="py-3 px-4">Désignation des Travaux</th>
                <th className="py-3 px-3 w-20 text-center">Qté</th>
                <th className="py-3 px-3 w-32 text-right">Fournitures HT</th>
                <th className="py-3 px-3 w-32 text-right">Main d'Œuvre HT</th>
                <th className="py-3 px-3 w-24 text-center">Taux TVA</th>
                <th className="py-3 px-3 w-32 text-right">Total HT</th>
                <th className="py-3 px-2 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
              {items.map((item) => {
                const rowTotalHT = (item.materialsCostHT + item.laborCostHT) * item.quantity;
                return (
                  <tr key={item.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-3.5 px-4">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                        className="w-full bg-transparent font-semibold text-[#f5f3ef] border-b border-transparent hover:border-[rgba(255,255,255,0.2)] focus:border-[#c5a059] outline-none py-0.5"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                        className="w-full bg-transparent text-[11px] text-[rgba(245,243,239,0.45)] border-b border-transparent hover:border-[rgba(255,255,255,0.2)] focus:border-[#c5a059] outline-none py-0.5 mt-0.5"
                      />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                        className="w-14 bg-[#151630] text-center border border-[rgba(255,255,255,0.1)] rounded py-1 text-xs text-[#f5f3ef]"
                      />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <input
                        type="number"
                        value={item.materialsCostHT}
                        onChange={(e) => handleUpdateItem(item.id, { materialsCostHT: parseFloat(e.target.value) || 0 })}
                        className="w-24 bg-[#151630] text-right font-mono border border-[rgba(255,255,255,0.1)] rounded py-1 px-2 text-xs text-[#f5f3ef]"
                      />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <input
                        type="number"
                        value={item.laborCostHT}
                        onChange={(e) => handleUpdateItem(item.id, { laborCostHT: parseFloat(e.target.value) || 0 })}
                        className="w-24 bg-[#151630] text-right font-mono border border-[rgba(255,255,255,0.1)] rounded py-1 px-2 text-xs text-[#f5f3ef]"
                      />
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <select
                        value={item.vatRate}
                        onChange={(e) => handleUpdateItem(item.id, { vatRate: parseFloat(e.target.value) as VATRate })}
                        className="bg-[#151630] border border-[rgba(255,255,255,0.1)] rounded py-1 px-2 text-xs text-[#e8c77a]"
                      >
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="5.5">5,5%</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-[#fae7b9]">
                      {formatEUR(rowTotalHT)}
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 rounded text-[rgba(245,243,239,0.3)] hover:text-[#ef4444] transition-colors cursor-pointer"
                        title="Supprimer ce poste"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary & Totals Calculation Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Terms & Legal Mentions */}
        <div className="bg-[#0f1024] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#e8c77a] uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Modalités Légales &amp; Échéancier de Paiement</span>
          </div>

          <div className="space-y-3 text-xs text-[rgba(245,243,239,0.7)]">
            <div className="flex justify-between items-center p-2.5 rounded bg-[#151630] border border-[rgba(255,255,255,0.05)]">
              <div>
                <span className="font-semibold text-[#f5f3ef]">1. Acompte à la commande (30%) :</span>
                <p className="text-[10px] text-[rgba(245,243,239,0.4)]">Réservation artisans &amp; approvisionnement matériaux</p>
              </div>
              <span className="font-mono font-bold text-[#e8c77a]">{formatEUR(totals.depositTTC)}</span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded bg-[#151630] border border-[rgba(255,255,255,0.05)]">
              <div>
                <span className="font-semibold text-[#f5f3ef]">2. Situation intermédiaire (40%) :</span>
                <p className="text-[10px] text-[rgba(245,243,239,0.4)]">Achèvement des réseaux hydrauliques &amp; étanchéité SEL</p>
              </div>
              <span className="font-mono font-bold text-[#e8c77a]">{formatEUR(totals.totalTTC * 0.4)}</span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded bg-[#151630] border border-[rgba(255,255,255,0.05)]">
              <div>
                <span className="font-semibold text-[#f5f3ef]">3. Solde à la réception (30%) :</span>
                <p className="text-[10px] text-[rgba(245,243,239,0.4)]">Signature du procès-verbal &amp; remise attestation décennale</p>
              </div>
              <span className="font-mono font-bold text-[#e8c77a]">{formatEUR(totals.totalTTC * 0.3)}</span>
            </div>
          </div>

          <p className="text-[11px] text-[rgba(245,243,239,0.45)] leading-relaxed border-t border-[rgba(255,255,255,0.06)] pt-3">
            Garantie Décennale Allianz Police N° AZ-98421-DEC. Devis valable 30 jours à compter de la date d'émission.
          </p>
        </div>

        {/* Calculated Totals Box */}
        <div className="bg-[#0f1024] border border-[#c5a059] rounded-xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs text-[rgba(245,243,239,0.65)] font-mono">
              <span>Total Fournitures HT :</span>
              <span>{formatEUR(totals.totalMaterialsHT)}</span>
            </div>
            <div className="flex justify-between text-xs text-[rgba(245,243,239,0.65)] font-mono">
              <span>Total Main d'Œuvre Qualifiée HT :</span>
              <span>{formatEUR(totals.totalLaborHT)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-[#f5f3ef] font-mono border-t border-[rgba(255,255,255,0.08)] pt-2">
              <span>Total Hors Taxes (HT) :</span>
              <span>{formatEUR(totals.totalHT)}</span>
            </div>
            <div className="flex justify-between text-xs text-[rgba(245,243,239,0.5)] font-mono">
              <span>TVA 10% (Rénovation résidentielle &gt; 2 ans) :</span>
              <span>{formatEUR(totals.vat10Amount)}</span>
            </div>
            {totals.vat20Amount > 0 && (
              <div className="flex justify-between text-xs text-[rgba(245,243,239,0.5)] font-mono">
                <span>TVA 20% (Fournitures spécifiques) :</span>
                <span>{formatEUR(totals.vat20Amount)}</span>
              </div>
            )}
          </div>

          <div className="border-t-2 border-[#c5a059] pt-4 mt-6">
            <div className="flex justify-between items-baseline">
              <span className="text-base font-bold text-[#f5f3ef]">Net TTC à Payer :</span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#fae7b9]">
                {formatEUR(totals.totalTTC)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-[#22c55e] font-mono mt-2">
              <span>Acompte 30% requis à la signature :</span>
              <span className="font-bold">{formatEUR(totals.depositTTC)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
