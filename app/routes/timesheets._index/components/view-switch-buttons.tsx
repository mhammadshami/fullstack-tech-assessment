
/**
 * ViewSwitchButtons Component
 * 
 * This component allows users to toggle between 'table' and 'calendar' views.
 * 
 * Props:
 * - view: The current active view ("table" | "calendar").
 * - setView: Function to update the current view.
 */
export const ViewSwitchButtons: React.FC<{ view: "table" | "calendar"; setView: (view: "table" | "calendar") => void; }> = ({ view, setView }) => (
  <div className="mb-6 flex justify-center gap-4">
    <button
      className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300 transform ${
        view === "table"
          ? "bg-indigo-600 hover:bg-indigo-700 scale-105"
          : "bg-gray-300 hover:bg-gray-400"
      }`}
      onClick={() => setView("table")}
    >
      Table View
    </button>
    <button
      className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300 transform ${
        view === "calendar"
          ? "bg-indigo-600 hover:bg-indigo-700 scale-105"
          : "bg-gray-300 hover:bg-gray-400"
      }`}
      onClick={() => setView("calendar")}
    >
      Calendar View
    </button>
  </div>
);
