import React, { useState } from "react";
import { connect } from "react-redux";

import {
	addTodo,
	deleteTodo,
	updateTodo,
	completed
} from "./actions/actionCreators";

import { Input, Button, Row, Col, Icon, Checkbox, Tabs } from "antd";

const { TabPane } = Tabs;

const App = props => {
	const [text, setText] = useState("");
	const [buttonType, setButtonType] = useState("Add");
	const [edit, setEdit] = useState({
		id: "",
		text: ""
	});
	return (
		<div className="App">
			<div id="wrapper">
				<Row>
					<Col span={24}>
						<h1>{`// TODO List`}</h1>
					</Col>
				</Row>

				<div id="add">
					<Input
						type="text"
						value={text}
						placeholder="Type the todo and press enter..."
						onChange={e => setText(e.target.value)}
						onKeyUp={e => {
							if (e.keyCode === 13) {
								setText("");
								text && buttonType === "Add"
									? props.addTodo(text)
									: props.updateTodo(edit.id, text);
								buttonType === "Update" && setButtonType("Add");
							}
						}}
					/>
					<Button
						type="primary"
						onClick={() => {
							setText("");
							text && buttonType === "Add"
								? props.addTodo(text)
								: props.updateTodo(edit.id, text);
							buttonType === "Update" && setButtonType("Add");
						}}
					>
						{buttonType}
					</Button>
				</div>

				<Row>
					<Col span={24}>
						<Tabs defaultActiveKey="1">
							<TabPane tab="Todos" key="1">
								<Row className="todos">
									{props.todos
										.filter(todo => !todo.completed)
										.map(todo => (
											<Col
												span={24}
												className="todo"
												key={todo.id}
											>
												<Row>
													<Col
														span={2}
														className="action"
													>
														<Checkbox
															defaultChecked={
																todo.completed
															}
															onChange={e => {
																props.completed(
																	todo.id
																);
															}}
														/>
													</Col>
													<Col span={18}>
														<span
															style={{
																textDecoration: todo.completed
																	? "line-through"
																	: "none"
															}}
														>
															{todo.text}
														</span>
													</Col>
													<Col
														span={2}
														className="action"
													>
														<Icon
															type="edit"
															onClick={() => {
																setEdit({
																	id: todo.id
																});
																setText(
																	todo.text
																);
																setButtonType(
																	"Update"
																);
															}}
														/>
													</Col>
													<Col
														span={2}
														className="action"
													>
														<Icon
															type="delete"
															onClick={() => {
																props.deleteTodo(
																	todo.id
																);
															}}
														/>
													</Col>
												</Row>
											</Col>
										))}
								</Row>
							</TabPane>
							<TabPane tab="Completed" key="2">
								<Row className="todos">
									{props.todos
										.filter(todo => todo.completed)
										.map(todo => (
											<Col
												span={24}
												className="todo"
												key={todo.id}
											>
												<Row>
													<Col
														span={2}
														className="action"
													>
														<Checkbox
															defaultChecked={
																todo.completed
															}
															onChange={e => {
																props.completed(
																	todo.id
																);
															}}
														/>
													</Col>
													<Col span={20}>
														<span
															style={{
																textDecoration: todo.completed
																	? "line-through"
																	: "none"
															}}
														>
															{todo.text}
														</span>
													</Col>
													<Col
														span={2}
														className="action"
													>
														<Icon
															type="delete"
															onClick={() => {
																props.deleteTodo(
																	todo.id
																);
															}}
														/>
													</Col>
												</Row>
											</Col>
										))}
								</Row>
							</TabPane>
						</Tabs>
					</Col>
				</Row>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		todos: state.todos
	};
};

const mapDispatchToProps = dispatch => ({
	addTodo: value => dispatch(addTodo(value)),
	deleteTodo: value => dispatch(deleteTodo(value)),
	completed: value => dispatch(completed(value)),
	updateTodo: (id, text) => dispatch(updateTodo(id, text))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
