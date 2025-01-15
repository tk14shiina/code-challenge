import { useState, useRef, useEffect } from "react";
import Token from "../types/Token";

export const useDropdown = (
  buttonId: string,
  setToken: React.Dispatch<React.SetStateAction<Token>>
) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (token: Token) => {
    setToken((token));
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !document.getElementById(buttonId)?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return {
    toggleDropdown,
    handleSelect,
    dropdownRef,
    isDropdownOpen,
  };
};
