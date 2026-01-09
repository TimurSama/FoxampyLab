export type Language = 'en' | 'ru' | 'ar' | 'es' | 'pl' | 'fr' | 'de';

export interface Translations {
  header: {
    search: string;
    searchPlaceholder: string;
    menu: {
      hub: string;
      about: string;
      services: string;
      cases: string;
      research: string;
      ventures: string;
      join: string;
      contact: string;
    };
  };
  hub: {
    title: string;
    subtitle: string;
    projectsInDevelopment: string;
    openForInvestment: string;
    viewProject: string;
    progress: string;
    status: string;
    investment: string;
    invested: string;
    statusActive: string;
    statusPilot: string;
    statusBeta: string;
    statusPlanning: string;
  };
  common: {
    loading: string;
    error: string;
    readMore: string;
    contactUs: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      search: 'Search',
      searchPlaceholder: 'search...',
      menu: {
        hub: 'HUB',
        about: 'ABOUT',
        services: 'SERVICES',
        cases: 'CASES',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'CONTACT',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Our Projects in Development',
      projectsInDevelopment: 'Projects in Development',
      openForInvestment: 'Open for Investment',
      viewProject: 'View Project',
      progress: 'Progress',
      status: 'Status',
      investment: 'Investment Target',
      invested: 'Invested',
      statusActive: 'Active',
      statusPilot: 'Pilot Project',
      statusBeta: 'Beta',
      statusPlanning: 'Planning',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      readMore: 'Read More',
      contactUs: 'Contact Us',
    },
  },
  ru: {
    header: {
      search: 'Поиск',
      searchPlaceholder: 'поиск...',
      menu: {
        hub: 'HUB',
        about: 'О НАС',
        services: 'УСЛУГИ',
        cases: 'КЕЙСЫ',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'КОНТАКТЫ',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Наши проекты в разработке',
      projectsInDevelopment: 'Проекты в разработке',
      openForInvestment: 'Открыты для инвестиций',
      viewProject: 'Подробнее',
      progress: 'Прогресс',
      status: 'Статус',
      investment: 'Цель инвестиций',
      invested: 'Инвестировано',
      statusActive: 'Активен',
      statusPilot: 'Пилотный проект',
      statusBeta: 'Бета',
      statusPlanning: 'Планирование',
    },
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      readMore: 'Читать далее',
      contactUs: 'Связаться с нами',
    },
  },
  ar: {
    header: {
      search: 'بحث',
      searchPlaceholder: 'بحث...',
      menu: {
        hub: 'HUB',
        about: 'من نحن',
        services: 'الخدمات',
        cases: 'الحالات',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'اتصل بنا',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'مشاريعنا قيد التطوير',
      projectsInDevelopment: 'مشاريع قيد التطوير',
      openForInvestment: 'مفتوحة للاستثمار',
      viewProject: 'عرض المشروع',
      progress: 'التقدم',
      status: 'الحالة',
      investment: 'هدف الاستثمار',
      invested: 'المستثمر',
      statusActive: 'نشط',
      statusPilot: 'مشروع تجريبي',
      statusBeta: 'بيتا',
      statusPlanning: 'التخطيط',
    },
    common: {
      loading: 'جارٍ التحميل...',
      error: 'خطأ',
      readMore: 'اقرأ المزيد',
      contactUs: 'اتصل بنا',
    },
  },
  es: {
    header: {
      search: 'Buscar',
      searchPlaceholder: 'buscar...',
      menu: {
        hub: 'HUB',
        about: 'ACERCA DE',
        services: 'SERVICIOS',
        cases: 'CASOS',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'CONTACTO',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Nuestros Proyectos en Desarrollo',
      projectsInDevelopment: 'Proyectos en Desarrollo',
      openForInvestment: 'Abiertos para Inversión',
      viewProject: 'Ver Proyecto',
      progress: 'Progreso',
      status: 'Estado',
      investment: 'Meta de Inversión',
      invested: 'Invertido',
      statusActive: 'Activo',
      statusPilot: 'Proyecto Piloto',
      statusBeta: 'Beta',
      statusPlanning: 'Planificación',
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      readMore: 'Leer Más',
      contactUs: 'Contáctenos',
    },
  },
  pl: {
    header: {
      search: 'Szukaj',
      searchPlaceholder: 'szukaj...',
      menu: {
        hub: 'HUB',
        about: 'O NAS',
        services: 'USŁUGI',
        cases: 'PRZYPADKI',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'KONTAKT',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Nasze Projekty w Rozwoju',
      projectsInDevelopment: 'Projekty w Rozwoju',
      openForInvestment: 'Otwarte na Inwestycje',
      viewProject: 'Zobacz Projekt',
      progress: 'Postęp',
      status: 'Status',
      investment: 'Cel Inwestycji',
      invested: 'Zainwestowano',
      statusActive: 'Aktywny',
      statusPilot: 'Projekt Pilotażowy',
      statusBeta: 'Beta',
      statusPlanning: 'Planowanie',
    },
    common: {
      loading: 'Ładowanie...',
      error: 'Błąd',
      readMore: 'Czytaj Więcej',
      contactUs: 'Skontaktuj się',
    },
  },
  fr: {
    header: {
      search: 'Rechercher',
      searchPlaceholder: 'rechercher...',
      menu: {
        hub: 'HUB',
        about: 'À PROPOS',
        services: 'SERVICES',
        cases: 'CAS',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'CONTACT',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Nos Projets en Développement',
      projectsInDevelopment: 'Projets en Développement',
      openForInvestment: 'Ouverts aux Investissements',
      viewProject: 'Voir le Projet',
      progress: 'Progression',
      status: 'Statut',
      investment: 'Objectif d\'Investissement',
      invested: 'Investi',
      statusActive: 'Actif',
      statusPilot: 'Projet Pilote',
      statusBeta: 'Bêta',
      statusPlanning: 'Planification',
    },
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      readMore: 'Lire la Suite',
      contactUs: 'Contactez-nous',
    },
  },
  de: {
    header: {
      search: 'Suchen',
      searchPlaceholder: 'suchen...',
      menu: {
        hub: 'HUB',
        about: 'ÜBER UNS',
        services: 'DIENSTLEISTUNGEN',
        cases: 'FÄLLE',
        research: 'R&D',
        ventures: 'VENTURES',
        join: 'JOIN',
        contact: 'KONTAKT',
      },
    },
    hub: {
      title: 'HUB',
      subtitle: 'Unsere Projekte in Entwicklung',
      projectsInDevelopment: 'Projekte in Entwicklung',
      openForInvestment: 'Offen für Investitionen',
      viewProject: 'Projekt Ansehen',
      progress: 'Fortschritt',
      status: 'Status',
      investment: 'Investitionsziel',
      invested: 'Investiert',
      statusActive: 'Aktiv',
      statusPilot: 'Pilotprojekt',
      statusBeta: 'Beta',
      statusPlanning: 'Planung',
    },
    common: {
      loading: 'Wird geladen...',
      error: 'Fehler',
      readMore: 'Weiterlesen',
      contactUs: 'Kontaktieren Sie uns',
    },
  },
};


