import "./App.css";
import { AlertCircleIcon, ArrowDownUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateExchangeRate } from "./utils/calculateExchangeRate";
import { useTokenState } from "./hooks/tokenStateHook";
import { useDropdown } from "./hooks/dropdownHook";
import DropdownSection from "./components/DropdownSection";

export default function SwapForm() {
  const {
    handleAmountChange,
    handleSubmit,
    handleSwap,
    error,
    isLoading,
    setFromToken,
    setToToken,
    fromToken,
    toToken,
  } = useTokenState();
  const {
    toggleDropdown: toggleDropdownFromToken,
    handleSelect: handleFromTokenSelect,
    dropdownRef: dropdownFromTokenRef,
    isDropdownOpen: isDropdownFromTokenOpen,
  } = useDropdown("states-button-from", setFromToken);
  const {
    toggleDropdown: toggleDropdownToToken,
    handleSelect: handleToTokenSelect,
    dropdownRef: dropdownToTokenRef,
    isDropdownOpen: isDropdownToTokenOpen,
  } = useDropdown("states-button-to", setToToken);

  const FromSection = (
    <DropdownSection
      label="From"
      toggleDropdown={toggleDropdownFromToken}
      token={fromToken}
      dropdownRef={dropdownFromTokenRef}
      isDropdownOpen={isDropdownFromTokenOpen}
      handleSelect={handleFromTokenSelect}
      handleAmountChange={handleAmountChange}
      otherToken={toToken}
    />
  );

  const ToSection = (
    <DropdownSection
      label="To"
      toggleDropdown={toggleDropdownToToken}
      token={toToken}
      dropdownRef={dropdownToTokenRef}
      isDropdownOpen={isDropdownToTokenOpen}
      handleSelect={handleToTokenSelect}
      handleAmountChange={handleAmountChange}
      otherToken={fromToken}
    />
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Swap Tokens</h2>

        <form onSubmit={handleSubmit}>
          {FromSection}

          {/* Swap Button */}
          <div className="flex justify-center -my-3 p-6 relative z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleSwap}
              className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <ArrowDownUp className="text-gray-400 w-5 h-5" />
            </motion.button>
          </div>

          {ToSection}

          {/* Exchange Rate */}
          <div className="text-gray-400 text-sm mb-4">
            1 {fromToken.currency} ={" "}
            {calculateExchangeRate(fromToken, toToken).toFixed(6)}{" "}
            {toToken.currency}
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm mb-4"
              >
                <AlertCircleIcon className="w-4 h-4" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-white 
              ${
                isLoading
                  ? "bg-blue-600 cursor-not-allowed opacity-70"
                  : "bg-blue-500 hover:bg-blue-600"
              } transition-all`}
          >
            {isLoading ? "Swapping..." : "Swap"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
