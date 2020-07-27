import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const products = [
            {
                id: 1,
                name: 'Apple iPhone 11 64GB Black (MWLT2RU/A)',
                price: 799,
                inStock: 2,
                description: 'A large phone with one of the best screens',
                fullDescription:
                    'Phone XL dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
                id: 2,
                name: 'Apple iPhone SE 2020 128GB Black (MXD02RU/A)',
                price: 299,
                inStock: 3,
                description: 'A great phone with one of the best cameras',
                fullDescription:
                    'Phone Mini dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
                id: 3,
                name: 'Apple iPhone XR 64GB Black (MRY42RU/A)',
                price: 599,
                inStock: 0,
                description: 'A great phone for those who like comfort',
                fullDescription:
                    'Phone Additional dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
                id: 4,
                name: 'Apple iPhone 11 64GB White (MWLU2RU/A)',
                price: 299,
                inStock: 0,
                description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
                fullDescription: '',
            },
            {
                id: 5,
                name: 'Samsung Galaxy S20 Gray (SM-G980F/DS)',
                price: 799,
                inStock: 5,
                description: 'Dolor sit amet, consectetur adipiscing elit',
                fullDescription: '',
            },
            {
                id: 6,
                name: 'Samsung Galaxy A01 Black (SM-A015F/DS)',
                price: 469,
                inStock: 6,
                description: 'Reprehenderit in voluptate velit esse cillum dolore eu fugiat',
                fullDescription: '',
            },
            {
                id: 7,
                name: 'Huawei P40 Pro+ Black Ceramic (ELS-N39)',
                price: 869,
                inStock: 2,
                description: 'Sunt in culpa qui officia deserunt mol',
                fullDescription: '',
            },
            {
                id: 8,
                name: 'Huawei P40 Lite Crush Green (JNY-LX1)',
                price: 269,
                inStock: 0,
                description: 'Ut enim ad minim veniam, quis nostrud exercitation',
                fullDescription: '',
            },
            {
                id: 9,
                name: 'Xiaomi Redmi 7A 32GB Matte Black',
                price: 99,
                inStock: 2,
                description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
                fullDescription: '',
            },
            {
                id: 10,
                name: 'Xiaomi Mi Note 10 Lite 128GB Midnight Black',
                price: 499,
                inStock: 2,
                description: 'Incididunt ut labore et dolore magna aliqua',
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
