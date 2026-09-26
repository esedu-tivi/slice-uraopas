import { useState } from "react";
import type { UserProgress } from "@/data/stepData";

interface LoginViewProps {
  onBack: () => void;
  onLogin: (username: string, userId: string, progress: UserProgress) => void;
}

export function LoginView({ onBack, onLogin }: LoginViewProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormError("");

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data: {
                userId: string;
                progress: UserProgress;
                error?: string;
        } = await response.json();
        

        if (!response.ok) {
            setFormError(data.error || "Kirjautuminen epäonnistui.");
            return;
        }

        onLogin(username, data.userId, data.progress);

    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
        <h1 className="text-2xl font-bold text-foreground">
            Kirjaudu
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6">
            {/* Käyttäjänimi-kenttä */}
            <div>
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Käyttäjänimi
                </label>

                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
                />
            </div>

            {/* Salasana-kenttä */}
            <div className="mt-4">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Salasana
                </label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
                />
            </div>

            {/* Kirjaudu-nappi */}
            <button
                type="submit"
                className="w-full mt-6 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:brightness-105 active:scale-[0.98] transition-all duration-150"
            >
                Kirjaudu
            </button>

            {formError && (
                <p className="mt-4 text-sm text-red-500">
                    {formError}
                </p>
            )}
        </form>

        <button
            onClick={onBack}
            className="mt-6 text-primary font-medium"
        >
            Takaisin
        </button>
        </div>
    );
}