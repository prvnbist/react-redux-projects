import React from "react";
import { connect } from "react-redux";

import { Icon, Modal, Button, Input, Row, Col } from "antd";

import {
	addRecipe,
	readRecipe,
	deleteRecipe
} from "../actions/actionCreators";
import { ReactComponent as NoRecipes } from "../assets/no-recipes.svg";

const { TextArea } = Input;

const Listing = props => {
	const [loading, setLoading] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	const [recipeDetails, setRecipeDetails] = React.useState({
		id: "",
		name: "",
		ingredients: [],
		directions: []
	});

	const showModal = () => {
		setVisible(!visible);
		setRecipeDetails({
			id: "",
			name: "",
			ingredients: [],
			directions: []
		});
	};

	const handleOk = () => {
		setLoading(!loading);
		setTimeout(() => {
			setLoading(false);
			setVisible(false);
			props.addRecipe(recipeDetails);
			setRecipeDetails({
				id: "",
				name: "",
				ingredients: [],
				directions: []
			});
		}, 1000);
	};

	const handleCancel = () => {
		setVisible(false);
	};
	return (
		<div id="recipe__list">
			<header>
				<span>Recipe's List</span>
				<span>
					<Icon type="plus-square" onClick={() => showModal()} />
				</span>
			</header>
			<main>
				<ul id="recipe__listing">
					{Object.keys(props.recipes).length !== 0 ? (
						Object.keys(props.recipes).map(recipe => (
							<li key={props.recipes[recipe].id}>
								<span
									onClick={e =>
										props.readRecipe(
											props.recipes[recipe].id
										)
									}
									title={props.recipes[recipe].name}
								>
									{props.recipes[recipe].name.length > 30
										? `${props.recipes[recipe].name.slice(
												0,
												30
										  )}...`
										: props.recipes[recipe].name}
								</span>
								<span>
									<Icon
										type="delete"
										onClick={() => {
											const decision = window.confirm(
												`Are you sure you want to delete the ${
													props.recipes[recipe].name
												}'s recipe?`
											);

											if (decision) {
												props.deleteRecipe(
													props.recipes[recipe].id
												);
											}
											if (
												Object.keys(props.recipes)
													.length === 1
											) {
												props.readRecipe(0);
											}
										}}
									/>
								</span>
							</li>
						))
					) : (
						<div id="recipe__listing__empty">
							<NoRecipes />
							<Button
								type="primary"
								onClick={() => showModal("add")}
							>
								Add Recipe
							</Button>
						</div>
					)}
				</ul>
			</main>
			<Modal
				visible={visible}
				title="Add Recipe"
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
						Add Recipe
					</Button>
				]}
			>
				<Row>
					<label htmlFor="recipe__name">Recipe Name</label>
					<Input
						placeholder="Enter the recipe's name"
						id="recipe__name"
						value={recipeDetails.name}
						onChange={e =>
							setRecipeDetails({
								...recipeDetails,
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
							placeholder="Enter each ingredients separated by asterik. for ex. 1 table spoon sugar * 2 table spoon honey"
							value={recipeDetails.ingredients}
							onChange={e =>
								setRecipeDetails({
									...recipeDetails,
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
							placeholder="Enter each description separated by asterik. For ex. Boil water for 5mins. * Add sugar."
							value={recipeDetails.directions}
							onChange={e =>
								setRecipeDetails({
									...recipeDetails,
									directions: e.target.value
								})
							}
						/>
					</Col>
				</Row>
			</Modal>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

const mapDispatchToProps = dispatch => ({
	addRecipe: value => dispatch(addRecipe(value)),
	readRecipe: value => dispatch(readRecipe(value)),
	deleteRecipe: value => dispatch(deleteRecipe(value))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Listing);
