/**
 * Componente ServiceCategory
 * Design: Graffiti Colorido Playful (cards sólidos)
 */

import { ServiceCategory as ServiceCategoryType, colorMap } from '@/types';
import { Button } from '@/components/ui/button';
import styles from './ServiceCategory.module.css';

interface ServiceCategoryProps {
  category: ServiceCategoryType;
  onSelectOption: (
    categoryId: string,
    categoryName: string,
    optionName: string,
    value: number
  ) => void;
}

export function ServiceCategory({ category, onSelectOption }: ServiceCategoryProps) {
  return (
    <div
      className={styles.card}
      style={
        {
          '--card-color': colorMap[category.color],
        } as React.CSSProperties
      }
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.colorDot} />
          <div>
            <h3 className={styles.title}>{category.name}</h3>
            <p className={styles.description}>{category.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.optionsGrid}>
        {category.options.map((option) => (
          <Button
            key={option.id}
            onClick={() =>
              onSelectOption(
                category.id,
                category.name,
                option.name,
                option.value
              )
            }
            className={styles.optionBtn}
          >
            <span className={styles.optionName}>{option.name}</span>
            <span className={styles.optionValue}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(option.value)}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
