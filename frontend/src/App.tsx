// App.tsx — Pääsovellus
// Hallitsee navigointia eri näkymien välillä

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomNav } from "@/components/BottomNav";
import { HomeView } from "@/pages/HomeView";
import { ProfileView } from "@/pages/ProfileView";
import { StepOneView } from "@/pages/StepOneView";
import { LoginView } from "@/pages/LoginView";
import { RegisterView } from "@/pages/RegisterView";
import type { TabId } from "@/components/BottomNav";
const queryClient = new QueryClient();
// Kaikki mahdolliset näkymät sovelluksessa
type View = "home" | "coaching" | "profile" | "step1" | "login" | "register";
function Shell() {
  const [tab, setTab] = useState<TabId>("home");   // Aktiivinen välilehti
  const [view, setView] = useState<View>("home");  // Näytettävä näkymä
  // Käyttäjä vaihtaa välilehteä navigaatiopalkilta
  function handleTabChange(newTab: TabId) {
    setTab(newTab);
    setView(newTab as View);
  }
  // Käyttäjä avaa vaiheen kotinäkymästä
  function handleOpenStep(stepId: number) {
    if (stepId === 1) setView("step1");
    // Muut vaiheet lisätään myöhemmin
  }

  // Palataan kotinäkymään
  function handleBack() {
    setView("home");
    setTab("home");
  }

  //login-näkymään siirtyminen
  function handleOpenLogin() {
    setView("login");
  }

  //register-näkymään siirtyminen
  function handleOpenRegister() {
    setView("register");
  }

  // Vaihe-näkymät eivät näytä alanavigaatiota
  if (view === "login") {
    return <LoginView onBack={handleBack} />;
  }

  if (view === "register") {
    return <RegisterView onBack={handleBack} />;
  }
  
  if (view === "step1") {
    return <StepOneView onBack={handleBack} />;
  }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Pääsisältöalue — scrollattava */}
      <main className="flex-1 overflow-y-auto pb-20">
        {tab === "home" && (
          <HomeView
            onOpenStep={handleOpenStep}
            onOpenLogin={handleOpenLogin}
            onOpenRegister={handleOpenRegister}
          />
        )}
        {tab === "profile"  && <ProfileView />}
        {tab === "coaching" && (
          // Valmennus-osio — tulossa myöhemmin
          <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl">📘</span>
            </div>
            <p className="font-semibold text-foreground text-base">Valmennus tulossa pian</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Tässä osiossa löydät ohjatut harjoitukset työnhakuun.
            </p>
          </div>
        )}
      </main>
      {/* Alanavigaatio — kiinteä ruudun alareunassa */}
      <BottomNav active={tab} onChange={handleTabChange} />
    </div>
  );
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Shell />
    </QueryClientProvider>
  );
}
export default App;