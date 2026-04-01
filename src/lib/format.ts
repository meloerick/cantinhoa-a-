export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function cleanPhoneNumber(rawValue: string): string {
  return rawValue.replace(/\D/g, "");
}

export function formatTime(time: string): string {
  return time.slice(0, 5);
}
