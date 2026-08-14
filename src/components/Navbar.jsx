import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-[76px] items-center justify-between border-b border-[#E5EAE7] bg-white px-8">

      {/* Left */}
      <div>
        <p className="text-sm text-[#66736F]">
          Friday, August 14
        </p>

        <h2 className="mt-0.5 text-xl font-semibold text-[#17211F]">
          Good evening, Akanksha 👋
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <button className="rounded-xl border border-[#E5EAE7] p-2.5 text-[#66736F] transition hover:bg-[#F7F8F6] hover:text-[#123C35]">
          <Search size={19} />
        </button>

        {/* Notification */}
        <button className="relative rounded-xl border border-[#E5EAE7] p-2.5 text-[#66736F] transition hover:bg-[#F7F8F6] hover:text-[#123C35]">
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E57A7A]" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl border border-[#E5EAE7] px-3 py-2 transition hover:bg-[#F7F8F6]">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123C35] text-xs font-semibold text-white">
            AM
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-[#17211F]">
              Akanksha
            </p>

            <p className="text-xs text-[#66736F]">
              Student
            </p>
          </div>

          <ChevronDown size={16} className="text-[#66736F]" />

        </button>

      </div>

    </header>
  );
}

export default Navbar;