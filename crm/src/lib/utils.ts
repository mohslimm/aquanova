import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { QuoteItem } from '../types/crm';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatEUR(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString?: string): string {
  if (!dateString) return 'Non défini';
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateString));
}

export function calculateQuoteTotals(items: readonly QuoteItem[], depositPercent = 30) {
  let totalMaterialsHT = 0;
  let totalLaborHT = 0;
  let vat10Amount = 0;
  let vat20Amount = 0;
  let vat55Amount = 0;

  for (const item of items) {
    const itemMaterials = item.materialsCostHT * item.quantity;
    const itemLabor = item.laborCostHT * item.quantity;
    const itemTotalHT = itemMaterials + itemLabor;

    totalMaterialsHT += itemMaterials;
    totalLaborHT += itemLabor;

    if (item.vatRate === 10) {
      vat10Amount += itemTotalHT * 0.10;
    } else if (item.vatRate === 20) {
      vat20Amount += itemTotalHT * 0.20;
    } else if (item.vatRate === 5.5) {
      vat55Amount += itemTotalHT * 0.055;
    }
  }

  const totalHT = totalMaterialsHT + totalLaborHT;
  const totalTTC = totalHT + vat10Amount + vat20Amount + vat55Amount;
  const depositTTC = (totalTTC * depositPercent) / 100;
  const balanceTTC = totalTTC - depositTTC;

  return {
    totalMaterialsHT,
    totalLaborHT,
    totalHT,
    vat10Amount,
    vat20Amount,
    vat55Amount,
    totalTTC,
    depositTTC,
    balanceTTC
  };
}
