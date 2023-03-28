/**
 * @typedef {obj} inititalState
 * @property {number} total
 * @property {array} product
 */
export const initialState = {
	total: 0,
	quantity: 0,
	product: [],
};

/**
 *
 * @param {obj} state
 * @param {obj} action
 */
const ShoppingReducer = (state, action) => {
	/**
	 * @type {{ type : string , payload : obj}}
	 */
	const { type, payload } = action;
	switch (type) {
		case "ADD TO CART":
			return { ...state, product: payload.product };
		case "REMOVE FROM CART":
			return { ...state, product: payload.product };
		case "UPDATE PRICE":
			return { ...state, total: payload.total };
		case "UPDATE QUANTITY":
			return { ...state, quantity: payload.quantity };
		case "CLEAR CART":
			return { ...state, ...payload };
		case "REMOVE ITEMS":
			console.info("reducer remove", state);
			return { ...state, product: payload.product };
		default:
			throw new Error(`no case for ${type} found in shopping reducer`);
	}
};

export default ShoppingReducer;
