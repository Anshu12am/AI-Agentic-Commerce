import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">

      <div className="mx-auto flex w-full max-w-[1480px] flex-1 flex-col px-3 py-4 md:px-6 lg:px-8">
        <Navbar />

        <main className="flex-1 pt-5">
          {children}
        </main>
      </div>

      <Footer />

    </div>
  );
}