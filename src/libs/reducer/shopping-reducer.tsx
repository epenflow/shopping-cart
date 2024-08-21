export interface ProductType {
	id: number;
	name: string;
	price: number;
	quantity: number;
	total: number;
}
export interface ShoppingStateType {
	total: number;
	quantity: number;
	product: ProductType[];
}
export const initialState: ShoppingStateType = {
	total: 0,
	quantity: 0,
	product: [],
};
export interface ActionType {
	type:
		| 'ADD TO CART'
		| 'REMOVE FROM CART'
		| 'UPDATE PRICE'
		| 'UPDATE QUANTITY'
		| 'CLEAR CARTS'
		| 'REMOVE ITEM';
	payload: Partial<ShoppingStateType>;
}
export function ShoppingReducer(state: ShoppingStateType, actions: ActionType) {
	const { type, payload } = actions;
	switch (type) {
		case 'ADD TO CART':
			return { ...state, product: payload.product! };
		case 'REMOVE FROM CART':
			return { ...state, product: payload.product! };
		case 'UPDATE PRICE':
			return { ...state, total: payload.total! };
		case 'UPDATE QUANTITY':
			return { ...state, quantity: payload.quantity! };
		case 'CLEAR CARTS':
			return { ...state, ...payload };
		case 'REMOVE ITEM':
			return { ...state, product: payload.product! };
		/** Default return */
		default:
			return { ...state, product: payload.product! };
	}
}
