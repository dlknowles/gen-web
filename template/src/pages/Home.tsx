import { Button } from "../components/Button";
import { useToggle } from "../hooks/useToggle";

export function Home() {
  const [on, toggle] = useToggle(false);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium">Home</h2>
      <p className="text-sm text-slate-700">
        Minimal React + TypeScript + Tailwind starter. Start building from here.
      </p>

      <div className="flex items-center gap-3">
        <Button onClick={toggle}>
          Toggle state
        </Button>
        <span className="text-sm text-slate-600">
          State: <span className="font-mono">{on ? "ON" : "OFF"}</span>
        </span>
      </div>
    </section>
  );
}
