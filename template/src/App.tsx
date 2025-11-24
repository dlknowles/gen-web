import { Home } from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <h1 className="text-xl font-semibold tracking-tight">
            {{projectName}}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <Home />
      </main>
    </div>
  );
}
