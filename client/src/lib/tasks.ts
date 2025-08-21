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
      'Выносить мусор',
      'Оплата счетов',
      'Покупки',
      'Готовка',
      'Мыть полы',
      'Полив растений',
      'Разбор шкафов',
      'Уборка кухни',
      'Уборка ванной и туалета',
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
      'Планирование бюджета',
      'Список дел',
      'Распределение задач по уборке',
      'Планирвоание отпуска',
      'Покупка подарков',
      'Заказ расходникоа',
      'Обустройство дома',
      'Планирование крупных покупок',
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
    tasks: ['Уборка снега', 'Стрижка газона'],
    conditions: ['house']
  },
  children: {
    name: 'Дети',
    tasks: [
      'Отвезти в сад/школу',
      'Коммуникация со школой',
      'Организовать питание',
      'Организовать досуг',
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
    name: 'Животные',
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
  'Отличная работа в команде!',
  'Здорово, когда задачи делятся!',
  'Поддержка и партнёрство делают жизнь легче',
  'Совместный подход укрепляет отношения!',
  'Прекрасный пример общей ответственности!'
];

export const researchQuotes = [
  '"Справедливое распределение домашних обязанностей связано с более высоким уровнем удовлетворённости отношениями" — Journal of Marriage and Family, 2019',
  '"Когда мужчины берут на себя больше задач по дому, женщины демонстрируют меньше симптомов стресса и выгорания" — American Psychological Association, 2020',
  '"Домашний труд и забота о детях — это не только физические действия, но и когнитивная и эмоциональная нагрузка" — Mental Load Study, 2017'
];
