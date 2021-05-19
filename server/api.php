<?php

require_once 'db.php';
$response = array();
if (isset($_GET['apicall'])){
    switch ($_GET['apicall']){
        case 'register':
            if (isTheseParameterAvailable(array('name', 'email', 'password'))){
                $name = $_POST['name'];
                $email = $_POST['email'];
                $password = md5($_POST['password']);

                $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $stmt->store_result();

                if ($stmt->num_rows > 0){
                    $response['error'] = true;
                    $response['massage'] = 'User telah terdaftar';
                    $stmt->close();
                } else {
                    $stmt = $conn->prepare("INSERT INTO users(name, email, password) VALUES (?, ?, ?);");
                    $stmt->bind_param("sss", $name, $email, $password);
                    $result = $stmt->execute();

                    if ($result) {
                        $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
                        $stmt->bind_param("s", $email);
                        $stmt->execute();
                        $stmt->bind_result($id, $name, $email);
                        $stmt->fetch();

                        $user = array(
                            'id'=>$id,
                            'name'=>$name,
                            'email'=>$email
                        );

                        $stmt->close();

                        $response['error'] = false;
                        $response['massage'] = 'User berhasil didaftarkan';
                        $response['user'] = $user;
                    }
                }
            }else{
                $response['error'] = true;
                $response ['massage'] = 'parameter yang diperlukan tidak tersedia';
            }
            break;
        case 'login':
            if (isTheseParameterAvailable(array('email', 'password'))){
                $email = $_POST['email'];
                $password = md5($_POST['password']);

                $stmt = $conn->prepare("SELECT id, name, email FROM users WHERE email = ? AND password = ?");
                $stmt->bind_param("ss", $email, $password);
                $stmt->execute();
                $stmt->store_result();

                if ($stmt->num_rows > 0){
                    $stmt->bind_result($id, $name, $email);
                    $stmt->fetch();
                    $user = array(
                        'id'=>$id,
                        'name'=>$name,
                        'email'=>$email
                    );

                    $response['error'] = false;
                    $response['massage'] = 'Login berhasil';
                    $response['user'] = $user;                       
                } else {
                    $response['error'] = false;
                    $response['massage'] = 'email atau password salah';
                }
            } else {
                $response['error'] = true;
                $response ['massage'] = 'parameter yang diperlukan tidak tersedia';
            }
            break;
            case 'list_news':
                $stmt = $conn->prepare("SELECT id, title, body, author, image FROM news order by id desc");
                $stmt->execute();
                $stmt->bind_result($id, $title, $body, $author, $image);

                $response = array();
                while ($stmt->fetch()) {
                    $temp = array();
                    $temp['id'] = $id;
                    $temp['title'] = $title;
                    $temp['body'] = $body;
                    $temp['author'] = $author;
                    $temp['image'] = $image;

                    array_push($response, $temp);
                }
            break;
            case 'add_bookmark':
                if (isTheseParameterAvailable(array('user_id', 'news_id'))){
                    $user_id = $_POST['user_id'];
                    $news_id = $_POST['news_id'];

                    $stmt = $conn->prepare("SELECT id, user_id, news_id FROM bookmarks WHERE user_id = ? AND news_id = ?");
                    $stmt->bind_param("ss", $user_id, $news_id);

                    $stmt->execute();
                    $stmt->store_result();

                    if ($stmt->num_rows > 0){
                        $response ['error'] = false;
                        $response ['massage'] = 'berita sudah ada dalam bookmark';

                    } else{
                        $stmt = $conn->prepare("INSERT INTO bookmarks(user_id, news_id) VALUES( ?, ?);");
                        $stmt->bind_param("ss", $user_id, $news_id);
                        $stmt->execute();

                        $response ['error'] = false;
                        $response ['massage'] = 'berita telah disimpan ke bookmark'; 
                }
            } else {
                $response['error'] = true;
                $response ['massage'] = 'parameter yang diperlukan tidak tersedia';
            }
            break;
            case 'list_bookmark':
                if (isTheseParameterAvailable(array('user_id'))){
                    $user_id = $_POST['user_id'];
                    $stmt = $conn->prepare("SELECT a.id, a.user_id, a.news_id, b.title, b.body, b.author, b.image FROM bookmarks a, news b WHERE a.user_id = ? AND a.news_id = b.id");
                    $stmt->bind_param("s", $user_id);
                    $stmt->execute();
                    $stmt->bind_result($id, $user_id, $news_id, $title, $body, $author, $image);

                    $response = array();
                    while ($stmt->fetch()) {
                    $temp = array();
                    $temp['id'] = $id;
                    $temp['user_id'] = $user_id;
                    $temp['news_id'] = $news_id;
                    $temp['title'] = $title;
                    $temp['body'] = $body;
                    $temp['image'] = $image;

                    array_push($response, $temp);
                } 
            }else{
                $response ['error'] = true;
                $response ['massage'] = 'parameter yang diperlukan tidak tersedia';
    }
            break;
            case 'delete_bookmark':
                if (isTheseParameterAvailable(array('id'))){
                    $bookmark_id = $_POST['id'];
                    $stmt = $conn->prepare("SELECT id FROM bookmarks WHERE id = ?");
                    $stmt->bind_param("s", $bookmark_id);
                    $stmt->execute();
                    $stmt->store_result();

                    if ($stmt->num_rows > 0){
                        $stmt = $conn->prepare("DELETE FROM bookmarks WHERE id = ?");
                        $stmt->bind_param("s", $bookmark_id);

                        $stmt->execute();
                        $response ['error'] = false;
                        $response ['massage'] = 'bookmark telah dihapus';
                    }else{
                        $response ['error'] = true;
                        $response ['massage'] = 'bookmark tidak ditemukan';
                        $stmt->close();
                    }
                } else {
                    $response ['error'] = true;
                    $response ['massage'] = 'parameter yang diperlukan tidak tersedia';
                }
                break;
    }
            
} else {
    header("HTTP/1.0 404 Not Found");
    echo "<h1>404 Not Found</h1>";
    echo "The Page that you have requested could not be found.";
    exit();
}
echo json_encode($response, JSON_UNESCAPED_SLASHES);

function isTheseParameterAvailable($params){
    foreach ($params as $param){
        if (!isset($_POST[$param])){
            return false;
        }
    }
    return true;
}
?>