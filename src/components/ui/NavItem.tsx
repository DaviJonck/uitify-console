const NavItem = ({
  icon,
  text,
  active,
  isOpen,
  isMobile = false,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  isOpen: boolean;
  isMobile?: boolean;
}) => (
  <li>
    <a
      href="#"
      className={`
        flex items-center p-3 my-1 rounded-lg transition-colors
        ${
          active
            ? "bg-indigo-50 text-indigo-600 font-semibold"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
        }
        ${isMobile ? "flex-col text-center" : ""}
      `}
    >
      {icon}
      <span
        className={`
          overflow-hidden transition-all whitespace-nowrap
          ${isOpen ? (isMobile ? "w-full mt-1" : "w-40 ml-3") : "w-0"}
          ${isMobile ? "text-xs" : ""}
        `}
      >
        {text}
      </span>
    </a>
  </li>
);

export default NavItem;
