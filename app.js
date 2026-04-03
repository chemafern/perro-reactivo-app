import { useEffect, useState } from "react";

const detailedPlan = Array.from({ length: 56 }).map((_, i) => {
  const day = i + 1;
  const week = Math.ceil(day / 7);

  let main = "";

  if (week === 1) main = "Haz 10–15 targets: mano a 5–10 cm de su nariz. Marca y premia cada toque.";
  if (week === 2) main = "Di su nombre: cuando mire → premio. Añade 5 giros 'vamos' caminando.";
  if (week === 3) main = "Persona a 30–50 m: ve → marca 'sí' → premio. No acerques más.";
  if (week === 4) main = "Aparece estímulo: da varios premios seguidos mientras lo mira calmado.";
  if (week === 5) main = "Exterior tranquilo: ve estímulo → 'toca' o 'vamos' → premio.";
  if (week === 6) main = "En movimiento: caminando → ve estímulo → target → premio.";
  if (week === 7) main = "Reduce distancia ligeramente. Si duda o se tensa → aléjate.";
  if (week === 8) main = "Paseo real: máximo 1–2 encuentros. Intervén temprano.";

  return {
    day,
    week,
    warmup: "5 repeticiones nombre → mirada + 5 targets fáciles",
    main,
    easy: "3 targets + 2 giros 'vamos' fáciles",
    close: "Termina con premios fáciles sin exigencia",
  };
});

export default function DogTrainingApp() {
  const [day, setDay] = useState(1);
  const [seconds, setSeconds] = useState(600);
  const [running, setRunning] = useState(false);
  const [evaluations, setEvaluations] = useState({});
  const [recommendation, setRecommendation] = useState("");

  const today = detailedPlan[day - 1];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const format = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const options = [
    { label: "Bien hecho", color: "#2563eb", key: "blue" },
    { label: "Hecho", color: "#16a34a", key: "green" },
    { label: "Con dificultad", color: "#facc15", key: "yellow" },
    { label: "Imposible", color: "#dc2626", key: "red" },
  ];

  const exercises = ["Target", "Nombre/mirada", "Vamos (giro)", "Reacción"];

  const handleEvaluation = (exercise, label) => {
    const updated = { ...evaluations, [exercise]: label };
    setEvaluations(updated);

    const values = Object.values(updated);
    if (values.length < exercises.length) {
      setRecommendation("");
      return;
    }

    const redCount = values.filter((v) => v === "Imposible").length;
    const yellowCount = values.filter((v) => v === "Con dificultad").length;
    const blueCount = values.filter((v) => v === "Bien hecho").length;

    if (redCount >= 1) {
      setRecommendation("Mañana baja dificultad: aumenta distancia, reduce repeticiones y repite el mismo día.");
    } else if (yellowCount >= 2) {
      setRecommendation("Mañana mantén el nivel actual: no avances todavía.");
    } else if (blueCount === exercises.length) {
      setRecommendation("Mañana puedes subir ligeramente la dificultad.");
    } else {
      setRecommendation("Mañana repite el mismo nivel para consolidar.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">Entrenador paso a paso</h1>
      <div className="text-sm mb-3">Día {today.day} · Semana {today.week}</div>

      <div className="flex gap-2 mb-3">
        <button onClick={() => setDay(Math.max(1, day - 1))}>◀</button>
        <button onClick={() => setDay(Math.min(56, day + 1))}>▶</button>
      </div>

      <div className="mb-4">
        <div>⏱ {format(seconds)}</div>
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Pause</button>
      </div>

      <div>
        <h3>Qué hacer (paso a paso)</h3>
        <p><b>0–2 min:</b> {today.warmup}</p>
        <p><b>2–6 min:</b> {today.main}</p>
        <p><b>6–8 min:</b> {today.easy}</p>
        <p><b>8–10 min:</b> {today.close}</p>
      </div>

      <div className="mt-6">
        <h3>Evaluación del día</h3>
        {exercises.map((ex) => (
          <div key={ex} className="mb-3">
            <div className="text-sm font-medium mb-1">{ex}</div>
            <div className="flex gap-2 flex-wrap">
              {options.map((opt) => (
                <button
                  key={opt.label}
                  aria-label={opt.label}
                  onClick={() => handleEvaluation(ex, opt.label)}
                  style={{
                    backgroundColor: opt.color,
                    opacity: evaluations[ex] === opt.label ? 1 : 0.35,
                    border: evaluations[ex] === opt.label ? "3px solid #111" : "1px solid #ccc",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {recommendation && (
        <div className="mt-6" style={{ border: "1px solid #ccc", padding: "12px", borderRadius: "12px" }}>
          <h3>Recomendación para mañana</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

