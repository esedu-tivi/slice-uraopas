
//HomeView.tsx — Kotinäkymä (Uravalmennus)

import { useEffect, useState } from "react";

import { Check, Lock, Star } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { ProgressBar } from "../components/ProgressBar";
import { courseSteps, type CourseStep } from "../data/stepData";
import { UserProgress } from "@/data/stepData";

interface HomeViewProps {
  onOpenStep: (stepId: number) => void; // Avataan vaihe kun käyttäjä klikkaa
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  loggedInUser: string | null;
  userProgress: UserProgress | null;
  onLogout: () => void;
}

export function HomeView({ onOpenStep, onOpenLogin, onOpenRegister, loggedInUser, userProgress, onLogout, }: HomeViewProps) {

        const [steps, setSteps] = useState<CourseStep[]>(courseSteps);
        const [stepAmount, setStepAmount] = useState(0)

        useEffect(() => {
                
                const temporarySteps = courseSteps.map(step => ({ ...step }));
                let temporaryAmount = 0

                if ( userProgress === null ) {
                        temporarySteps[0].completed = true // false
                        temporarySteps[0].active = false  // true
                        temporarySteps[0].locked = false // false

                        temporarySteps[1].completed = false // false
                        temporarySteps[1].active = true // false
                        temporarySteps[1].locked = false //true

                        temporarySteps[2].completed = false
                        temporarySteps[2].active = false
                        temporarySteps[2].locked = true


                        setStepAmount(temporaryAmount)  
                        setSteps(temporarySteps)
                        return
                }

                temporarySteps[0].locked = false
                temporarySteps[0].active = true

                if ( userProgress.stepOne.done === true ) {
                        temporarySteps[0].completed = true
                        temporarySteps[0].active = false

                        temporarySteps[1].locked = false
                        temporarySteps[1].active = true
                        temporaryAmount++
                }

                if ( userProgress.stepTwo.done === true ) {
                        temporarySteps[1].completed = true
                        temporarySteps[1].active = false

                        temporarySteps[2].locked = false
                        temporarySteps[2].active = true
                        temporaryAmount++
                }
                setStepAmount(temporaryAmount)          
                setSteps(temporarySteps)

                 
        }, [userProgress])

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Yläpalkki */}
      <Navbar
        title="Uravalmennus"
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        loggedInUser={loggedInUser}
        onLogout={onLogout}
      />

      {/* Edistymispalkki */}
      <div className="mt-2 mb-6">
        <ProgressBar
          current={stepAmount}
          total={10}
        />
      </div>

      {/* Vaihelista — jokainen vaihe omana painikkeena */}
      <div className="px-5 space-y-3">
        {steps.map((step) => {
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