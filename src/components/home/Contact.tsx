"use client";

import {
  containerVariants,
  itemVariants,
} from "@/lib/framerAnimationConstants";
import { motion } from "framer-motion";
import Link from "next/link";
import Section from "../utilities/Section";

type contactType = {
  type: string;
  title: string;
  url: string;
};

const contacts: contactType[] = [
  {
    type: "Email",
    title: "hello@armangohari.com",
    url: "mailto:hello@armangohari.com",
  },
  {
    type: "Linkedin",
    title: "linkedin.com / armangohari",
    url: "https://linkedin.com/in/armangohari",
  },
  {
    type: "Github",
    title: "github.com / armangohari",
    url: "https://github.com/armangohari",
  },
  {
    type: "Telegram",
    title: "telegram.me / armangohari",
    url: "https://telegram.me/armangohari",
  },
  {
    type: "Instagram",
    title: "instagram.com / armanigohari",
    url: "https://instagram.com/armanigohari",
  },
  {
    type: "X",
    title: "x.com / armanigohari",
    url: "https://x.com/armanigohari",
  },
];

export default function Contact() {
  return (
    <Section title="Contact" orbDirection="left" tabId={4}>
      <div className="relative mt-[7vh] h-[65vh] w-full sm:mt-[3vh]">
        {/* Contacts Showcase */}
        <motion.div
          className="flex flex-col items-center justify-between gap-[5vh]"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
        >
          {/* Contacts */}
          {contacts.map(({ type, title, url }: contactType) => (
            <motion.div key={type} variants={itemVariants}>
              <Link
                href={url}
                className="link text-sm font-thin tracking-widest sm:text-lg"
              >
                <h6>{title}</h6>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        {/* Copyright */}
        <h6 className="absolute bottom-0 w-full text-center text-smooth-gray max-sm:text-xs">
          Copyright &copy; 2024 armangohari.com
        </h6>
      </div>
    </Section>
  );
}
