import type { Metadata } from "next";
import Link from "next/link";

import { getConfiguredSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "မင်္ဂလာဖိတ်စာနှင့် ဖိတ်စာဝန်ဆောင်မှု မြန်မာနိုင်ငံ",
  description:
    "Elegant Star မှ ရန်ကုန်နှင့် မြန်မာနိုင်ငံအတွင်း မင်္ဂလာဖိတ်စာ၊ ဖိတ်စာဒီဇိုင်း၊ မင်္ဂလာလက်မှတ်ဖိုင်နှင့် လိုက်ဖက်ညီသော wedding stationery ဝန်ဆောင်မှုများကို ဖန်တီးပေးပါသည်။",
  alternates: {
    canonical: "/my",
    languages: {
      en: "/",
      my: "/my",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "မင်္ဂလာဖိတ်စာနှင့် ဖိတ်စာဝန်ဆောင်မှု | Elegant Star",
    description:
      "ရန်ကုန်နှင့် မြန်မာနိုင်ငံအတွင်း မင်္ဂလာဖိတ်စာ၊ ဖိတ်စာဒီဇိုင်းနှင့် wedding stationery ဝန်ဆောင်မှုများကို Elegant Star တွင် ရှာဖွေပါ။",
    url: "/my",
    locale: "my_MM",
    type: "website",
  },
};

const keywordCards = [
  {
    title: "ဖိတ်စာ",
    copy: "မင်္ဂလာပွဲ၊ မိသားစုအခမ်းအနားနှင့် အထူးနေ့ရက်များအတွက် စာသား၊ အရောင်၊ ပုံစံနှင့် finishing detail များကို လိုအပ်သလို ပြင်ဆင်နိုင်သော ဖိတ်စာများ။",
  },
  {
    title: "မင်္ဂလာဆောင် ဖိတ်စာ / မင်္ဂလာဖိတ်စာ",
    copy: "မင်္ဂလာပွဲအတွက် ဖိတ်စာဒီဇိုင်း၊ envelope နှင့် coordinated pieces များကို အခမ်းအနားပုံစံနှင့် ကိုက်ညီအောင် ပြင်ဆင်ပေးပါသည်။",
  },
  {
    title: "ရန်ကုန် ဖိတ်စာ",
    copy: "ရန်ကုန်ရှိ Elegant Star studio မှ ဖိတ်စာ၊ marriage certificate folder နှင့် coordinated stationery များအတွက် consultation နှင့် customisation ပြုလုပ်နိုင်ပါသည်။",
  },
  {
    title: "မြန်မာနိုင်ငံ ဖိတ်စာ",
    copy: "မြန်မာနိုင်ငံအတွင်း မင်္ဂလာဖိတ်စာနှင့် stationery လိုအပ်သူများအတွက် Elegant Star ၏ collection များကို online မှ ကြည့်ရှုနိုင်ပါသည်။",
  },
  {
    title: "ဖိတ်စာ ဝန်ဆောင်မှု",
    copy: "Existing design တစ်ခုမှ စတင်နိုင်သလို reference ပုံများကို မျှဝေပြီး wording, colour direction, format နှင့် quantity ကို တိုင်ပင်နိုင်ပါသည်။",
  },
  {
    title: "မင်္ဂလာပွဲ ဝန်ဆောင်မှု",
    copy: "Elegant Star ၏ မင်္ဂလာပွဲဝန်ဆောင်မှုတွင် wedding invitation cards, marriage certificate folders နှင့် အခမ်းအနားအတွက် လိုက်ဖက်ညီသော stationery pieces များ ပါဝင်ပါသည်။",
  },
  {
    title: "မင်္ဂလာဖိတ်စာ ဒီဇိုင်း",
    copy: "Elegant Star မှ classic, floral, modern နှင့် premium presentation direction များအပါအဝင် မင်္ဂလာဖိတ်စာဒီဇိုင်းများကို personalised လုပ်ပေးပါသည်။",
  },
  {
    title: "Elegant Star ဖိတ်စာ",
    copy: "Elegant Star - Invitations & Creation ၏ real product collections များမှ reference ရွေးချယ်ပြီး ကိုယ့်အခမ်းအနားအတွက် အသေးစိတ်ပြင်ဆင်နိုင်ပါသည်။",
  },
] as const;

export default function MyanmarHomePage() {
  const siteUrl = getConfiguredSiteUrl();

  const structuredData = siteUrl
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${siteUrl}/my#webpage`,
        url: `${siteUrl}/my`,
        name: "မင်္ဂလာဖိတ်စာနှင့် ဖိတ်စာဝန်ဆောင်မှု မြန်မာနိုင်ငံ",
        description:
          "Elegant Star ၏ မြန်မာဘာသာ မင်္ဂလာဖိတ်စာ၊ ဖိတ်စာဒီဇိုင်းနှင့် wedding stationery ဝန်ဆောင်မှု မိတ်ဆက်စာမျက်နှာ။",
        inLanguage: "my",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#business`,
        },
      }
    : null;

  return (
    <main lang="my" className="min-w-0 overflow-x-clip">
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      <section
        className="section-shell border-b border-brand-olive/10 bg-brand-paper/55 pb-16 pt-[calc(7rem+env(safe-area-inset-top))] sm:pb-20 sm:pt-[calc(8rem+env(safe-area-inset-top))] lg:pb-24"
        data-nav-theme="light"
      >
        <div className="section-inner">
          <p className="small-label text-brand-sage">Elegant Star · Myanmar</p>
          <h1 className="display-heading mt-4 max-w-[15ch] text-[clamp(2.7rem,10vw,5.2rem)] leading-[0.98] text-brand-olive">
            မင်္ဂလာဖိတ်စာနှင့် ဖိတ်စာဝန်ဆောင်မှု မြန်မာနိုင်ငံ
          </h1>
          <p className="body-copy mt-7 max-w-3xl text-base leading-8 sm:text-lg">
            Elegant Star - Invitations &amp; Creation သည် ရန်ကုန်အခြေစိုက်
            ဖိတ်စာနှင့် wedding stationery studio ဖြစ်ပြီး မင်္ဂလာဖိတ်စာ၊
            ဖိတ်စာဒီဇိုင်း၊ မင်္ဂလာလက်မှတ်ဖိုင်နှင့် လိုက်ဖက်ညီသော stationery
            pieces များကို အခမ်းအနားအလိုက် personalised ပြုလုပ်ပေးပါသည်။
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-brand-olive">
            <Link
              href="/collections"
              className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
            >
              ဖိတ်စာ collection များကြည့်ရန်
            </Link>
            <Link
              href="/contact"
              className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
            >
              ဆက်သွယ်မေးမြန်းရန်
            </Link>
            <Link
              href="/"
              hrefLang="en"
              className="underline decoration-brand-sage/50 underline-offset-4 transition-opacity hover:opacity-65"
            >
              English version
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20 lg:py-24" data-nav-theme="light">
        <div className="section-inner">
          <div className="max-w-3xl">
            <p className="small-label text-brand-sage">Myanmar-language SEO</p>
            <h2 className="display-heading mt-4 text-[clamp(2.25rem,7vw,4rem)] leading-[1] text-brand-olive">
              ဖိတ်စာ ရှာဖွေနေသူများအတွက်
            </h2>
            <p className="body-copy mt-5 text-base leading-8 sm:text-lg">
              ရန်ကုန်နှင့် မြန်မာနိုင်ငံအတွင်း ဖိတ်စာ၊ မင်္ဂလာဖိတ်စာနှင့်
              မင်္ဂလာပွဲ stationery service များကို ရှာဖွေနေသူများအတွက်
              Elegant Star ၏ အဓိကဝန်ဆောင်မှုများကို အောက်တွင် စုစည်းထားပါသည်။
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {keywordCards.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-brand-olive/10 bg-brand-white/70 p-6 shadow-soft"
              >
                <h3 className="font-display text-2xl leading-tight text-brand-olive">
                  {item.title}
                </h3>
                <p className="body-copy mt-3 text-sm leading-7">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
