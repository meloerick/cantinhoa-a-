import type { CartItem } from "../types";
import { CartContent } from "./CartContent";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  total: number;
  canCheckout: boolean;
  closeReason: string | null;
  onChangeQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  onClose,
  cartItems,
  subtotal,
  total,
  canCheckout,
  closeReason,
  onChangeQuantity,
  onRemove,
  onCheckout
}: CartDrawerProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay cart-drawer-overlay">
      <aside className="cart-drawer">
        <header>
          <h2>Carrinho</h2>
          <button type="button" className="icon-button" onClick={onClose}>
            ✕
          </button>
        </header>

        <CartContent
          cartItems={cartItems}
          subtotal={subtotal}
          total={total}
          canCheckout={canCheckout}
          closeReason={closeReason}
          onChangeQuantity={onChangeQuantity}
          onRemove={onRemove}
          onCheckout={onCheckout}
        />
      </aside>
    </div>
  );
}
