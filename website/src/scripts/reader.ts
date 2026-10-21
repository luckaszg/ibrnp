// Client behaviour for reading pages. Settings live only in this browser (localStorage)
// and every access is guarded so the page works without storage.

const KEY = 'ibrnp-reader';
type Prefs = { size?: number; leading?: number; theme?: 'paper' | 'white' | 'night'; parallel?: boolean };

const read = (): Prefs => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
};
const write = (p: Prefs) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable */
  }
};

export function initReader() {
  const root = document.documentElement;
  let prefs = read();

  const apply = () => {
    root.dataset.readerSize = String(prefs.size ?? 3);
    root.dataset.readerLeading = String(prefs.leading ?? 2);
    root.dataset.readerTheme = prefs.theme ?? 'paper';
    root.classList.toggle('parallel', !!prefs.parallel);
    document.querySelectorAll<HTMLOutputElement>('[data-out="size"]').forEach((o) => (o.textContent = String(prefs.size ?? 3)));
    document.querySelectorAll<HTMLButtonElement>('[data-set]').forEach((b) => {
      const current = b.dataset.set === 'theme' ? (prefs.theme ?? 'paper') : String(prefs.leading ?? 2);
      b.setAttribute('aria-pressed', String(b.dataset.value === current));
    });
    document.querySelectorAll('[data-action="parallel"]').forEach((b) => b.setAttribute('aria-pressed', String(!!prefs.parallel)));
  };
  apply();

  document.querySelectorAll<HTMLButtonElement>('[data-step="size"]').forEach((b) =>
    b.addEventListener('click', () => {
      prefs = { ...prefs, size: Math.min(5, Math.max(1, (prefs.size ?? 3) + Number(b.dataset.dir))) };
      write(prefs);
      apply();
    }),
  );
  document.querySelectorAll<HTMLButtonElement>('[data-set]').forEach((b) =>
    b.addEventListener('click', () => {
      prefs = b.dataset.set === 'theme' ? { ...prefs, theme: b.dataset.value as Prefs['theme'] } : { ...prefs, leading: Number(b.dataset.value) };
      write(prefs);
      apply();
    }),
  );
  document.querySelectorAll('[data-action="parallel"]').forEach((b) =>
    b.addEventListener('click', () => {
      prefs = { ...prefs, parallel: !prefs.parallel };
      write(prefs);
      apply();
    }),
  );
  document.querySelectorAll('[data-action="print"]').forEach((b) => b.addEventListener('click', () => window.print()));

  // Focus mode (not persisted: it should never surprise a returning visitor).
  const exit = document.querySelector<HTMLButtonElement>('.focus-exit');
  document.querySelectorAll('[data-action="focus"]').forEach((b) =>
    b.addEventListener('click', () => {
      const on = root.classList.toggle('focus-mode');
      document.querySelectorAll('.rb-btn[data-action="focus"]').forEach((x) => x.setAttribute('aria-pressed', String(on)));
      if (exit) exit.hidden = !on;
    }),
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('focus-mode') && !document.querySelector(':popover-open')) exit?.click();
  });

  // Progress bar.
  const bar = document.querySelector<HTMLElement>('.progress span');
  const article = document.querySelector<HTMLElement>('[data-reading]');
  const onScroll = () => {
    if (!bar || !article) return;
    const r = article.getBoundingClientRect();
    const total = r.height - window.innerHeight * 0.6;
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
    bar.style.setProperty('--p', String(p));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Remember the last paragraph read ("Continuar leyendo", RD-12).
  const resumeKey = document.querySelector<HTMLElement>('.reader-bar')?.dataset.resumeKey;
  const resumeLabel = document.querySelector<HTMLElement>('.reader-bar')?.dataset.resumeLabel;
  if (resumeKey && 'IntersectionObserver' in window) {
    let last = '';
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = (e.target as HTMLElement).id;
          if (id === last) continue;
          last = id;
          try {
            localStorage.setItem(`ibrnp-resume-${resumeKey}`, JSON.stringify({ url: location.pathname + '#' + id, label: `${resumeLabel ?? ''} ${(e.target as HTMLElement).dataset.label ?? ''}`.trim() }));
          } catch {
            /* ignore */
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    document.querySelectorAll('[data-resume-point]').forEach((el) => io.observe(el));
  }

  initPopovers();
  initCopyLinks();
}

/** Places footnote popovers next to the marker that opened them (desktop). */
export function initPopovers() {
  let lastInvoker: HTMLElement | null = null;
  let openedAt = 0;
  let openedTime = 0;
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[popovertarget]');
    if (btn && btn.classList.contains('fn-btn')) {
      lastInvoker = btn;
      openedAt = window.scrollY;
      openedTime = Date.now();
    }
  });
  document.querySelectorAll<HTMLElement>('.note-pop').forEach((pop) => {
    pop.addEventListener('toggle', (ev) => {
      const open = (ev as ToggleEvent).newState === 'open';
      if (lastInvoker) lastInvoker.setAttribute('aria-expanded', String(open));
      if (!open || !lastInvoker || window.innerWidth <= 640) return;
      const r = lastInvoker.getBoundingClientRect();
      const w = pop.offsetWidth;
      const h = pop.offsetHeight;
      let left = Math.min(Math.max(16, r.left + r.width / 2 - w / 2), window.innerWidth - w - 16);
      let top = r.bottom + 10;
      if (top + h > window.innerHeight - 16) top = Math.max(16, r.top - h - 10);
      pop.style.left = `${left}px`;
      pop.style.top = `${top}px`;
    });
  });
  // Close open notes once the page has scrolled away, so they never float far from their marker.
  window.addEventListener(
    'scroll',
    () => {
      if (window.innerWidth <= 640 || Date.now() - openedTime < 400 || Math.abs(window.scrollY - openedAt) < 120) return;
      document.querySelectorAll<HTMLElement>('.note-pop:popover-open').forEach((p) => p.hidePopover());
    },
    { passive: true },
  );
}

/** "Copy link" buttons next to paragraph numbers (RD-2). */
export function initCopyLinks() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((b) =>
    b.addEventListener('click', async () => {
      const url = new URL(b.dataset.copy!, location.href).toString();
      try {
        await navigator.clipboard.writeText(url);
        const old = b.textContent;
        b.textContent = b.dataset.done ?? '✓';
        setTimeout(() => (b.textContent = old), 1600);
      } catch {
        location.hash = new URL(url).hash;
      }
    }),
  );
}
