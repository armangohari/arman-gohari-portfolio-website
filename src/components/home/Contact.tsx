"use client";

import {
  containerVariants,
  itemVariants,
} from "@/lib/framerAnimationConstants";
import {
  github,
  instagram,
  linkedin,
  mail,
  telegram,
  twitter,
} from "@/lib/icons";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Section from "../utilities/Section";

type contactType = {
  type: string;
  icon: StaticImageData;
  id: string;
  url: string;
};

const contacts: contactType[] = [
  {
    type: "Email",
    icon: mail,
    id: "hello@armangohari.com",
    url: "mailto:hello@armangohari.com",
  },
  {
    type: "Linkedin",
    icon: linkedin,
    id: "armangohari",
    url: "https://linkedin.com/in/armangohari",
  },
  {
    type: "Github",
    icon: github,
    id: "armangohari",
    url: "https://github.com/armangohari",
  },
  {
    type: "Telegram",
    icon: telegram,
    id: "armangohari",
    url: "https://telegram.me/armangohari",
  },
  {
    type: "Instagram",
    icon: instagram,
    id: "armanigohari",
    url: "https://instagram.com/armanigohari",
  },
  {
    type: "Twitter",
    icon: twitter,
    id: "armanigohari",
    url: "https://x.com/armanigohari",
  },
];

export default function Contact() {
  return (
    <Section title="Contact" orbDirection="right" tabId={3}>
      <div className="relative mt-[7vh] h-[65vh] w-full sm:mt-[3vh]">
        {/* Contacts Showcase */}
        <motion.div
          className="flex flex-col items-center justify-between gap-[5vh]"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
        >
          {/* Contacts */}
          {contacts.map(({ type, icon, id, url }: contactType) => (
            <motion.div key={type} variants={itemVariants}>
              <Link
                href={url}
                className="flex items-center justify-center gap-2 text-sm font-thin tracking-widest transition-all hover:scale-105 hover:font-extralight hover:brightness-125 active:scale-95 active:font-thin active:brightness-75 sm:text-lg"
              >
                <h6>{type}</h6>
                <Image src={icon} alt={type} />
                <h6>{id}</h6>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        {/* Copyright */}
        <h6 className="text-smooth-gray absolute bottom-0 w-full text-center max-sm:text-xs">
          Copyright &copy; 2025 armangohari.com
        </h6>
      </div>
    </Section>
  );
}
