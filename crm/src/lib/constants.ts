import type { Artisan, Project, QuoteItem } from '../types/crm';

export const INITIAL_ARTISANS: readonly Artisan[] = [
  {
    id: 'artisan-brahem',
    name: 'Brahem',
    role: 'Maître Artisan Plombier & Chauffagiste',
    specialty: 'Réseaux cuivre encastrés, sanitaires de luxe & marbrerie',
    experienceYears: 22,
    avatarUrl: '/assets/images/Brahem.jpg',
    phone: '+33 6 12 45 78 90',
    currentStatus: 'on_site',
    activeProjectTitle: 'Résidence Marceau (Salle de Bain Marbre)'
  },
  {
    id: 'artisan-ibrahim',
    name: 'Ibrahim',
    role: 'Artisan Staffeur & Spécialiste Cloisons',
    specialty: 'Faux plafonds suspendus, corniches & gorges lumineuses LED',
    experienceYears: 18,
    avatarUrl: '/assets/images/Ibrahim.jpg',
    phone: '+33 6 89 23 11 44',
    currentStatus: 'on_site',
    activeProjectTitle: 'Hôtel Particulier Victor Hugo (Plafond LED)'
  },
  {
    id: 'artisan-issam',
    name: 'Issam',
    role: 'Conducteur de Travaux TCE',
    specialty: 'Coordination générale, respect du planning & conformité DTU',
    experienceYears: 15,
    avatarUrl: '/assets/images/Issam.jpg',
    phone: '+33 6 44 55 66 77',
    currentStatus: 'available',
    activeProjectTitle: 'Supervision & Visites Techniques'
  }
];

export const PRESET_WORK_ITEMS: readonly Omit<QuoteItem, 'id' | 'quantity'>[] = [
  {
    category: 'bathroom',
    title: 'Dépose sanitaire et carrelage existant',
    description: 'Démolition soignée, tri sélectif et évacuation en déchetterie agréée avec protection des parties communes.',
    materialsCostHT: 150,
    laborCostHT: 850,
    vatRate: 10
  },
  {
    category: 'plumbing',
    title: 'Réseau d\'alimentation cuivre et collecteurs hydro-câblés',
    description: 'Pose encastrée sous fourreaux, nourrices avec vannes d\'arrêt individuelles et test de pression 6 bars.',
    materialsCostHT: 1450,
    laborCostHT: 1800,
    vatRate: 10
  },
  {
    category: 'bathroom',
    title: 'Étanchéité sous carrelage (SEL) & receveur encastré',
    description: 'Système d\'étanchéité liquide bi-composant avec bandes d\'armature d\'angles selon DTU 52.2.',
    materialsCostHT: 650,
    laborCostHT: 950,
    vatRate: 10
  },
  {
    category: 'bathroom',
    title: 'Placage marbre grand format Calacatta (Sols & Murs)',
    description: 'Pose au mortier-colle C2S haute déformabilité et jointoiement ton sur ton hydrofuge.',
    materialsCostHT: 3400,
    laborCostHT: 2600,
    vatRate: 10
  },
  {
    category: 'plaster',
    title: 'Faux plafond suspendu avec gorge lumineuse LED indirecte',
    description: 'Ossature métallique Placostil, plaques BA13 hydrofuges, découpe gorge invisible pour bandeau LED.',
    materialsCostHT: 480,
    laborCostHT: 1100,
    vatRate: 10
  },
  {
    category: 'turnkey',
    title: 'Coordination générale et pilotage tous corps d\'état',
    description: 'Ordonnancement, réunions de chantier hebdomadaires, journal photo en ligne et PV de réception.',
    materialsCostHT: 0,
    laborCostHT: 1500,
    vatRate: 10
  }
];

export const INITIAL_PROJECTS: readonly Project[] = [
  {
    id: 'proj-1',
    reference: 'CH-2026-081',
    clientId: 'client-roche',
    clientName: 'M. François Roche',
    clientPhone: '06 14 25 36 47',
    clientEmail: 'f.roche@orange.fr',
    address: '14 Avenue de la Grille, 92210 Saint-Cloud',
    title: 'Rénovation Salle de Bain Prestige Marbre',
    category: 'bathroom',
    status: 'lead',
    surfaceM2: 16,
    finishGrade: 'hautecouture',
    estimatedBudget: 14200,
    assignedArtisanId: 'artisan-brahem',
    assignedArtisanName: 'Brahem',
    decennialPolicy: 'Allianz AZ-98421-DEC',
    createdAt: '2026-10-18T10:00:00Z',
    logs: [
      {
        id: 'log-1',
        projectId: 'proj-1',
        authorName: 'Issam',
        content: 'Demande reçue via le simulateur en ligne. Projet de marbre blanc Calacatta avec robinetterie encastrée dorée.',
        photoUrls: ['/images/img1.png'],
        createdAt: '2026-10-18T10:05:00Z',
        isVisibleToClient: true
      }
    ]
  },
  {
    id: 'proj-2',
    reference: 'CH-2026-082',
    clientId: 'client-archi',
    clientName: 'Cabinet D. Architectes (Passy)',
    clientPhone: '01 42 68 00 12',
    clientEmail: 'contact@d-architectes.com',
    address: '48 Rue de Passy, 75016 Paris',
    title: 'Faux Plafond Décoratif & Cloisons Acoustiques',
    category: 'plaster',
    status: 'survey_scheduled',
    surfaceM2: 35,
    finishGrade: 'signature',
    estimatedBudget: 8900,
    assignedArtisanId: 'artisan-ibrahim',
    assignedArtisanName: 'Ibrahim',
    surveyDate: '2026-10-23T14:00:00Z',
    decennialPolicy: 'Allianz AZ-98421-DEC',
    createdAt: '2026-10-17T14:30:00Z',
    logs: [
      {
        id: 'log-2',
        projectId: 'proj-2',
        authorName: 'Ibrahim',
        content: 'Visite technique programmée jeudi à 14h. Relevé des cotes et vérification des ancrages plafonnier.',
        photoUrls: ['/images/img3.png'],
        createdAt: '2026-10-17T16:00:00Z',
        isVisibleToClient: true
      }
    ]
  },
  {
    id: 'proj-3',
    reference: 'CH-2026-079',
    clientId: 'client-leroy',
    clientName: 'Résidence Marceau — M. & Mme Leroy',
    clientPhone: '06 88 99 77 11',
    clientEmail: 'philippe.leroy@gmail.com',
    address: '22 Avenue Marceau, 75008 Paris',
    title: 'Création Suite Parentale & Salle d\'Eau Douche Italienne',
    category: 'bathroom',
    status: 'in_progress',
    surfaceM2: 24,
    finishGrade: 'prestige',
    estimatedBudget: 19800,
    finalAmountTTC: 21780,
    assignedArtisanId: 'artisan-brahem',
    assignedArtisanName: 'Brahem & Issam',
    startDate: '2026-10-12',
    targetDate: '2026-10-30',
    decennialPolicy: 'Allianz AZ-98421-DEC',
    createdAt: '2026-10-05T08:00:00Z',
    logs: [
      {
        id: 'log-3',
        projectId: 'proj-3',
        authorName: 'Brahem',
        content: 'Épreuve de pression hydraulique validée sous 6 bars. Bac de douche encastré posé sans ressaut.',
        photoUrls: ['/images/img2.png'],
        createdAt: '2026-10-15T17:30:00Z',
        isVisibleToClient: true
      }
    ]
  },
  {
    id: 'proj-4',
    reference: 'CH-2026-070',
    clientId: 'client-marc',
    clientName: 'Villa Bellevue — Marc & Sophie D.',
    clientPhone: '06 01 02 03 04',
    clientEmail: 'marc.dubois@wanadoo.fr',
    address: '5 Allée des Pins, 92430 Marnes-la-Coquette',
    title: 'Rénovation Totale Salle de Bain & Réseau Chauffage',
    category: 'turnkey',
    status: 'completed',
    surfaceM2: 28,
    finishGrade: 'hautecouture',
    estimatedBudget: 24300,
    finalAmountTTC: 26730,
    assignedArtisanId: 'artisan-issam',
    assignedArtisanName: 'Issam (TCE)',
    startDate: '2026-09-10',
    targetDate: '2026-09-28',
    decennialPolicy: 'Allianz AZ-98421-DEC',
    createdAt: '2026-09-01T09:00:00Z',
    logs: [
      {
        id: 'log-4',
        projectId: 'proj-4',
        authorName: 'Issam',
        content: 'Procès-verbal de réception sans réserves signé le 28/09. Dossier décennale Allianz remis aux propriétaires.',
        photoUrls: ['/images/img4.png'],
        createdAt: '2026-09-28T18:00:00Z',
        isVisibleToClient: true
      }
    ]
  }
];
