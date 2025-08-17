import { useState } from "react";

import logo from "../../assets/uitifyLogo.svg";

import {
  ChevronLeft,
  ChevronDown,
  Users,
  Target,
  BarChart,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import NavItem from "./NavItem";

function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const MobileMenu = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <img src={logo} className="h-8" alt="Logo" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <ChevronDown
            size={20}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="px-4 pb-4">
          <nav>
            <ul className="grid grid-cols-4 gap-2">
              <NavItem
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                isOpen={true}
                isMobile={true}
              />
              <NavItem
                icon={<Users size={20} />}
                text="Leads"
                active
                isOpen={true}
                isMobile={true}
              />
              <NavItem
                icon={<Target size={20} />}
                text="Opportunities"
                isOpen={true}
                isMobile={true}
              />
              <NavItem
                icon={<BarChart size={20} />}
                text="Reports"
                isOpen={true}
                isMobile={true}
              />
            </ul>
            <div className="mt-4 pt-4 border-t">
              <ul className="grid grid-cols-2 gap-2">
                <NavItem
                  icon={<Settings size={20} />}
                  text="Settings"
                  isOpen={true}
                  isMobile={true}
                />
              </ul>
            </div>
          </nav>
        </div>
      )}
    </div>
  );

  const DesktopMenu = () => (
    <aside
      className={`h-screen bg-white shadow-sm transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center h-20 border-b px-2 mt-4">
          <img src={logo} className={`transition-all duration-300 `} />
        </div>

        <nav className="flex-grow px-4">
          <ul className="space-y-1">
            <NavItem
              icon={<LayoutDashboard />}
              text="Dashboard"
              isOpen={isOpen}
            />
            <NavItem
              icon={<Users size={20} />}
              text="Leads"
              active
              isOpen={isOpen}
            />
            <NavItem
              icon={<Target size={20} />}
              text="Opportunities"
              isOpen={isOpen}
            />
            <NavItem
              icon={<BarChart size={20} />}
              text="Reports"
              isOpen={isOpen}
            />
          </ul>
        </nav>

        <div className="p-4 border-t">
          <NavItem
            icon={<Settings size={20} />}
            text="Settings"
            isOpen={isOpen}
          />
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="
              flex items-center justify-center p-3 mt-2 rounded-lg cursor-pointer
              text-gray-600 hover:bg-gray-100
            "
          >
            <ChevronLeft
              size={20}
              className={`transition-transform duration-300 ${
                isOpen ? "" : "rotate-180"
              }`}
            />
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="lg:hidden">
        <MobileMenu />
      </div>
      <div className="hidden lg:block">
        <DesktopMenu />
      </div>
    </>
  );
}

export default SideMenu;
