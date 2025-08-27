# Cursor Prompt — **prokr** (Jeddah Moving Leads Site)

> **Role**: You are a senior Next.js engineer + conversion-focused UX writer. Build a production-grade Arabic RTL landing site that captures high‑quality moving leads in **Jeddah** and sends them to **Google Sheets** via **SheetDB** through a secure serverless route. Tone: سعودي خفيف، موثوق/مضمون/مرتب. Brand name: **prokr**.

---

## ✅ Goal

* Create a high‑converting **one‑page** landing site (with 3–4 short sections) + a **multi‑step quiz form** (icons, counters, progress bar) for moving services.
* On submit, POST lead data to a secure **Next.js Route Handler** (`/api/lead`) which forwards to **SheetDB** (Google Sheet backend) and returns success/failure.
* Capture **UTM/GCLID** and essentials for ad attribution in hidden fields.
* Add **GA4 + GTM** events for `lead_submit` and `whatsapp_click`.
* Pages: `/`, `/thanks`, `/privacy`, `/terms`.
* Design must be **Arabic RTL**, accessible (AA contrast), mobile‑first, and optimized for speed & conversion.

---

## 🧱 Tech Stack & Conventions

* **Next.js 14+ (App Router)**, **React 18**, **TypeScript**.
* **Tailwind CSS** for styling; clean, neutral UI. Use **shadcn/ui** components and **lucide-react** icons.
* **Framer Motion** for subtle transitions.
* **Zod** + **react-hook-form** for validation.
* **i18n (ar-SA)** basic setup; `<html dir="rtl" lang="ar-SA">`.
* No client‑side calls to SheetDB; all submit goes via `/api/lead` (server) with env secrets.
* Assets (hero illustrations/icons) come from `/public`
---

## 🎨 Visual & Brand

* **Brand**: `prokr` (wordmark first; simple, trustworthy, service brand).
* **Palette** (accessible, calm, conversion‑friendly):

  * `--bg`: `#0B1220` (very dark blue‑slate for header accents) — use sparingly
  * `--surface`: `#0F172A` (slate-900)
  * `--card`: `#111827` (gray-900)
  * `--muted`: `#94A3B8` (slate-400)
  * **Primary CTA**: `#22C55E` (emerald-500) with hover `#16A34A` (emerald-600)
  * **Accent**: `#E11D48` (rose-600) for small highlights only
  * **Base**: White `#FFFFFF`
* **Typography**: Arabic‑friendly, system stack or Google Fonts (e.g., `Tajawal` or `Cairo`). Large, airy headings; 16–18px body.
* **Style**: generous whitespace, rounded‑2xl, soft shadows, clear separation, friendly icons.

---

## 🗺️ Site Map

* `/` – Landing + Quiz (multi‑step)
* `/thanks` – Submission confirmation + WhatsApp nudge
* `/privacy` – Privacy Policy (short, compliant)
* `/terms` – Terms of Service (short)

---

## 📄 Sections & Copy (Arabic, سعودي خفيف)

### 1) Hero (fold)

* **Title**: "نرتّب لك نقل العفش في جدة — بسرعة، سعر منافس، وضمان على الشغل"
* **Subtitle**: "قدّم الطلب خلال دقيقة، ونرسّل لك عروض أسعار من أفضل المنفّذين خلال دقائق."
* **CTAs**: \[ابدأ الطلب] (scroll to quiz) · \[تواصل واتساب]
* **Trust badges**: "عروض واضحة" · "تغليف احترافي" · "فك وتركيب" · "أسعار مرنة"

### 2) كيف نشتغل؟ (3 خطوات)

1. تعبئة الطلب الذكي
2. نستقبل عروض من المنفّذين
3. نرسّل لك الأفضل مباشرة على واتساب

### 3) خدماتنا

* نقل داخل جدة · نقل بين مدن · تغليف فقط · فك وتركيب · تخزين مؤقت

### 4) آراء العملاء (Testimonials)

* 3 بطاقات قصيرة، صورة + اسم أول (سنضيف صور من `/public`).

### 5) FAQ

* "كم الوقت للرد؟" — خلال دقائق في أوقات العمل.
* "هل الأسعار ثابتة؟" — مرنة حسب التفاصيل، ونرسل أكثر من عرض.
* "هل فيه ضمان؟" — نعم على التغليف والفك والتركيب.

### 6) Footer

* روابط: الخصوصية · الشروط · واتساب · هاتف
* ملاحظة: "prokr يعمل كوسيط لتنظيم العملية بين العميل والمنفّذ."

---

## 🧭 Quiz Wizard (Multi‑Step Form)

* **Progress bar** + **icons** + **counter chips** + **validation inline**
* **Steps**:

**Step 1: نوع الخدمة**

* خيارات كبطاقات مع أيقونات:

  * نقل داخل جدة · نقل بين مدن · تغليف فقط · فك وتركيب · تخزين مؤقت

**Step 2: تفاصيل الاستلام**

* المدينة (افتراضي جدة) + الحي (بحث/Select مع لائحة أحياء جدة)
* نوع المكان: شقة · فيلا · مكتب · مستودع
* الطابق + هل يوجد مصعد؟ (نعم/لا)

**Step 3: تفاصيل التسليم**

* مدينة + حي (لو نقل بين مدن، المدينة قد تختلف)
* الطابق + مصعد؟

**Step 4: العناصر**

* Chips مع عدّاد: سرير، دولاب، كنبة، طاولة طعام، كراسي، ثلاجة، فريزر، غسالة، نشافة، تلفزيون، مكتب، كراتين… (زر "أخرى" مع نص)
* مستوى التغليف: أساسي / كامل (اختيار)
* هل تحتاج رافعة/ونش؟ (نعم/لا/غير متأكد)

**Step 5: الموعد والتواصل**

* التاريخ (Datepicker) + الفترة: صباحًا/مساءً
* مرونة الموعد: مرن / غير مرن
* الاسم + جوال سعودي (Regex +9665…)
* موافقة واتساب (checkbox)
* ملاحظات (اختياري)

**Hidden**: utm\_source, utm\_medium, utm\_campaign, utm\_term, utm\_content, gclid, device, page\_path, referrer, ip (server), lead\_id.

**Submit behavior**:

* POST to `/api/lead` → server posts to SheetDB → success redirect `/thanks?name=…` + push GA `lead_submit`.
* On error: toast عربي واضح ومحاولة ثانية.

---

## 📦 Data: أحياء جدة

* أنشئ ملف: `src/data/jeddah_districts.json` مع ≥ 50 حي (عينات):
  \["الروضة","السلامة","الحمراء","النهضة","الشاطئ","الأندلس","البساتين","المحمدية","النزهة","العزيزية","الصفا","النسيم","البوادي","الفيصلية","السامر","السامحة","المروة","الحمدانية","الياسمين","المرجان","الواحة","البغدادية","الريّان","الجامعة","البلد","الطيّار","الوزيرية","الرحاب","الربيع","الكوثر"] + … مع خيار "أخرى".

---

## 🔐 Serverless API (`/api/lead`)

* Validate body with **Zod**; sanitize.
* Derive `timestamp` (ISO), server `ip`, and `lead_id` (e.g., `JED-${Date.now()}` short).
* Map to **SheetDB** payload (`{ data: { col: val, … } }`).
* Env: `SHEETDB_ENDPOINT` (full URL to sheet), `SHEETDB_API_KEY` (if used as header `Authorization: Bearer …`).
* Handle errors with meaningful messages; rate‑limit by IP (basic in‑memory limiter).

**Sample forward**:

```ts
await fetch(process.env.SHEETDB_ENDPOINT!, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.SHEETDB_API_KEY}` },
  body: JSON.stringify({ data: mappedRow })
});
```

---

## 📑 Google Sheet Schema (أسماء الأعمدة)

> **استخدم هذه المفاتيح كعناوين أعمدة بالإنجليزية** لسهولة الربط، مع إمكان إضافة صف عربي للتوضيح.

**Core**

* `timestamp` (ISO)
* `lead_id`
* `service_type` (داخل\_جدة | بين\_مدن | تغليف | فك\_وتركيب | تخزين)
* `from_city` (افتراضي: جدة)
* `from_district`
* `from_floor` (number)
* `from_elevator` (yes/no)
* `from_place_type` (شقة|فيلا|مكتب|مستودع)
* `to_city`
* `to_district`
* `to_floor` (number)
* `to_elevator` (yes/no)
* `items_json` (stringified array of {item, qty})
* `packaging_level` (basic|full)
* `hoist_needed` (yes|no|unknown)
* `date_pref` (YYYY-MM-DD)
* `time_slot` (صباحًا|مساءً)
* `flexibility` (flexible|strict)
* `customer_name`
* `customer_phone`
* `whatsapp_optin` (true/false)
* `notes`

**Attribution & Tech**

* `utm_source` `utm_medium` `utm_campaign` `utm_term` `utm_content`
* `gclid`
* `device` (mobile|desktop|tablet)
* `page_path`
* `referrer`
* `ip`

**Pipeline (for ops)**

* `status` (new|in\_review|quoted|won|lost|no\_answer|spam)
* `assigned_vendor`
* `quote_min_sar` (optional)
* `quote_max_sar` (optional)
* `currency` (SAR)
* `sla_minutes` (e.g., 30)

---

## 🧩 Components (src/components)

* `Header.tsx` (logo wordmark prokr, CTA WhatsApp)
* `Hero.tsx` (title, subtitle, CTA buttons, trust badges)
* `QuizWizard/` (steps components, progress bar, stepper nav)
* `DistrictSelect.tsx` (searchable RTL select from JSON)
* `ItemCounter.tsx` (chipped counters with icons)
* `FAQ.tsx` (accordion)
* `Footer.tsx`
* `Toast.tsx` (shadcn)

---

## 🧪 Validation & UX

* **Phone**: Saudi pattern `^\+?9665[0-9]{8}$` or `^05[0-9]{8}$` (normalize to +966…)
* Required fields guarded at each step; disable Next until valid.
* Autosave temp state to `localStorage` (in case of accidental refresh).
* reCAPTCHA v3 OR honeypot hidden field + server rate‑limit.
* Keyboard-friendly; ARIA labels; focus rings; error summaries.

---

## 📊 Analytics

* GA4 via `NEXT_PUBLIC_GA4_ID` and GTM via `NEXT_PUBLIC_GTM_ID`.
* Events: `lead_submit` (params: service\_type, from\_district, to\_district), `whatsapp_click`.
* Persist UTM/GCLID from `window.location.search` → hidden fields.

---

## 🔍 SEO & Performance

* `metadata` in App Router; `og:` tags; favicon.
* Fast LCP: lightweight hero (SVG/PNG from `/public`), lazy components below fold.
* Preload main font; Tailwind JIT; image `next/image` where applicable.

---

## 🔧 Env & Config

* `.env.local` examples:

```
SHEETDB_ENDPOINT=https://sheetdb.io/api/v1/XXXXXXX
SHEETDB_API_KEY=xxxx
NEXT_PUBLIC_GA4_ID=G-XXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=966543654700
```

---

## ✅ Acceptance Criteria

1. RTL Arabic UI, mobile‑first, passes Lighthouse 90+ (Perf/SEO/Access/Best Practices) on a typical modern laptop emulation.
2. Multi‑step quiz with icons, counters, validation, progress bar; cannot submit until valid.
3. On submit, data appears as a new row in Google Sheet with **exact column names** above.
4. GA4 receives `lead_submit` with payload; GTM dataLayer push present.
5. UTM/GCLID captured correctly when present in URL.
6. `/thanks` shows personalized line: "شكرًا يا {الاسم} — وصلك عرضنا على واتساب قريبًا" + زر تواصل واتساب.
7. `/privacy` و`/terms` صفحات قصيرة وواضحة.

---

## 🚀 Implementation Plan (file-level)

* Initialize Next.js App Router + Tailwind + shadcn/ui + framer-motion + zod + react-hook-form.
* Layout with `<html dir="rtl" lang="ar-SA">` and base styles.
* Build sections (Hero, HowWeWork, Services, Testimonials, FAQ, Footer).
* Build `QuizWizard` with 5 steps; shared form state in context or RHF steps.
* Create `src/data/jeddah_districts.json`.
* Create route handler `app/api/lead/route.ts` with Zod schema + SheetDB forward.
* Add utils for `getUTMs`, `normalizePhone`, `leadId()`.
* Add GA4 + GTM providers and event helpers.
* Add `/thanks`, `/privacy`, `/terms` minimal pages.

---

## 🧰 Content Snippets (use directly)

**Hero CTA buttons**: "ابدأ الطلب" · "تواصل واتساب"
**How it works labels**: "عبّي الطلب" · "نراجع العروض" · "نرسل الأفضل"
**Submit button**: "إرسال الطلب واستلام العروض"
**Error toast**: "تعذّر الإرسال حاليًا. جرّب مرة أخرى خلال لحظات."
**Success note on /thanks**: "نتابع طلبك الآن — ستستلم عروض الأسعار خلال دقائق في واتساب."

---

## 🔒 Notes

* Do not expose SheetDB URL on client; only via server.
* Rate‑limit `/api/lead` and reject obvious bot traffic.
* Prevent double‑submit.

---

## 📦 Deliverables

* Complete Next.js project with all pages/components.
* Type‑safe form + serverless API + SheetDB integration.
* README with setup steps and how to change Sheet columns.

> **Start now. Generate the full project with code, respecting all details above.**
