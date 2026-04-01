import type { Category, Product, StoreSettings } from "../types";

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  singleton_key: "main",
  store_name: "Cantinho do Açaí",
  whatsapp_number: "555185868972",
  pix_key: "58137537000188",
  instagram: "@cantinho_do_açai_e_mercado",
  maps_url: "https://maps.app.goo.gl/m15d5tfcL7m9x3sd9",
  address_text: "Avenida Esperança, 1501, Guajuviras, Canoas/RS",
  opening_time: "00:00",
  closing_time: "23:59",
  manual_is_open: true
};

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-garrafa",
    name: "Açaí na Garrafa",
    slug: "acai-na-garrafa",
    display_order: 1,
    is_active: true
  },
  {
    id: "cat-acai",
    name: "Açaí",
    slug: "acai",
    display_order: 10,
    is_active: true
  },
  {
    id: "cat-pastel",
    name: "Pastel",
    slug: "pastel",
    display_order: 11,
    is_active: true
  }
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod-garrafa-300",
    category_id: "cat-garrafa",
    name: "Açaí na Garrafa - 300ml",
    slug: "acai-na-garrafa-300ml",
    description: "Açaí cremoso, geladinho e pronto para beber.",
    image_url: "/fotogarrafa.png",
    price: 20,
    old_price: null,
    promo_price: null,
    is_available: true,
    is_visible: true,
    display_order: 1,
    metadata: {
      type: "simple_options",
      freeGroup: {
        title: "Complementos grátis",
        helperText: "Escolha até 3 opções.",
        maxSelections: 3,
        options: [
          { name: "Leite condensado" },
          { name: "Leite em pó" },
          { name: "Banana" },
          { name: "MMs (Disquete)" },
          { name: "Paçoca" },
          { name: "Chocoball" },
          { name: "Granola" }
        ]
      },
      paidGroup: {
        title: "Complementos pagos",
        helperText: "Escolha até 4 opções.",
        maxSelections: 4,
        options: [
          { name: "Farinha láctea", price: 3 },
          { name: "Ovomaltine", price: 3 },
          { name: "Sucrilhos", price: 3 },
          { name: "Morango", price: 4 },
          { name: "Kiwi", price: 3 },
          { name: "Creme de avelã", price: 4 },
          { name: "Creme de chocolate branco", price: 4 },
          { name: "Creme de limão", price: 4 },
          { name: "Creme de maracujá", price: 4 },
          { name: "Creme de morango", price: 4 },
          { name: "Creme Ninho", price: 4 },
          { name: "Granola", price: 2 },
          { name: "Bis", price: 5 },
          { name: "Mousse de maracujá", price: 6 },
          { name: "Mousse de morango", price: 6 },
          { name: "Oreo", price: 5 },
          { name: "Ovomaltine premium", price: 4 },
          { name: "Stikadinho", price: 3 }
        ]
      },
      requiredChoice: {
        title: "Deseja descartáveis?",
        helperText: "Escolha 1 opção. Obrigatório.",
        required: true,
        options: ["Sim, enviar colher", "Não precisa!"]
      }
    }
  },
  {
    id: "prod-garrafa-500",
    category_id: "cat-garrafa",
    name: "Açaí na Garrafa - 500ml",
    slug: "acai-na-garrafa-500ml",
    description: "Versão econômica para compartilhar.",
    image_url: "/fotogarrafa.png",
    price: 30,
    old_price: null,
    promo_price: null,
    is_available: true,
    is_visible: true,
    display_order: 2,
    metadata: {
      type: "simple_options",
      freeGroup: {
        title: "Complementos grátis",
        helperText: "Escolha até 3 opções.",
        maxSelections: 3,
        options: [
          { name: "Leite condensado" },
          { name: "Leite em pó" },
          { name: "Banana" },
          { name: "MMs (Disquete)" },
          { name: "Paçoca" },
          { name: "Chocoball" },
          { name: "Granola" }
        ]
      },
      paidGroup: {
        title: "Complementos pagos",
        helperText: "Escolha até 4 opções.",
        maxSelections: 4,
        options: [
          { name: "Farinha láctea", price: 3 },
          { name: "Ovomaltine", price: 3 },
          { name: "Sucrilhos", price: 3 },
          { name: "Morango", price: 4 },
          { name: "Kiwi", price: 3 },
          { name: "Creme de avelã", price: 4 },
          { name: "Creme de chocolate branco", price: 4 },
          { name: "Creme de limão", price: 4 },
          { name: "Creme de maracujá", price: 4 },
          { name: "Creme de morango", price: 4 },
          { name: "Creme Ninho", price: 4 },
          { name: "Granola", price: 2 },
          { name: "Bis", price: 5 },
          { name: "Mousse de maracujá", price: 6 },
          { name: "Mousse de morango", price: 6 },
          { name: "Oreo", price: 5 },
          { name: "Ovomaltine premium", price: 4 },
          { name: "Stikadinho", price: 3 }
        ]
      },
      requiredChoice: {
        title: "Deseja descartáveis?",
        helperText: "Escolha 1 opção. Obrigatório.",
        required: true,
        options: ["Sim, enviar colher", "Não precisa!"]
      }
    }
  },
  {
    id: "prod-acai-tradicional-200ml",
    category_id: "cat-acai",
    name: "Açaí Tradicional - 200ml",
    slug: "acai-tradicional-200ml",
    description: "2 adicionais grátis incluídos.",
    image_url: "/fotocopo.png",
    price: 13,
    old_price: null,
    promo_price: null,
    is_available: true,
    is_visible: true,
    display_order: 1,
    metadata: {
      type: "acai_builder",
      hideSizeSelection: true,
      extraToppingPrice: 2,
      paidToppingPrice: 3,
      sizes: [{ label: "200ml", price: 13, includedToppings: 2 }],
      freeToppings: [
        "Leite em pó",
        "Banana",
        "Leite condensado",
        "Paçoca",
        "Granola",
        "Sucrilhos",
        "Chocoball",
        "Disquete (MM's)"
      ],
      paidToppings: [
        { name: "Morango", price: 3 },
        { name: "Kiwi", price: 3 },
        { name: "Creme de avelã", price: 3 },
        { name: "Creme de chocolate", price: 3 },
        { name: "Creme de chocolate branco", price: 3 },
        { name: "Creme de morango", price: 3 },
        { name: "Creme de ninho", price: 3 },
        { name: "Creme de maracujá", price: 3 }
      ]
    }
  },
  {
    id: "prod-acai-tradicional-300ml",
    category_id: "cat-acai",
    name: "Açaí Tradicional - 300ml",
    slug: "acai-tradicional-300ml",
    description: "3 adicionais grátis incluídos.",
    image_url: "/fotocopo.png",
    price: 15,
    old_price: null,
    promo_price: null,
    is_available: true,
    is_visible: true,
    display_order: 2,
    metadata: {
      type: "acai_builder",
      hideSizeSelection: true,
      extraToppingPrice: 2,
      paidToppingPrice: 3,
      sizes: [{ label: "300ml", price: 15, includedToppings: 3 }],
      freeToppings: [
        "Leite em pó",
        "Banana",
        "Leite condensado",
        "Paçoca",
        "Granola",
        "Sucrilhos",
        "Chocoball",
        "Disquete (MM's)"
      ],
      paidToppings: [
        { name: "Morango", price: 3 },
        { name: "Kiwi", price: 3 },
        { name: "Creme de avelã", price: 3 },
        { name: "Creme de chocolate", price: 3 },
        { name: "Creme de chocolate branco", price: 3 },
        { name: "Creme de morango", price: 3 },
        { name: "Creme de ninho", price: 3 },
        { name: "Creme de maracujá", price: 3 }
      ]
    }
  },
  {
    id: "prod-acai-tradicional-500ml",
    category_id: "cat-acai",
    name: "Açaí Tradicional - 500ml",
    slug: "acai-tradicional-500ml",
    description: "3 adicionais grátis incluídos.",
    image_url: "/fotocopo.png",
    price: 20,
    old_price: null,
    promo_price: null,
    is_available: true,
    is_visible: true,
    display_order: 3,
    metadata: {
      type: "acai_builder",
      hideSizeSelection: true,
      extraToppingPrice: 2,
      paidToppingPrice: 3,
      sizes: [{ label: "500ml", price: 20, includedToppings: 3 }],
      freeToppings: [
        "Leite em pó",
        "Banana",
        "Leite condensado",
        "Paçoca",
        "Granola",
        "Sucrilhos",
        "Chocoball",
        "Disquete (MM's)"
      ],
      paidToppings: [
        { name: "Morango", price: 3 },
        { name: "Kiwi", price: 3 },
        { name: "Creme de avelã", price: 3 },
        { name: "Creme de chocolate", price: 3 },
        { name: "Creme de chocolate branco", price: 3 },
        { name: "Creme de morango", price: 3 },
        { name: "Creme de ninho", price: 3 },
        { name: "Creme de maracujá", price: 3 }
      ]
    }
  },
  {
    id: "prod-acai-tradicional-700ml",
    category_id: "cat-acai",
    name: "Açaí Tradicional - 700ml",
    slug: "acai-tradicional-700ml",
    description: "4 adicionais grátis incluídos.",
    image_url: "/fotocopo.png",
    price: 30,
    old_price: null,
    promo_price: null,
    is_available: true,
    is_visible: true,
    display_order: 4,
    metadata: {
      type: "acai_builder",
      hideSizeSelection: true,
      extraToppingPrice: 2,
      paidToppingPrice: 3,
      sizes: [{ label: "700ml", price: 30, includedToppings: 4 }],
      freeToppings: [
        "Leite em pó",
        "Banana",
        "Leite condensado",
        "Paçoca",
        "Granola",
        "Sucrilhos",
        "Chocoball",
        "Disquete (MM's)"
      ],
      paidToppings: [
        { name: "Morango", price: 3 },
        { name: "Kiwi", price: 3 },
        { name: "Creme de avelã", price: 3 },
        { name: "Creme de chocolate", price: 3 },
        { name: "Creme de chocolate branco", price: 3 },
        { name: "Creme de morango", price: 3 },
        { name: "Creme de ninho", price: 3 },
        { name: "Creme de maracujá", price: 3 }
      ]
    }
  },
  {
    id: "prod-pastel-obrigatorio",
    category_id: "cat-pastel",
    name: "Pastel",
    slug: "pastel-tradicional",
    description: "Serve 1 pessoa. Escolha o sabor no momento do pedido.",
    image_url: "/fotopastel.png",
    price: 12,
    old_price: null,
    promo_price: null,
    is_available: true,
    is_visible: true,
    display_order: 1,
    metadata: {
      type: "simple_options",
      requiredChoice: {
        title: "Escolha o sabor do seu pastel!",
        helperText: "Escolha 1 opção. Obrigatório.",
        required: true,
        options: [
          "Calabresa sem queijo",
          "Carne com ovo",
          "Carne com queijo",
          "Carne sem ovo",
          "Queijo"
        ]
      }
    }
  }
];
