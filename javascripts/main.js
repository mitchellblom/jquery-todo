$(function() {

    let apiKeys = {};
    let editID = "";

    $("#loginButton").click(() => {

    });

    $("#new-item").click(() => {
        $(".list-container").addClass("hide");
        $(".new-container").removeClass("hide");
    });

    $("#list-items").click(() => {
        $(".new-container").addClass("hide");
        $(".list-container").removeClass("hide");
    });

    FbApi.firebaseCredentials().then((keys) => {
        apiKeys = keys;
        firebase.initializeApp(apiKeys);
        FbApi.writeDom(apiKeys);
    }).catch((error) => {
        console.log("key errors", error);
    });

    $("#add-todo-button").click(() => {
        let newTodo = {
            isCompleted: false,
            task: $("#add-todo-text").val()
        };
        if (editID.length > 0) {
            FbApi.editTodo(apiKeys, newTodo, editID).then(() => {
                $(".new-container").addClass("hide");
                $(".list-container").removeClass("hide");
                FbApi.writeDom(apiKeys);
                $("#add-todo-text").val("");
                editID = "";
            }).catch((error) => {
                console.log("Addtodo error", error);
            });
        } else {
            FbApi.addTodo(apiKeys, newTodo).then(() => {
                $(".new-container").addClass("hide");
                $(".list-container").removeClass("hide");
                FbApi.writeDom(apiKeys);

                $("#add-todo-text").val("");
            }).catch((error) => {
                console.log("Addtodo error", error);
            });
        }

    });

    $(".main-container").on("click", ".delete", (e) => {
        FbApi.deleteTodo(apiKeys, e.target.id).then(() => {
            FbApi.writeDom(apiKeys);
        }).catch(error => {
            console.log("error in deleteTodo", error);
        });
    });

    //edit todo

    $(".main-container").on("click", ".edit", (e) => {
        let editText = $(event.target).closest(".col-xs-4").siblings('.col-xs-8').find(".task").html();
        editID = e.target.id;
        $(".list-container").addClass("hide");
        $(".new-container").removeClass("hide");
        $("#add-todo-text").val(editText);
    });

    $(".main-container").on("click", "input[type='checkbox']", (e) => {
        let myTodo = {
            isCompleted: e.target.checked,
            task: $(e.target).siblings(".task").html()
        };
        FbApi.editTodo(apiKeys, myTodo, e.target.id)
            .then(() => {
                FbApi.writeDom(apiKeys);
            }).catch((error) => {
                console.log("checked error", error);
            });
    });

    $("#registerButton").click(() => {
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();
        let username = $("#inputUsername").val();
        let user = {
            email,
            password
        };
        FbApi.registerUser(user).then((response) => {
            let newUser = {
                uid: response.uid,
                username: username
            };
            FbApi.addUser(apiKeys, newUser).then((response) => {
                FbApi.loginUser(user).then((response) => {
                    clearLogin();
                    $('#login-container').addClass('hide');
                    $('.main-container').removeClass('hide');
                    FbApi.writeDom(apiKeys);
                }).catch((error) => {
                    console.log("error in loginUser: ", error);
                });
            }).catch((error) => {
                console.log("error in addUser", response);
            });
        }).catch((error) => {
            console.log("error in registerUser", error);
        });
    });

    let clearLogin = () => {
        let email = $("").val();
        let password = $("").val();
        let username = $("").val();
    };

    $("#loginButton").click(() => {
        let email = $('#inputEmail').val();
        let password = $("#inputPassword").val();

        let user = {
            email,
            password
        };

        FbApi.loginUser(user).then((response) => {
            clearLogin();
            $('#login-container').addClass('hide');
            $('.main-container').removeClass('hide');
            FbApi.writeDom(apiKeys);
        }).catch((error) => {
            console.log("error in loginUser: ", error);
        });

    });



});