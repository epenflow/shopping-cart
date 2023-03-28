import React, {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import ShoppingReducer, { initialState } from "../reducer/shopping-reducer";
/**
 * @typedef {obj} ShoppingState
 * @property {obj} inititalState
 */
const ShoppingState = createContext({
	...initialState,
	isTotal: null,
	isQuantity: null,
	isEmpty: null,
	totalItems: null,
	AddToCart: () => {},
	RemoveFromCart: () => {},
	EmptyCart: () => {},
	RemoveItems: () => {},
	setPrice: () => {},
});
/**
 *
 * @param {{ children : JSX.Element }} props
 * @returns {JSX.Element} return JSX.Element with wraper ShoppingState from createContext
 */
export const ShoppingProvider = ({ children }) => {
	/**
	 * @type {[state :{product : array, total : number, quantity: number}, dispatch : ({type : string, payload : obj})=>{}]}
	 */
	const [state, dispatch] = useReducer(ShoppingReducer, initialState);
	const [isTotal, setTotal] = useState(false);
	const [isQuantity, setQuantity] = useState(false);
	const [isEmpty, setEmpty] = useState(false);
	const totalItems = state.product.length;
	useEffect(() => {
		const state = !(!isQuantity || !isTotal);
		setEmpty((prev) => (state ? (prev = true) : (prev = false)));
	}, [state]);
	/**
	 *
	 * @param {array} product
	 */
	const UpdatePrice = (product) => {
		let total = 0;
		product.forEach((product) => (total += product.total));
		setTotal((prev) => (total <= 0 ? (prev = false) : (prev = true)));
		dispatch({
			type: "UPDATE PRICE",
			payload: {
				total,
			},
		});
	};
	/**
	 *
	 * @param {array} product
	 */
	const UpdateQuantity = (product) => {
		let quantity = 0;
		product.forEach((product) => (quantity += product.quantity));
		setQuantity((prev) => (quantity <= 0 ? (prev = false) : (prev = true)));
		dispatch({
			type: "UPDATE QUANTITY",
			payload: {
				quantity,
			},
		});
	};
	/**
	 *
	 * @param {obj} product
	 */
	const AddToCart = (product) => {
		const updateCart = [...state.product];
		const cartIndex = state.product.findIndex(
			(findIndex) => findIndex.id === product.id
		);
		if (cartIndex < 0) {
			updateCart.push({ ...product, quantity: 1, total: product.price });
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
			type: "ADD TO CART",
			payload: {
				product: updateCart,
			},
		});
		UpdatePrice(updateCart);
		UpdateQuantity(updateCart);
	};
	/**
	 *
	 * @param {number} id
	 */
	const RemoveFromCart = (id) => {
		const updateCart = state.product.filter(
			(currentProduct) => currentProduct.id !== id
		);
		UpdatePrice(updateCart);
		UpdateQuantity(updateCart);
		dispatch({
			type: "REMOVE FROM CART",
			payload: {
				product: updateCart,
			},
		});
	};
	/**
	 *
	 * @param {number} id
	 */
	const RemoveItems = (id) => {
		const updateCart = [...state.product];
		const cartIndex = updateCart.findIndex(
			(findIndex) => findIndex.id === id
		);
		const updateItems = { ...updateCart[cartIndex] };
		updateItems.quantity--;
		updateItems.total =
			updateItems.quantity === 1
				? updateItems.price
				: updateItems.quantity * updateItems.price - updateItems.price;
		if (updateItems.quantity <= 0) {
			updateCart.splice(cartIndex, 1);
		} else {
			updateCart[cartIndex] = updateItems;
		}
		dispatch({
			type: "REMOVE ITEMS",
			payload: {
				product: updateCart,
			},
		});
		UpdateQuantity(updateCart);
		UpdatePrice(updateCart);
	};
	const EmptyCart = () => {
		const updateProduct = (state.product = []);
		const updateTotal = (state.total = 0);
		const updateQuantity = (state.quantity = 0);
		setQuantity((prev) => (prev = false));
		setTotal((prev) => (prev = false));
		dispatch({
			type: "CLEAR CART",
			payload: {
				total: updateTotal,
				quantity: updateQuantity,
				product: updateProduct,
			},
		});
	};
	const initalValues = {
		total: state.total,
		product: state.product,
		quantity: state.quantity,
		AddToCart,
		RemoveFromCart,
		EmptyCart,
		isTotal,
		isQuantity,
		RemoveItems,
		isEmpty,
		totalItems,
	};
	return (
		<ShoppingState.Provider value={initalValues}>
			{children}
		</ShoppingState.Provider>
	);
};

const useShopping = () => {
	const context = useContext(ShoppingState);
	if (context === undefined) {
		throw new Error("useShopping must be used within ShoppingProvider");
	}
	return context;
};

export default useShopping;
