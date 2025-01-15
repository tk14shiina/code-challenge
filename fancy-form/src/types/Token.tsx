export default interface Token {
  currency: string;
  amount?: string;
  balance?: number;
  price: number;
  date: string;
}