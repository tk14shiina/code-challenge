import { tokens } from "../constants/tokens";
import Token from "../types/Token";

export const calculateExchangeRate = (fromToken: Token, toToken: Token) => {
  const fromPrice =
    tokens.find((t) => t.currency === fromToken.currency)?.price || 0;
  const toPrice =
    tokens.find((t) => t.currency === toToken.currency)?.price || 0;
  return fromPrice && toPrice ? toPrice / fromPrice : 0;
};
