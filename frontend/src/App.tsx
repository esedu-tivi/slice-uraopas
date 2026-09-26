// App.tsx — Pääsovellus
// Hallitsee navigointia eri näkymien välillä

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomNav } from "@/components/BottomNav";
import { HomeView } from "@/pages/HomeView";
import { ProfileView } from "@/pages/ProfileView";
import { StepOneView } from "@/pages/StepOneView";
import { StepTwoView } from "@/pages/StepTwoView";
import { LoginView } from "@/pages/LoginView";
import { RegisterView } from "@/pages/RegisterView";
import type { TabId } from "@/components/BottomNav";
import type { UserProgress } from "@/data/stepData";

const queryClient = new QueryClient();

// Kaikki mahdolliset näkymät sovelluksessa
type View = "home" | "coaching" | "profile" | "step1" | "step2" | "login" | "register";
function Shell() {
  const [tab, setTab] = useState<TabId>("home");   // Aktiivinen välilehti
  const [view, setView] = useState<View>("home");  // Näytettävä näkymä
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); //Kirjautunut käyttäjä
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null); //Kirjautuneen käyttäjän ID
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Käyttäjä vaihtaa välilehteä navigaatiopalkilta
  function handleTabChange(newTab: TabId) {
    setTab(newTab);
    setView(newTab as View);
  }
  // Käyttäjä avaa vaiheen kotinäkymästä
  function handleOpenStep(stepId: number) {
    if (stepId === 1) setView("step1");
    if (stepId === 2) setView("step2");
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

  //Uloskirjautuminen
  function handleLogout() {


    setLoggedInUser(null);
    setLoggedInUserId(null);
    setProgress(null);
    setView("home");
    setTab("home");
  }

  // Vaihe-näkymät eivät näytä alanavigaatiota
  if (view === "login") {
    return (
      <LoginView
        onBack={handleBack}
        onLogin={(username, userId, progress) => {
          setLoggedInUser(username);
          setLoggedInUserId(userId);
          setProgress(progress)
          setView("home");
          setTab("home");
        }}
      />
    );
  }

  if (view === "register") {
    return (
      <RegisterView
        onBack={handleBack}
        onOpenLogin={() => setView("login")}
        onOpenHome={() => {
          setView("home");
          setTab("home");
        }}
      />
    );
  }
  
  if (view === "step1") {
        return <StepOneView
                onBack={handleBack}
                userName={loggedInUser}
                userProgress={progress}
                onProgressUpdate={setProgress}
                />;
  } else if ( view === "step2" ) {
        return <StepTwoView 
                onBack={handleBack}
                userName={loggedInUser}
                userProgress={progress}
                onProgressUpdate={setProgress}
                />;
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
            loggedInUser={loggedInUser}
            userProgress={progress}
            onLogout={handleLogout}
          />
        )}
        {tab === "profile" && (
          <ProfileView
            loggedInUser={loggedInUser}
            loggedInUserId={loggedInUserId}
            onOpenLogin={handleOpenLogin}
            onOpenRegister={handleOpenRegister}
            onLogout={handleLogout}
          />
        )}

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