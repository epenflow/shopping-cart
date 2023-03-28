const productApi = [
	{
		name: "Shoes",
		price: 400,
		imageUrl:
			"https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=928&q=80",
	},
	{
		name: "Jacket",
		price: 100,
		imageUrl:
			"https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
	},
	{
		name: "Jeans",
		price: 200,
		imageUrl:
			"https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
	},
	{
		name: "Beanie",
		price: 50,
		imageUrl:
			"https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
	},
];
console.info(JSON.stringify(productApi, null, 10));
const cartProduct = [
	{
		productId: 1,
		productName: "Shoes",
		productPrice: 400,
		productQuantity: 100,
	},
	{
		productId: 2,
		productName: "Jacket",
		productPrice: 100,
		productQuantity: 1,
	},
];

const AddToCart = () => {
	const newProduct = {
		productId: 9,
		productName: "Shoes",
		productPrice: 400,
		productQuantity: 1,
	};
	const upadteCart = cartProduct.map((item) => {
		if (item.productId === newProduct.productId) {
			return {
				...item,
				productQuantity: item.productQuantity + 1,
				productPrice: item.productQuantity * item.productPrice,
			};
		} else {
			return { ...newProduct };
		}
	});

	console.info(upadteCart);
};
AddToCart();

// const existCart = Boolean(
// 	cartProduct.find((item) => {
// 		return item?.id === newProduct?.productId;
// 	})
// );

// if (existCart) {
// 	const updateCart = cartProduct.filter((item) =>
// 		item?.id === newProduct.productId ? (item.quantity += 1) : item
// 	);
// 	updateCart;
// 	existCart;
// } else {
// 	console.info(updateCart);
// }
//const cartExist = Boolean(
// 	state.product.find((item) => {
// 		return item.productId === newProduk.productId;
// 	})
// );
// console.info("cartExist", cartExist);
// if (!cartExist) {
// 	const updateCart = state.product.concat(newProduk);
// 	dispatch({
// 		type: "ADD TO CART",
// 		payload: {
// 			product: updateCart,
// 		},
// 	});
// } else {

// 	console.info("true", updateQuantity);
// 	// dispatch({
// 	// 	type: "ADD TO CART",
// 	// 	payload: {
// 	// 		product: updateQuantity,
// 	// 	},
// 	// });
// }
