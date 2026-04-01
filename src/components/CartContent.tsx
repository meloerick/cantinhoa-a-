import { formatCurrency } from "../lib/format";
import type { CartItem } from "../types";

interface CartContentProps {
  cartItems: CartItem[];
  subtotal: number;
  total: number;
  canCheckout: boolean;
  closeReason: string | null;
  onChangeQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
  onCheckout: () => void;
}

export function CartContent({
  cartItems,
  subtotal,
  total,
  canCheckout,
  closeReason,
  onChangeQuantity,
  onRemove,
  onCheckout
}: CartContentProps) {
  return (
    <div className="cart-content">
      <h2>Seu carrinho</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Seu carrinho está vazio. Adicione itens do cardápio.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.lineId}>
              <div>
                <strong>{item.productName}</strong>
                {item.customization?.sizeLabel ? (
                  <p className="cart-details">Tamanho: {item.customization.sizeLabel}</p>
                ) : null}
                {item.customization?.freeToppings?.length ? (
                  <p className="cart-details">
                    Grátis: {item.customization.freeToppings.join(", ")}
                  </p>
                ) : null}
                {item.customization?.extraFreeToppings?.length ? (
                  <p className="cart-details">
                    Extras: {item.customization.extraFreeToppings.join(", ")}
                  </p>
                ) : null}
                {item.customization?.paidToppings?.length ? (
                  <p className="cart-details">
                    Pagos: {item.customization.paidToppings.join(", ")}
                  </p>
                ) : null}
                {item.customization?.utensilChoice ? (
                  <p className="cart-details">
                    Descartáveis: {item.customization.utensilChoice}
                  </p>
                ) : null}
                {item.customization?.requiredChoiceValue ? (
                  <p className="cart-details">
                    {item.customization.requiredChoiceTitle || "Opção"}:{" "}
                    {item.customization.requiredChoiceValue}
                  </p>
                ) : null}
                {item.customization?.notes ? (
                  <p className="cart-details">
                    Comentário: {item.customization.notes}
                  </p>
                ) : null}
              </div>
              <div className="cart-line-actions">
                <div className="quantity-group">
                  <button
                    type="button"
                    onClick={() => onChangeQuantity(item.lineId, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => onChangeQuantity(item.lineId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <strong>{formatCurrency(item.totalPrice)}</strong>
                <button
                  type="button"
                  className="remove-link"
                  onClick={() => onRemove(item.lineId)}
                >
                  remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-summary">
        <p>
          Subtotal <strong>{formatCurrency(subtotal)}</strong>
        </p>
        <p>
          Total <strong>{formatCurrency(total)}</strong>
        </p>
      </div>

      {!canCheckout && closeReason ? <p className="closed-warning">{closeReason}</p> : null}

      <button
        type="button"
        className="btn-primary"
        disabled={!canCheckout || cartItems.length === 0}
        onClick={onCheckout}
      >
        Finalizar pedido
      </button>
    </div>
  );
}
