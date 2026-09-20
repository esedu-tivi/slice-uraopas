
// ProfileView.tsx — Profiilisivu
// Näyttää käyttäjän tiedot ja ladattavat materiaalit


import { useEffect, useState } from "react";
import { Download, FileText, Check } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { materials } from "../data/stepData";

interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  age: number;
  field: string;
}

interface ProfileViewProps {
  loggedInUser: string | null;
  loggedInUserId: string | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
}


export function ProfileView({ loggedInUser, loggedInUserId, onOpenLogin, onOpenRegister, onLogout, }: ProfileViewProps) {

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {

    async function fetchUserProfile() {
      if (!loggedInUserId) {
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/users/${loggedInUserId}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Käyttäjätietojen hakeminen epäonnistui:", data);
        return;
      }

      setUserProfile(data);
    }

    fetchUserProfile();
  }, [loggedInUserId]);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Yläpalkki */}
      <Navbar 
        title="Oma profiili"
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        loggedInUser={loggedInUser}
        onLogout={onLogout}
      />

      <div className="px-5 mt-2 space-y-6">
        {/* Profiilikortti — käyttäjän avatar, nimi ja titteli */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-4 mb-4">
            {/* Pyöreä avatar kirjaimella */}
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
              {userProfile ? userProfile.firstName.charAt(0).toUpperCase() : ""}
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground leading-tight">
                {userProfile
                  ? `${userProfile.firstName} ${userProfile.lastName}`
                  : ""}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {userProfile ? userProfile.field : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Materiaalit-osio — lista dokumenteista */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3">Materiaalit</h3>
          <div className="space-y-3">
            {materials.map((mat) => {
              const done = mat.status === "valmis";
              return (
                <div
                  key={mat.id}
                  className="bg-card border border-border rounded-2xl px-4 py-3.5 flex items-center gap-3"
                >
                  {/* Tila-ikoni: syaani checkmark (valmis) tai harmaa paperi (kesken) */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      done
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <Check size={16} strokeWidth={2.5} />
                    ) : (
                      <FileText size={15} />
                    )}
                  </div>

                  {/* Materiaalin nimi ja tila */}
                  <div className="flex-1">
                    <p className={`text-sm font-semibold leading-tight ${done ? "text-foreground" : "text-muted-foreground"}`}>
                      {mat.name}
                    </p>
                    <p className={`text-xs mt-0.5 ${done ? "text-primary" : "text-muted-foreground"}`}>
                      {done ? "Valmis" : "Kesken"}
                    </p>
                  </div>

                  {/* Latausnäppäin — näkyy vain valmiille materiaaleille */}
                  {done && (
                    <button className="text-primary hover:brightness-110 transition-all p-1">
                      <Download size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}