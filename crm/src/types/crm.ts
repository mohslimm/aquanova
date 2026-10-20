/**
 * AQUA NOVA CRM — DOMAIN TYPES & INTERFACES
 * Strict TypeScript definition adhering to Quiet Luxury & BTP DTU standards.
 */

export type ProjectCategory = 'bathroom' | 'plumbing' | 'plaster' | 'turnkey';

export type ProjectStatus = 
  | 'lead'                 // Nouveau contact / Demande entrante
  | 'survey_scheduled'    // Visite technique planifiée
  | 'quote_sent'          // Devis transmis / en négociation
  | 'in_progress'         // Chantier en cours d'exécution
  | 'completed';          // Livré / PV de réception décennale signé

export type VATRate = 10 | 20 | 5.5;

export type FinishGrade = 'prestige' | 'hautecouture' | 'signature';

export interface Client {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly city: string;
  readonly accessNotes?: string;
  readonly createdAt: string;
}

export interface SiteLog {
  readonly id: string;
  readonly projectId: string;
  readonly authorName: string;
  readonly authorAvatar?: string;
  readonly content: string;
  readonly photoUrls: readonly string[];
  readonly createdAt: string;
  readonly isVisibleToClient: boolean;
}

export interface QuoteItem {
  readonly id: string;
  readonly category: ProjectCategory;
  readonly title: string;
  readonly description: string;
  readonly materialsCostHT: number;
  readonly laborCostHT: number;
  readonly vatRate: VATRate;
  readonly quantity: number;
}

export interface Quote {
  readonly id: string;
  readonly reference: string;
  readonly projectId: string;
  readonly clientName: string;
  readonly clientAddress: string;
  readonly items: readonly QuoteItem[];
  readonly status: 'draft' | 'sent' | 'signed' | 'rejected';
  readonly depositPercentage: number; // e.g. 30%
  readonly createdAt: string;
  readonly signedAt?: string;
}

export interface Artisan {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly specialty: string;
  readonly experienceYears: number;
  readonly avatarUrl: string;
  readonly phone: string;
  readonly currentStatus: 'on_site' | 'available' | 'on_survey';
  readonly activeProjectTitle?: string;
}

export interface Project {
  readonly id: string;
  readonly reference: string;
  readonly clientId: string;
  readonly clientName: string;
  readonly clientPhone: string;
  readonly clientEmail: string;
  readonly address: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly surfaceM2: number;
  readonly finishGrade: FinishGrade;
  readonly estimatedBudget: number;
  readonly finalAmountTTC?: number;
  readonly assignedArtisanId: string;
  readonly assignedArtisanName: string;
  readonly startDate?: string;
  readonly targetDate?: string;
  readonly surveyDate?: string;
  readonly decennialPolicy: string;
  readonly logs: readonly SiteLog[];
  readonly createdAt: string;
}

export interface CRMStats {
  readonly activeProjectsCount: number;
  readonly pendingQuotesCount: number;
  readonly pipelineRevenueTTC: number;
  readonly customerSatisfaction: number;
}
