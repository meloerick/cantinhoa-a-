import { formatCurrency } from "../lib/format";

interface FloatingCartBarProps {
  quantity: number;
  total: number;
  onOpenCart: () => void;
}

export function FloatingCartBar({
  quantity,
  total,
  onOpenCart
}: FloatingCartBarProps) {
  return (
    <button type="button" className="floating-cart-bar" onClick={onOpenCart}>
      <span>{quantity} item(ns)</span>
      <strong>{formatCurrency(total)}</strong>
      <span>Ver carrinho</span>
    </button>
  );
}
