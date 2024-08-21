# Shopping Provider Hooks

This project is a Typescript port of the [shopping-cart](https://github.com/epenflow/shopping-cart/tree/main) project. ite provides a set of React Hooks and context for managing a shopping cart. The functionality includes adding, removing, and updating items in the cart, as well as calculating the total price and quantity of items.

## Usage

```tsx
import React from 'react';
import { ShoppingProvider } from './path/to/ShoppingProvider';
const App: React.FC = () => {
	return (
		<ShoppingProvider>
			<YourComponent />
		</ShoppingProvider>
	);
};

export default App;
```

# API

## Context Methods

### `addToCart(product: ProductType): void`

Adds a product to the cart. If the product already exists in the cart, it updates the quantity and total price.

### `removeFromCart(id: number): void`

Removes a product from the cart by its ID. Updates the total price and quantity of the products in the cart.

### `emptyCart(): void`

Empties the cart by clearing all products and resetting the total price and quantity.

### `removeItem(id: number): void`

Decreases the quantity of a product in the cart by its ID. If the quantity becomes zero, the product is removed from the cart.

### `updatePrice(products: ProductType[]): void`

Updates the total price of the products in the cart and dispatches an action to update the state.

## Context State

### `isTotal: boolean`

Indicates whether the total price is greater than zero.

### `isQuantity: boolean`

Indicates whether the total quantity is greater than zero.

### `isEmpty: boolean`

Indicates whether the cart is empty.

### `totalItems: number`

The total number of items in the cart.

### `product: ProductType[]`

The array of products in the cart.

### `total: number`

The total price of the products in the cart.

### `quantity: number`

The total quantity of the products in the cart.
