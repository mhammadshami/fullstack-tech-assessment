import { useState } from "react";
import { FiMenu, FiX, FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

/**
 * SidebarLink Interface
 * Defines the structure of a sidebar link.
 */
interface SidebarLink {
  href: string; // The URL to navigate to
  icon: React.ElementType; // The React component for the icon
  label: string; // The text label for the sidebar item
}

/**
 * SidebarProps Interface
 * Defines the props expected by the Sidebar component.
 */
interface SidebarProps {
  sidebarLinks: SidebarLink[]; // Array of sidebar link objects
}

/**
 * Sidebar Component
 * Displays a sidebar with a toggle button and navigational links.
 *
 * @param {SidebarProps} sidebarLinks - Array of links to be displayed in the sidebar.
 * @returns JSX.Element - The sidebar UI.
 */
const Sidebar: React.FC<SidebarProps> = ({ sidebarLinks }) => {
  // State to track whether the sidebar is open or collapsed
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-screen inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:w-64`}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Toggle Button to Expand/Collapse Sidebar */}
          <button
            className="text-white p-4 focus:outline-none hover:bg-indigo-800 transition duration-300 flex items-center justify-center md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FiX size={24} />
          </button>

          {/* Sidebar Navigation Links */}
          <nav className="flex flex-col space-y-2 mt-4">
            {sidebarLinks.map((link) => (
              <SidebarItem key={link.href} {...link} isOpen={true} />
            ))}
          </nav>

          {/* Additional Links (e.g., Logout) */}
          <div className="mt-auto mb-6">
            {/* <SidebarItem
              href="/logout"
              icon={FiLogOut}
              label="Logout"
              isOpen={true}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * SidebarItemProps Interface
 * Extends SidebarLink interface to include isOpen state.
 */
interface SidebarItemProps extends SidebarLink {
  isOpen: boolean; // Determines if the sidebar is expanded or collapsed
}

/**
 * SidebarItem Component
 * Represents a single item in the sidebar.
 *
 * @param {SidebarItemProps} href - The URL to navigate to.
 * @param {SidebarItemProps} icon - The icon component.
 * @param {SidebarItemProps} label - The label text.
 * @param {SidebarItemProps} isOpen - Determines if the label should be displayed.
 * @returns JSX.Element - The sidebar item UI.
 */
const SidebarItem: React.FC<SidebarItemProps> = ({ href, icon: Icon, label, isOpen }) => (
  <a
    href={href}
    className="flex items-center px-4 py-3 hover:bg-indigo-800 transition duration-300 rounded-lg mx-2 group"
  >
    {/* Display Icon */}
    <Icon className="text-white group-hover:text-indigo-200" size={24} />

    {/* Display Label only if sidebar is expanded */}
    {isOpen && (
      <span className="ml-4 text-sm font-medium group-hover:text-indigo-200">
        {label}
      </span>
    )}
  </a>
);

export default Sidebar;