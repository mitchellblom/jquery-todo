var FbApi = (() => {
	let todos = [];

	return {
		todoGetter : () => {
			return todos;
		},
		setTodos : (newArray) => {
			todos = newArray;
		},
		setSingleTodo : (newObject) => {
			todos.push(newObject);
		},
		setChecked: (itemId) => {
			const position = itemId.split("item")[1]; // item0 = ["", 0]
			todos[position].isCompleted = !todos[position].isCompleted;
		},
		duhlete : (id) => {
			const position = id.split("item")[1];
			todos.splice(position, 1);
		}
	};
})();