export interface TaskCategory {
  name: string;
  tasks: string[];
  conditions?: string[];
}

export const taskCategories: Record<string, TaskCategory> = {
  base: {
    name: 'База',
    tasks: [
      'Мыть посуду',
      'Стирка', 
      'Пылесосить',
      'Мусор',
      'Оплата счетов',
      'Покупки',
      'Готовка',
      'Мыть полы',
      'Полив растений',
      'Разбор шкафов',
      'Уборка кухни',
      'Ванна и туалет',
      'Протирка пыли',
      'Стелить постель',
      'Мелкий ремонт',
      'Сборка мебели',
      'Мыть окна'
    ]
  },
  management: {
    name: 'Менеджмент',
    tasks: [
      'Список покупок',
      'Бюджет',
      'Список дел',
      'Задачи по уборке',
      'Отпуск',
      'Подарки',
      'Расходники',
      'Обустройство дома',
      'Крупные покупки',
      'Семейные активности',
      'Свидания',
      'Зарядка устройств',
      'Визиты к врачам',
      'Заказ еды',
      'Меню',
      'Коммуникация'
    ]
  },
  home: {
    name: 'Дом',
    tasks: ['Уборка снега', 'Газон'],
    conditions: ['house']
  },
  children: {
    name: 'Дети',
    tasks: [
      'Школа',
      'Коммуникация с школой',
      'Питание',
      'Досуг',
      'Правила',
      'Прививки',
      'Домашка',
      'Гаджеты'
    ],
    conditions: ['hasChildren']
  },
  car: {
    name: 'Машина',
    tasks: ['ТО', 'Страховка', 'Топливо'],
    conditions: ['hasCar']
  },
  pets: {
    name: 'Животное',
    tasks: ['Кормление', 'Ветеринар', 'Прогулки'],
    conditions: ['hasPets']
  }
};

export function generateTasks(conditions: {
  homeType: string;
  hasChildren: boolean;
  hasPets: boolean;
  hasCar: boolean;
}): Array<{ name: string; category: string }> {
  const tasks: Array<{ name: string; category: string }> = [];

  // Always include base and management tasks
  tasks.push(...taskCategories.base.tasks.map(task => ({ name: task, category: 'База' })));
  tasks.push(...taskCategories.management.tasks.map(task => ({ name: task, category: 'Менеджмент' })));

  // Add conditional tasks
  if (conditions.homeType === 'house') {
    tasks.push(...taskCategories.home.tasks.map(task => ({ name: task, category: 'Дом' })));
  }

  if (conditions.hasChildren) {
    tasks.push(...taskCategories.children.tasks.map(task => ({ name: task, category: 'Дети' })));
  }

  if (conditions.hasCar) {
    tasks.push(...taskCategories.car.tasks.map(task => ({ name: task, category: 'Машина' })));
  }

  if (conditions.hasPets) {
    tasks.push(...taskCategories.pets.tasks.map(task => ({ name: task, category: 'Животное' })));
  }

  return tasks;
}

export const supportiveMessages = [
  'Great teamwork!',
  'Здорово, когда задачи делятся!',
  'Поддержка и партнёрство делают жизнь легче',
  'Collaborative approach strengthens relationships!',
  'Perfect example of shared responsibility!'
];

export const researchQuotes = [
  '"Fair distribution of household responsibilities is associated with higher relationship satisfaction" — Journal of Marriage and Family, 2019',
  '"When partners share household tasks equally, both report lower stress levels and greater life satisfaction" — American Psychological Association, 2020',
  '"Household labor sharing reduces mental load and improves overall well-being for both partners" — Mental Load Study, 2017'
];
