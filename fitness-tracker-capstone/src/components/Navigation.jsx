import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-black text-cyan-400 p-4 flex justify-between items-center border-b border-cyan-600">
      <h1 className="text-xl font-bold tracking-widest">CyberFit Tracker</h1>
      <div className="space-x-4">
        {[
          { to: "/", label: "Home", icon: "🏠" },
          { to: "/exercises", label: "Exercises", icon: "🏋️" },
          { to: "/nutrition", label: "Nutrition", icon: "🍎" },
          { to: "/tracker", label: "Tracker", icon: "📊" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`hover:text-pink-500 transition ${
              location.pathname === link.to ? "text-pink-400" : ""
            }`}
          >
            <span className="mr-1">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
