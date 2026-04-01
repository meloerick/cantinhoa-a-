import { useEffect, useMemo, useState } from "react";
import { findPaidToppingPrice, isAcaiBuilderConfig } from "../lib/business";
import { formatCurrency } from "../lib/format";
import type { Product } from "../types";

interface AcaiConfigurationResult {
  unitPrice: number;
  sizeLabel: string;
  freeToppings: string[];
  extraFreeToppings: string[];
  paidToppings: string[];
  notes: string;
}

interface AcaiConfiguratorModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (result: AcaiConfigurationResult) => void;
}

export function AcaiConfiguratorModal({
  product,
  open,
  onClose,
  onConfirm
}: AcaiConfiguratorModalProps) {
  const config = isAcaiBuilderConfig(product?.metadata) ? product.metadata : null;

  const [sizeLabel, setSizeLabel] = useState("");
  const [selectedFree, setSelectedFree] = useState<string[]>([]);
  const [selectedPaid, setSelectedPaid] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const defaultSize = config?.sizes[0]?.label || "";
    setSizeLabel(defaultSize);
    setSelectedFree([]);
    setSelectedPaid([]);
    setNotes("");
    setError("");
  }, [open, product?.id, config]);

  const selectedSizeByLabel = useMemo(
    () => config?.sizes.find((size) => size.label === sizeLabel) ?? null,
    [config, sizeLabel]
  );

  const selectedSize = selectedSizeByLabel ?? config?.sizes[0] ?? null;

  const includedCount = selectedSize?.includedToppings ?? 0;
  const extraFreeCount = Math.max(0, selectedFree.length - includedCount);

  const paidTotal = useMemo(() => {
    if (!config) return 0;
    return selectedPaid.reduce(
      (sum, toppingName) =>
        sum + findPaidToppingPrice(toppingName, config.paidToppings),
      0
    );
  }, [config, selectedPaid]);

  const total =
    (selectedSize?.price ?? 0) +
    paidTotal +
    extraFreeCount * (config?.extraToppingPrice ?? 0);

  if (!open || !product || !config) return null;

  function toggleFreeTopping(name: string) {
    setSelectedFree((previous) =>
      previous.includes(name)
        ? previous.filter((item) => item !== name)
        : [...previous, name]
    );
  }

  function togglePaidTopping(name: string) {
    setSelectedPaid((previous) =>
      previous.includes(name)
        ? previous.filter((item) => item !== name)
        : [...previous, name]
    );
  }

  function handleConfirm() {
    if (!selectedSize) {
      setError("Tamanho não definido para este item.");
      return;
    }

    const freeToppings = selectedFree.slice(0, includedCount);
    const extraFreeToppings = selectedFree.slice(includedCount);

    onConfirm({
      unitPrice: total,
      sizeLabel: selectedSize.label,
      freeToppings,
      extraFreeToppings,
      paidToppings: selectedPaid,
      notes
    });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal acai-modal">
        <header>
          <h2>{product.name}</h2>
          <button type="button" className="icon-button" onClick={onClose}>
            x
          </button>
        </header>

        <div className="modal-body">
          <section>
            <h3>
              Complementos grátis ({selectedFree.length}/{includedCount} inclusos)
            </h3>
            <div className="selection-grid">
              {config.freeToppings.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={selectedFree.includes(item) ? "tag active" : "tag"}
                  onClick={() => toggleFreeTopping(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="help-text">
              Extras além do limite incluso custam{" "}
              {formatCurrency(config.extraToppingPrice)} cada.
            </p>
          </section>

          <section>
            <h3>Complementos pagos</h3>
            <div className="selection-grid">
              {config.paidToppings.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={
                    selectedPaid.includes(item.name) ? "tag paid active" : "tag paid"
                  }
                  onClick={() => togglePaidTopping(item.name)}
                >
                  {item.name} + {formatCurrency(item.price)}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3>Observações do item</h3>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
            />
          </section>

          <section className="summary-box">
            <h3>Resumo do item</h3>
            <p>
              Tamanho: <strong>{selectedSize?.label || "-"}</strong>
            </p>
            <p>
              Complementos grátis selecionados: <strong>{selectedFree.length}</strong>
            </p>
            <p>
              Complementos pagos: <strong>{selectedPaid.length}</strong>
            </p>
            <p className="total">
              Total do item: <strong>{formatCurrency(total)}</strong>
            </p>
          </section>

          {error ? <p className="error-text">{error}</p> : null}
        </div>

        <footer className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-primary" onClick={handleConfirm}>
            Adicionar ao carrinho
          </button>
        </footer>
      </div>
    </div>
  );
}
