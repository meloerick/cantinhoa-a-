import { formatCurrency } from "./format";
import type { CartItem, CheckoutFormData, StoreSettings } from "../types";

interface BuildMessageInput {
  store: StoreSettings;
  cartItems: CartItem[];
  subtotal: number;
  total: number;
  checkoutData: CheckoutFormData;
}

export function buildWhatsAppMessage({
  store,
  cartItems,
  subtotal,
  total,
  checkoutData
}: BuildMessageInput): string {
  const itemLines = cartItems
    .map((item, index) => {
      const lines: string[] = [];
      lines.push(
        `${index + 1}. ${item.productName} x${item.quantity} - ${formatCurrency(
          item.totalPrice
        )}`
      );

      if (item.customization?.sizeLabel) {
        lines.push(`   Tamanho: ${item.customization.sizeLabel}`);
      }
      if (item.customization?.freeToppings?.length) {
        lines.push(
          `   Grátis: ${item.customization.freeToppings.join(", ")}`
        );
      }
      if (item.customization?.extraFreeToppings?.length) {
        lines.push(
          `   Extras (+): ${item.customization.extraFreeToppings.join(", ")}`
        );
      }
      if (item.customization?.paidToppings?.length) {
        lines.push(
          `   Complementos pagos: ${item.customization.paidToppings.join(", ")}`
        );
      }
      if (item.customization?.utensilChoice) {
        lines.push(`   Descartáveis: ${item.customization.utensilChoice}`);
      }
      if (item.customization?.requiredChoiceValue) {
        lines.push(
          `   ${item.customization.requiredChoiceTitle || "Opção"}: ${
            item.customization.requiredChoiceValue
          }`
        );
      }
      if (item.customization?.notes) {
        lines.push(`   Observação do item: ${item.customization.notes}`);
      }
      return lines.join("\n");
    })
    .join("\n\n");

  const lines = [
    `Olá, ${store.store_name}! Gostaria de fazer um pedido:`,
    "",
    `Cliente: ${checkoutData.customerName}`,
    `Telefone: ${checkoutData.customerPhone}`,
    "",
    "Endereço de entrega:",
    `${checkoutData.addressLine}, ${checkoutData.addressNumber}`,
    checkoutData.addressComplement
      ? `Complemento: ${checkoutData.addressComplement}`
      : null,
    `Bairro: ${checkoutData.neighborhood}`,
    checkoutData.referencePoint
      ? `Referência: ${checkoutData.referencePoint}`
      : null,
    "",
    "Itens do pedido:",
    itemLines,
    "",
    `Subtotal: ${formatCurrency(subtotal)}`,
    `Total final: ${formatCurrency(total)}`,
    "",
    "📱 Forma de Pagamento:",
    `PIX: ${store.pix_key}`,
    checkoutData.notes ? `\nObservações gerais: ${checkoutData.notes}` : null
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const sanitized = phone.replace(/\D/g, "");
  return `https://wa.me/${sanitized}?text=${encodeURIComponent(message)}`;
}
