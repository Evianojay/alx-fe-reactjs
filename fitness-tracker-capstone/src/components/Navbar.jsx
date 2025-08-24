import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Exercises", path: "/exercises" },
    { name: "Planner", path: "/planner" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-neon-blue px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-neon-blue text-2xl font-bold tracking-wide">
        ⚡ CyberFit
      </Link>
      <div className="flex space-x-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `text-white hover:text-neon-blue transition ${
                isActive ? "text-neon-blue font-semibold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
