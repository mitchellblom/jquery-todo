var FbApi = ((oldCrap) => {

	oldCrap.getTodos = (apiKeys) => {
		let items = [];
		return new Promise ((resolve, reject) => {

			$.ajax(`${apiKeys.databaseURL}/items.json`)
			.done((data) => {								// want to grab the value and inject the id
				let response = data;
				Object.keys(response).forEach((key) => {		// this is the same action for every firebase call
					console.log("key", key);
					response[key].id = key;
					items.push(response[key]);
				});
				resolve(items);
			})
			.fail((error) => {
				reject(error);
			});
		});
	};

	oldCrap.addTodo = (apiKeys, newTodo) => {
		return new Promise ((resolve, reject) => {
			newTodo.id = `item${FbApi.todoGetter().length}`;
			FbApi.setSingleTodo(newTodo);
			resolve();
		});
	};

	oldCrap.checker = (apiKeys, id) => {
		return new Promise((resolve, reject) => {
			FbApi.setChecked(id);
			resolve();
		});
	};

	oldCrap.deleteTodo = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'DELETE',
				url: `${apiKeys.databaseURL}/items/${id}.json`
			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			})
		});
	};

	oldCrap.editTodo = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			FbApi.duhlete(id);
			resolve();
		});
	};



	return oldCrap;
})(FbApi || {});