import logo_white from "../assets/logo/jaman_white.svg";
import logo_brown from "../assets/logo/jaman_brown.svg";

export interface FieldResearchCardProps {
  key: string;
  title: string;
  content?: string;
  label: string;
  variant: "blue" | "white" | "brown" | "red";
}

export default function FieldResearchCard({
  title,
  content,
  label,
  variant = "blue",
}: FieldResearchCardProps) {
  const variantStyles: Record<FieldResearchCardProps["variant"], string> = {
    blue: "bg-blue-200 text-gray-800",
    white: "bg-[#FDF1E3] text-[#342626]",
    brown: "bg-[#4b2e2e] text-white",
    red: "bg-[#E8492B] text-white",
  };

  const variantLabelStyling: Record<FieldResearchCardProps["variant"], string> =
    {
      white: "bg-blue-200 text-gray-800",
      brown: "bg-orange-500 text-white",
      red: "bg-[#4b2e2e] text-white",
      blue: "bg-[#4b2e2e] text-white",
    };

  const variantLogos: Record<FieldResearchCardProps["variant"], string> = {
    blue: logo_brown,
    white: logo_brown,
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
          {label}
        </span>
      </div>

      {/* Main content */}
      <div>
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-sm mb-4 leading-relaxed">{content}</p>
      </div>

      {/* Bottom section with literature and logo */}
      <div className="mt-2 pt-3 flex justify-end">
        <img
          src={variantLogos[variant]}
          alt={label}
          className="w-8 h-6 object-contain opacity-80"
        />
      </div>
    </div>
  );
}
