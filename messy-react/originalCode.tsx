// ASSUME THAT EVERYTHING NECESSARY (FUNCTIONS, INTERFACES, VARIABLES) IS IMPORTED.

/* 2 interfaces issues (1)
- (1.1) Currency should ensure type safety (if not random values) -> A union type.
- (1.2)+ (1.3) Formatting logic being separate from amount can lead to stale or inconsistent values + Redundant properties between interfaces -> 
interface extension or composition. But in this case, we can format amount directly in WalletRow component or implement utility function.
*/

interface WalletBalance {
  currency: string; // 
  amount: number;
}
interface FormattedWalletBalance { // 
  currency: string;
  amount: number;
  formatted: string; // 
}

/* Props issues (2)
- (2.1) Props naming lacks context specificity -> WalletPageProps.
- (2.2) Box props inheritance could be more precise using TypeScript utility types -> Omit<BoxProps, "children"> 
*/

interface Props extends BoxProps {} 

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances(); 
  const prices = usePrices();

  /* getPriority issues (3)
  - (3.1) + (3.2) Lacks proper blockchain type definition and Switch statement could be replaced with a more maintainable solution -> A union 
  type called Blockchain then integrate with record.
  - (3.2) Duplicate priority values can cause unstable sorting -> Change values of "Zilliqa" and "Neo" OR handle equal cases in sort function.
  */

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  /* sortedBalances issues (4)
  - (4.1) The logic is inconsistent. Balances with amount <= 0 are included only if the priority is greater than -99, which might be incorrect.
  - (4.2) The sort comparator doesn't handle the case where priorities are equal -> Secondary sort by amount if priorities are equal.
  - (4.3) The useMemo dependencies [balances, prices] could result in unnecessary recalculations, especially since prices is not directly relevant
   to the filtered and sorted balances -> [balances].
  */

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => { 
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) { // Assume that it is typing error, it should be balancePriority.
          if (balance.amount <= 0) { 
            return true;
          }
        }
        return false; 
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain); // Assume that it is typing error, it should be lhs.currency.
        const rightPriority = getPriority(rhs.blockchain); // Assume that it is typing error, it should be rhs.currency.
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  /* formattedBalances issues (5)
  - (5.1) The formattedBalances variable is not used directly -> Be combined into the mapping for rows, reducing redundancy.
  */

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  /* rows issues (6)
  - (6.1) If prices[balance.currency] is undefined or null, it may lead to runtime errors when calculating usdValue -> An utility function 
  for type check and calculation.
  - (6.2) WalletRow component props are not typed which could lack of context or reuse purpose -> Declare WalletRowProps. 
  - (6.3) The key={index} in rows is not ideal. Index-based keys can cause issues during reconciliation in React. -> Use an ID generators OR 
  combined attributes OR require predefined IDs.
  - (6.4) Format amount here with an utility function.
  */

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow // 
          className={classes.row} //Assume that it is lacking definition.
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
