import { useState } from "react";

interface LoginViewProps {
  onBack: () => void;
}

export function LoginView({ onBack }: LoginViewProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        console.log("Käyttäjänimi:", username);
        console.log("Salasana:", password);
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