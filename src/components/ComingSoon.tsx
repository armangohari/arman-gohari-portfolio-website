import { cogGif } from "@/lib/icons";
import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="relative grid place-items-center overflow-hidden rounded-3xl bg-black p-px">
      {/* Loading Card Inner Container */}
      <div className="relative z-10 flex animate-pulse items-center justify-center gap-1.5 rounded-3xl bg-black px-6 py-6">
        {/* Icon */}
        <Image src={cogGif} alt="cog" className="h-7 w-7" />
        {/* Loading Text */}
        <h2 className="text-3xl tracking-wider">Coming Soon</h2>
      </div>

      {/* Circular Motion Orbs */}
      <div className="absolute animate-orbit rounded-full bg-primary p-40 blur-3xl" />
      <div className="absolute animate-orbit-delayed rounded-full bg-primary p-40 blur-3xl" />
    </div>
  );
}
