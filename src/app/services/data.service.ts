import { computed, Injectable, signal } from '@angular/core';

import { faker } from '@faker-js/faker';

export enum SensorType {
  Temperature = 'Temperature',
  Humidity = 'Humidity',
  Light = 'Light',
}

export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  data: { date: number; value: number }[];
}

export function createRandomSensorData(v: unknown, index: number): Sensor {
  const type = faker.helpers.arrayElement(Object.values(SensorType));

  return {
    id: faker.string.uuid(),
    name: `Block ${index + 1} - ${type}`,
    type: type,
    data: (function () {
      const data: Sensor['data'] = [];
      const currentYear = new Date().getFullYear();

      for (let month = 0; month < 12; month++) {
        const date = new Date(currentYear, month, 1);
        const value = faker.number.int({ min: 0, max: 100 });
        data.push({ date: date.getTime(), value });
      }

      return data;
    })(),
  };
}

export const fakeSensorsData = faker.helpers.multiple(createRandomSensorData, {
  count: {
    min: 5,
    max: 15,
  },
});

@Injectable()
export class DataService {
  #sensors = signal<Sensor[]>([]);
  sensors = computed(() => this.#sensors());

  loadData(): void {
    this.#sensors.set(fakeSensorsData);
  }
}
