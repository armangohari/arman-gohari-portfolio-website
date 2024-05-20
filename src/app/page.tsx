import { cogGif } from "@/lib/icons";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid h-screen w-full place-items-center">
      {/* Loading Card Outer Container */}
      <div className="relative grid place-items-center overflow-hidden rounded-3xl bg-black p-px">
        {/* Loading Card Inner Container */}
        <div className="relative z-10 flex animate-pulse items-center justify-center gap-1.5 rounded-3xl bg-black px-6 py-6">
          {/* Icon */}
          <Image src={cogGif} alt="cog" className="h-7 w-7" />
          {/* Loading Text */}
          <h2 className="text-2xl tracking-wider text-white">Coming Soon</h2>
        </div>

        {/* Circular Motion Orbs */}
        <div className="animate-orbit bg-primary absolute rounded-full p-40 blur-3xl" />
        <div className="animate-orbit-delayed bg-primary/75 absolute rounded-full p-40 blur-3xl" />
      </div>
    </main>
  );
}
