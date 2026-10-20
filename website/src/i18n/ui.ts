// Interface text in both languages (I-4). Page content lives in content/.
import type { Lang } from '../lib/scripture.ts';

const strings = {
  'nav.about': { es: 'Quiénes somos', en: 'About us' },
  'nav.beliefs': { es: 'Lo que creemos', en: 'What we believe' },
  'nav.worship': { es: 'Nuestro culto', en: 'Our worship' },
  'nav.sermons': { es: 'Sermones', en: 'Sermons' },
  'nav.resources': { es: 'Recursos', en: 'Resources' },
  'nav.activities': { es: 'Actividades', en: 'Activities' },
  'nav.visit': { es: 'Visítenos', en: 'Visit us' },
  'nav.history': { es: 'Historia', en: 'History' },
  'nav.leadership': { es: 'Liderazgo', en: 'Leadership' },
  'nav.gospel': { es: 'El Evangelio', en: 'The Gospel' },
  'nav.confession': { es: 'Confesión de 1689', en: '1689 Confession' },
  'nav.catechism': { es: 'Catecismo', en: 'Catechism' },
  'nav.covenant': { es: 'Pacto de iglesia', en: 'Church covenant' },
  'nav.privacy': { es: 'Privacidad', en: 'Privacy' },
  'nav.search': { es: 'Buscar', en: 'Search' },
  'nav.menu': { es: 'Menú', en: 'Menu' },
  'nav.close': { es: 'Cerrar', en: 'Close' },
  'nav.skip': { es: 'Saltar al contenido', en: 'Skip to content' },
  'lang.switch': { es: 'English', en: 'Español' },
  'lang.switchLabel': { es: 'Read this page in English', en: 'Leer esta página en español' },

  'common.readMore': { es: 'Leer más', en: 'Read more' },
  'common.seeAll': { es: 'Ver todo', en: 'See all' },
  'common.provisional': { es: 'Contenido provisional', en: 'Placeholder content' },
  'common.untranslated': {
    es: 'Esta página aún no está disponible en español.',
    en: 'This page is not yet available in English. The Spanish text is shown below.',
  },
  'common.address': { es: 'Dirección', en: 'Address' },
  'common.serviceTimes': { es: 'Horarios', en: 'Service times' },
  'common.contact': { es: 'Contacto', en: 'Contact' },
  'common.previous': { es: 'Anterior', en: 'Previous' },
  'common.next': { es: 'Siguiente', en: 'Next' },
  'common.backToTop': { es: 'Volver arriba', en: 'Back to top' },

  'home.welcome': { es: 'Bienvenido', en: 'Welcome' },
  'home.visitCta': { es: 'Visítenos', en: 'Visit us' },
  'home.whoWeAre': { es: 'Quiénes somos', en: 'Who we are' },
  'home.latestSermon': { es: 'Último sermón', en: 'Latest sermon' },
  'home.doctrine': { es: 'Nuestra fe', en: 'Our faith' },
  'home.upcoming': { es: 'Próximas actividades', en: 'Upcoming activities' },
  'home.findUs': { es: 'Dónde estamos', en: 'Where to find us' },

  'beliefs.confessionBlurb': {
    es: 'La Segunda Confesión Bautista de Fe de Londres, nuestro estándar doctrinal, en 32 capítulos.',
    en: 'The Second London Baptist Confession of Faith, our doctrinal standard, in 32 chapters.',
  },
  'beliefs.catechismBlurb': {
    es: 'El Catecismo Bautista con la exposición bíblica de Benjamin Beddome (1752).',
    en: 'The Baptist Catechism (1695), the instruction we use with young and old.',
  },
  'beliefs.gospelBlurb': {
    es: 'Las buenas nuevas de salvación por gracia, por medio de la fe, en Cristo solo.',
    en: 'The good news of salvation by grace alone, through faith alone, in Christ alone.',
  },

  'reader.settings': { es: 'Opciones de lectura', en: 'Reading options' },
  'reader.fontSize': { es: 'Tamaño de letra', en: 'Text size' },
  'reader.lineHeight': { es: 'Interlineado', en: 'Line spacing' },
  'reader.theme': { es: 'Tema', en: 'Theme' },
  'reader.theme.paper': { es: 'Papel', en: 'Paper' },
  'reader.theme.white': { es: 'Blanco', en: 'White' },
  'reader.theme.night': { es: 'Noche', en: 'Night' },
  'reader.focus': { es: 'Modo de lectura', en: 'Focus mode' },
  'reader.focusExit': { es: 'Salir del modo de lectura', en: 'Exit focus mode' },
  'reader.sideBySide': { es: 'Español / English', en: 'English / Español' },
  'reader.continue': { es: 'Continuar leyendo', en: 'Continue reading' },
  'reader.contents': { es: 'Contenido', en: 'Contents' },
  'reader.chapter': { es: 'Capítulo', en: 'Chapter' },
  'reader.paragraph': { es: 'Párrafo', en: 'Paragraph' },
  'reader.copyLink': { es: 'Copiar enlace', en: 'Copy link' },
  'reader.copied': { es: 'Enlace copiado', en: 'Link copied' },
  'reader.proofs': { es: 'Textos de prueba', en: 'Proof texts' },
  'reader.readOn': { es: 'Leer en YouVersion', en: 'Read on YouVersion' },
  'reader.print': { es: 'Imprimir', en: 'Print' },
  'reader.download': { es: 'Descargar', en: 'Download' },
  'reader.close': { es: 'Cerrar', en: 'Close' },
  'reader.small': { es: 'Más pequeño', en: 'Smaller' },
  'reader.large': { es: 'Más grande', en: 'Larger' },

  'catechism.question': { es: 'Pregunta', en: 'Question' },
  'catechism.answer': { es: 'Respuesta', en: 'Answer' },
  'catechism.hideAnswers': { es: 'Ocultar respuestas', en: 'Hide answers' },
  'catechism.showAnswer': { es: 'Mostrar respuesta', en: 'Show answer' },
  'catechism.exposition': { es: 'Exposición de Beddome', en: "Beddome's exposition" },
  'catechism.expandAll': { es: 'Desplegar todo', en: 'Expand all' },
  'catechism.collapseAll': { es: 'Plegar todo', en: 'Collapse all' },
  'catechism.subQuestions': { es: 'preguntas', en: 'questions' },
  'catechism.enNotice': {
    es: '',
    en: "Beddome's sub-questions are not yet available in English. Each question shows the Baptist Catechism (1695) answer with its proof texts; the full exposition can be read in Spanish.",
  },
  'catechism.readSpanish': { es: '', en: 'Read the exposition in Spanish' },

  'sermons.filterBook': { es: 'Libro', en: 'Book' },
  'sermons.filterSeries': { es: 'Serie', en: 'Series' },
  'sermons.filterPreacher': { es: 'Predicador', en: 'Preacher' },
  'sermons.filterYear': { es: 'Año', en: 'Year' },
  'sermons.all': { es: 'Todos', en: 'All' },
  'sermons.search': { es: 'Buscar por título o pasaje', en: 'Search by title or passage' },
  'sermons.none': { es: 'No hay sermones que coincidan con estos filtros.', en: 'No sermons match these filters.' },
  'sermons.clear': { es: 'Quitar filtros', en: 'Clear filters' },
  'sermons.play': { es: 'Reproducir', en: 'Play' },
  'sermons.playNotice': {
    es: 'Al reproducir se cargará el video desde YouTube.',
    en: 'Playing loads the video from YouTube.',
  },
  'sermons.watchOnYouTube': { es: 'Ver en YouTube', en: 'Watch on YouTube' },
  'sermons.channel': { es: 'Canal de YouTube de la iglesia', en: "The church's YouTube channel" },
  'sermons.notes': { es: 'Bosquejo (PDF)', en: 'Outline (PDF)' },
  'sermons.series': { es: 'Serie', en: 'Series' },
  'sermons.inSeries': { es: 'Sermones de esta serie', en: 'Sermons in this series' },
  'sermons.count': { es: 'sermones', en: 'sermons' },
  'sermons.share': { es: 'Compartir', en: 'Share' },
  'sermons.copyLink': { es: 'Copiar enlace', en: 'Copy link' },
  'sermons.preachedIn': { es: 'Predicado en inglés', en: 'Preached in Spanish' },

  'activities.weekly': { es: 'Reuniones semanales', en: 'Weekly meetings' },
  'activities.upcoming': { es: 'Próximos eventos', en: 'Upcoming events' },
  'activities.month': { es: 'Calendario', en: 'Calendar' },
  'activities.addToCalendar': { es: 'Añadir al calendario', en: 'Add to calendar' },
  'activities.every': { es: 'Cada', en: 'Every' },
  'activities.none': { es: 'No hay eventos programados.', en: 'No upcoming events.' },

  'resources.book': { es: 'Libros recomendados', en: 'Recommended books' },
  'resources.article': { es: 'Artículos', en: 'Articles' },
  'resources.document': { es: 'Documentos', en: 'Documents' },
  'resources.downloads': { es: 'Descargas', en: 'Downloads' },

  'contact.title': { es: 'Escríbanos', en: 'Write to us' },
  'contact.name': { es: 'Nombre', en: 'Name' },
  'contact.email': { es: 'Correo electrónico', en: 'Email' },
  'contact.phone': { es: 'Teléfono (opcional)', en: 'Phone (optional)' },
  'contact.message': { es: 'Mensaje', en: 'Message' },
  'contact.send': { es: 'Enviar mensaje', en: 'Send message' },
  'contact.sending': { es: 'Enviando…', en: 'Sending…' },
  'contact.success': { es: 'Gracias. Hemos recibido su mensaje y le responderemos pronto.', en: 'Thank you. We have received your message and will reply soon.' },
  'contact.error': { es: 'No se pudo enviar el mensaje.', en: 'The message could not be sent.' },
  'contact.mailto': { es: 'Escríbanos directamente por correo', en: 'Email us directly' },
  'contact.required': { es: 'Por favor complete este campo.', en: 'Please fill in this field.' },
  'contact.invalidEmail': { es: 'Escriba un correo electrónico válido.', en: 'Please enter a valid email address.' },
  'map.load': { es: 'Mostrar mapa', en: 'Show map' },
  'map.notice': { es: 'El mapa se carga desde OpenStreetMap.', en: 'The map loads from OpenStreetMap.' },
  'map.open': { es: 'Abrir en un mapa', en: 'Open in a map' },

  'search.placeholder': { es: 'Buscar en el sitio', en: 'Search the site' },
  '404.title': { es: 'Página no encontrada', en: 'Page not found' },
  '404.text': { es: 'La página que busca no existe o ha cambiado de dirección.', en: 'The page you are looking for does not exist or has moved.' },
  '404.home': { es: 'Ir al inicio', en: 'Go to the home page' },

  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
} as const satisfies Record<string, Record<Lang, string>>;

export type UiKey = keyof typeof strings;

export const t = (lang: Lang) => (key: UiKey) => strings[key][lang];

export const DAYS: Record<string, Record<Lang, string>> = {
  MO: { es: 'Lunes', en: 'Monday' },
  TU: { es: 'Martes', en: 'Tuesday' },
  WE: { es: 'Miércoles', en: 'Wednesday' },
  TH: { es: 'Jueves', en: 'Thursday' },
  FR: { es: 'Viernes', en: 'Friday' },
  SA: { es: 'Sábado', en: 'Saturday' },
  SU: { es: 'Domingo', en: 'Lord’s Day' },
};

export const formatDate = (d: Date, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es' : 'en-GB', { timeZone: 'UTC', ...opts }).format(d);

/** Picks the text for `lang`, falling back to Spanish (I-3). */
export const pick = (text: { es: string; en?: string } | undefined, lang: Lang) => (text ? (lang === 'en' && text.en ? text.en : text.es) : '');
