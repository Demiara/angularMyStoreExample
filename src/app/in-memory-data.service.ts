import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      {
        id: 1,
        name: 'Phone XL',
        price: 799,
        inStock: 2,
        description: 'A large phone with one of the best screens'
      },
      {
        id: 2,
        name: 'Phone Mini',
        price: 299,
        inStock: 3,
        description: 'A great phone with one of the best cameras'
      },
      {
        id: 3,
        name: 'Phone Additional',
        price: 599,
        inStock: 1,
        description: 'A great phone for those who like comfort'
      },
      {
        id: 4,
        name: 'Phone Standard',
        price: 299,
        inStock: 0,
        description: ''
      }
    ];
    return {products};
  }
}