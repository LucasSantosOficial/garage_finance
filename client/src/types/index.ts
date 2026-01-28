/**
 * Tipos para o sistema de controle financeiro da mecânica
 * Design: Graffiti Colorido Playful
 */

export interface PresetOption {
  id: string;
  name: string;
  value: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  options: PresetOption[];
  color: 'blue' | 'orange' | 'lime' | 'pink' | 'purple' | 'cyan';
}

export interface SelectedItem {
  id: string;
  categoryId: string;
  categoryName: string;
  optionName: string;
  value: number;
  timestamp: Date;
}

export interface GarageState {
  categories: ServiceCategory[];
  selectedItems: SelectedItem[];
  totalRevenue: number;
  lastUpdated: Date;
}

export type ColorType = 'blue' | 'orange' | 'lime' | 'pink' | 'purple' | 'cyan';

export const colorMap: Record<ColorType, string> = {
  blue: '#0066FF',
  orange: '#FF9500',
  lime: '#CCFF00',
  pink: '#FF1493',
  purple: '#9D4EDD',
  cyan: '#00D9FF',
};

export const colorTailwind: Record<ColorType, string> = {
  blue: 'border-blue-600 bg-blue-50',
  orange: 'border-orange-500 bg-orange-50',
  lime: 'border-lime-400 bg-lime-50',
  pink: 'border-pink-500 bg-pink-50',
  purple: 'border-purple-600 bg-purple-50',
  cyan: 'border-cyan-400 bg-cyan-50',
};

// Categorias pré-definidas com opções de valores
export const DEFAULT_CATEGORIES: ServiceCategory[] = [
  {
    id: '1',
    name: 'Melhorias',
    description: 'Modificações e melhorias no carro',
    color: 'blue',
    options: [
      { id: '1-1', name: 'Freio', value: 80000 },
      { id: '1-2', name: 'Motor', value: 80000 },
      { id: '1-3', name: 'Suspensão', value: 80000 },
      { id: '1-4', name: 'Blindagem', value: 105000 },
      { id: '1-5', name: 'Transmissão', value: 80000 },
      { id: '1-6', name: 'Turbo', value: 100000 },
    ],
  },
  {
    id: '2',
    name: 'Modificação',
    description: 'Modificações separadas no carro',
    color: 'orange',
    options: [
      { id: '2-1', name: '+1', value: 20000 },
      { id: '2-2', name: '-1', value: -20000 },
    ],
  },
  {
    id: '3',
    name: 'Full-Tunning',
    description: 'Tunagem completa no carro',
    color: 'lime',
    options: [
      { id: '3-1', name: 'Blindagem', value: 525000 },
      { id: '3-2', name: 'Sem Blindagem', value: 420000 },
    ],
  },
  {
    id: '4',
    name: 'Reparo',
    description: 'Reparo no carro dentro da mecânica',
    color: 'pink',
    options: [
      { id: '4-1', name: 'Adicionar', value: 10000 },
      { id: '4-2', name: 'Remover', value: -10000 },
    ],
  },
  {
    id: '5',
    name: 'Xenons',
    description: 'Adicione um Xenon completo ou apenas 1 cor',
    color: 'purple',
    options: [
      { id: '5-1', name: 'Completo', value: 40000 },
      { id: '5-2', name: 'Apenas Cor', value: 20000 },
    ],
  },
  {
    id: '6',
    name: 'Neons',
    description: 'Adicione um Neon completo ou apenas 1 cor',
    color: 'cyan',
    options: [
      { id: '6-1', name: 'Completo', value: 100000 },
      { id: '6-2', name: 'Apenas cor', value: 20000 },
    ],
  },
];
