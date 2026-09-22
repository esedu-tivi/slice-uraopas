// StepOneView.tsx — Vaiheen 1 näkymä
// Kaksi vaihetta: intro (video + tehtävä-nappi) ja itse tehtävä (tekstikenttä)


import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { currentUser, stepOneContent } from "@/data/stepData";
import type { UserProgress } from "@/data/stepData";

interface StepOneViewProps {
        onBack: () => void; // Palataan takaisin kotinäkymään
        userName: string | null;
        userProgress: UserProgress | null;
        onProgressUpdate: (progress: UserProgress) => void;
}

export function StepOneView({ onBack, userName, userProgress, onProgressUpdate }: StepOneViewProps) {
        const [answer, setAnswer] = useState("");            // Käyttäjän kirjoittama vastaus
        // Are tasks done/saved
        const [taskOneSaved, setOneSaved] = useState(false);
        const [taskTwoSaved, setTwoSaved] = useState(false);

        useEffect(() => {
                // Goes through user saved progress
                if ( userProgress !== null ) {
                        if ( userProgress.stepOne.taskOne.answer !== null ) { setOneSaved(true), setAnswer(userProgress.stepOne.taskOne.answer) }
                        if ( userProgress.stepOne.taskTwo.done ) { setTwoSaved(true) }
                }     
        }, [userProgress])
        

        // Save handling
        async function savingStep(taskNumber: 1 | 2) {
                if ( userProgress === null ) {
                        window.alert("Et ole kirjautunut. Rekisteröidy ja/tai kirjaudu sisään tallentaaksesi vastauksia.")
                        return
                }
                if ( taskNumber === 1 && answer === "" ) {
                        window.alert("Tekstikenttä tyhjä.")
                        return
                }

                const answerOne = answer === "" ? null : answer
                
                const taskOneDone = taskNumber === 1 || taskOneSaved;
                const taskTwoDone = taskNumber === 2 || taskTwoSaved;

                try {
                        const response = await fetch(
                                "http://localhost:5000/api/auth/progress/stepOne",
                                {
                                        method: "PATCH",
                                        headers: {
                                                "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                                userName: userName,
                                                stepOne: {
                                                        done: taskOneDone && taskTwoDone,
                                                        taskOne: {
                                                                done: taskOneDone,
                                                                answer: answerOne
                                                        },
                                                        taskTwo: {
                                                                done: taskTwoDone
                                                        }
                                                }
                                        }),
                                }
                        );

                        const data = await response.json();

                        if (!response.ok) {
                                throw new Error(data.error ?? `HTTP ${response.status}`);
                        }

                        onProgressUpdate(data.progress);

                        if (taskNumber === 1) {
                                setOneSaved(true);
                        } else {
                                setTwoSaved(true);
                        }

                } catch (error) {
                        console.error("Saving failed:", error);
                }
        }

        return (
                <div className="min-h-screen bg-background flex flex-col">
                        {/* Yläpalkki */}
                        <div className="px-5 pt-5 pb-2 flex items-center justify-between">
                                <button
                                        onClick={onBack}
                                        className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors"
                                        >
                                                <ArrowLeft size={16} />
                                        Takaisin
                                </button>
                                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg tracking-wide">
                                        SLICE.FI
                                </div>
                        </div>

                        <div className="px-5 space-y-5 pb-8" style={{ whiteSpace: "pre-line" }}>
                                {/* Vaiheen numero + pääotsikko + kuvaus */}
                                <div>
                                        <p className="text-xs text-muted-foreground mb-1">
                                                Vaihe {stepOneContent.stepNumber} / {currentUser.totalSteps}
                                        </p>
                                        <h1 className="text-2xl font-bold text-foreground">{stepOneContent.title}</h1>
                                </div>
                                <p className="m-2">{stepOneContent.description}</p>

                                {/* Task 1/2 */}
                                <div className="px-5 pt-10 pb-8 space-y-4">
                                        <div>
                                                <h2 className="text-xl font-bold text-foreground">
                                                {stepOneContent.task1.taskTitle}
                                                </h2>
                                        </div>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                        {stepOneContent.task1.taskMaterial}
                                        </p>
                                        <p>{stepOneContent.task1.taskQuestion}</p>

                                        {/* If saved: show in reading view */}
                                        {taskOneSaved ? (
                                        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
                                                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                                {answer}
                                                </p>
                                                <div className="flex items-center gap-1.5 mt-3">
                                                        <span className="text-emerald-400 text-base">✓</span>
                                                        <span className="text-xs font-medium text-emerald-400">Tallennettu!</span>
                                                        {/* Make changes button */}
                                                        <button
                                                                onClick={() => setOneSaved(false)}
                                                                className="ml-auto text-xs text-muted-foreground underline"
                                                                >
                                                                Muokkaa
                                                        </button>
                                                </div>
                                        </div>
                                        ) : (
                                        /* Text area for the answer */
                                        <textarea
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}
                                                placeholder={stepOneContent.placeholder}
                                                rows={6}
                                                className="w-full bg-card border border-border rounded-2xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:border-primary/50 transition-colors"
                                        />
                                        )}
                                        <button
                                                onClick={() => savingStep(1)}
                                                disabled={taskOneSaved}
                                                className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                {taskOneSaved ? "Valmis ✓" : "TALLENNA"}
                                        </button>
                                </div>

                                {/* Task 2/2 */}
                                <div className="px-5 pt-10 pb-8 space-y-4">
                                        <div>
                                                <h2 className="text-xl font-bold text-foreground">
                                                {stepOneContent.task2.taskTitle}
                                                </h2>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                        {stepOneContent.task2.taskMaterial}
                                        </p>
                                        <p>{stepOneContent.task2.taskQuestion}</p>
                                        <button
                                                onClick={() => savingStep(2)}
                                                disabled={taskTwoSaved}
                                                className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                {taskTwoSaved ? "Valmis ✓" : "TALLENNA"}
                                        </button>
                                </div>        

                                {/* Return button */}
                                <div className="m-10">
                                        <button
                                                onClick={onBack}
                                                className="py-2 px-2 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wider hover:brightness-105 active:scale-[0.98] transition-all duration-150"
                                                >
                                                Palaa etusivulle
                                        </button>
                                </div>
                        
                        </div>
                </div>
        );
}