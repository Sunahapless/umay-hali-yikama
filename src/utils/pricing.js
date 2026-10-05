export const servicePricing = {
  halı: { label: 'Halı', unitPrice: 65 },
  perde: { label: 'Perde', unitPrice: 350 },
  yatak: { label: 'Yatak', unitPrice: 900 },
  koltuk: { label: 'Koltuk', unitPrice: 1500 },
  yorgan: { label: 'Yorgan', unitPrice: 500 },
  battaniye: { label: 'Battaniye', unitPrice: 500 },
}

export function calculateEstimate(category, quantity) {
  const quantityValue = Number(quantity) || 0
  const unitPrice = servicePricing[category]?.unitPrice ?? 0
  return Math.max(0, quantityValue * unitPrice)
}
