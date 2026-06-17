"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";

import { EnquiryButton } from "@/components/enquiry/EnquiryButton";
import { contactDetails, navigation, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type NavTheme = "light" | "dark";

type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: number;
  }
>;

function InstagramIcon({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

type ContactLink = {
  label: string;
  href: string;
  icon: IconComponent;
  external?: boolean;
};

function getNavigationPath(href: string) {
  const navigationPath = href.split("#")[0]?.split("?")[0];

  return navigationPath || "/";
}

function isNavigationItemActive(pathname: string, href: string) {
  const itemPath = getNavigationPath(href);

  if (itemPath === "/") {
    return pathname === "/";
  }

  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function getContactLinks(): ContactLink[] {
  const optionalMessagingLinks: Array<ContactLink | null> = [
    contactDetails.messengerUrl
      ? {
          label: "Messenger",
          href: contactDetails.messengerUrl,
          icon: MessageCircle,
          external: true,
        }
      : null,

    contactDetails.viberUrl
      ? {
          label: "Viber",
          href: contactDetails.viberUrl,
          icon: MessageCircle,
          external: true,
        }
      : null,

    contactDetails.whatsappUrl
      ? {
          label: "WhatsApp",
          href: contactDetails.whatsappUrl,
          icon: MessageCircle,
          external: true,
        }
      : null,
  ];

  return [
    {
      label: "Phone",
      href: contactDetails.primaryPhone.href,
      icon: Phone,
    },
    {
      label: "Email",
      href: contactDetails.email.href,
      icon: Mail,
    },
    {
      label: "Instagram",
      href: contactDetails.instagram.href,
      icon: InstagramIcon,
      external: true,
    },
    {
      label: "Location",
      href: contactDetails.mapsUrl,
      icon: MapPin,
      external: true,
    },
    ...optionalMessagingLinks.filter(
      (item): item is ContactLink => item !== null,
    ),
  ];
}

export function FloatingNavbar() {
  const pathname = usePathname();

  const [observedTheme, setObservedTheme] = useState<{
    pathname: string;
    theme: NavTheme;
  } | null>(null);

  const [openPathname, setOpenPathname] = useState<string | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const theme =
    observedTheme?.pathname === pathname ? observedTheme.theme : "light";

  const isOpen = openPathname === pathname;
  const dark = theme === "dark";
  const contactLinks = getContactLinks();

  const openMenu = useCallback(() => {
    setOpenPathname(pathname);
  }, [pathname]);

  const closeMenu = useCallback((options: { restoreFocus?: boolean } = {}) => {
    setOpenPathname(null);

    if (options.restoreFocus) {
      requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [closeMenu, isOpen, openMenu]);

  /*
   * Change the navbar theme depending on the section
   * currently underneath the floating navbar.
   */
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              secondEntry.intersectionRatio - firstEntry.intersectionRatio,
          )[0];

        if (!visibleEntry) {
          return;
        }

        const nextTheme = visibleEntry.target.getAttribute("data-nav-theme");

        if (nextTheme === "dark" || nextTheme === "light") {
          setObservedTheme({
            pathname,
            theme: nextTheme,
          });
        }
      },
      {
        rootMargin: "-10% 0px -72% 0px",
        threshold: [0, 0.2, 0.5, 0.8],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  /*
   * Popup behaviour:
   * - focus close button
   * - close on Escape
   * - close when clicking outside
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusFrame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const clickedInsidePanel =
        menuPanelRef.current?.contains(target) ?? false;

      const clickedMenuButton =
        menuButtonRef.current?.contains(target) ?? false;

      if (clickedInsidePanel || clickedMenuButton) {
        return;
      }

      closeMenu({ restoreFocus: true });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      closeMenu({ restoreFocus: true });
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);

      document.removeEventListener("pointerdown", handlePointerDown);

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-5 z-50 px-4">
        <nav
          aria-label="Primary navigation"
          className={cn(
            "pointer-events-auto mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between rounded-full px-4 py-2 shadow-[0_12px_40px_rgba(31,35,23,0.10)] transition-all duration-300 md:px-5",
            dark
              ? "glass-dark text-brand-ivory"
              : "glass-light text-brand-olive",
          )}
        >
          <Link
            href="/"
            aria-label="Elegant Star home"
            className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
          >
            <Image
              src={dark ? siteConfig.logo.white : siteConfig.logo.olive}
              alt=""
              width={132}
              height={100}
              className="h-11 w-14 object-contain"
              priority
            />

            <span className="hidden truncate text-sm font-bold tracking-[0.22em] sm:inline">
              ELEGANT STAR
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = isNavigationItemActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage",
                    active
                      ? dark
                        ? "bg-brand-ivory/16 text-brand-white"
                        : "bg-brand-olive/8 text-brand-olive"
                      : dark
                        ? "text-brand-ivory/82 hover:bg-brand-ivory/12 hover:text-brand-white"
                        : "text-brand-olive/72 hover:bg-brand-olive/7 hover:text-brand-olive",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <EnquiryButton variant={dark ? "dark" : "primary"}>
              Enquire
            </EnquiryButton>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={toggleMenu}
            className={cn(
              "inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage lg:hidden",
              dark
                ? "border-brand-ivory/20 bg-brand-ivory/10 text-brand-ivory hover:bg-brand-ivory/15"
                : "border-brand-olive/12 bg-brand-white/60 text-brand-olive hover:bg-brand-white/85",
              isOpen && "rotate-90",
            )}
          >
            {isOpen ? (
              <X size={19} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Compact mobile popup — not full screen */}
      <div className="pointer-events-none fixed inset-x-0 top-[5.75rem] z-[80] px-3 sm:top-[6rem] sm:px-4 lg:hidden">
        <div className="mx-auto flex w-full max-w-6xl justify-end">
          <div
            id="mobile-menu"
            ref={menuPanelRef}
            role="dialog"
            aria-modal={false}
            aria-label="Navigation menu"
            aria-hidden={!isOpen}
            inert={!isOpen}
            className={cn(
              "glass-light pointer-events-auto w-[min(22rem,calc(100vw_-_1.5rem))] origin-top-right overflow-y-auto overscroll-contain rounded-[24px] border border-brand-olive/10 p-3 shadow-[0_28px_80px_rgba(25,30,18,0.22)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-[28px] sm:p-4",
              "max-h-[calc(100dvh_-_6.75rem_-_env(safe-area-inset-bottom))] sm:max-h-[calc(100dvh_-_7.25rem_-_env(safe-area-inset-bottom))]",
              isOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-3 scale-[0.96] opacity-0",
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                aria-label="Elegant Star home"
                onClick={() => closeMenu({ restoreFocus: true })}
                className="flex min-w-0 items-center gap-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
              >
                <Image
                  src={siteConfig.logo.olive}
                  alt=""
                  width={100}
                  height={76}
                  className="h-10 w-12 shrink-0 object-contain"
                />

                <span className="truncate text-xs font-bold tracking-[0.2em] text-brand-olive">
                  ELEGANT STAR
                </span>
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={() => closeMenu({ restoreFocus: true })}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-olive/15 bg-brand-white/70 text-brand-olive transition hover:bg-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 h-px bg-brand-olive/10" />

            <div className="mt-3 grid gap-1">
              {navigation.map((item) => {
                const active = isNavigationItemActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => closeMenu({ restoreFocus: true })}
                    className={cn(
                      "group flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-base font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage",
                      active
                        ? "bg-brand-olive text-brand-ivory"
                        : "text-brand-olive hover:bg-brand-olive/7",
                    )}
                  >
                    <span>{item.label}</span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-1.5 rounded-full transition-all",
                        active
                          ? "bg-brand-ivory"
                          : "scale-0 bg-brand-sage group-hover:scale-100",
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="mt-4">
              <EnquiryButton
                className="w-full"
                onBeforeOpen={() => closeMenu()}
              >
                Start an enquiry
              </EnquiryButton>
            </div>

            <div className="mt-4 h-px bg-brand-olive/10" />

            <div className="mt-4">
              <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive/50">
                Contact
              </p>

              <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
                {contactLinks.map((item) => (
                  <MobileContact
                    key={item.label}
                    {...item}
                    onSelect={() => closeMenu({ restoreFocus: true })}
                  />
                ))}
              </div>
            </div>

            {contactDetails.address ? (
              <p className="mt-4 px-2 text-center text-[11px] leading-relaxed text-brand-olive/55">
                {contactDetails.address}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

function MobileContact({
  label,
  href,
  icon: Icon,
  external,
  onSelect,
}: ContactLink & { onSelect?: () => void }) {
  const opensNewTab = external ?? isExternalHref(href);

  return (
    <a
      href={href}
      onClick={onSelect}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-2xl border border-brand-olive/12 bg-brand-white/65 px-3 text-xs font-bold text-brand-olive transition hover:border-brand-olive/25 hover:bg-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sage"
    >
      <Icon size={15} aria-hidden="true" className="shrink-0" />

      <span className="truncate">{label}</span>

      {opensNewTab ? (
        <ExternalLink
          size={11}
          aria-hidden="true"
          className="shrink-0 opacity-50"
        />
      ) : null}
    </a>
  );
}
