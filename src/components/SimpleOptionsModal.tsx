import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "../lib/format";
import { isSimpleOptionsConfig } from "../lib/business";
import type { Product } from "../types";

interface SimpleOptionsResult {
  unitPrice: number;
  selectedFreeOptions: string[];
  selectedPaidOptions: string[];
  requiredChoiceTitle?: string;
  requiredChoiceValue?: string;
  notes: string;
}

interface SimpleOptionsModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (result: SimpleOptionsResult) => void;
}

function toggleWithLimit(
  current: string[],
  value: string,
  maxSelections: number
): string[] {
  if (current.includes(value)) {
    return current.filter((item) => item !== value);
  }
  if (current.length >= maxSelections) {
    return current;
  }
  return [...current, value];
}

export function SimpleOptionsModal({
  product,
  open,
  onClose,
  onConfirm
}: SimpleOptionsModalProps) {
  const config = isSimpleOptionsConfig(product?.metadata) ? product.metadata : null;

  const [selectedFreeOptions, setSelectedFreeOptions] = useState<string[]>([]);
  const [selectedPaidOptions, setSelectedPaidOptions] = useState<string[]>([]);
  const [requiredChoiceValue, setRequiredChoiceValue] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setSelectedFreeOptions([]);
    setSelectedPaidOptions([]);
    setRequiredChoiceValue("");
    setNotes("");
    setError("");
  }, [open, product?.id]);

  const basePrice = useMemo(() => {
    if (!product) return 0;
    return product.promo_price ?? product.price;
  }, [product]);

  const paidTotal = useMemo(() => {
    if (!config?.paidGroup) return 0;
    return selectedPaidOptions.reduce((sum, selectedName) => {
      const found = config.paidGroup?.options.find(
        (option) => option.name === selectedName
      );
      return sum + (found?.price ?? 0);
    }, 0);
  }, [config, selectedPaidOptions]);

  if (!open || !product || !config) return null;

  const resolvedConfig = config;

  const total = basePrice + paidTotal;
  const freeMax = resolvedConfig.freeGroup?.maxSelections ?? 0;
  const paidMax = resolvedConfig.paidGroup?.maxSelections ?? 0;

  function handleConfirm() {
    if (resolvedConfig.requiredChoice?.required && !requiredChoiceValue) {
      setError(`Selecione uma opção em "${resolvedConfig.requiredChoice.title}".`);
      return;
    }

    onConfirm({
      unitPrice: total,
      selectedFreeOptions,
      selectedPaidOptions,
      requiredChoiceTitle: resolvedConfig.requiredChoice?.title,
      requiredChoiceValue: requiredChoiceValue || undefined,
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
          {resolvedConfig.freeGroup ? (
            <section>
              <h3>{resolvedConfig.freeGroup.title}</h3>
              <p className="help-text">
                {resolvedConfig.freeGroup.helperText || `Escolha até ${freeMax} opções.`}
              </p>
              <div className="selection-grid">
                {resolvedConfig.freeGroup.options.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    className={
                      selectedFreeOptions.includes(option.name) ? "tag active" : "tag"
                    }
                    onClick={() =>
                      setSelectedFreeOptions((previous) =>
                        toggleWithLimit(previous, option.name, freeMax)
                      )
                    }
                  >
                    {option.name}
                  </button>
                ))}
              </div>
              <p className="help-text">
                Selecionados: {selectedFreeOptions.length}/{freeMax}
              </p>
            </section>
          ) : null}

          {resolvedConfig.paidGroup ? (
            <section>
              <h3>{resolvedConfig.paidGroup.title}</h3>
              <p className="help-text">
                {resolvedConfig.paidGroup.helperText || `Escolha até ${paidMax} opções.`}
              </p>
              <div className="selection-grid">
                {resolvedConfig.paidGroup.options.map((option) => (
                  <button
                    key={`${option.name}-${option.price ?? 0}`}
                    type="button"
                    className={
                      selectedPaidOptions.includes(option.name)
                        ? "tag paid active"
                        : "tag paid"
                    }
                    onClick={() =>
                      setSelectedPaidOptions((previous) =>
                        toggleWithLimit(previous, option.name, paidMax)
                      )
                    }
                  >
                    {option.name}
                    {option.price ? ` + ${formatCurrency(option.price)}` : ""}
                  </button>
                ))}
              </div>
              <p className="help-text">
                Selecionados: {selectedPaidOptions.length}/{paidMax}
              </p>
            </section>
          ) : null}

          {resolvedConfig.requiredChoice ? (
            <section>
              <h3>{resolvedConfig.requiredChoice.title}</h3>
              <p className="help-text">
                {resolvedConfig.requiredChoice.helperText || "Escolha 1 opção."}
              </p>
              <div className="selection-grid">
                {resolvedConfig.requiredChoice.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={requiredChoiceValue === option ? "tag active" : "tag"}
                    onClick={() => setRequiredChoiceValue(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <h3>Algum comentário?</h3>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
            />
          </section>

          <section className="summary-box">
            <h3>Resumo do item</h3>
            <p>
              Preço base: <strong>{formatCurrency(basePrice)}</strong>
            </p>
            <p>
              Adicionais pagos: <strong>{formatCurrency(paidTotal)}</strong>
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
