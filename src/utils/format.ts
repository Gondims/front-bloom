export function formatPrice(value: number | undefined): string {
  if (value === undefined) return ''; 
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}