import { equipmentRecipesData } from "@/constant/equipmentRecipesData";
import { prisma } from "@/lib/prisma";
import { MaterialType } from "@prisma/client";

export default async function seedEquipmentRecipes() {
  for (const recipe of equipmentRecipesData) {
    // materialType に応じて参照先カラムを切り替える
    const data =
      recipe.materialType === "ENEMY"
        ? {
            monsterMaterialId: recipe.materialId,
            normalMaterialId: null,
          }
        : {
            monsterMaterialId: null,
            normalMaterialId: recipe.materialId,
          };

    await prisma.mstEquipmentRecipe.upsert({
      where: { id: `${recipe.equipmentId}_${recipe.materialId}` },
      update: {
        equipmentId: recipe.equipmentId,
        materialType: recipe.materialType as MaterialType,
        quantity: recipe.quantity,
        ...data,
      },
      create: {
        id: `${recipe.equipmentId}_${recipe.materialId}`,
        equipmentId: recipe.equipmentId,
        materialType: recipe.materialType as MaterialType,
        quantity: recipe.quantity,
        ...data,
      },
    });
  }

  console.log("✅ MstEquipmentRecipe seeding complete");
}
