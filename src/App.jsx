import useShopping from "./context/shopping-context";
import "./App.css";
import { shoppingData } from "./constants/shopping-data";
import { Fragment } from "react";

function App() {
	const {
		AddToCart,
		RemoveFromCart,
		product,
		total,
		quantity,
		EmptyCart,
		isTotal,
		isQuantity,
		RemoveItems,
		isEmpty,
		totalItems,
	} = useShopping();
	const newProduct = JSON.stringify(product, null, 10);
	const handleShopping = (item, id) => {
		const product = { id: id, name: item.name, price: item.price };
		AddToCart(product);
	};
	const handleRemove = (id) => {
		RemoveFromCart(id);
	};
	const handleClear = () => {
		EmptyCart();
	};
	const cardStyle = {
		backgroundColor: "white",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "0.25rem",
		justifyContent: "center",
	};

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				flexDirection: "row",
				flexWrap: "wrap",
				justifyContent: "center",
				gap: "0.25rem",
				color: "black",
			}}
		>
			<div
				style={{
					backgroundColor: "white",
					flexGrow: 1,
					width: "100%",
					padding: "0.25rem",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "flex-start",
				}}
			>
				{isEmpty && (
					<div>
						{isQuantity && (
							<h1
								style={{
									fontSize: "13px !important",
									margin: 0,
								}}
							>
								Total Quantity : {quantity}
							</h1>
						)}
						{isTotal && (
							<h1
								style={{
									fontSize: "13px !important",
									margin: 0,
								}}
							>
								Total Price :{total}
							</h1>
						)}
						<p>{newProduct}</p>
					</div>
				)}
				<p>total items: {totalItems}</p>
				<button onClick={handleClear}>clear all</button>
			</div>
			{shoppingData?.map((item, index) => (
				<section key={index} style={cardStyle}>
					<h1
						style={{
							fontSize: "19px",
							width: "100%",
							textAlign: "start",
						}}
					>
						{item.name}
					</h1>
					<h1
						style={{
							fontSize: "19px",
							width: "100%",
							textAlign: "start",
						}}
					>
						{index}
					</h1>
					<img
						src={item.imageUrl}
						style={{ width: "240px", height: "240px" }}
					/>
					<p>{item.price}</p>
					<div
						style={{
							display: "flex",
							flexDirection: "row !important",
							flexWrap: "wrap",
							gap: "0.25rem",
						}}
					>
						<button onClick={() => handleShopping(item, index)}>
							add
						</button>
						<button onClick={() => handleRemove(index)}>
							remove all item
						</button>
						<button onClick={() => RemoveItems(index)}>
							remove item
						</button>
					</div>
				</section>
			))}
		</div>
	);
}

export default App;
