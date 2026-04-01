import type { Category } from "../types";

interface CategoryFilterProps {
  categories: Category[];
  activeCategoryId: string;
  onChange: (categoryId: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategoryId,
  onChange
}: CategoryFilterProps) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={activeCategoryId === category.id ? "active" : ""}
          onClick={() => onChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
