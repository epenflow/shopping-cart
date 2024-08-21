import React, {
	createContext,
	useContext,
	useEffect,
	useCallback,
	useReducer,
	useState,
	useMemo,
	ReactNode,
} from 'react';
import ShoppingReducer, {
	initialState,
	ShoppingStateType,
	ActionType,
} from '../reducer/shopping-reducer';

interface ShoppingContextProps {
	children: ReactNode;
}

interface ShoppingContextType extends ShoppingStateType {
	isTotal: boolean | null;
	isQuantity: boolean | null;
	isEmpty: boolean | null;
	totalItems: number | null;
	AddToCart: (product: ProductType) => void;
	RemoveFromCart: (id: number) => void;
	EmptyCart: () => void;
	RemoveItems: (id: number) => void;
	setPrice: (product: ProductType[]) => void;
}

const ShoppingState = createContext<ShoppingContextType>({
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

export const ShoppingProvider: React.FC<ShoppingContextProps> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(ShoppingReducer, initialState);
	const [isTotal, setTotal] = useState(false);
	const [isQuantity, setQuantity] = useState(false);
	const [isEmpty, setEmpty] = useState(false);
	const totalItems = state.product.length;

	const memorizeState = useMemo(() => {
		return !(!isQuantity || !isTotal);
	}, [isQuantity, isTotal, state]);

	useEffect(() => {
		setEmpty(memorizeState);
	}, [state]);

	const UpdatePrice = (product: ProductType[]) => {
		let total = 0;
		product.forEach((product) => (total += product.total));
		setTotal(total > 0);
		dispatch({
			type: 'UPDATE PRICE',
			payload: {
				total,
			},
		});
	};

	const UpdateQuantity = (product: ProductType[]) => {
		let quantity = 0;
		product.forEach((product) => (quantity += product.quantity));
		setQuantity(quantity > 0);
		dispatch({
			type: 'UPDATE QUANTITY',
			payload: {
				quantity,
			},
		});
	};

	const AddToCart = useCallback(
		(product: ProductType) => {
			const updateCart = [...state.product];
			const cartIndex = state.product.findIndex(
				(findIndex) => findIndex.id === product.id,
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
			UpdatePrice(updateCart);
			UpdateQuantity(updateCart);
		},
		[state.product, dispatch],
	);

	const RemoveFromCart = useCallback(
		(id: number) => {
			const updateCart = state.product.filter(
				(currentProduct) => currentProduct.id !== id,
			);
			UpdatePrice(updateCart);
			UpdateQuantity(updateCart);
			dispatch({
				type: 'REMOVE FROM CART',
				payload: {
					product: updateCart,
				},
			});
		},
		[state.product, dispatch],
	);

	const RemoveItems = useCallback(
		(id: number) => {
			const updateCart = [...state.product];
			const cartIndex = updateCart.findIndex(
				(findIndex) => findIndex.id === id,
			);
			const updateItems = { ...updateCart[cartIndex] };
			updateItems.quantity--;
			updateItems.total =
				updateItems.quantity === 1
					? updateItems.price
					: updateItems.quantity * updateItems.price -
					  updateItems.price;
			if (updateItems.quantity <= 0) {
				updateCart.splice(cartIndex, 1);
			} else {
				updateCart[cartIndex] = updateItems;
			}
			dispatch({
				type: 'REMOVE ITEMS',
				payload: {
					product: updateCart,
				},
			});
			UpdateQuantity(updateCart);
			UpdatePrice(updateCart);
		},
		[state.product, dispatch],
	);

	const EmptyCart = useCallback(() => {
		const updateProduct: ProductType[] = [];
		const updateTotal = 0;
		const updateQuantity = 0;
		setQuantity(false);
		setTotal(false);
		dispatch({
			type: 'CLEAR CART',
			payload: {
				total: updateTotal,
				quantity: updateQuantity,
				product: updateProduct,
			},
		});
	}, [state.product, dispatch]);

	const initalValues = useMemo(() => {
		return {
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
	}, [state, isTotal, isQuantity, isEmpty, totalItems]);

	return (
		<ShoppingState.Provider value={initalValues}>
			{children}
		</ShoppingState.Provider>
	);
};

const useShopping = () => {
	const context = useContext(ShoppingState);
	if (context === undefined) {
		throw new Error('useShopping must be used within ShoppingProvider');
	}
	return context;
};

export default useShopping;

interface ProductType {
	id: number;
	name: string;
	price: number;
	quantity: number;
	total: number;
}
