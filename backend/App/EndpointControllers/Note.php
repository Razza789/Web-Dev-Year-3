<?php
 
 namespace App\EndpointControllers;


/**
 * Note endpoint. GET will return the logged in users notes. POST will allow the user to update the content ID and note. DELETE will allow the user to delete the content ID and note from the database. 
 * @author John Rooksby as I followed some of the code from the workshop. 
 * @author Ryan Field
 * @author CHATPGPT helped with some of the SQL later down the line and the getJsonPayload as thats what got it working in the end. 
 */
class Note extends Endpoint
{
public function __construct()
    {
        $userId = $this->validateToken();
        
        $this->checkUserExists($userId);
        
        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getNote($userId);
                break;
            case 'POST':
                $data = $this->postNote($userId);
                break;
            case 'DELETE':
                $data = $this->deleteNote($userId);
                break;
            default:
                throw new \App\ClientError(405);
                break;
        }
        parent::__construct($data);
    }

// Validates the users token by getting the secret key. 

private function validateToken()
    {
        $secretkey = SECRET;
                
        $jwt = \App\REQUEST::getBearerToken();
 
        try {
            $decodedJWT = \Firebase\JWT\JWT::decode($jwt, new \Firebase\JWT\Key($secretkey, 'HS256'));
        } catch (\Exception $e) {
            throw new \App\ClientError(401);
        }
 
        if (!isset($decodedJWT->exp) || !isset($decodedJWT->sub)) { 
            throw new \App\ClientError(401);
        }
 
        return $decodedJWT->sub;
    }

    private function note()
    {
        if (!isset(\App\Request::params()['note'])) {
            throw new \App\ClientError(422, 'Note is required');
        }

        $note = \App\Request::params()['note'];

        if (mb_strlen($note) > 255) {
            throw new \App\ClientError(422, 'Note must be less than 255 characters');
        }

        return htmlspecialchars($note);
    }
//Returns the users note and will display the CONTENT ID and the NOTE itself
    private function getNote($userId)
    {
        // If a content_id is specified, return the note for that content
        // otherwise return all notes for the user.
        $dbConn = new \App\Database(USER_DATABASE);
    
        if (isset(\App\Request::params()['content_id'])) {
            $contentId = \App\Request::params()['content_id'];
    
            if (!is_numeric($contentId)) {
                throw new \App\ClientError(422, 'Content ID must be numeric');
            }
    
            $sql = "SELECT * FROM notes WHERE user_id = :userId AND content_id = :contentId";
            $sqlParams = [':userId' => $userId, ':contentId' => $contentId];
            $notes = $dbConn->executeSQL($sql, $sqlParams);
    
            // Return the note or an empty array if no note is found.
            return $notes ? $notes[0] : [];
        } else {
            $sql = "SELECT * FROM notes WHERE user_id = :userId";
            $sqlParams = [':userId' => $userId];
            $notes = $dbConn->executeSQL($sql, $sqlParams);
    
            // Return all notes or an empty array if no notes are found.
            return $notes ?: [];
        }
    }
    
//Allows the user to post the note
    private function postNote($userId)
    {
    // Fetch JSON payload from the request
    $data = \App\Request::getJsonPayload();
    
    // Get content_id and note from the payload
    $contentId = isset($data['content_id']) ? (int)$data['content_id'] : null;
    $note = isset($data['note']) ? $data['note'] : null;
    
        $dbConn = new \App\Database(USER_DATABASE);
    
        $sqlParams = [
            ':userId' => $userId,
            ':contentId' => $contentId,
            ':note' => $note
        ];
    //Prepares Executes the sql if the logged in user adds content_id and the note text to the databse. 
        $sql = "INSERT INTO notes (user_id, content_id, note) VALUES (:userId, :contentId, :note)";
        $dbConn->executeSQL($sql, $sqlParams);
    
    
        return ['message' => 'Note saved successfully'];
    }

//Allows the user to delete the note
    private function deleteNote($userId)
    {
        // Fetch JSON payload from the request
        $data = \App\Request::getJsonPayload();
    
        // Get content_id from the payload
        $contentId = isset($data['content_id']) ? (int)$data['content_id'] : null;
    
        if ($contentId === null) {
            throw new \App\ClientError(422, 'Content ID is required');
        }
    
        // Instantiate database connection
        $dbConn = new \App\Database(USER_DATABASE);
    
        // Prepare the SQL command and parameters
        $sql = "DELETE FROM notes WHERE user_id = :userId AND content_id = :contentId";
        $sqlParams = [':userId' => $userId, ':contentId' => $contentId];
    
        // Execute the SQL command
        $dbConn->executeSQL($sql, $sqlParams);
    
        // Return success message or data
        return ['message' => 'Note deleted successfully'];
    }
//Checks if the user exists in the database by getting the user ID from the accounts table
    private function checkUserExists($userId)
    {
        // Instantiate database connection
        $dbConn = new \App\Database(USER_DATABASE);

        // Prepare the SQL command and parameters to check if the user exists
        $sql = "SELECT id FROM account WHERE id = :userId";
        $sqlParams = [':userId' => $userId];

        // Execute the SQL command
        $data = $dbConn->executeSQL($sql, $sqlParams);

        // Check if exactly one user exists with the given ID
        if (count($data) != 1) {
            throw new \App\ClientError(401, 'User does not exist');
        }
    }
}
?>