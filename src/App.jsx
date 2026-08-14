import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-[#F7F8F6]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Application */}
      <div className="ml-[260px] min-h-screen">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-8">

          <div className="rounded-2xl border border-[#E5EAE7] bg-white p-8">

            <p className="text-sm font-medium text-[#66736F]">
              FINOVA DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#123C35]">
              Your financial future starts here.
            </h1>

            <p className="mt-3 max-w-2xl text-[#66736F]">
              Understand your financial health, explore better decisions,
              and build a stronger financial future with AI-powered guidance.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
}

export default App;