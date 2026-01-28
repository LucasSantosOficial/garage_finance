/**
 * Hook para gerenciar o estado da mecânica com valores pré-setados
 * Design: Graffiti Colorido Playful
 */

import { useState, useCallback, useEffect } from 'react';
import { SelectedItem, DEFAULT_CATEGORIES } from '@/types';

const STORAGE_KEY = 'garage_finance_state';

export function useGarageState() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSelectedItems(data.selectedItems || []);
        calculateTotal(data.selectedItems || []);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
  }, []);

  // Salvar dados no localStorage sempre que selectedItems mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedItems, totalRevenue }));
  }, [selectedItems, totalRevenue]);

  const calculateTotal = useCallback((items: SelectedItem[]) => {
    const total = items.reduce((sum, item) => sum + item.value, 0);
    setTotalRevenue(total);
  }, []);

  const addItem = useCallback(
    (categoryId: string, categoryName: string, optionName: string, value: number) => {
      const newItem: SelectedItem = {
        id: Date.now().toString() + Math.random(),
        categoryId,
        categoryName,
        optionName,
        value,
        timestamp: new Date(),
      };
      const updated = [...selectedItems, newItem];
      setSelectedItems(updated);
      calculateTotal(updated);
    },
    [selectedItems, calculateTotal]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      const updated = selectedItems.filter((item) => item.id !== itemId);
      setSelectedItems(updated);
      calculateTotal(updated);
    },
    [selectedItems, calculateTotal]
  );

  const clearAll = useCallback(() => {
    setSelectedItems([]);
    setTotalRevenue(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    categories: DEFAULT_CATEGORIES,
    selectedItems,
    totalRevenue,
    addItem,
    removeItem,
    clearAll,
  };
}
