import { FormEvent, useState } from "react";
import { calculateExchangeRate } from "../utils/calculateExchangeRate";
import { tokens } from "../constants/tokens";

export const useTokenState = () => {
  const [fromToken, setFromToken] = useState((tokens[0]));
  const [toToken, setToToken] = useState( (tokens[1]));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleAmountChange = (value: string): void => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFromToken((prev) => ({ ...prev, amount: value }));
      const rate = calculateExchangeRate(fromToken, toToken);
      setToToken((prev) => ({
        ...prev,
        amount: value ? (parseFloat(value) * rate).toFixed(6) : "",
      }));
    }
  };

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!fromToken.amount || parseFloat(fromToken.amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setError("");
    // Reset form
    setFromToken((prev) => ({ ...prev, amount: "" }));
    setToToken((prev) => ({ ...prev, amount: "" }));
  };
  return {
    handleSubmit,
    handleSwap,
    handleAmountChange,
    error,
    isLoading,
    setFromToken,
    setToToken,
    fromToken,
    toToken,
  };
};
