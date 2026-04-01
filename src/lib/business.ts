import type {
  AcaiBuilderConfig,
  AcaiPaidTopping,
  CheckoutFormData,
  SimpleOptionsConfig,
  StoreSettings
} from "../types";

interface ParsedTime {
  hour: number;
  minute: number;
}

function parseTime(rawValue: string): ParsedTime {
  const normalized = rawValue.slice(0, 5);
  const [hour, minute] = normalized.split(":").map(Number);
  return { hour: hour || 0, minute: minute || 0 };
}

function toMinutes(time: ParsedTime): number {
  return time.hour * 60 + time.minute;
}

export function isNowInsideBusinessHours(settings: StoreSettings): boolean {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const opening = toMinutes(parseTime(settings.opening_time));
  const closing = toMinutes(parseTime(settings.closing_time));

  if (opening <= closing) {
    return currentMinutes >= opening && currentMinutes <= closing;
  }

  return currentMinutes >= opening || currentMinutes <= closing;
}

export function canReceiveOrders(settings: StoreSettings): boolean {
  return settings.manual_is_open && isNowInsideBusinessHours(settings);
}

export function checkoutFieldsAreValid(formData: CheckoutFormData): {
  valid: boolean;
  error?: string;
} {
  if (!formData.customerName.trim()) {
    return { valid: false, error: "Informe seu nome." };
  }
  if (!formData.customerPhone.trim()) {
    return { valid: false, error: "Informe seu telefone." };
  }
  if (!formData.addressLine.trim()) {
    return { valid: false, error: "Informe o endereço." };
  }
  if (!formData.addressNumber.trim()) {
    return { valid: false, error: "Informe o número." };
  }
  if (!formData.neighborhood.trim()) {
    return { valid: false, error: "Informe o bairro." };
  }
  if (!formData.paymentMethod.trim()) {
    return { valid: false, error: "Selecione a forma de pagamento." };
  }
  return { valid: true };
}

export function isAcaiBuilderConfig(metadata: unknown): metadata is AcaiBuilderConfig {
  if (!metadata || typeof metadata !== "object") return false;
  return (metadata as { type?: unknown }).type === "acai_builder";
}

export function isSimpleOptionsConfig(
  metadata: unknown
): metadata is SimpleOptionsConfig {
  if (!metadata || typeof metadata !== "object") return false;
  return (metadata as { type?: unknown }).type === "simple_options";
}

export function findPaidToppingPrice(
  toppingName: string,
  options: AcaiPaidTopping[]
): number {
  const found = options.find((item) => item.name === toppingName);
  return found?.price ?? 0;
}
