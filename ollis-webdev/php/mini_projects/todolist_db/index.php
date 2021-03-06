<?php declare(strict_types=1); ?>
<!DOCTYPE html> 
<html lang="de">
<head>
    <meta charset="utf-8">
    <title>Todo List</title>
    <meta name="description" content="Todo List Beispiel">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>

<body>
<div class="container">

<ul class="nav nav-pills">
    <li>
        <a class="nav-link" href="<?= $_SERVER["SCRIPT_NAME"]; ?>">Todo List</a>
    </li>
    <li>
        <a class="nav-link" href="<?= $_SERVER["SCRIPT_NAME"] . "?action=add_todo"; ?>">Add Todo</a>
    </li>
</ul>

<?php
    // Die Funktionen des Models: get, add, delete
    require_once 'model.php';

    // Die Funktionen der Views: render_todo_list, render_add_todo, render_message
    require_once 'views.php';

    // Der Controller
    // Was will der Benutzer machen?
    $action = $_GET['action'] ?? '';

    // Haben wir einen GET oder einen POST Request?
    $method = $_SERVER['REQUEST_METHOD'];

    $db = get_db();

    switch ($action):

        // index.php?action=add_todo
        case 'add_todo':
            // POST Request: POST Daten des Formulars speichern
            if ($method === 'POST' ) {
                add_todo($db, $_POST['title'], $_POST['description']);
                render_message('Todo added.');
                $todos = get_todos($db);
                render_todo_list($todos);
            }
            // GET Request: Formular anzeigen
            else {
                render_add_todo();
            }
            break;

        // index.php?action=delete_todo&id=DDD
        case 'delete_todo':
            $success = delete_todo($db, $_GET['id']);
            $message = ($success) ? 'Todo Deleted' : 'There was a problem!';
            render_message($message);
            $todos = get_todos($db);
            render_todo_list($todos);
            break;

        // index.php
        default:
            $todos = get_todos($db);
            render_todo_list($todos);
    endswitch;

    mysqli_close($db);
?>

</div> <!-- .container -->

</body>
</html>