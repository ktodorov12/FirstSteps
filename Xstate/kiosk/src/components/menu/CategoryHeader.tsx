import type { FC } from "react";

interface CategoryHeaderProps {
  title: string;
  subtitle: string;
}

const CategoryHeader: FC<CategoryHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-extrabold font-headline tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-on-surface-variant font-medium">{subtitle}</p>
    </header>
  );
};

export default CategoryHeader;
