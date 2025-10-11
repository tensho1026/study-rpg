export interface ShopItem {
  id: string
  name: string
  type: "weapon" | "armor" | "accessory"
  price: number
  attack?: number
  defense?: number
  effect?: string
  description: string
}