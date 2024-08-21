import React, { Profiler } from 'react';
import {
	shoppingData,
	ShoppingDateType,
} from './libs/constants/shopping-initial';
import { useCart } from './libs/context/shopping-provider';
interface MappingWrapperProps<T> {
	items?: Array<T>;
	render: (item: T, index: number) => React.ReactNode;
}
function MappingWrapper<T>({ items, render }: MappingWrapperProps<T>) {
	return React.Children.toArray(
		items?.map((item, index) => render(item, index)),
	);
}
const App = () => {
	const {
		total,
		isQuantity,
		isEmpty,
		isTotal,
		quantity,
		totalItems,
		addToCart,
		emptyCart,
		removeFromCart,
		removeItem,
		product,
	} = useCart();
	function handleAddToCart(product: ShoppingDateType, index: number) {
		const _product = {
			id: index,
			name: product.name,
			price: product.price,
			quantity: 1,
			total: product.price,
		};
		addToCart(_product);
	}
	function handleEmptyCart() {
		emptyCart();
	}
	function handleRemoveItem(id: number) {
		removeItem(id);
	}
	function handleRemoveFromCart(id: number) {
		removeFromCart(id);
	}
	console.log(product);
	return (
		<div>
			<div className="cart--wrapper">
				<h5>{JSON.stringify(product)}</h5>
				<p>Quantity :{isQuantity && quantity}</p>
				<p>Total :{isTotal && total}</p>
				<p>Total Products:{totalItems}</p>
				{isEmpty && (
					<button
						onClick={handleEmptyCart}
						style={{
							backgroundColor: 'black',
							color: '#f2f2f2',
						}}>
						Empty cart
					</button>
				)}
			</div>
			<div className="product--container">
				<Profiler
					id="product-card"
					onRender={(...args) => {
						const {
							[0]: id,
							[1]: phase,
							[2]: actualDuration,
							[3]: baseDuration,
							[4]: startTime,
						} = args;
						console.info({
							id,
							phase,
							actualDuration,
							baseDuration,
							startTime,
						});
					}}>
					<MappingWrapper
						items={shoppingData}
						render={(product, index) => (
							<div key={index} className="product--card">
								<img
									src={product.imageUrl}
									className="product--card-image"
								/>
								<div className="product--card-content">
									<h1>{product.name}</h1>
									<p>{product.price}</p>
								</div>
								<div className="product--card-content">
									<button
										onClick={() =>
											handleAddToCart(product, index)
										}>
										add
									</button>
									<button
										onClick={() => {
											handleRemoveFromCart(index);
										}}>
										remove all item
									</button>
									<button
										onClick={() => {
											handleRemoveItem(index);
										}}>
										remove item
									</button>
								</div>
							</div>
						)}
					/>
				</Profiler>
			</div>
		</div>
	);
};

export default App;
