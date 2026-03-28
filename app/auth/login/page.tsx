"use client";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Mail,
  Key,
  Lock,
  Zap,
  ShieldCheck,
  TreeDeciduous,
  ArrowRight,
  FolderLock,
} from "lucide-react";
import { createUserInDb } from "@/app/lib/actions";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  const handleSignUp = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (!error && data.user) {
      await createUserInDb(data.user.id!, data.user.email!);
      alert("Check your email for confirmation!");
    } else {
      setError(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col font-sans selection:bg-[#1B331A] selection:text-white">
      {/* Header */}
      <header className="py-6 flex items-center justify-center border-b-[2px] border-dashed border-[#1A1A1A]/20">
        <div className="flex items-center gap-2">
          <FolderLock className="w-5 h-5 text-[#1B331A]" />
          <h1 className="text-[#1A1A1A] font-extrabold uppercase tracking-[0.2em] text-sm">
            THEINTROVERTDEV
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* Background Decorative Element */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 opacity-10 pointer-events-none">
          <TreeDeciduous className="w-64 h-64 text-[#1B331A]" />
        </div>

        {/* Transitioning Content Div */}
        <div className="w-full max-w-[450px]">
          {/* Tabs Container */}
          <div className="flex w-full mb-[-2px] relative z-10">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-2 border-[#1A1A1A] transition-colors ${
                tab === "login"
                  ? "bg-[#D9D9D9] text-[#1A1A1A] border-b-[#D9D9D9]"
                  : "bg-[#F8F5F0] text-[#1A1A1A]/40 hover:bg-[#F0EEE9]"
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-2 border-l-0 border-[#1A1A1A] transition-colors ${
                tab === "signup"
                  ? "bg-[#D9D9D9] text-[#1A1A1A] border-b-[#D9D9D9]"
                  : "bg-[#F8F5F0] text-[#1A1A1A]/40 hover:bg-[#F0EEE9]"
              }`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          {/* Card Auth Container */}
          <div className="bg-white border-2 border-[#1A1A1A] p-8 md:p-12 shadow-[12px_12px_0px_rgba(26,26,26,0.1)] flex flex-col items-center">
            {/* Round Icon */}
            <div className="w-16 h-16 rounded-full bg-[#1B331A] border-4 border-[#F8F5F0] shadow-[0_0_0_2px_#1A1A1A] flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-white stroke-[2.5]" />
            </div>

            {/* Title Section */}
            <div className="text-center mb-10">
              <h2 className="text-[#1A1A1A] text-2xl font-black uppercase tracking-tight mb-1">
                {tab === "login"
                  ? "Secure The Burrow"
                  : "Initialize Root Access"}
              </h2>
              <p className="text-[#1A1A1A]/60 text-[10px] uppercase font-bold tracking-[0.3em]">
                ADMINISTRATOR GATEWAY
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="w-full bg-red-50 border-2 border-red-500 p-3 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <p className="text-red-600 text-[10px] font-bold uppercase">
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="w-full space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest block">
                  EMAIL ADDRESS
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1A1A1A]/30 group-focus-within:text-[#1B331A] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="dev@theburrow.forest"
                    className="w-full bg-white border-2 border-[#1A1A1A] py-3.5 pl-11 pr-4 text-xs font-medium focus:ring-0 focus:outline-none focus:bg-[#F8F5F0]/50 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest block">
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    className="text-[9px] font-bold text-[#1A1A1A]/40 hover:text-[#1B331A] uppercase tracking-tighter transition-colors"
                  >
                    FORGOT ACCESS KEY?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1A1A1A]/30 group-focus-within:text-[#1B331A] transition-colors">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white border-2 border-[#1A1A1A] py-3.5 pl-11 pr-4 text-xs font-medium focus:ring-0 focus:outline-none focus:bg-[#F8F5F0]/50 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Action Button */}
              <Link href="/create">
                <button
                  type="button"
                  onClick={tab === "login" ? handleLogin : handleSignUp}
                  disabled={isLoading}
                  className="w-full bg-[#1B331A] text-white py-4 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] transition-all hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading
                    ? "PROCESSING..."
                    : tab === "login"
                      ? "SEED ACTIVATION"
                      : "INITIALIZE ENTITY"}
                  {!isLoading && (
                    <div className="relative">
                      <Zap className="w-3.5 h-3.5 fill-white" />
                    </div>
                  )}
                </button>
              </Link>
            </form>

            {/* Footer Form Link */}
            <div className="mt-8 pt-8 border-t border-dashed border-[#1A1A1A]/20 w-full text-center">
              <p className="text-[#1A1A1A]/50 text-[10px] font-bold uppercase tracking-tight">
                {tab === "login" ? "First time here?" : "Already established?"}{" "}
                <button
                  type="button"
                  onClick={() => setTab(tab === "login" ? "signup" : "login")}
                  className="text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 hover:text-[#1B331A] hover:border-[#1B331A] transition-all cursor-pointer"
                >
                  {tab === "login"
                    ? "Establish Burrow Roots"
                    : "Return to Surface"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Accessories */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-transparent border-2 border-[#1A1A1A]/10 rounded-full text-[9px] font-bold text-[#1A1A1A]/40 uppercase">
              <ShieldCheck className="w-3 h-3" />
              ENCRYPTED FOREST
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-transparent border-2 border-[#1A1A1A]/10 rounded-full text-[9px] font-bold text-[#1A1A1A]/40 uppercase">
              <Zap className="w-3 h-3" />
              ISOLATED CORE
            </div>
          </div>

          <div className="relative group">
            <div className="p-3 bg-white border-2 border-[#1A1A1A]/10 rounded-xl group-hover:border-[#1B331A]/30 transition-colors">
              <TreeDeciduous className="w-8 h-8 text-[#1A1A1A]/10 group-hover:text-[#1B331A]/30 transition-all" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border-2 border-[#1A1A1A]/10 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-[#1B331A]/40 rounded-full" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Bottom */}
      <Footer />
    </div>
  );
}
