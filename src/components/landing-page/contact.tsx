"use client";

import { useEffect, useRef } from "react";
import { italiana } from "@/lib/fonts";
import { cn } from "@/utils/helpers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Icon } from "@iconify/react";

type ContactType = {
  type: string;
  id: string;
  url: string;
  icon: string;
};

const contacts: ContactType[] = [
  {
    type: "Email",
    id: "hello@armangohari.com",
    url: "mailto:hello@armangohari.com",
    icon: "ph:envelope-thin",
  },
  {
    type: "Linkedin",
    id: "armangohari",
    url: "https://linkedin.com/in/armangohari",
    icon: "ph:linkedin-logo-thin",
  },
  {
    type: "Github",
    id: "armangohari",
    url: "https://github.com/armangohari",
    icon: "ph:github-logo-thin",
  },
  {
    type: "Telegram",
    id: "armangohari",
    url: "https://telegram.me/armangohari",
    icon: "ph:telegram-logo-thin",
  },
  {
    type: "Instagram",
    id: "armanigohari",
    url: "https://instagram.com/armanigohari",
    icon: "ph:instagram-logo-thin",
  },
  {
    type: "Twitter",
    id: "armanigohari",
    url: "https://x.com/armanigohari",
    icon: "ph:twitter-logo-thin",
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Footer glow animation when scroll beam reaches
    if (glowRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(glowRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(glowRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.in",
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <footer
      ref={containerRef}
      data-footer
      className="relative z-10 w-full overflow-hidden bg-smooth-black px-6 py-32 text-smooth-white md:px-16 md:py-48"
    >
      {/* Glow orb that lights up when beam reaches */}
      <div
        ref={glowRef}
        data-footer-glow
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 scale-75 opacity-0"
      >
        <div className="h-64 w-64 rounded-full bg-primary/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-2xl md:h-48 md:w-48" />
      </div>

      <div className="relative z-10 mb-16 flex flex-col items-center justify-center md:mb-24">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">
          Get in Touch
        </h2>
        <h3
          className={cn(
            italiana.className,
            "mt-6 text-center text-5xl md:text-8xl lg:text-9xl"
          )}
        >
          Let&apos;s Work Together
        </h3>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {contacts.map((contact) => (
          <Link
            key={contact.type}
            href={contact.url}
            className="group flex items-center justify-between border-b border-white/10 pb-4 transition-colors hover:border-primary"
          >
            <div className="flex items-center gap-4">
              <Icon
                icon={contact.icon}
                width="24"
                height="24"
                className="text-gray-500 transition-colors group-hover:text-primary"
              />
              <span className="text-lg font-light">{contact.type}</span>
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-600 transition-colors group-hover:text-primary">
              {contact.id}
            </span>
          </Link>
        ))}
      </div>

      <div className="relative z-10 mt-32 flex w-full flex-col items-center justify-center gap-4 text-center opacity-30">
        <p className="text-xs uppercase tracking-widest">
          Copyright &copy; 2025 armangohari.com
        </p>
      </div>
    </footer>
  );
}

