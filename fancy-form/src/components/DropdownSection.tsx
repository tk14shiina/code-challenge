import { tokens } from "../constants/tokens";
import Token from "../types/Token";
export interface DropDownSectionProps {
  label: "From" | "To";
  toggleDropdown: () => void;
  token: Token;
  dropdownRef: React.RefObject<HTMLDivElement>;
  isDropdownOpen: boolean;
  handleSelect: (token: Token) => void;
  handleAmountChange: (value: string) => void;
  otherToken: Token;
}
export default function DropdownSection({
  toggleDropdown,
  token,
  dropdownRef,
  isDropdownOpen,
  handleSelect,
  handleAmountChange,
  label,
  otherToken,
}: DropDownSectionProps) {
  console.log(
    "tokens",
    tokens,
    tokens.filter((token) => token.currency !== otherToken.currency),
    token,
    otherToken,
    label
  );
  return (
    <div className="bg-gray-700 rounded-xl p-4">
      <div className="flex justify-between mb-2">
        <label className="text-gray-400 text-sm">{label}</label>
        <span className="text-gray-400 text-sm">Balance: {token.balance}</span>
      </div>
      <div className="flex justify-between items-center ml">
        <input
          type="number"
          className="bg-gray-700 text-white px-3 py-2.5 rounded-lg outline-none flex-grow mr-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-1/2"
          placeholder="0.0"
          value={token.amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          style={{ height: "42px" }}
        />
        <div className="relative w-1/2">
          <button
            id={label}
            onClick={toggleDropdown}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-full justify-end"
            type="button"
            style={{ height: "42px" }}
          >
            <div className="inline-flex items-center mr-2">
              {token.currency}
            </div>{" "}
            <img
              src={`src/assets/tokens/${token.currency}.svg`}
              alt={token.currency}
              className="inline-block w-4 h-4 mr-1"
            />
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            ref={dropdownRef}
            id={`dropdown-states-${label}`}
            className={`absolute mt-2 z-20 ${
              isDropdownOpen ? "" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            style={{ maxHeight: "200px", overflowY: "auto", top: "100%" }}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby={`states-button-${label}`}
            >
              {tokens
                .filter((token) => token.currency !== otherToken.currency)
                .map((token) => (
                  <li key={`${token.currency}-${label}`}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white justify-end items-center"
                      onClick={() => handleSelect(token)}
                      style={{
                        border: "none",
                        borderRadius: "0px",
                      }}
                    >
                      <div className="inline-flex items-center mr-2">
                        {token.currency}
                      </div>{" "}
                      <img
                        src={`src/assets/tokens/${token.currency}.svg`}
                        alt={token.currency}
                        className="inline-block w-4 h-4 mr"
                      />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
