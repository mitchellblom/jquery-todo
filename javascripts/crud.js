var FbApi = ((oldCrap) => {

	oldCrap.getTodos = () => {
		let items = [];
		return new Promise ((resolve, reject) => {

			$.ajax('./database/seed.json')
			.done((data) => {								// want to grab the value and inject the id

				let response = data.items;
				Object.keys(response).forEach((key) => {		// this is the same action for every firebase call
					response[key].id = key;
					items.push(response[key]);
				});
				FbApi.setTodos(items);
				resolve();
			})
			.fail((error) => {
				reject(error);
			});
		});
	};

	oldCrap.addTodo = (newTodo) => {
		return new Promise ((resolve, reject) => {
			newTodo.id = `item${FbApi.todoGetter().length}`;
			FbApi.setSingleTodo(newTodo);
			resolve();
		});
	};

	oldCrap.checker = (id) => {
		return new Promise((resolve, reject) => {
			FbApi.setChecked(id);
			resolve();
		});
	};

	oldCrap.deleteTodo = (id) => {
		return new Promise ((resolve, reject) => {
			FbApi.duhlete(id);
			resolve();
		});
	};

	oldCrap.editTodo = (id) => {
		return new Promise ((resolve, reject) => {
			FbApi.duhlete(id);
			resolve();
		});
	};



	return oldCrap;
})(FbApi || {});