# Shopping Provider Hooks

This project is a Typescript port of the [shopping-cart](https://github.com/epenflow/shopping-cart/tree/main) project. it provides a set of React Hooks and context for managing a shopping cart. The functionality includes adding, removing, and updating items in the cart, as well as calculating the total price and quantity of items.

# API Documentation

## Context Methods

| Method                                       | Description                                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `addToCart(product: ProductType): void`      | Adds a product to the cart. If the product already exists in the cart, it updates the quantity and total price.                |
| `removeFromCart(id: number): void`           | Removes a product from the cart by its ID. Updates the total price and quantity of the products in the cart.                   |
| `emptyCart(): void`                          | Empties the cart by clearing all products and resetting the total price and quantity.                                          |
| `removeItem(id: number): void`               | Decreases the quantity of a product in the cart by its ID. If the quantity becomes zero, the product is removed from the cart. |
| `updatePrice(products: ProductType[]): void` | Updates the total price of the products in the cart and dispatches an action to update the state.                              |

## Context State

| State                    | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| `isTotal: boolean`       | Indicates whether the total price is greater than zero.    |
| `isQuantity: boolean`    | Indicates whether the total quantity is greater than zero. |
| `isEmpty: boolean`       | Indicates whether the cart is empty.                       |
| `totalItems: number`     | The total number of items in the cart.                     |
| `product: ProductType[]` | The array of products in the cart.                         |
| `total: number`          | The total price of the products in the cart.               |
| `quantity: number`       | The total quantity of the products in the cart.            |

## Interfaces

### `ProductType`

Represents a product in the shopping cart.

| Property   | Type   | Description                                      |
| ---------- | ------ | ------------------------------------------------ |
| `id`       | number | The unique identifier of the product.            |
| `name`     | string | The name of the product.                         |
| `price`    | number | The price of the product.                        |
| `quantity` | number | The quantity of the product in the cart.         |
| `total`    | number | The total price for the quantity of the product. |

### `ShoppingStateType`

Represents the state of the shopping cart.

| Property   | Type            | Description                                     |
| ---------- | --------------- | ----------------------------------------------- |
| `total`    | number          | The total price of all products in the cart.    |
| `quantity` | number          | The total quantity of all products in the cart. |
| `product`  | `ProductType[]` | The array of products in the cart.              |

### `ActionType`

Represents an action to be dispatched to the reducer.

| Property  | Type                         | Description                                                                                                                                                          |
| --------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | string                       | The type of action to be performed. Possible values: `'ADD TO CART'`, `'REMOVE FROM CART'`, `'UPDATE PRICE'`, `'UPDATE QUANTITY'`, `'CLEAR CARTS'`, `'REMOVE ITEM'`. |
| `payload` | `Partial<ShoppingStateType>` | The payload containing the data to update the state.                                                                                                                 |

## Initial State

### `initialState`

The initial state of the shopping cart.

| Property   | Type            | Description                        |
| ---------- | --------------- | ---------------------------------- |
| `total`    | number          | Initial total price (0).           |
| `quantity` | number          | Initial total quantity (0).        |
| `product`  | `ProductType[]` | Initial array of products (empty). |

## Reducer

### `ShoppingReducer`

The reducer function to handle actions and update the state.

#### Parameters

| Parameter | Type                | Description                             |
| --------- | ------------------- | --------------------------------------- |
| `state`   | `ShoppingStateType` | The current state of the shopping cart. |
| `actions` | `ActionType`        | The action to be performed.             |

#### Returns

| Type                | Description                             |
| ------------------- | --------------------------------------- |
| `ShoppingStateType` | The updated state of the shopping cart. |

#### Action Types

-   **`ADD TO CART`**: Adds a product to the cart.
-   **`REMOVE FROM CART`**: Removes a product from the cart by its ID.
-   **`UPDATE PRICE`**: Updates the total price of the products in the cart.
-   **`UPDATE QUANTITY`**: Updates the total quantity of the products in the cart.
-   **`CLEAR CARTS`**: Empties the cart by clearing all products and resetting the total price and quantity.
-   **`REMOVE ITEM`**: Decreases the quantity of a product in the cart by its ID. If the quantity becomes zero, the product is removed from the cart.

## Example Usage

### ShoppingProvider

Wrap your application with the `ShoppingProvider` to provide the shopping context to your components.

```tsx
import { ShoppingProvider } from './context/shopping-provider';

function App() {
	return (
		<ShoppingProvider>
			<YourComponent />
		</ShoppingProvider>
	);
}
```

### useCart Hook

Use the `useCart` hook to access the shopping context in your components

```tsx
import { useCart } from './context/shopping-provider';

function YourComponent() {
	const {
		addToCart,
		removeFromCart,
		emptyCart,
		removeItem,
		updatePrice,
		isTotal,
		isQuantity,
		isEmpty,
		totalItems,
		product,
		total,
		quantity,
	} = useCart();

	// Example usage
	const handleAddToCart = (product) => {
		addToCart(product);
	};

	return (
		<div>
			<button onClick={() => handleAddToCart(product)}>
				Add to Cart
			</button>
			<div>Total Items: {totalItems}</div>
			<div>Total Price: {total}</div>
		</div>
	);
}
```

### ShoppingReducer

```tsx
import {
	ShoppingReducer,
	initialState,
	ActionType,
	ShoppingStateType,
} from './path-to-reducer';

// Example of using the reducer with React's useReducer hook
const [state, dispatch] = React.useReducer<
	React.Reducer<ShoppingStateType, ActionType>
>(ShoppingReducer, initialState);

// Dispatching an action to add a product to the cart
dispatch({
	type: 'ADD TO CART',
	payload: {
		product: [
			{ id: 1, name: 'Product 1', price: 100, quantity: 1, total: 100 },
		],
	},
});
```
