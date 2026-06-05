export default function Ticker() {
  const items = [
    "Newtonian Mechanics",
    "Thermodynamics",
    "Electromagnetism",
    "Special Relativity",
    "General Relativity",
    "Quantum Mechanics",
    "Wave-Particle Duality",
    "Schrödinger Equation",
    "Entropy",
    "Black Holes",
    "Standard Model",
    "Higgs Boson",
    "Photon",
    "Maxwell's Equations",
    "Lagrangian",
    "Hamiltonian",
  ];

  const doubled = [...items, ...items];

  return (
    <div
      className="border-y border-[#E0E5F0] py-3 overflow-hidden"
      style={{ background: "rgba(0, 180, 216, 0.04)" }}
    >
      <div className="ticker-track flex items-center gap-0 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="text-xs font-semibold tracking-widest text-[#4A5068] uppercase px-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {item}
            </span>
            <span className="text-[#00B4D8] text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
