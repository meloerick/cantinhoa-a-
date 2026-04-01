export interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  is_active: boolean;
}

export interface AcaiSizeOption {
  label: string;
  price: number;
  includedToppings: number;
}

export interface AcaiPaidTopping {
  name: string;
  price: number;
}

export interface SimpleOptionItem {
  name: string;
  price?: number;
}

export interface SimpleOptionsGroup {
  title: string;
  helperText?: string;
  maxSelections: number;
  options: SimpleOptionItem[];
}

export interface RequiredChoiceGroup {
  title: string;
  helperText?: string;
  required: boolean;
  options: string[];
}

export interface SimpleOptionsConfig {
  type: "simple_options";
  freeGroup?: SimpleOptionsGroup;
  paidGroup?: SimpleOptionsGroup;
  requiredChoice?: RequiredChoiceGroup;
}

export interface AcaiBuilderConfig {
  type: "acai_builder";
  hideSizeSelection?: boolean;
  extraToppingPrice: number;
  paidToppingPrice: number;
  sizes: AcaiSizeOption[];
  freeToppings: string[];
  paidToppings: AcaiPaidTopping[];
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  price: number;
  old_price: number | null;
  promo_price: number | null;
  is_available: boolean;
  is_visible: boolean;
  display_order: number;
  metadata: unknown;
}

export interface StoreSettings {
  singleton_key: string;
  store_name: string;
  whatsapp_number: string;
  pix_key: string;
  instagram: string;
  maps_url: string;
  address_text: string;
  opening_time: string;
  closing_time: string;
  manual_is_open: boolean;
}

export interface CartCustomization {
  sizeLabel?: string;
  freeToppings?: string[];
  paidToppings?: string[];
  extraFreeToppings?: string[];
  utensilChoice?: string;
  requiredChoiceTitle?: string;
  requiredChoiceValue?: string;
  notes?: string;
}

export interface CartItem {
  lineId: string;
  productId: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customization?: CartCustomization;
}

export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  addressLine: string;
  addressNumber: string;
  addressComplement: string;
  neighborhood: string;
  referencePoint: string;
  paymentMethod: string;
  notes: string;
}
