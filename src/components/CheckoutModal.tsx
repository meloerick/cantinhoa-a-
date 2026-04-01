import { useMemo, useState } from "react";
import { formatCurrency } from "../lib/format";
import type { CartItem, CheckoutFormData } from "../types";

const INITIAL_FORM: CheckoutFormData = {
  customerName: "",
  customerPhone: "",
  addressLine: "",
  addressNumber: "",
  addressComplement: "",
  neighborhood: "",
  referencePoint: "",
  paymentMethod: "",
  notes: ""
};

interface CheckoutModalProps {
  open: boolean;
  cartItems: CartItem[];
  subtotal: number;
  total: number;
  canCheckout: boolean;
  closeReason: string | null;
  onClose: () => void;
  onSubmit: (data: CheckoutFormData) => Promise<void>;
}

export function CheckoutModal({
  open,
  cartItems,
  subtotal,
  total,
  canCheckout,
  closeReason,
  onClose,
  onSubmit
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const summaryItems = useMemo(
    () =>
      cartItems.map((item) => (
        <li key={item.lineId}>
          {item.quantity}x {item.productName} - {formatCurrency(item.totalPrice)}
        </li>
      )),
    [cartItems]
  );

  if (!open) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      await onSubmit(formData);
      setFormData(INITIAL_FORM);
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "Não foi possível finalizar o pedido.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function updateField<K extends keyof CheckoutFormData>(field: K, value: string) {
    setFormData((previous) => ({ ...previous, [field]: value }));
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal checkout-modal">
        <header>
          <h2>Finalizar pedido</h2>
          <button type="button" className="icon-button" onClick={onClose}>
            ✕
          </button>
        </header>

        <form className="modal-body checkout-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Nome do cliente*
              <input
                value={formData.customerName}
                onChange={(event) => updateField("customerName", event.target.value)}
                required
              />
            </label>
            <label>
              Telefone*
              <input
                value={formData.customerPhone}
                onChange={(event) => updateField("customerPhone", event.target.value)}
                required
              />
            </label>
            <label className="full">
              Endereço completo*
              <input
                value={formData.addressLine}
                onChange={(event) => updateField("addressLine", event.target.value)}
                required
              />
            </label>
            <label>
              Número*
              <input
                value={formData.addressNumber}
                onChange={(event) => updateField("addressNumber", event.target.value)}
                required
              />
            </label>
            <label>
              Complemento
              <input
                value={formData.addressComplement}
                onChange={(event) => updateField("addressComplement", event.target.value)}
              />
            </label>
            <label>
              Bairro*
              <input
                value={formData.neighborhood}
                onChange={(event) => updateField("neighborhood", event.target.value)}
                required
              />
            </label>
            <label>
              Referência
              <input
                value={formData.referencePoint}
                onChange={(event) => updateField("referencePoint", event.target.value)}
              />
            </label>
            <label>
              Forma de pagamento*
              <select
                value={formData.paymentMethod}
                onChange={(event) => updateField("paymentMethod", event.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="PIX">PIX</option>
              </select>
            </label>
            <label className="full">
              Observações do pedido
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(event) => updateField("notes", event.target.value)}
              />
            </label>
          </div>

          <div className="checkout-summary">
            <h3>Resumo final</h3>
            <ul>{summaryItems}</ul>
            <p>
              Subtotal: <strong>{formatCurrency(subtotal)}</strong>
            </p>
            <p>
              Total: <strong>{formatCurrency(total)}</strong>
            </p>
          </div>

          {!canCheckout && closeReason ? <p className="closed-warning">{closeReason}</p> : null}
          {error ? <p className="error-text">{error}</p> : null}

          <footer className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Voltar
            </button>
            <button type="submit" className="btn-primary" disabled={loading || !canCheckout}>
              {loading ? "Enviando..." : "Enviar para WhatsApp"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
