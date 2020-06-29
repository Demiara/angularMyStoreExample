import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      {
        name: 'Phone XL',
        price: 799,
        inStock: 2,
        description: 'A large phone with one of the best screens'
      },
      {
        name: 'Phone Mini',
        price: 299,
        inStock: 3,
        description: 'A great phone with one of the best cameras'
      },
      {
        name: 'Phone Additional',
        price: 599,
        inStock: 1,
        description: 'A great phone for those who like comfort'
      },
      {
        name: 'Phone Standard',
        price: 299,
        inStock: 0,
        description: ''
      }
    ];
    return {products};
  }
}
