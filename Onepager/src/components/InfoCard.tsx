import logo_white from "../assets/logo/jaman_white.svg";
import logo_brown from "../assets/logo/jaman_brown.svg";

export interface InfoCardProps {
  title: string;
  content: string;
  quote?: string;
  literature?: string;
  variant: "blue" | "dark" | "brown" | "red";
}

export default function InfoCard({
  title,
  content,
  quote,
  literature,
  variant = "blue",
}: InfoCardProps) {
  const variantStyles: Record<InfoCardProps["variant"], string> = {
    blue: "bg-blue-200 text-gray-800",
    dark: "bg-[#3b2626] text-white",
    brown: "bg-[#4b2e2e] text-white",
    red: "bg-orange-500 text-white",
  };

  const variantLabels: Record<InfoCardProps["variant"], string> = {
    blue: "✨ Activities",
    dark: "👥 People",
    brown: "🧠 Technologies",
    red: "🌍 Context",
  };

  const variantLabelStyling: Record<InfoCardProps["variant"], string> = {
    dark: "bg-blue-200 text-gray-800",
    brown: "bg-orange-500 text-white",
    red: "bg-[#4b2e2e] text-white",
    blue: "bg-[#4b2e2e] text-white",
  };

  const variantLogos: Record<InfoCardProps["variant"], string> = {
    blue: logo_brown,
    dark: logo_white,
    brown: logo_white,
    red: logo_white,
  };

  return (
    <div
      className={`rounded-2xl p-6 shadow-md flex flex-col justify-between ${variantStyles[variant]} hover:scale-[1.02] transition-transform duration-200`}
    >
      {/* Top badge */}
      <div className="flex justify-end mb-4">
        <span
          className={
            variantLabelStyling[variant] + " text-sm px-3 py-1 rounded-full"
          }
        >
          {variantLabels[variant]}
        </span>
      </div>

      {/* Main content */}
      <div>
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-sm mb-4 leading-relaxed">{content}</p>

        {/* Quote */}
        {quote && (
          <p className="text-xs italic border-t border-white/30 pt-3">
            {quote}
          </p>
        )}
      </div>

      {/* Bottom section with literature and logo */}
      {literature && (
        <div className="mt-2 border-t border-white/30 pt-3 flex justify-between items-center">
          <p className="text-[10px] opacity-80 leading-snug">{literature}</p>
          <img
            src={variantLogos[variant]}
            alt={variantLabels[variant]}
            className="w-8 h-6 object-contain opacity-80"
          />
        </div>
      )}
    </div>
  );
}
