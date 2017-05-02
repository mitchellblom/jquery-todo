$(document).ready(function(){
	let apiKeys;

	$('#new-item').click(() => {
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
	});

	$('#list-items').click(() => {
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');
	});

	FbApi.firebaseCredentials().then((keys) => {
		apiKeys = keys;
		firebase.initializeApp(apiKeys);
		FbApi.writeDom(apiKeys);
	}).catch((error) => {
		console.log("key errors", error);
	});

	// add todo
	$('#add-todo-button').click(() => {
		let newTodo = {
			isCompleted: false,
			task: $('#add-todo-text').val()
		};
		FbApi.addTodo(apiKeys, newTodo).then(() => {
			$('#add-todo-text').val('');
			$('.new-container').addClass('hide');
			$('.list-container').removeClass('hide');
			FbApi.writeDom(apiKeys);
		}).catch((error) => {
			console.log("addTodoError", error);
		});
	});

	// delete todo
	$('.main-container').on('click', '.delete', (event) => {
		FbApi.deleteTodo(apiKeys, event.target.id).then(() => {
			FbApi.writeDom(apiKeys);
		}).catch((error) =>
			console.log("error in deleteTodo", error) 
		);											
	});

	// edit todo
	$('.main-container').on('click', '.edit', (event) => {
		let editText = $(event.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
		FbApi.editTodo(event.target.id).then(() => {
			$('.list-container').addClass('hide');
			$('.new-container').removeClass('hide');
			$('#add-todo-text').val(editText);
		}).catch((error) => {
			console.log('error from editTodo', error);
		});
		// pass the id into the promise
		// grab the edit text
	});



	// complete todos
	$('.main-container').on('click', 'input[type="checkbox"]', (event) => {
		console.log("id", event.target.id);
		FbApi.checker(event.target.id).then(() => {
			FbApi.writeDom(apiKeys);
		}).catch((error) => {
			console.log("checker error", error);
		});
	});



});