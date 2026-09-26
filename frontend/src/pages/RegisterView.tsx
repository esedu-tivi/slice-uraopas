import { useState } from "react";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface RegisterViewProps {
  onBack: () => void;
  onOpenLogin: () => void;
  onOpenHome: () => void;
}

export function RegisterView({ onBack, onOpenLogin, onOpenHome }: RegisterViewProps) {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [field, setField] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const [registrationComplete, setRegistrationComplete] = useState(false);


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setFormError("");

        // Onko kaikki kentät täytetty?
        if (
            !username.trim() ||
            !firstName.trim() ||
            !lastName.trim() ||
            !age ||
            !password ||
            !confirmPassword ||
            !field.trim()
        ) {
            setFormError("Täytäthän kaikki kentät");
            return;
        }

        setFormError("");
        setPasswordError("");

        // Onko ikä 1–100?
        const ageNumber = Number(age);

        if (ageNumber < 1 || ageNumber > 100) {
            setFormError("Iän tulee olla 1–100 vuotta.");
            return;
        }

        //salasanan muodon validointi
        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[0-9]/.test(password)
        ) {
            setPasswordError(
                "Salasanan tulee olla vähintään 8 merkkiä pitkä ja sisältää vähintään yksi iso kirjain sekä yksi numero."
            );
            return;
        }

        //Täsmäävätkö salasanat?
        if (password !== confirmPassword) {
            setPasswordError("Salasanat eivät täsmää");
            return;
        }

        setPasswordError("");

        // Lähetetään rekisteröitymistiedot backendin API:lle
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    firstName,
                    lastName,
                    age: ageNumber,
                    password,
                    field,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setFormError(data.error || "Rekisteröityminen epäonnistui.");
                return;
            }

            setRegistrationComplete(true);

        } catch (error) {
            console.error("Rekisteröityminen epäonnistui:", error);
            setFormError("Palvelimeen ei saatu yhteyttä. Yritä myöhemmin uudelleen.");
        }

    }

    if (registrationComplete) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
            <h1 className="text-2xl font-bold text-foreground">
                Rekisteröityminen
            </h1>

            <p className="mt-6 text-sm text-emerald-400">
                Rekisteröityminen onnistui!
            </p>

            <div className="flex flex-col gap-4 w-full max-w-sm mt-8">
                <button
                onClick={onOpenLogin}
                className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:brightness-105 active:scale-[0.98] transition-all duration-150"
                >
                Kirjaudu sisään
                </button>

                <button
                onClick={onOpenHome}
                className="w-full text-primary font-medium"
                >
                Etusivulle
                </button>
            </div>
            </div>
        );
        }

    return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
        <h1 className="text-2xl font-bold text-foreground">
            Rekisteröityminen
        </h1>

        {formError && (
            <p className="mt-4 text-sm text-red-500">
                {formError}
            </p>
        )}

        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mt-6"
        >

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

            {/* Etunimi-kenttä */}
            <div className="mt-4">
                <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Etunimi
                </label>

                <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
                />
            </div>

            {/* Sukunimi-kenttä */}
            <div className="mt-4">
                <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Sukunimi
                </label>

                <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
                />
            </div>

            {/* Ikä-kenttä */}
            <div className="mt-4">
                <label
                    htmlFor="age"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Ikä
                </label>

                <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
                />
            </div>

            {/* Salasana-kenttä */}
            <div className="mt-4">
                <div className="flex items-center gap-1 mb-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-foreground"
                    >
                        Salasana
                    </label>

                    <Tooltip title="Salasanan tulee olla vähintään 8 merkkiä pitkä ja sisältää vähintään yksi iso kirjain sekä yksi numero.">
                        <InfoOutlinedIcon
                            className="text-muted-foreground cursor-help"
                            fontSize="small"
                        />
                    </Tooltip>
                </div>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setPasswordError("");
                    }}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
                />
            </div>

            {/* Vahvista salasana -kenttä */}
            <div className="mt-4">
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Vahvista salasana
                </label>

                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setPasswordError("");
                    }}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
                />
            </div>

            {/* Jos annetut salasanat eivät täsmää */}
            {passwordError && (
                <p className="mt-2 text-sm text-red-500">
                    {passwordError}
                </p>
            )}

            {/* Ala-kenttä */}
            <div className="mt-4">
                <label
                    htmlFor="field"
                    className="block text-sm font-medium text-foreground mb-2"
                >
                    Ala
                </label>

                <input
                    id="field"
                    type="text"
                    value={field}
                    onChange={(event) => setField(event.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground"
                />
            </div>
            
            {/* Rekisteröidy-nappi */}
            <button
                type="submit"
                className="w-full mt-6 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:brightness-105 active:scale-[0.98] transition-all duration-150"
            >
                Rekisteröidy
            </button>
        </form>

        {/* Takaisin-nappi */}
        <button
            onClick={onBack}
            className="mt-6 text-primary font-medium"
        >
            Takaisin
        </button>
    </div>
  );
}