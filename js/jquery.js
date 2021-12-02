
$(document).on('DOMContentLoaded', function () {
    const $loginForm = $('#login');
    const $registrationForm = $('#registration');


    UI.linkToLogin($loginForm, $registrationForm);

    UI.linkToRegistration($loginForm, $registrationForm);

    $('#registration').on('submit', function () {
        Store.createUser();
        $loginForm.removeClass('form--hidden');
        $registrationForm.toggleClass('form--hidden');

    });

    $("#login").on("submit", function (e) {
        e.preventDefault();

        const username = $("input[name='login_username']").val()
        const password = $("input[name='login_password']").val();

        const users = Store.getUsers();

        return compareUserData(users, username, password) ? alert("Login is succesfully!") : alert("Please sign up!!!");
    });

    function compareUserData(users, username, password) {
        return users.some(user => (user.email === username || user.username === username) && user.password === password);
    }

    // Animation 
    setTimeout(function () {
        $('.contentAnim').remove();
    }, 2100);


    $('img').on('click', function() {
        $('img').toggleClass('rotated');
    })

});


class UI {

    static linkToRegistration($loginForm, $registrationForm) {
        $('#linkCreateAccount').on('click', function (e) {
            e.preventDefault();
            this.parentElement.parentElement.parentElement.animate({ background: 'red' }, 3000);


            setTimeout(function () {
                $loginForm.toggleClass('form--hidden');
                $registrationForm.removeClass('form--hidden');

            }, 2000);


        });
    }

    static linkToLogin($loginForm, $registrationForm) {
        $('#linkLogin').on('click', function (e) {
            e.preventDefault();


            this.parentElement.parentElement.parentElement.animate({ background: 'blue' }, 3000);
            setTimeout(function () {

                $loginForm.removeClass('form--hidden');
                $registrationForm.toggleClass('form--hidden');
            }, 2000);

        });
    }

}

class User {
    constructor(id, email, username, user_tel, password) {
        this.email = email;
        this.username = username;
        this.user_tel = user_tel;
        this.password = password;
    }
}

class Store {
    static createUser() {
        const email = $('#email_input').val();
        const username = $('input[name="uname"]').val();
        const user_tel = $('input[name="user_tel"]').val();
        const password = $('input[name="user_password"]').val();

        const id = this.userCounts() + 1;
        const user = new User(id, email, username, user_tel, password);

        const users = Store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    static userCounts() {
        if (localStorage.length === 0) return 0;
        return JSON.parse(localStorage.getItem('users')).length;
    }

    static getUsers() {
        let users;
        if (localStorage.getItem("users") !== null) {
            users = JSON.parse(localStorage.getItem('users'));
        } else {
            users = [];
        }

        return users;
    }
}

