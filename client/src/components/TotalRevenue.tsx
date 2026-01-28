/**
 * Componente TotalRevenue\n * Design: Graffiti Colorido Playful
 * Exibe o total de receita da mecânica
 */

import { Button } from '@/components/ui/button';
import styles from './TotalRevenue.module.css';

interface TotalRevenueProps {
  total: number;
  itemCount: number;
  onClearAll: () => void;
}

export function TotalRevenue({ total, itemCount, onClearAll }: TotalRevenueProps) {
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(total);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Receita Total</h2>
          <span className={styles.badge}>{itemCount} itens</span>
        </div>

        <div className={styles.valueSection}>
          <div className={styles.value}>{formattedTotal}</div>
          <p className={styles.subtitle}>Receita acumulada da mecânica</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total de Itens</span>
            <span className={styles.statValue}>{itemCount}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Média por Item</span>
            <span className={styles.statValue}>
              {itemCount > 0
                ? new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(total / itemCount)
                : 'R$ 0,00'}
            </span>
          </div>
        </div>

        <Button
          variant="destructive"
          onClick={onClearAll}
          className={styles.clearBtn}
        >
          Limpar Tudo
        </Button>
      </div>
    </div>
  );
}
