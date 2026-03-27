import { Search } from "lucide-react";
const Hero = () => {
  return (
    <div className="border-[3px] border-[#1A1A1A] rounded-md shadow-[4px_4px_0px_0px_#1A1A1A] bg-gradient-to-b from-[#7A988B] to-[#D5D2BB] p-6 md:p-10 relative overflow-hidden md:w-[80%] md:mx-auto">
      <h1 className="font-black text-[#1A1A1A] text-[22px] md:text-[32px] md:tracking-tight leading-tight pr-4">
        Explore the Digital Logs
      </h1>
      <p className="text-[#1A1A1A]/90 font-medium text-sm md:text-base mt-4 leading-relaxed tracking-wide md:max-w-[85%]">
        Search for logs on high-level engineering, quiet coding sessions, and
        finding peace in code.
      </p>

      <div className="mt-5 md:mt-6 flex items-center bg-[#FAF8F5] border-[2px] border-[#1A1A1A] rounded-md px-3 py-2 shadow-sm md:w-[90%]">
        <Search className="w-4 h-4 text-[#1A1A1A]" strokeWidth={2.5} />
        <div className="ml-2 text-sm w-full text-[#1A1A1A]/40 font-bold tracking-wide">
          Search the logs...
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase w-full">
        <span className="text-[#1A1A1A]/60 tracking-widest text-[10px] shrink-0 font-black">
          POPULAR:
        </span>
        <div className="flex flex-wrap gap-2">
          <span className="bg-[#f0aa8a] border-[2px] border-[#1A1A1A] rounded text-[9px] font-black px-2 py-[2px] tracking-wider shadow-sm">
            GEN AI
          </span>
          <span className="bg-white border-[2px] border-[#1A1A1A] rounded text-[9px] font-black px-2 py-[2px] tracking-wider shadow-sm">
            WEB DEVELOPMENT
          </span>
          <span className="bg-white border-[2px] border-[#1A1A1A] rounded text-[9px] font-black px-2 py-[2px] tracking-wider shadow-sm">
            INTROVERT LIFE
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
