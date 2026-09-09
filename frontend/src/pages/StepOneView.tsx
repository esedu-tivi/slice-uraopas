
// StepOneView.tsx — Vaiheen 1 näkymä
// Kaksi vaihetta: intro (video + tehtävä-nappi) ja itse tehtävä (tekstikenttä)


import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { currentUser, stepOneContent } from "@/data/stepData";

interface StepOneViewProps {
  onBack: () => void; // Palataan takaisin kotinäkymään
}

export function StepOneView({ onBack }: StepOneViewProps) {
  const [answer, setAnswer] = useState("");            // Käyttäjän kirjoittama vastaus
  const [saved, setSaved] = useState(false);           // Onko vastaus tallennettu

  // Tallennetaan vastaus (myöhemmin voidaan lähettää backendiin)
  function handleSave() {
    if (!answer.trim()) return;
    setSaved(true);
  }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Yläpalkki — takaisin-nappi + SLICE.FI */}
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

                {/* Tehtävän 1/2 */}
                <div className="px-5 pt-10 pb-8 space-y-4">
                    {/* Vaiheen numero ja kysymys */}
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                        {stepOneContent.task1.taskTitle}
                        </h2>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {stepOneContent.task1.taskMaterial}
                    </p>
                    <p>Tehtävät</p>
                    <p>{stepOneContent.task1.taskQuestion}</p>

                    {/* Jos tallennettu: näytetään vastaus lukutilassa */}
                    {saved ? (
                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {answer}
                        </p>
                        <div className="flex items-center gap-1.5 mt-3">
                            <span className="text-emerald-400 text-base">✓</span>
                            <span className="text-xs font-medium text-emerald-400">Tallennettu!</span>
                            {/* Muokkausnappi */}
                            <button
                            onClick={() => setSaved(false)}
                            className="ml-auto text-xs text-muted-foreground underline"
                            >
                            Muokkaa
                            </button>
                        </div>
                    </div>
                    ) : (
                        /* Tekstikenttä vastaukselle */
                        <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder={stepOneContent.task1.placeholder}
                        rows={6}
                        className="w-full bg-card border border-border rounded-2xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:border-primary/50 transition-colors"
                        />
                    )}

                    {/* Tallenna tai palaa kotiin */}
                    <button
                        onClick={saved ? onBack : handleSave}
                        disabled={!saved && !answer.trim()}
                        className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {saved ? "Valmis — palaa takaisin" : "TALLENNA"}
                    </button>
                </div>

                {/* Tehtävän 2/2 */}
                <div className="px-5 pt-10 pb-8 space-y-4">
                    {/* Vaiheen numero ja kysymys */}
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                        {stepOneContent.task2.taskTitle}
                        </h2>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {stepOneContent.task2.taskMaterial}
                    </p>
                    <p>Tehtävät</p>
                    <p>{stepOneContent.task2.taskQuestion}</p>
                    <button
                        onClick={saved ? onBack : handleSave}
                        disabled={!saved && !answer.trim()}
                        className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {saved ? "Valmis — palaa takaisin" : "TALLENNA"}
                    </button>
                <div/>

                {/* Takaisin etusivulle nappi */}
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
    </div>
  );
}