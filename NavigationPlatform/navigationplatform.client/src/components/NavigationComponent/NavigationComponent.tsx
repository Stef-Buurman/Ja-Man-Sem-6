import { useNavigate } from "react-router-dom";

export const NavigationComponent = ({ activeTab }: { activeTab: "route" | "werkplek" }) => {
  const navigator = useNavigate();
  return (
    <div className="w-[300px] mx-auto flex rounded-full bg-[#00495F]/15 my-6">
      <button
        onClick={() => {
          navigator("/");
        }}
        className={`flex-1 py-2 text-[13px] font-semibold transition rounded-full ${
          activeTab === "route" ? "bg-[#00495F] text-white" : "text-[#00495F]"
        }`}
      >
        Route
      </button>

      <button
        onClick={() => {
          console.log("Navigating to heatmap...");
          navigator("/heatmap");
        }}
        className={`flex-1 py-2 text-[13px] font-semibold transition rounded-full ${
          activeTab === "werkplek" ? "bg-[#00495F] text-white" : "text-[#00495F]"
        }`}
      >
        Werkplek
      </button>
    </div>
  );
};
