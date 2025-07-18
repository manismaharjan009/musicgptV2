import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";
import MusicNotesBackground from "@/components/MusicNotesBackground";

export default async function Music() {
  return (
    <div className="bg-background relative flex min-h-screen flex-col pt-10">
      <MusicNotesBackground />
      <Header />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8">
        <ContentSection />
      </main>
    </div>
  );
}
