/**
 * Componente SelectedItemsList
 * Design: Graffiti Colorido Playful
 * Exibe lista de itens selecionados com opção de remover
 */

import { SelectedItem } from '@/types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import styles from './SelectedItemsList.module.css';

interface SelectedItemsListProps {
  items: SelectedItem[];
  onRemoveItem: (itemId: string) => void;
}

export function SelectedItemsList({ items, onRemoveItem }: SelectedItemsListProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Nenhum item selecionado</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Itens Selecionados</h3>
      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemContent}>
              <div className={styles.itemInfo}>
                <span className={styles.itemCategory}>{item.categoryName}</span>
                <span className={styles.itemName}>{item.optionName}</span>
              </div>
              <span className={styles.itemValue}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(item.value)}
              </span>
            </div>
            <button
              className={styles.removeBtn}
              onClick={() => onRemoveItem(item.id)}
              title="Remover item"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
