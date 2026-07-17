import { Box } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 font-bold text-lg">
          <img 
            src="/logo.jpeg" 
            alt="Audit Swarm Logo" 
            className="h-8 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('navbar-fallback-text');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <span id="navbar-fallback-text" className="hidden">On-Chain Audit Swarm</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-gray-500 font-medium">
          <a href="#" className="hover:text-black">Pricing</a>
          <a href="#" className="hover:text-black">Blog</a>
          <a href="#" className="hover:text-black">Contact</a>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm font-medium">
        <a href="#" className="hover:text-black">Login</a>
        <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-md">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
