/**
 * Página Home - Controle Financeiro da Mecânica
 * Design: Graffiti Colorido Playful
 */

import { useGarageState } from '@/hooks/useGarageState';
import { ServiceCategory } from '@/components/ServiceCategory';
import { SelectedItemsList } from '@/components/SelectedItemsList';
import { TotalRevenue } from '@/components/TotalRevenue';
import { Button } from '@/components/ui/button';
import styles from './Home.module.css';

export default function Home() {
  const {
    categories,
    selectedItems,
    totalRevenue,
    addItem,
    removeItem,
    clearAll,
  } = useGarageState();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1 className={styles.title}>🏎️ Garage Finance</h1>
            <p className={styles.subtitle}>Controle Financeiro da Mecânica</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.layout}>
          {/* Sidebar - Total Revenue + Selected Items */}
          <aside className={styles.sidebar}>
            <TotalRevenue
              total={totalRevenue}
              itemCount={selectedItems.length}
              onClearAll={clearAll}
            />
            <SelectedItemsList
              items={selectedItems}
              onRemoveItem={removeItem}
            />
          </aside>

          {/* Main Content - Services */}
          <section className={styles.content}>
            <div className={styles.grid}>
              {categories.map((category) => (
                <ServiceCategory
                  key={category.id}
                  category={category}
                  onSelectOption={addItem}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Background Pattern */}
      <div className={styles.backgroundPattern} />
    </div>
  );
}
