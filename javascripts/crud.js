var FbApi = ((oldCrap) => {

	oldCrap.getTodos = () => {
		let items = [];
		return new Promise ((resolve, reject) => {

			$.ajax('./database/seed.json')
			.done((data) => {								// want to grab the value and inject the id

				let response = data.items;
				Object.keys(response).forEach((key) => {		// this is the same action for every firebase call
					console.log("key", key);
					response[key].id = key;
					items.push(response[key]);
				})
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
		})
	}

	return oldCrap;
})(FbApi || {});