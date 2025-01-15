// Types and Interfaces
type BlockchainType = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";
type CurrencyType = string;

interface BaseWalletBalance {
  currency: CurrencyType;
  amount: number;
  blockchain: BlockchainType;
}

interface WalletBalance extends BaseWalletBalance {
  getFormatted(): string;
}

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
  className?: string;
}

interface WalletPageProps extends Omit<BoxProps, "children"> {
  className?: string;
}

// Priority mapping
const BLOCKCHAIN_PRIORITY: Record<BlockchainType, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

// Utility functions
const formatAmount = (amount: number): string => {
  return amount.toFixed(2);
};

const calculateUsdValue = (amount: number, price?: number): number => {
  return price ? amount * price : 0;
};

// Components
const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  usdValue,
  formattedAmount,
  className,
}) => {
  // WalletRow implementation
  return <div className={className}>{/* Row content */}</div>;
};

const WalletPage: React.FC<WalletPageProps> = ({ className, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = BLOCKCHAIN_PRIORITY[balance.blockchain] ?? -99;
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = BLOCKCHAIN_PRIORITY[lhs.blockchain] ?? -99;
        const rightPriority = BLOCKCHAIN_PRIORITY[rhs.blockchain] ?? -99;
        if (leftPriority !== rightPriority) {
          return rightPriority - leftPriority;
        }
        return rhs.amount - lhs.amount;
      });
  }, [balances]);

  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = calculateUsdValue(
      balance.amount,
      prices[balance.currency]
    );

    return (
      <WalletRow
        key={`${balance.blockchain}-${balance.currency}`}
        className={className}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formatAmount(balance.amount)}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
