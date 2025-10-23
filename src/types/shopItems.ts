export interface ShopItem {
  id: string
  name: string
  type: "weapon" | "armor" | "accessory"
  price: number
  attack?: number | null
  defense?: number | null
  effect?: string
  description: string
}