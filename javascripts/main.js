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
		})
	});



	// delete todo
	// edit todo
	// complete todos


	let countTask = () => {
		let remainingTasks = $('#incomplete-tasks li').length;
		$('#counter').hide().fadeIn(1500).html(remainingTasks);
	};





});