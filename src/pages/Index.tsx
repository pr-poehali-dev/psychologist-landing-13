import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const PHOTO_URL =
  "https://cdn.poehali.dev/projects/5a6b3742-ad3a-4457-ad0e-45b208c17167/files/e6b2e3b4-9b64-46f2-9cbb-215b0d6df122.jpg";

// ── THEMES ────────────────────────────────────────────────────────────────────
type ThemeKey = "blue" | "green" | "beige" | "lavender" | "peach";

const THEMES: { key: ThemeKey; label: string; dot: string }[] = [
  { key: "blue",     label: "Light Blue",    dot: "#4DA6FF" },
  { key: "green",    label: "Light Green",   dot: "#66BB6A" },
  { key: "beige",    label: "Pastel Beige",  dot: "#D4A574" },
  { key: "lavender", label: "Soft Lavender", dot: "#9370DB" },
  { key: "peach",    label: "Muted Peach",   dot: "#FFA07A" },
];

const SERVICES = [
  { icon: "User",     title: "Индивидуальная терапия", desc: "Работа с тревогой, выгоранием, самооценкой и жизненными переходами. Сессии 50 минут.", tag: "от 3 500 ₽", emoji: "🧠" },
  { icon: "Users",    title: "Парная терапия",         desc: "Для пар, которые хотят улучшить коммуникацию, справиться с кризисом или восстановить близость.", tag: "от 5 000 ₽", emoji: "💬" },
  { icon: "Monitor",  title: "Онлайн-формат",          desc: "Полноценная терапевтическая работа через видеосвязь — в удобное время, из любой точки мира.", tag: "от 3 500 ₽", emoji: "🌐" },
  { icon: "Zap",      title: "Экстренная сессия",      desc: "Срочная поддержка в кризисной ситуации — быстрое назначение в течение 24 часов.", tag: "от 4 000 ₽", emoji: "⚡" },
  { icon: "BookOpen", title: "Работа с травмой",       desc: "Специализированная работа с последствиями психологических травм, ПТСР методами КПТ.", tag: "от 4 500 ₽", emoji: "🌱" },
  { icon: "Heart",    title: "Тревога и депрессия",    desc: "Доказательные методы лечения тревожных расстройств и депрессивных состояний.", tag: "от 3 500 ₽", emoji: "🫶" },
];

const REVIEWS = [
  { text: "После нескольких месяцев работы я перестала просыпаться с ощущением тревоги. Медленная, честная работа, которую мы делали вместе.", author: "Мария, 34 года", duration: "4 месяца терапии", rating: 5 },
  { text: "Никогда не думал, что разговоры с психологом — моё. Оказалось, дело в том, как именно с тобой разговаривают. Безопасно, без осуждения.", author: "Дмитрий, 41 год", duration: "3 месяца терапии", rating: 5 },
  { text: "Через три месяца после начала сессий я наконец поговорила с партнёром о том, о чём молчала годами. Это изменило всё.", author: "Елена, 29 лет", duration: "6 месяцев терапии", rating: 5 },
];

const FAQS = [
  { q: "Как понять, что мне нужна помощь психолога?", a: "Если тревога, усталость или трудности мешают жить так, как вы хотите — это достаточный повод. Не нужно ждать «настоящего» кризиса." },
  { q: "Сколько длится курс терапии?", a: "Зависит от запроса. Краткосрочная работа (5–10 сессий) — для конкретной ситуации. Долгосрочная — для глубоких изменений. Обсудим на первой встрече." },
  { q: "Гарантируете ли вы конфиденциальность?", a: "Да. Всё, что происходит на сессии, остаётся между нами. Я придерживаюсь этического кодекса психолога." },
  { q: "Что если ваш подход мне не подойдёт?", a: "Это нормально — терапевтический альянс важен. Если после первых встреч вы почувствуете несоответствие, я помогу найти подходящего коллегу." },
  { q: "Работаете ли вы с подростками?", a: "Да, работаю с подростками от 14 лет. Для детей младше могу порекомендовать специалиста по детской психологии." },
];

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
}

// ── THEME SWITCHER ────────────────────────────────────────────────────────────
function ThemeSwitcher({ theme, setTheme }: { theme: ThemeKey; setTheme: (t: ThemeKey) => void }) {
  return (
    <div className="flex items-center gap-2">
      {THEMES.map((t) => (
        <button
          key={t.key}
          className={`theme-dot ${theme === t.key ? "active" : ""}`}
          style={{ background: t.dot }}
          onClick={() => setTheme(t.key)}
          title={t.label}
          aria-label={t.label}
        />
      ))}
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ theme, setTheme }: { theme: ThemeKey; setTheme: (t: ThemeKey) => void }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const links = [
    { label: "О специалисте", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Отзывы", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className={`nav-fixed ${scrolled ? "scrolled" : ""}`}>
      <div className="container-wide flex items-center justify-between">
        <a href="#" className="font-serif text-xl font-medium" style={{ color: "var(--text-primary)" }}>
          Анна Соколова
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => <a key={l.label} href={l.href} className="nav-link">{l.label}</a>)}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
          <a href="#contact" className="btn-primary" style={{ padding: "0.625rem 1.5rem", fontSize: "0.875rem" }}>
            Записаться
          </a>
        </div>
        <button
          className="md:hidden p-2 rounded-xl"
          style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <Icon name={open ? "X" : "Menu"} size={20} style={{ color: "var(--text-primary)" }} />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4" style={{ marginTop: "0.75rem", borderTop: "1px solid var(--glass-border)", paddingTop: "1rem" }}>
          {links.map((l) => <a key={l.label} href={l.href} className="nav-link text-base" onClick={() => setOpen(false)}>{l.label}</a>)}
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
          <a href="#contact" className="btn-primary text-center" onClick={() => setOpen(false)}>Записаться</a>
        </div>
      )}
    </header>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      <div className="blob blob-1" style={{ width: 520, height: 520, top: "-10%", right: "-8%", opacity: 0.8 }} />
      <div className="blob blob-2" style={{ width: 420, height: 420, bottom: "5%", left: "-6%", opacity: 0.7 }} />
      <div className="blob blob-3" style={{ width: 300, height: 300, top: "40%", left: "50%", opacity: 0.5 }} />

      <div className="container-wide relative z-10 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-8 animate-fade-in" style={{ opacity: 0, animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <span className="tag">Клинический психолог · КПТ</span>
            </div>
            <h1
              className="font-serif text-5xl md:text-6xl xl:text-7xl mb-6 animate-fade-up"
              style={{ opacity: 0, animationDelay: "0.2s", animationFillMode: "forwards", color: "var(--text-primary)" }}
            >
              Пространство<br />
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>для роста</span><br />
              и баланса
            </h1>
            <p className="text-lg mb-10 animate-fade-up leading-relaxed"
              style={{ opacity: 0, animationDelay: "0.35s", animationFillMode: "forwards", color: "var(--text-secondary)", maxWidth: 480 }}>
              Работаю с тревогой, выгоранием и отношениями. Научный подход КПТ, полная конфиденциальность, онлайн или очно в Москве.
            </p>
            <div className="flex flex-wrap gap-3 mb-12 animate-fade-up" style={{ opacity: 0, animationDelay: "0.5s", animationFillMode: "forwards" }}>
              <a href="#contact" className="btn-primary">
                Записаться на консультацию
                <Icon name="ArrowRight" size={16} />
              </a>
              <a href="#about" className="btn-ghost">Узнать больше</a>
            </div>
            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ opacity: 0, animationDelay: "0.65s", animationFillMode: "forwards" }}>
              {[{ num: "7+", label: "лет практики" }, { num: "300+", label: "клиентов" }, { num: "94%", label: "продолжают работу" }].map((s) => (
                <div key={s.label} className="stat-chip">
                  <span className="stat-number">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in" style={{ opacity: 0, animationDelay: "0.3s", animationFillMode: "forwards" }}>
            <div className="absolute -inset-4 rounded-3xl opacity-25" style={{ background: "var(--accent-light)", filter: "blur(4px)" }} />
            <div className="glass relative overflow-hidden" style={{ borderRadius: 24 }}>
              <img src={PHOTO_URL} alt="Психолог Анна Соколова" className="w-full object-cover" style={{ height: 500, display: "block" }} loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="glass flex items-center justify-between" style={{ borderRadius: 14, padding: "1rem 1.25rem" }}>
                  <div>
                    <div className="font-serif text-lg font-medium" style={{ color: "var(--text-primary)" }}>Анна Соколова</div>
                    <div className="text-sm" style={{ color: "var(--accent)" }}>Клинический психолог · МГУ</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Принимает
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ opacity: 0, animationDelay: "1.2s", animationFillMode: "forwards" }}>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
        <span className="text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>SCROLL</span>
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  const credentials = [
    { icon: "GraduationCap", title: "Образование",     text: "МГУ, факультет психологии. Дополнительная подготовка по КПТ." },
    { icon: "Award",         title: "Сертификация",     text: "Институт когнитивно-поведенческой терапии, международный стандарт." },
    { icon: "ShieldCheck",   title: "Этика",            text: "Работаю по этическому кодексу психолога. Полная конфиденциальность." },
    { icon: "RefreshCw",     title: "Супервизия",       text: "Регулярная супервизия и повышение квалификации — каждый год." },
  ];

  return (
    <section id="about" className="section-pad">
      <div className="container-wide px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative reveal">
            <div className="glass-card overflow-hidden p-0" style={{ borderRadius: 24 }}>
              <img src={PHOTO_URL} alt="Анна Соколова в кабинете" className="w-full object-cover" style={{ height: 480 }} loading="lazy" />
            </div>
            <div className="glass absolute -bottom-6 -right-6 p-4 hidden md:block" style={{ borderRadius: 16, maxWidth: 220 }}>
              <div className="text-2xl mb-1">🎓</div>
              <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>Диплом с отличием</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>МГУ, 2016 год</div>
            </div>
          </div>

          <div>
            <div className="reveal">
              <span className="tag mb-4 inline-block">О специалисте</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: "var(--text-primary)" }}>
                Психология —<br /><em>это совместный путь</em>
              </h2>
              <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Я верю, что каждый человек обладает внутренними ресурсами для изменений. Моя задача — создать безопасное пространство, где вы сможете их найти и использовать.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((c, i) => (
                <div key={c.title} className={`glass-card reveal reveal-delay-${i + 1}`} style={{ padding: "1.25rem" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: "var(--accent-light)" }}>
                    <Icon name={c.icon} size={16} style={{ color: "var(--accent)" }} />
                  </div>
                  <div className="font-medium text-sm mb-1" style={{ color: "var(--text-primary)" }}>{c.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section id="services" className="section-pad">
      <div className="container-wide px-6">
        <div className="text-center mb-14 reveal">
          <span className="tag mb-4 inline-block">Услуги</span>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: "var(--text-primary)" }}>Форматы работы</h2>
          <p className="mt-4 text-base" style={{ color: "var(--text-muted)", maxWidth: 500, margin: "1rem auto 0" }}>Выберите формат, который подходит именно вам</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`glass-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="text-3xl mb-4">{s.emoji}</div>
              <h3 className="font-serif text-xl mb-2" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="tag">{s.tag}</span>
                <a href="#contact" className="flex items-center gap-1 text-sm font-medium" style={{ color: "var(--accent)" }}>
                  Записаться <Icon name="ArrowRight" size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── QUOTE ─────────────────────────────────────────────────────────────────────
function QuoteSection() {
  return (
    <section className="section-pad relative overflow-hidden" style={{ background: "var(--accent)" }}>
      <div className="absolute inset-0 opacity-10" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)" }} />
      <div className="blob" style={{ width: 400, height: 400, top: "-20%", right: "-10%", background: "rgba(255,255,255,0.08)", filter: "blur(60px)", animation: "none" }} />
      <div className="container-narrow px-6 text-center relative z-10">
        <div className="reveal">
          <div className="font-serif text-5xl md:text-6xl leading-tight mb-8" style={{ color: "rgba(255,255,255,0.95)", fontStyle: "italic" }}>
            «Изменения начинаются<br />не с силы воли —<br />
            <span style={{ color: "rgba(255,255,255,0.65)" }}>а с понимания»</span>
          </div>
          <a href="#contact" className="btn-ghost">
            Начать путь изменений
            <Icon name="ArrowRight" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ── REVIEWS ───────────────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section id="reviews" className="section-pad">
      <div className="container-wide px-6">
        <div className="text-center mb-14 reveal">
          <span className="tag mb-4 inline-block">Отзывы</span>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: "var(--text-primary)" }}>Истории клиентов</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={i} className={`glass-card reveal reveal-delay-${i + 1} flex flex-col`}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} className="text-base" style={{ color: "var(--accent)" }}>★</span>
                ))}
              </div>
              <p className="text-base italic flex-1 mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>«{r.text}»</p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--glass-border)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-medium" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                  {r.author[0]}
                </div>
                <div>
                  <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{r.author}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{r.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="section-pad">
      <div className="container-narrow px-6">
        <div className="text-center mb-14 reveal">
          <span className="tag mb-4 inline-block">Вопросы и ответы</span>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: "var(--text-primary)" }}>Часто спрашивают</h2>
        </div>
        <div className="glass reveal" style={{ padding: "0.5rem 2rem" }}>
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span>{faq.q}</span>
                <span className="faq-icon"><Icon name="Plus" size={18} /></span>
              </button>
              <div className={`faq-answer ${open === i ? "open" : ""}`}>{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", format: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [honey, setHoney] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Некорректный email";
    if (!form.phone.match(/^\+?[\d\s\-()]{7,}$/)) e.phone = "Некорректный телефон";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (honey) return;
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSent(true);
  };

  const change = (f: string, v: string) => {
    setForm((p) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors((p) => ({ ...p, [f]: "" }));
  };

  return (
    <section id="contact" className="section-pad">
      <div className="container-wide px-6">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div className="reveal">
            <span className="tag mb-4 inline-block">Запись</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: "var(--text-primary)" }}>
              Первый шаг —<br /><em>самый важный</em>
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Отвечаю в течение рабочего дня. Первая консультация — знакомство без обязательств.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: "Clock",          label: "Пн–Пт: 10:00 – 20:00", sub: "Сб: 11:00 – 17:00" },
                { icon: "MapPin",         label: "Москва, центр",          sub: "Онлайн — по всему миру" },
                { icon: "MessageSquare",  label: "Telegram",               sub: "@anna_psy" },
              ].map((c) => (
                <div key={c.label} className="glass-card flex items-center gap-4" style={{ padding: "1rem 1.25rem", borderRadius: 12 }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent-light)" }}>
                    <Icon name={c.icon} size={17} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{c.label}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card reveal reveal-delay-2" style={{ padding: "2.5rem" }}>
            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-5">✅</div>
                <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--text-primary)" }}>Заявка принята</h3>
                <p style={{ color: "var(--text-muted)" }}>Свяжусь с вами в течение рабочего дня. Спасибо за доверие.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-serif text-2xl mb-6" style={{ color: "var(--text-primary)" }}>Оставить заявку</h3>
                <input type="text" name="website" value={honey} onChange={(e) => setHoney(e.target.value)} style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="form-label" htmlFor="cn">Имя</label>
                    <input id="cn" type="text" className={`form-field ${errors.name ? "err" : ""}`} placeholder="Мария" value={form.name} onChange={(e) => change("name", e.target.value)} />
                    {errors.name && <div className="field-err">{errors.name}</div>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="ce">Email</label>
                    <input id="ce" type="email" className={`form-field ${errors.email ? "err" : ""}`} placeholder="mail@example.com" value={form.email} onChange={(e) => change("email", e.target.value)} />
                    {errors.email && <div className="field-err">{errors.email}</div>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="form-label" htmlFor="cp">Телефон</label>
                    <input id="cp" type="tel" className={`form-field ${errors.phone ? "err" : ""}`} placeholder="+7 (999) 000-00-00" value={form.phone} onChange={(e) => change("phone", e.target.value)} />
                    {errors.phone && <div className="field-err">{errors.phone}</div>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="cf">Формат</label>
                    <select id="cf" className="form-field" value={form.format} onChange={(e) => change("format", e.target.value)}>
                      <option value="">Выберите...</option>
                      <option value="online">Онлайн</option>
                      <option value="offline">Очно</option>
                      <option value="any">Любой</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="form-label" htmlFor="cm">Ваш запрос (необязательно)</label>
                  <textarea id="cm" className="form-field" rows={3} placeholder="Кратко опишите, с чем хотите поработать..." value={form.message} onChange={(e) => change("message", e.target.value)} style={{ resize: "none" }} />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Отправить заявку
                  <Icon name="Send" size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ theme, setTheme }: { theme: ThemeKey; setTheme: (t: ThemeKey) => void }) {
  return (
    <footer className="section-pad" style={{ background: "var(--text-primary)" }}>
      <div className="container-wide px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-serif text-xl font-medium mb-3" style={{ color: "rgba(255,255,255,0.9)" }}>Анна Соколова</div>
            <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Клинический психолог.<br />КПТ, Москва и онлайн.<br />7 лет практики.
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Навигация</div>
            <div className="flex flex-col gap-2">
              {[{ label: "О специалисте", href: "#about" }, { label: "Услуги", href: "#services" }, { label: "Отзывы", href: "#reviews" }, { label: "Запись", href: "#contact" }].map((l) => (
                <a key={l.label} href={l.href} className="text-sm transition-opacity hover:opacity-70" style={{ color: "rgba(255,255,255,0.45)" }}>{l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-3" style={{ color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Тема сайта</div>
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
            <div className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>Выберите цветовую схему</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>
          <span>© 2024 Анна Соколова · Частная практика</span>
          <a href="#" style={{ color: "var(--accent)" }}>Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function Index() {
  const [theme, setTheme] = useState<ThemeKey>("blue");
  useReveal();

  const applyTheme = (t: ThemeKey) => {
    document.documentElement.setAttribute("data-theme", t);
    setTheme(t);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "blue");
  }, []);

  // suppress unused warning
  void useRef;

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} setTheme={applyTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <QuoteSection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer theme={theme} setTheme={applyTheme} />
    </div>
  );
}
