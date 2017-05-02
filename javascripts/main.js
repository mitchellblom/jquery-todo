$(document).ready(function(){

	$('#new-item').click(() => {
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
	});

	$('#list-items').click(() => {
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');
	});

	// get todo
	FbApi.getTodos().then((results) => {
		FbApi.writeDom();
		countTask();
	})
		.catch((error) => {
			console.log("getTodos Error", error);
		});

	// add todo
	$('#add-todo-button').click(() => {
		let newTodo = {
			isCompleted: false,
			task: $('#add-todo-text').val()
		};
		FbApi.addTodo(newTodo).then(() => {
			$('#add-todo-text').val('');
			$('.new-container').addClass('hide');
			$('.list-container').removeClass('hide');
			FbApi.writeDom();
			countTask();
		}).catch((error) => {
			console.log("addTodoError", error);
		});
	});



	// delete todo
	$('.main-container').on('click', '.delete', (event) => {
		FbApi.deleteTodo(event.target.id).then(() => {
			FbApi.writeDom();
			countTask();
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
			FbApi.writeDom();
			countTask();
		}).catch((error) => {
			console.log("checker error", error);
		});
	});


	let countTask = () => {
		let remainingTasks = $('#incomplete-tasks li').length;
		$('#counter').hide().fadeIn(1500).html(remainingTasks);
	};





});