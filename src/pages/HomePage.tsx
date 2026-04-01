import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../context/StoreContext";
import {
  canReceiveOrders,
  checkoutFieldsAreValid,
  isAcaiBuilderConfig,
  isNowInsideBusinessHours,
  isSimpleOptionsConfig
} from "../lib/business";
import { buildWhatsAppLink, buildWhatsAppMessage } from "../lib/whatsapp";
import type { CheckoutFormData, Product } from "../types";
import { HeroSection } from "../components/HeroSection";
import { CategoryFilter } from "../components/CategoryFilter";
import { ProductCard } from "../components/ProductCard";
import { AcaiConfiguratorModal } from "../components/AcaiConfiguratorModal";
import { SimpleOptionsModal } from "../components/SimpleOptionsModal";
import { CartContent } from "../components/CartContent";
import { FloatingCartBar } from "../components/FloatingCartBar";
import { CartDrawer } from "../components/CartDrawer";
import { CheckoutModal } from "../components/CheckoutModal";
import { LocationSection } from "../components/LocationSection";
import { SiteFooter } from "../components/SiteFooter";

export function HomePage() {
  const {
    categories,
    products,
    settings,
    loading,
    error,
    cartItems,
    cartQuantity,
    subtotal,
    total,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart
  } = useStore();

  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [selectedAcai, setSelectedAcai] = useState<Product | null>(null);
  const [selectedSimpleOptionsProduct, setSelectedSimpleOptionsProduct] =
    useState<Product | null>(null);
  const [isAcaiModalOpen, setAcaiModalOpen] = useState(false);
  const [isSimpleOptionsModalOpen, setSimpleOptionsModalOpen] = useState(false);
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [, setClockTick] = useState(0);
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!activeCategoryId && categories.length) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClockTick(Date.now());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const insideHours = isNowInsideBusinessHours(settings);
  const canCheckout = canReceiveOrders(settings);
  const closeReason = useMemo(() => {
    if (!settings.manual_is_open || !insideHours) {
      return "Loja fechada no momento. Pedidos disponíveis das 08:30 às 19:30.";
    }
    return null;
  }, [insideHours, settings.manual_is_open]);

  const activeProducts = useMemo(
    () =>
      products.filter(
        (product) => product.category_id === activeCategoryId && product.is_visible
      ),
    [products, activeCategoryId]
  );

  function scrollToMenu() {
    menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startOrderFlow() {
    if (cartItems.length > 0) {
      setCartDrawerOpen(true);
      return;
    }
    scrollToMenu();
  }

  function handleSimpleAdd(product: Product) {
    const unitPrice = product.promo_price ?? product.price;
    addToCart({
      productId: product.id,
      productName: product.name,
      productImage: product.image_url,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice
    });
  }

  function handleSelectProduct(product: Product) {
    if (isAcaiBuilderConfig(product.metadata)) {
      setSelectedAcai(product);
      setAcaiModalOpen(true);
      return;
    }

    if (isSimpleOptionsConfig(product.metadata)) {
      setSelectedSimpleOptionsProduct(product);
      setSimpleOptionsModalOpen(true);
      return;
    }

    handleSimpleAdd(product);
  }

  async function handleCheckoutSubmit(data: CheckoutFormData) {
    if (!canCheckout) {
      throw new Error(
        "Loja fechada no momento. Pedidos disponíveis das 08:30 às 19:30."
      );
    }
    if (!cartItems.length) {
      throw new Error("Adicione itens ao carrinho antes de finalizar.");
    }

    const validation = checkoutFieldsAreValid(data);
    if (!validation.valid) {
      throw new Error(validation.error || "Preencha os campos obrigatórios.");
    }

    const message = buildWhatsAppMessage({
      store: settings,
      cartItems,
      subtotal,
      total,
      checkoutData: data
    });

    const link = buildWhatsAppLink(settings.whatsapp_number, message);
    window.open(link, "_blank", "noopener,noreferrer");

    clearCart();
    setCheckoutOpen(false);
    setCartDrawerOpen(false);
  }

  return (
    <>


      <HeroSection
        settings={settings}
        onPedirAgora={startOrderFlow}
        onVerCardapio={scrollToMenu}
      />

      <main className="container page-content" ref={menuRef}>
        <section className="menu-header">
          <p className="section-tag">Cardápio</p>
          <h2>Escolha seus favoritos</h2>
          <p>
            Categorias organizadas para facilitar seu pedido. Escolha o tamanho
            no cardápio e finalize em poucos toques.
          </p>
        </section>

        {loading ? <p>Carregando cardápio...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}

        {!loading ? (
          <section className="menu-layout">
            <div className="menu-main">
              <CategoryFilter
                categories={categories}
                activeCategoryId={activeCategoryId}
                onChange={setActiveCategoryId}
              />

              <div className="products-grid">
                {activeProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={handleSelectProduct}
                  />
                ))}
              </div>
            </div>

            <aside className="desktop-cart">
              <CartContent
                cartItems={cartItems}
                subtotal={subtotal}
                total={total}
                canCheckout={canCheckout}
                closeReason={closeReason}
                onChangeQuantity={updateCartItemQuantity}
                onRemove={removeCartItem}
                onCheckout={() => setCheckoutOpen(true)}
              />
            </aside>
          </section>
        ) : null}
      </main>

      <LocationSection settings={settings} />
      <SiteFooter settings={settings} onQuickOrder={startOrderFlow} />

      {cartItems.length > 0 ? (
        <FloatingCartBar
          quantity={cartQuantity}
          total={total}
          onOpenCart={() => setCartDrawerOpen(true)}
        />
      ) : null}

      <CartDrawer
        open={isCartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        total={total}
        canCheckout={canCheckout}
        closeReason={closeReason}
        onChangeQuantity={updateCartItemQuantity}
        onRemove={removeCartItem}
        onCheckout={() => {
          setCartDrawerOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <AcaiConfiguratorModal
        product={selectedAcai}
        open={isAcaiModalOpen}
        onClose={() => setAcaiModalOpen(false)}
        onConfirm={(config) => {
          if (!selectedAcai) return;
          addToCart({
            productId: selectedAcai.id,
            productName: selectedAcai.name,
            productImage: selectedAcai.image_url,
            quantity: 1,
            unitPrice: config.unitPrice,
            totalPrice: config.unitPrice,
            customization: {
              sizeLabel: config.sizeLabel,
              freeToppings: config.freeToppings,
              extraFreeToppings: config.extraFreeToppings,
              paidToppings: config.paidToppings,
              notes: config.notes
            }
          });
          setAcaiModalOpen(false);
        }}
      />

      <SimpleOptionsModal
        product={selectedSimpleOptionsProduct}
        open={isSimpleOptionsModalOpen}
        onClose={() => setSimpleOptionsModalOpen(false)}
        onConfirm={(config) => {
          if (!selectedSimpleOptionsProduct) return;
          addToCart({
            productId: selectedSimpleOptionsProduct.id,
            productName: selectedSimpleOptionsProduct.name,
            productImage: selectedSimpleOptionsProduct.image_url,
            quantity: 1,
            unitPrice: config.unitPrice,
            totalPrice: config.unitPrice,
            customization: {
              freeToppings: config.selectedFreeOptions,
              paidToppings: config.selectedPaidOptions,
              requiredChoiceTitle: config.requiredChoiceTitle,
              requiredChoiceValue: config.requiredChoiceValue,
              notes: config.notes
            }
          });
          setSimpleOptionsModalOpen(false);
        }}
      />

      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        total={total}
        canCheckout={canCheckout}
        closeReason={closeReason}
        onSubmit={handleCheckoutSubmit}
      />
    </>
  );
}
