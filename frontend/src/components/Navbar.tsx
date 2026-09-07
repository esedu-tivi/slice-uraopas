// Navbar.tsx — Yläpalkki
// Näyttää sivun otsikon ja SLICE.FI-merkin

interface NavbarProps {
  title: string; // Sivun otsikko, esim. "Uravalmennus"
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}
export function Navbar({ title, onOpenLogin, onOpenRegister }: NavbarProps) {
  return (
    <header className="px-5 pt-5 pb-3">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          {title}
        </h1>

        <div className="flex flex-col items-end gap-1">

          {/* Kirjautumis- ja rekisteröitymisnapit*/}
          <div className="flex gap-3 text-sm">

            <button
              onClick={onOpenLogin}
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Kirjaudu
            </button>

            <button
              onClick={onOpenRegister}
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Rekisteröidy
            </button>
          </div>

          <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-lg tracking-wide mt-1">
            SLICE.FI
          </div>
        </div>
      </div>
    </header>
    );
}