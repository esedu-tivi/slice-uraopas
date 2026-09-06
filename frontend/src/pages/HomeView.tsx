
//HomeView.tsx — Kotinäkymä (Uravalmennus)

import { Check, Lock, Star } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { ProgressBar } from "../components/ProgressBar";
import { courseSteps, currentUser } from "../data/stepData";

interface HomeViewProps {
  onOpenStep: (stepId: number) => void; // Avataan vaihe kun käyttäjä klikkaa
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export function HomeView({ onOpenStep, onOpenLogin, onOpenRegister }: HomeViewProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Yläpalkki */}
      <Navbar
        title="Uravalmennus"
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
      />

      {/* Edistymispalkki */}
      <div className="mt-2 mb-6">
        <ProgressBar
          current={currentUser.completedSteps}
          total={currentUser.totalSteps}
        />
      </div>

      {/* Vaihelista — jokainen vaihe omana painikkeena */}
      <div className="px-5 space-y-3">
        {courseSteps.map((step) => {
          // Suoritettu vaihe — syaani checkmarkilla
          if (step.completed) {
            return (
              <button
                key={step.id}
                onClick={() => onOpenStep(step.id)}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wider hover:brightness-105 active:scale-[0.98] transition-all duration-150"
              >
                <Check size={16} strokeWidth={2.5} />
                {step.title}
              </button>
            );
          }

          // ★ Aktiivinen vaihe — seuraavaksi vuorossa, syaani tähtikuviolla
          if (step.active) {
            return (
              <button
                key={step.id}
                onClick={() => onOpenStep(step.id)}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wider hover:brightness-105 active:scale-[0.98] transition-all duration-150"
              >
                <Star size={16} strokeWidth={2} />
                {step.title}
              </button>
            );
          }

          // Lukittu vaihe — tumma, harmaa teksti, ei voi klikata
          return (
            <button
              key={step.id}
              disabled
              className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-card border border-border text-muted-foreground font-bold text-sm tracking-wider cursor-not-allowed opacity-60"
            >
              <Lock size={14} strokeWidth={2} />
              {step.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}