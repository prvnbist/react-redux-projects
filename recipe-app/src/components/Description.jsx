import React from "react";
import { connect } from "react-redux";

import { readRecipe,editRecipe, deleteRecipe } from "../actions/actionCreators";

import { Icon, Row, Col, Modal, Button, Input } from "antd";
import { ReactComponent as EmptyState } from "../assets/empty-state.svg";

const Description = props => {
	const { id, name, ingredients, directions } = props.currentlyReading;

	const [loading, setLoading] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	const [details, setDetails] = React.useState({
		id: "",
		name: "",
		ingredients: [],
		directions: []
	});
	const { TextArea } = Input;
	const showModal = () => {
		setVisible(!visible);
		setDetails({
			id,
			name,
			ingredients: ingredients.join("*"),
			directions: directions.join("*")
		});
	};

	const handleOk = () => {
		setLoading(!loading);
		setTimeout(() => {
			setLoading(false);
			setVisible(false);
			const updatedRecipe = {
				id: details.id,
				name: details.name,
				ingredients: details.ingredients.split("*"),
				directions: details.directions.split("*")
			};
			props.editRecipe(updatedRecipe);
			// console.log(updatedRecipe);
		}, 1000);
	};

	const handleCancel = () => {
		setVisible(false);
		setDetails({
			id: "",
			name: "",
			ingredients: [],
			directions: []
		});
	};

	return name ? (
		<div id="recipe__description">
			<header>
				<span>{name}'s Recipe</span>
				<span>
					<Icon type="edit" onClick={() => showModal()} />
					<Icon
						type="delete"
						onClick={() => {
							const decision = window.confirm(
								`Are you sure you want to delete the ${name}'s recipe?`
							);

							if (decision) {
								props.deleteRecipe(id);
							}
							if (Object.keys(props.recipes).length === 1) {
								props.readRecipe(0);
							}
						}}
					/>
				</span>
			</header>
			<main>
				<h2>Ingredients</h2>
				<ul id="ingredients__listing">
					{ingredients.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
				<h2>Directions</h2>
				<ul id="directions__listing">
					{directions.map((direction, index) => (
						<li key={index}>{direction}</li>
					))}
				</ul>
			</main>
			<Modal
				visible={visible}
				title="Edit Recipe"
				width="680px"
				onOk={() => handleOk()}
				onCancel={() => handleCancel()}
				footer={[
					<Button key="back" onClick={() => handleCancel()}>
						Cancel
					</Button>,
					<Button
						key="submit"
						type="primary"
						loading={loading}
						onClick={() => handleOk()}
					>
						Edit Recipe
					</Button>
				]}
			>
				<Row>
					<label htmlFor="recipe__name">Recipe Name</label>
					<Input
						placeholder="Enter the recipe's name"
						id="recipe__name"
						value={visible && details.name}
						onChange={e =>
							setDetails({
								...details,
								name: e.target.value
							})
						}
					/>
				</Row>
				<br />
				<Row gutter={16}>
					<Col span={12}>
						<label htmlFor="recipe__ingredients">
							Recipe Ingredients
						</label>
						<TextArea
							rows={10}
							id="recipe__ingredients"
							placeholder="Enter each ingredients separated by asterik. For ex. 1 table spoon sugar * 2 table spoon honey"
							value={visible && details.ingredients}
							onChange={e =>
								setDetails({
									...details,
									ingredients: e.target.value
								})
							}
						/>
					</Col>
					<Col span={12}>
						<label htmlFor="recipe__description">
							Recipe Description
						</label>
						<TextArea
							rows={10}
							id="recipe__description"
							placeholder="Enter each description on separate lines."
							value={visible && details.directions}
							onChange={e =>
								setDetails({
									...details,
									directions: e.target.value
								})
							}
						/>
					</Col>
				</Row>
			</Modal>
		</div>
	) : (
		<div
			id="recipe__description"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<EmptyState style={{ width: "320px", height: "280px" }} />
			<h2>Select a recipe for details!</h2>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		recipes: state.recipes,
		currentlyReading: state.currentlyReading
	};
};

const mapDispatchToProps = dispatch => ({
	editRecipe: value => dispatch(editRecipe(value)),
	readRecipe: value => dispatch(readRecipe(value)),
	deleteRecipe: value => dispatch(deleteRecipe(value))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Description);
