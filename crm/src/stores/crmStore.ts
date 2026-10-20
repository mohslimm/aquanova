import { create } from 'zustand';
import type { Artisan, Project, ProjectStatus, SiteLog } from '../types/crm';
import { INITIAL_ARTISANS, INITIAL_PROJECTS } from '../lib/constants';

export type NavigationTab = 'dashboard' | 'kanban' | 'quotes' | 'artisans' | 'documents' | 'studio3d';

interface CRMState {
  projects: Project[];
  artisans: Artisan[];
  activeTab: NavigationTab;
  selectedProject: Project | null;
  isNewProjectModalOpen: boolean;
  searchQuery: string;

  // Actions
  setActiveTab: (tab: NavigationTab) => void;
  setSelectedProject: (project: Project | null) => void;
  setNewProjectModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;

  moveProjectStatus: (projectId: string, newStatus: ProjectStatus) => void;
  addProject: (newProject: Omit<Project, 'id' | 'reference' | 'createdAt' | 'logs'>) => void;
  addSiteLog: (projectId: string, content: string, authorName: string, photoUrls?: string[]) => void;
  assignArtisan: (projectId: string, artisanId: string) => void;
  deleteProject: (projectId: string) => void;
}

const STORAGE_KEY = 'aquanova_crm_state_v1';

const getInitialProjects = (): Project[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return [...INITIAL_PROJECTS];
};

export const useCRMStore = create<CRMState>((set, get) => ({
  projects: getInitialProjects(),
  artisans: [...INITIAL_ARTISANS],
  activeTab: 'dashboard',
  selectedProject: null,
  isNewProjectModalOpen: false,
  searchQuery: '',

  setActiveTab: (activeTab) => set({ activeTab }),
  setSelectedProject: (selectedProject) => set({ selectedProject }),
  setNewProjectModalOpen: (isNewProjectModalOpen) => set({ isNewProjectModalOpen }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  moveProjectStatus: (projectId, newStatus) => {
    const updated = get().projects.map((p) => {
      if (p.id === projectId) {
        return { ...p, status: newStatus };
      }
      return p;
    });
    set({ projects: updated });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  addProject: (data) => {
    const refNum = Math.floor(100 + Math.random() * 900);
    const newProject: Project = {
      ...data,
      id: `proj-${Date.now()}`,
      reference: `CH-2026-${refNum}`,
      createdAt: new Date().toISOString(),
      logs: [
        {
          id: `log-${Date.now()}`,
          projectId: `proj-${Date.now()}`,
          authorName: 'Issam (TCE)',
          content: 'Dossier créé et ouvert dans le CRM Aqua Nova.',
          photoUrls: [],
          createdAt: new Date().toISOString(),
          isVisibleToClient: true
        }
      ]
    };

    const updated = [newProject, ...get().projects];
    set({ projects: updated, isNewProjectModalOpen: false });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  addSiteLog: (projectId, content, authorName, photoUrls = []) => {
    const newLog: SiteLog = {
      id: `log-${Date.now()}`,
      projectId,
      authorName,
      content,
      photoUrls,
      createdAt: new Date().toISOString(),
      isVisibleToClient: true
    };

    const updated = get().projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          logs: [newLog, ...p.logs]
        };
      }
      return p;
    });

    set({ projects: updated });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  assignArtisan: (projectId, artisanId) => {
    const artisan = get().artisans.find((a) => a.id === artisanId);
    if (!artisan) return;

    const updated = get().projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          assignedArtisanId: artisanId,
          assignedArtisanName: artisan.name
        };
      }
      return p;
    });

    set({ projects: updated });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  },

  deleteProject: (projectId) => {
    const updated = get().projects.filter((p) => p.id !== projectId);
    set({ projects: updated, selectedProject: null });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
}));
