import BackgroundMusicPlayer from "@/components/BackgroundMusicPlayer";
import ComingSoon from "@/components/ComingSoon";

export default function Home() {
  return (
    <main className="h-screen w-full flex justify-center items-center flex-col gap-12">
      <ComingSoon />
      <BackgroundMusicPlayer />
    </main>
  );
}
