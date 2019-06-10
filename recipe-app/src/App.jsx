import React from "react";
import { connect } from "react-redux";

import Listing from "./components/Listing";
import Description from "./components/Description";

import { addRecipe } from "./actions/actionCreators";

const App = props => {
	return (
		<div id="wrapper">
			<Listing recipes={props.recipes} />
			<Description />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

const mapDispatchToProps = dispatch => ({
	addRecipe: value => dispatch(addRecipe(value))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);