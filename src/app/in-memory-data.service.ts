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
                description: 'A large phone with one of the best screens',
                fullDescription:
                    'Phone XL dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
                id: 2,
                name: 'Phone Mini',
                price: 299,
                inStock: 3,
                description: 'A great phone with one of the best cameras',
                fullDescription:
                    'Phone Mini dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
                id: 3,
                name: 'Phone Additional',
                price: 599,
                inStock: 0,
                description: 'A great phone for those who like comfort',
                fullDescription:
                    'Phone Additional dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
                id: 4,
                name: 'Phone Standard',
                price: 299,
                inStock: 0,
                description: '',
                fullDescription: '',
            },
        ];

        const orders = [
            {
                id: 1,
                userName: 'John Brook',
                userPhone: '7365429384',
                userAddress: '',
                orderPrice: 599,
                shipping: 2,
                orderProducts: [
                    {
                        productId: 1,
                        quantity: 2,
                    },
                    {
                        productId: 3,
                        quantity: 1,
                    },
                ],
                canceled: false,
            },
            {
                id: 2,
                userName: 'Mike Brook',
                userPhone: '7365435454',
                userAddress: '',
                orderPrice: 999,
                shipping: 3,
                orderProducts: [
                    {
                        productId: 3,
                        quantity: 1,
                    },
                    {
                        productId: 4,
                        quantity: 2,
                    },
                ],
                canceled: true,
            },
        ];
        return { products, orders };
    }
}
