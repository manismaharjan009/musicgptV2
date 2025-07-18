import Header from "@/components/Header";
import ContentSection from "@/components/ContentSection";

export default async function Music() {
  return (
    <div className="bg-background flex min-h-screen flex-col pt-10">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <ContentSection />
      </main>
    </div>
  );
}
