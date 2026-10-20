import React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { KanbanView } from './components/kanban/KanbanView';
import { QuoteBuilderView } from './components/quotes/QuoteBuilderView';
import { ArtisansView } from './components/artisans/ArtisansView';
import { DocumentsView } from './components/documents/DocumentsView';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { NewProjectModal } from './components/projects/NewProjectModal';
import { useCRMStore } from './stores/crmStore';

export const App: React.FC = () => {
  const { activeTab } = useCRMStore();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'kanban':
        return <KanbanView />;
      case 'quotes':
        return <QuoteBuilderView />;
      case 'artisans':
        return <ArtisansView />;
      case 'documents':
        return <DocumentsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#060610] text-[#f0ede8] overflow-hidden font-sans">
      {/* Fixed Luxury Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Dynamic View Scrollable Container */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gradient-to-b from-[#0a0a14] to-[#060610]">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <ProjectDetailModal />
      <NewProjectModal />
    </div>
  );
};

export default App;
