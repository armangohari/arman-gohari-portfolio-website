import BackgroundMusicPlayer from "@/components/BackgroundMusicPlayer";
import ComingSoon from "@/components/ComingSoon";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-12">
      <ComingSoon />
      <BackgroundMusicPlayer />
    </main>
  );
}
