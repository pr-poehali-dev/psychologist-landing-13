import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const PHOTO_URL =
  "https://cdn.poehali.dev/projects/5a6b3742-ad3a-4457-ad0e-45b208c17167/files/e6b2e3b4-9b64-46f2-9cbb-215b0d6df122.jpg";

const MOODS = [
  {
    label: "Тревожно",
    sub: "Сложно успокоиться, мысли не останавливаются",
    emoji: "🌊",
    bg: "#c9d6e3, #dce6ef",
  },
  {
    label: "Нейтрально",
    sub: "Есть ощущение, что что-то нужно изменить",
    emoji: "🌿",
    bg: "#e8ddd4, #f0e8df",
  },
  {
    label: "Готов к изменениям",
    sub: "Чувствую внутренний запрос на рост и поддержку",
    emoji: "🌅",
    bg: "#e8c9a3, #f0ddc4",
  },
];

const SERVICES = [
  {
    icon: "User",
    title: "Индивидуальная терапия",
    desc: "Личное пространство для работы с тревогой, выгоранием, самооценкой и жизненными переходами. Сессии 50 минут, онлайн или очно.",
    tag: "от 3 500 ₽",
  },
  {
    icon: "Users",
    title: "Работа с парами",
    desc: "Совместные сессии для пар, которые хотят улучшить коммуникацию, справиться с кризисом или восстановить близость.",
    tag: "от 5 000 ₽",
  },
  {
    icon: "Monitor",
    title: "Онлайн-сессии",
    desc: "Полноценная терапевтическая работа через видеосвязь — в удобное время, из любого места, без потери качества.",
    tag: "от 3 500 ₽",
  },
];

const STEPS = [
  {
    icon: "MessageCircle",
    title: "Первый контакт",
    desc: "Вы пишете или звоните — я отвечаю в течение дня и мы находим удобное время.",
  },
  {
    icon: "ClipboardList",
    title: "Ваш запрос",
    desc: "На первой встрече мы говорим о том, что вас привело, чего вы хотите достичь. Никаких «правильных» ответов.",
  },
  {
    icon: "Compass",
    title: "Совместный план",
    desc: "Вместе определяем формат работы, частоту встреч и ориентировочный маршрут.",
  },
  {
    icon: "Sprout",
    title: "Начало пути",
    desc: "Каждая следующая сессия — шаг в направлении, которое выбрали вы сами.",
  },
];

const REVIEWS = [
  {
    text: "После нескольких месяцев работы я перестала просыпаться с ощущением тревоги. Это не магия — это медленная, честная работа, которую мы делали вместе.",
    author: "Клиент, 34 года",
  },
  {
    text: "Я никогда не думал, что «разговоры с психологом» — моё. Оказалось, дело в том, как именно с тобой разговаривают. Безопасно, без осуждения.",
    author: "Клиент, 41 год",
  },
  {
    text: "Через три месяца после начала сессий я наконец поговорила с партнёром о том, о чём молчала годами. Это изменило многое.",
    author: "Клиент, 29 лет",
  },
];

const FAQS = [
  {
    q: "Как понять, что мне нужна психологическая помощь?",
    a: "Если вы замечаете, что тревога, усталость или трудности в отношениях мешают вам жить так, как вы хотите — это уже достаточная причина. Не нужно ждать «настоящего» кризиса.",
  },
  {
    q: "Как долго длится терапия?",
    a: "Это зависит от вашего запроса. Краткосрочная работа (5–10 сессий) подходит для конкретной ситуации. Долгосрочная — для глубоких паттернов и изменений. Мы обсудим это на первой встрече.",
  },
  {
    q: "Вы гарантируете конфиденциальность?",
    a: "Да. Всё, что происходит на сессии, остаётся между нами. Я придерживаюсь этического кодекса психолога и не раскрываю информацию о клиентах третьим лицам.",
  },
  {
    q: "Что если мне не подойдёт ваш подход?",
    a: "Это нормальная часть процесса — терапевтический альянс важен. Если после первых встреч вы почувствуете, что нам не по пути, я помогу найти коллегу, который подойдёт лучше.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useParallax(ref: React.RefObject<HTMLElement>, speed = 0.1) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, [ref, speed]);
}

// ── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const links = [
    { label: "Обо мне", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Отзывы", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(248,245,242,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display italic text-xl" style={{ color: "var(--psy-navy)" }}>
          Анна Соколова
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary !py-2.5 !px-5 !text-sm">
            Записаться
          </a>
        </nav>
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
          style={{ color: "var(--psy-navy)" }}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-5"
          style={{ background: "rgba(248,245,242,0.98)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-body font-medium"
              style={{ color: "var(--psy-navy)" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>
            Записаться
          </a>
        </div>
      )}
    </header>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--psy-bg)" }}
    >
      <div
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4A373 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[5%] left-[-8%] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #2C3E50 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-0 w-full">
        <div className="animate-fade-in mb-14" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <div className="ornament-divider">
            <span />
            <span className="font-display italic text-sm tracking-widest" style={{ color: "var(--psy-terra)", whiteSpace: "nowrap" }}>
              Частный психолог · Москва
            </span>
            <span />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1
              className="font-display text-5xl md:text-6xl xl:text-7xl mb-6 animate-fade-up"
              style={{ animationDelay: "0.2s", opacity: 0, color: "var(--psy-navy)" }}
            >
              Пространство,
              <br />
              <em style={{ color: "var(--psy-terra)" }}>где вы можете</em>
              <br />
              быть собой
            </h1>
            <p
              className="font-body text-lg md:text-xl mb-10 animate-fade-up"
              style={{ color: "#666", lineHeight: 1.7, animationDelay: "0.35s", opacity: 0 }}
            >
              Работаю с тревогой, выгоранием, стрессом и отношениями.
              <br />
              Научный подход, полная конфиденциальность, без клише.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
              <a href="#contact" className="btn-primary">Записаться на консультацию</a>
              <a href="#about" className="btn-outline">Обо мне</a>
            </div>
            <div className="flex gap-8 mt-12 animate-fade-up" style={{ animationDelay: "0.65s", opacity: 0 }}>
              {[
                { num: "7+", label: "лет практики" },
                { num: "300+", label: "клиентов" },
                { num: "КПТ", label: "подход" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-semibold" style={{ color: "var(--psy-navy)" }}>{s.num}</div>
                  <div className="text-sm" style={{ color: "#999" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ background: "var(--psy-warm)", transform: "translate(12px, 12px)" }}
            />
            <img
              src={PHOTO_URL}
              alt="Психолог Анна Соколова"
              loading="lazy"
              className="relative rounded-2xl w-full object-cover"
              style={{ height: "480px", boxShadow: "0 8px 32px rgba(44,62,80,0.15)" }}
            />
            <div
              className="absolute bottom-6 left-6 right-6 rounded-xl px-5 py-4"
              style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
            >
              <div className="font-display text-lg font-semibold" style={{ color: "var(--psy-navy)" }}>Анна Соколова</div>
              <div className="text-sm" style={{ color: "var(--psy-terra)" }}>Клинический психолог · МГУ · КПТ</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1s", opacity: 0 }}>
        <span className="text-xs tracking-widest" style={{ color: "#bbb" }}>ПРОКРУТИТЕ</span>
        <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--psy-terra), transparent)" }} />
      </div>
    </section>
  );
}

// ── MOOD SLIDER ───────────────────────────────────────────────────────────────
function MoodSlider() {
  const [val, setVal] = useState(1);
  const mood = MOODS[val];

  return (
    <section
      className="section-pad transition-all duration-700"
      style={{ background: `linear-gradient(135deg, ${mood.bg})` }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="reveal">
          <p className="text-sm tracking-widest uppercase mb-4" style={{ color: "var(--psy-terra)" }}>
            Где вы сейчас?
          </p>
          <div className="text-6xl mb-6 transition-all duration-500">{mood.emoji}</div>
          <h2
            className="font-display text-4xl md:text-5xl mb-3 transition-all duration-500"
            style={{ color: "var(--psy-navy)" }}
          >
            {mood.label}
          </h2>
          <p className="font-body text-lg mb-10 transition-all duration-500" style={{ color: "#666" }}>
            {mood.sub}
          </p>
          <div className="px-4 md:px-8">
            <input
              type="range"
              min={0}
              max={2}
              value={val}
              onChange={(e) => setVal(Number(e.target.value))}
              className="mood-track w-full mb-6"
              aria-label="Как вы себя чувствуете"
            />
            <div className="flex justify-between text-sm" style={{ color: "#999" }}>
              {MOODS.map((m) => (
                <span key={m.label}>{m.label}</span>
              ))}
            </div>
          </div>
          <p className="text-base mt-8" style={{ color: "#777" }}>
            В любом из этих состояний —{" "}
            <strong style={{ color: "var(--psy-navy)" }}>есть место для работы</strong>.
          </p>
          <a href="#contact" className="btn-primary mt-8 inline-flex">
            Записаться на консультацию
          </a>
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="section-pad" style={{ background: "#fff" }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="text-sm tracking-widest uppercase mb-4" style={{ color: "var(--psy-terra)" }}>
              Обо мне
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-8" style={{ color: "var(--psy-navy)" }}>
              Психология — это не советы.
              <br />
              <em>Это совместная работа.</em>
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: "GraduationCap",
                  title: "Образование",
                  text: "МГУ имени М.В. Ломоносова, факультет психологии. Дополнительная подготовка по КПТ в Институте когнитивно-поведенческой терапии.",
                },
                {
                  icon: "FlaskConical",
                  title: "Научный подход",
                  text: "Когнитивно-поведенческая терапия (КПТ) — один из наиболее изученных методов с доказанной эффективностью.",
                },
                {
                  icon: "ShieldCheck",
                  title: "Конфиденциальность",
                  text: "Работаю по этическому кодексу психолога. Всё, что происходит на сессии, остаётся только между нами.",
                },
                {
                  icon: "Clock",
                  title: "Опыт",
                  text: "7 лет практики, более 300 клиентов, регулярная супервизия и повышение квалификации.",
                },
              ].map((item, i) => (
                <div key={item.title} className={`flex gap-4 reveal reveal-delay-${i + 1}`}>
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--psy-warm)" }}
                  >
                    <Icon name={item.icon} size={18} style={{ color: "var(--psy-terra)" }} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1 font-body" style={{ color: "var(--psy-navy)" }}>
                      {item.title}
                    </div>
                    <div className="text-base" style={{ color: "#666" }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
                style={{ background: "var(--psy-warm)", opacity: 0.6 }}
              />
              <img
                src={PHOTO_URL}
                alt="Психолог в рабочей обстановке"
                loading="lazy"
                className="relative rounded-2xl w-full object-cover"
                style={{ height: "520px", boxShadow: "0 8px 32px rgba(44,62,80,0.12)" }}
              />
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
    <section id="services" className="section-pad" style={{ background: "var(--psy-bg)" }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "var(--psy-terra)" }}>
            Услуги
          </p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: "var(--psy-navy)" }}>
            Форматы работы
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`psy-card reveal reveal-delay-${i + 1}`}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "var(--psy-warm)" }}
              >
                <Icon name={s.icon} size={22} style={{ color: "var(--psy-navy)" }} />
              </div>
              <h3 className="font-display text-2xl mb-3" style={{ color: "var(--psy-navy)" }}>
                {s.title}
              </h3>
              <p className="text-base mb-5" style={{ color: "#666", lineHeight: 1.7 }}>
                {s.desc}
              </p>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ background: "var(--psy-warm)", color: "#B8865A" }}
              >
                {s.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── STEPS ─────────────────────────────────────────────────────────────────────
function StepsSection() {
  return (
    <section id="steps" className="section-pad" style={{ background: "#fff" }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "var(--psy-terra)" }}>
            Как это работает
          </p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: "var(--psy-navy)" }}>
            Первая сессия: четыре шага
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.title} className={`flex gap-5 reveal reveal-delay-${i + 1}`}>
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display text-xl font-semibold"
                  style={{ background: "var(--psy-warm)", color: "var(--psy-navy)" }}
                >
                  {i + 1}
                </div>
              </div>
              <div className="pb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={step.icon} size={16} style={{ color: "var(--psy-terra)" }} />
                  <h3 className="font-body font-semibold text-base" style={{ color: "var(--psy-navy)" }}>
                    {step.title}
                  </h3>
                </div>
                <p className="text-base" style={{ color: "#666", lineHeight: 1.7 }}>
                  {step.desc}
                </p>
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
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref as React.RefObject<HTMLElement>, 0.08);

  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "var(--psy-navy)" }}>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, #D4A373 0%, transparent 60%)" }}
      />
      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="font-display italic text-4xl md:text-5xl xl:text-6xl leading-tight" style={{ color: "#fff" }}>
          «Исцеление начинается не с ответа,
          <br />
          <span style={{ color: "var(--psy-terra)" }}>а с безопасного вопроса»</span>
        </div>
      </div>
    </section>
  );
}

// ── REVIEWS ───────────────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section id="reviews" className="section-pad" style={{ background: "var(--psy-bg)" }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "var(--psy-terra)" }}>
            Отзывы
          </p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: "var(--psy-navy)" }}>
            Истории изменений
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className={`psy-card reveal reveal-delay-${i + 1}`}>
              <div
                className="font-display text-5xl leading-none mb-4 select-none"
                style={{ color: "var(--psy-terra)", opacity: 0.35 }}
              >
                "
              </div>
              <p className="text-base italic mb-6" style={{ color: "#555", lineHeight: 1.8 }}>
                {r.text}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "var(--psy-warm)" }}
                >
                  <Icon name="User" size={14} style={{ color: "var(--psy-terra)" }} />
                </div>
                <span className="text-sm" style={{ color: "#999" }}>{r.author}</span>
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
    <section id="faq" className="section-pad" style={{ background: "#fff" }}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "var(--psy-terra)" }}>
            FAQ
          </p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: "var(--psy-navy)" }}>
            Частые вопросы
          </h2>
        </div>
        <div className="reveal">
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className="faq-icon">
                  <Icon name="Plus" size={18} />
                </span>
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", format: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [honey, setHoney] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Введите ваше имя";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Введите корректный email";
    if (!form.phone.match(/^\+?[\d\s\-()]{7,}$/)) e.phone = "Введите корректный телефон";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (honey) return;
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSent(true);
  };

  const handleChange = (field: string, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  return (
    <section id="contact" className="section-pad" style={{ background: "var(--psy-bg)" }}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "var(--psy-terra)" }}>
            Запись
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "var(--psy-navy)" }}>
            Сделайте первый шаг
          </h2>
          <p className="text-base" style={{ color: "#888" }}>
            Отвечаю в течение рабочего дня. Первая консультация — знакомство без обязательств.
          </p>
        </div>

        <div className="psy-card reveal" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
          {sent ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-5">🌿</div>
              <h3 className="font-display text-3xl mb-3" style={{ color: "var(--psy-navy)" }}>
                Заявка получена
              </h3>
              <p style={{ color: "#777" }}>
                Я свяжусь с вами в ближайшее рабочее время. Спасибо, что решились на этот шаг.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="website"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="form-label" htmlFor="name">Ваше имя *</label>
                  <input
                    id="name"
                    type="text"
                    className={`form-input ${errors.name ? "error" : ""}`}
                    placeholder="Мария"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  {errors.name && <div className="field-error">{errors.name}</div>}
                </div>
                <div>
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="maria@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {errors.email && <div className="field-error">{errors.email}</div>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="form-label" htmlFor="phone">Телефон *</label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    placeholder="+7 (999) 000-00-00"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                  {errors.phone && <div className="field-error">{errors.phone}</div>}
                </div>
                <div>
                  <label className="form-label" htmlFor="format">Удобный формат</label>
                  <select
                    id="format"
                    className="form-input"
                    value={form.format}
                    onChange={(e) => handleChange("format", e.target.value)}
                  >
                    <option value="">Выберите...</option>
                    <option value="online">Онлайн</option>
                    <option value="offline">Очно</option>
                    <option value="any">Любой</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full mt-2">
                Отправить заявку
              </button>
            </form>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-8 reveal">
          {[
            { icon: "Send", label: "Telegram", href: "https://t.me/" },
            { icon: "Phone", label: "WhatsApp", href: "https://wa.me/" },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 font-body text-sm font-medium"
              style={{ border: "1.5px solid #e0d6cc", color: "var(--psy-navy)", background: "#fff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--psy-warm)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
            >
              <Icon name={btn.icon} size={16} />
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-10 px-6 text-center" style={{ background: "var(--psy-navy)" }}>
      <div className="font-display italic text-xl mb-3" style={{ color: "rgba(255,255,255,0.8)" }}>
        Анна Соколова
      </div>
      <div className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>
        Психолог · Москва · Онлайн
      </div>
      <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        © 2024 · Частная практика ·{" "}
        <a href="#" style={{ color: "var(--psy-terra)" }}>
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function Index() {
  useReveal();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <MoodSlider />
        <AboutSection />
        <ServicesSection />
        <StepsSection />
        <QuoteSection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
