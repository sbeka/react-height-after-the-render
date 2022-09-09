import { Client } from './types';

export function getLabelType(type: string) {
  switch (type) {
    case 'delivery':
      return 'Доставка';

    case 'pickup':
      return 'Подбирать';

    default:
      return 'Неизвестно';
  }
}

export const getClientById = (clients: Client[], clientId: number) => {
  return clients?.find(client => client.id === clientId) || null;
}
