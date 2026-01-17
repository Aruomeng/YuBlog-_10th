import { Header } from "@/components/layout/header";
import { GridBackground } from "@/components/effects/grid-background";
import { CustomCursor } from "@/components/custom-cursor";
import { MusicProvider } from "@/components/music-context";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MusicProvider>
      <GridBackground>
        <CustomCursor />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </GridBackground>
    </MusicProvider>
  );
}


