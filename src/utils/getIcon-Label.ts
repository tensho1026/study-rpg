export const getTabLabel = (type: "weapon" | "armor" | "accessory") => {
  switch (type) {
    case "weapon":
      return "武器";
    case "armor":
      return "防具";
    case "accessory":
      return "装飾品";
  }
};

export const getItemIcon = (type: "weapon" | "armor" | "accessory") => {
  switch (type) {
    case "weapon":
      return "⚔️";
    case "armor":
      return "🛡️";
    case "accessory":
      return "💍";
  }
};
