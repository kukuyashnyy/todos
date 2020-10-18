$(document).ready(function () {
    readList();
    taskCounter();
    toggleCheckBox();

    $('input').keyup(function (e) {
        if (e.key === "Enter") {
            addTask(e.target.value);
            e.target.value = '';
        }
        taskCounter();
        writeList();
    });

    $('ul').on("click", "[type=checkbox]", function () {
        completeTask($(this).parent().parent());
        taskCounter();
        writeList();
    })

    $('ul').on("click", "button.destroy", function () {
        $(this).parents()[1].remove();
        taskCounter();
        writeList();
    })

    $('section.main').on("click", "#toggle-all", function (e) {
        $('ul.todo-list > li').each(function () {
            completeTask($(this));
        });
        toggleCheckBox();
        writeList();
    });

    $('ul.filters').on("click", "li", function () {
        $('footer > ul > li').each(function () {
            if ($(this).children().attr('class') === "selected") {
                $(this).children().attr('class', '');
            }
        })
        $(this).children().attr('class', 'selected');
        showList($(this).text());
    })
});

const writeList = function () {
    localStorage['list'] = $('ul.todo-list').html();
}

const readList = function () {
    if (localStorage['list'] === undefined) {
        localStorage['list'] = String();
    } else {
        $('ul.todo-list').append(localStorage['list']);
    }
    toggleCheckBox();
}

const showList = function (e) {
    switch (e) {
        case "All":
            $('ul.todo-list > li').each(function () {
                $(this).removeClass('hidden');
            });
            break;
        case"Active":
            $('ul.todo-list > li').each(function () {
                if (!($(this).hasClass("completed label"))) {
                    $(this).removeClass('hidden');
                } else {
                    $(this).addClass('hidden');
                }
            });
            break;
        case "Completed":
            $('ul.todo-list > li').each(function () {
                if ($(this).hasClass("completed label")) {
                    $(this).removeClass('hidden');
                } else {
                    $(this).addClass('hidden');
                }
            })
            break;
    }
}

const addTask = function (text) {
    const task = '<li>' +
        '<div class="view">' +
        '<input class="toggle" type="checkbox">' +
        '<label>' + text + '</label>' +
        '<button class="destroy"></button>' +
        '</div>' +
        '<input class="edit" value="' + text + '">' +
        '</li>';
    $('ul.todo-list').append(task);
}

const taskCounter = function () {
    let counter = 0;
    $('ul.todo-list > li').each(function () {
        if ($(this).attr('class') !== "completed label") {
            counter++;
        }
    })
    $('span.todo-count > strong').text(counter);
    // console.log(counter);
}

const toggleCheckBox = function () {
    $('ul.todo-list > li').each(function () {
        if ($(this).hasClass("completed label")) {
            $(this).children().children().prop('checked', true);
        } else {
            $(this).children().children().prop('checked', false);
        }
    });
}

const completeTask = function (e) {
    $(e).toggleClass("completed label");
}