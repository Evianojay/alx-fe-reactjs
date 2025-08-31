// src/components/Navigation.jsx
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/exercises", label: "Exercises", icon: "🏋️" },
  { to: "/nutrition", label: "Nutrition", icon: "🍎" },
  { to: "/tracker", label: "Tracker", icon: "📊" },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-black text-cyan-400 p-4 flex justify-between items-center border-b border-cyan-600" aria-label="Main navigation">
      <Link to="/" className="text-xl font-bold tracking-widest" aria-label="Gym Companion Home">
        Gym Companion
      </Link>

      <div className="space-x-4" role="navigation" aria-hidden={false}>
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                active ? "text-pink-400 font-semibold" : "hover:text-pink-500"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <span aria-hidden>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
