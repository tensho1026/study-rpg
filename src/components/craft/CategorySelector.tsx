import { Shield, Swords } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const categoryOptions = [
  { id: "weapon", label: "武器", icon: Swords },
  { id: "armor", label: "防具", icon: Shield },
] as const;

type ActiveCategoryType = "weapon" | "armor";

type Props = {
  activeCategory: ActiveCategoryType;
  setActiveCategory: (category: ActiveCategoryType) => void;
};

export default function CategorySelector({
  setActiveCategory,
  activeCategory,
}: Props) {
  return (
    <section className="mt-8">
      <div className="flex flex-wrap gap-3">
        {categoryOptions.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border-2 border-white/20 bg-slate-800/60 px-4 py-2 font-[pixel] tracking-wider transition-all hover:bg-slate-700 hover:text-yellow-100",
                activeCategory === category.id &&
                  "border-yellow-400 text-yellow-200 shadow-[0_0_8px_rgba(255,220,120,0.5)]"
              )}
            >
              <Icon className="size-4" />
              {category.label}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
