import { formatCurrency } from "../lib/format";
import { isAcaiBuilderConfig, isSimpleOptionsConfig } from "../lib/business";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

function getCurrentPrice(product: Product) {
  return product.promo_price ?? product.price;
}

export function ProductCard({ product, onSelectProduct }: ProductCardProps) {
  const currentPrice = getCurrentPrice(product);
  const isAcaiBuilder = isAcaiBuilderConfig(product.metadata);
  const isSimpleOptions = isSimpleOptionsConfig(product.metadata);

  const buttonLabel = isAcaiBuilder
    ? "Escolher complementos"
    : isSimpleOptions
    ? "Personalizar"
    : "Adicionar";

  return (
    <article className={`product-card ${!product.is_available ? "disabled" : ""}`}>
      <div className="product-image-wrapper">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-image-fallback">Sem imagem</div>
        )}
        {!product.is_available && <span className="unavailable-badge">Indisponível</span>}
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="price-row">
          {product.old_price ? (
            <span className="old-price">{formatCurrency(product.old_price)}</span>
          ) : null}
          <strong>{formatCurrency(currentPrice)}</strong>
        </div>
        <button
          type="button"
          className="btn-product"
          disabled={!product.is_available}
          onClick={() => onSelectProduct(product)}
        >
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}
