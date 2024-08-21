import React from 'react';
import {
	ActionType,
	initialState,
	ProductType,
	ShoppingReducer,
	ShoppingStateType,
} from '../reducer/shopping-reducer';
interface ShoppingContextMethodType {
	addToCart: (product: ProductType) => void;
	removeFromCart: (id: number) => void;
	emptyCart: () => void;
	removeItem: (id: number) => void;
	updatePrice: (products: ProductType[]) => void;
}
interface ShoppingContextStateType {
	isTotal: boolean;
	isQuantity: boolean;
	isEmpty: boolean;
	totalItems: number;
}
interface ShoppingContextType
	extends ShoppingContextMethodType,
		ShoppingContextStateType,
		ShoppingStateType {}
const ShoppingContext = React.createContext<ShoppingContextType>({
	...initialState,
	totalItems: 0,
	isTotal: false,
	isQuantity: false,
	isEmpty: false,
	addToCart: () => {},
	removeFromCart: () => {},
	emptyCart: () => {},
	removeItem: () => {},
	updatePrice: () => {},
});
interface ShoppingProviderProps {
	children: React.ReactNode;
}
export const ShoppingProvider = ({ children }: ShoppingProviderProps) => {
	/** React.useReducer - initial state */
	const [state, dispatch] = React.useReducer<
		React.Reducer<ShoppingStateType, ActionType>
	>(ShoppingReducer, initialState);
	/** React.useState - initial state */
	const [isTotal, setTotal] = React.useState<boolean>(false);
	const [isQuantity, setQuantity] = React.useState<boolean>(false);
	const [isEmpty, setEmpty] = React.useState<boolean>(false);
	/**
	 * Check if cart empty or not
	 * if cart empty setEmpty true
	 */
	const memoizeCart = React.useMemo(() => {
		return !(!isQuantity || !isTotal);
	}, [isQuantity, isTotal]);
	React.useEffect(() => {
		setEmpty(memoizeCart);
	}, [memoizeCart]);

	/** Cart method */

	/**
	 * ### Update Price - Method
	 * - Updates the total of the products in the cart
	 * and dispatches an action to update the state
	 * @param {Array<ProductType>} products - An array of products to calculate the total price from.
	 * @returns {void}
	 */
	function updatePrice(products: ProductType[]): void {
		let total = 0;
		products.forEach((product) => (total += product.total));
		setTotal(total > 0);
		dispatch({
			type: 'UPDATE PRICE',
			payload: {
				total,
			},
		});
	}
	/**
	 * ### Update Quantity - Method
	 * - Updates the total quantity of the products in the cart and dispatches an
	 * action to update the state
	 * @param {Array<ProductType>} products - an array to of products to calculate the total
	 * quantity from
	 * @returns {void}
	 */
	function updateQuantity(products: ProductType[]): void {
		let quantity = 0;
		products.forEach((product) => (quantity += product.quantity));
		setQuantity(quantity > 0);
		dispatch({
			type: 'UPDATE QUANTITY',
			payload: {
				quantity,
			},
		});
	}
	/**
	 * ### Add to Cart - Method
	 * - Adds a product to the cart. If the product already exists in the cart,
	 * it updates the quantity and total price
	 *
	 * @param {ProductType} product - The product to be added to the cart
	 * @returns {void}
	 */
	function addToCart(product: ProductType): void {
		const updateCart = [...state.product];
		const cartIndex = state.product.findIndex(
			(index) => index.id === product.id,
		);
		if (cartIndex < 0) {
			updateCart.push({
				...product,
				quantity: 1,
				total: product.price,
			});
		} else {
			const updateItem = { ...updateCart[cartIndex] };
			updateItem.quantity++;
			updateItem.total =
				updateItem.quantity === 1
					? updateItem.price
					: updateItem.quantity * updateItem.price;
			updateCart[cartIndex] = updateItem;
		}
		dispatch({
			type: 'ADD TO CART',
			payload: {
				product: updateCart,
			},
		});
		updatePrice(updateCart);
		updateQuantity(updateCart);
	}
	/**
	 * ### Remove from Cart - Method
	 * - Remove a product from the cart by its ID. Updates the total price and
	 * quantity of the product in the cart
	 * @param {number} id - The ID of the product to be removed from the cart.
	 * @returns {void}
	 */
	function removeFromCart(id: number): void {
		const updateCart = state.product.filter(
			(currentProduct) => currentProduct.id !== id,
		);
		updatePrice(updateCart);
		updateQuantity(updateCart);
		dispatch({
			type: 'REMOVE FROM CART',
			payload: {
				product: updateCart,
			},
		});
	}
	/**
	 * ### Remove Item - Method
	 * - Decrease the quantity of a product in the cart by its ID. if the
	 * quantity becomes zero, the product removed from the cart
	 * @param {number} id - The ID of the product to be decreased in the quantity or removed
	 * from the cart
	 * @returns{void}
	 */
	function removeItem(id: number): void {
		const updateCart = [...state.product];
		const cartIndex = updateCart.findIndex((index) => index.id === id);
		const updateItem = { ...updateCart[cartIndex] };
		updateItem.quantity++;
		updateItem.total =
			updateItem.quantity === 1
				? updateItem.price
				: updateItem.quantity * updateItem.price - updateItem.price;
		if (updateItem.quantity <= 0) {
			updateCart.slice(cartIndex, 1);
		} else {
			updateCart[cartIndex] = updateItem;
		}
		dispatch({
			type: 'REMOVE ITEM',
			payload: {
				product: updateCart,
			},
		});
	}
	/**
	 * ### Empty Cart - Method
	 * - Empties the cart by clearing all products and resetting the total price and quantity.
	 * @returns {void}
	 */
	function emptyCart(): void {
		const updateProducts: ProductType[] = [];
		const updateTotal = 0;
		const updateQuantity = 0;
		setQuantity(false);
		setTotal(false);
		dispatch({
			type: 'CLEAR CARTS',
			payload: {
				total: updateTotal,
				quantity: updateQuantity,
				product: updateProducts,
			},
		});
	}
	const initialMethod = {
		updatePrice,
		updateQuantity,
		addToCart,
		removeFromCart,
		removeItem,
		emptyCart,
	};
	const _intitalState = {
		isTotal,
		isQuantity,
		isEmpty,
		total: state.total,
		product: state.product,
		quantity: state.quantity,
		totalItems: state.product.length,
	};
	const initialValues = {
		...initialMethod,
		..._intitalState,
	};
	return (
		<ShoppingContext.Provider value={initialValues}>
			{children}
		</ShoppingContext.Provider>
	);
};
export function useCart() {
	const context = React.useContext<ShoppingContextType>(ShoppingContext);
	if (typeof context === 'undefined') {
		throw new Error('useCart must be used within ShoppingProvider');
	}
	return context;
}
