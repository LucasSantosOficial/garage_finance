/**
 * Componente ServiceCategory
 * Design: Graffiti Colorido Playful
 * Exibe uma categoria com botões de opções pré-setadas
 */

import { ServiceCategory as ServiceCategoryType, colorMap } from '@/types';
import { Button } from '@/components/ui/button';
import styles from './ServiceCategory.module.css';

interface ServiceCategoryProps {
  category: ServiceCategoryType;
  onSelectOption: (categoryId: string, categoryName: string, optionName: string, value: number) => void;
}

export function ServiceCategory({ category, onSelectOption }: ServiceCategoryProps) {
  return (
    <div
      className={styles.card}
      style={{
        borderColor: colorMap[category.color],
        backgroundColor: `${colorMap[category.color]}08`,
      }}
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div
            className={styles.colorDot}
            style={{ backgroundColor: colorMap[category.color] }}
          />
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
              onSelectOption(category.id, category.name, option.name, option.value)
            }
            className={styles.optionBtn}
            style={{
              backgroundColor: colorMap[category.color],
              borderColor: colorMap[category.color],
            }}
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
