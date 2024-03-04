<?php

namespace App\EndpointControllers;

/**
 * This endpoint returns the author id, name, country, city, institution and their content id/title. 
 * The params are that you can search by using ?country and ?content at the of the url and will return an error if you try to use both.
 * @author CHATGPT helped with the SQL
 * @author Ryan Field
 */

class AuthorAndAffiliation extends Endpoint
{
    public function __construct()
    {
        $data = [];

        switch (\App\Request::method()) {
            case 'GET':
                $dbConn = new \App\Database(CHI_DATABASE);
                
                // SQL QUERY to get author id, name, country, city, institution, content id and content tile
                $sql = "SELECT 
                            author.id AS author_id, 
                            author.name AS author_name, 
                            affiliation.country, 
                            affiliation.city, 
                            affiliation.institution,
                            content.id AS content_id,
                            content.title AS content_title
                        FROM 
                            author
                            INNER JOIN content_has_author ON author.id = content_has_author.author
                            INNER JOIN content ON content_has_author.content = content.id
                            LEFT JOIN affiliation ON author.id = affiliation.author"; 

                $sqlParams = [];

                // Handle the 'author' parameter from the query string
                if (isset($_GET['author'])) {
                    $sql .= " WHERE author.id = :authorId";
                    $sqlParams[':authorId'] = $_GET['author'];
                }

                // Handle the 'content' parameter from the query string
                if (isset($_GET['content'])) {
                    if (isset($sqlParams[':authorId']) || isset($_GET['country'])) {
                        // If 'author' or 'country' is already set, throw an error 
                        throw new \App\ClientError("Cannot use 'content' parameter along with 'author' or 'country' parameters.", 400);
                    }
                    $sql .= " WHERE content.id = :contentId";
                    $sqlParams[':contentId'] = $_GET['content'];
                }

                // Handle the 'country' parameter from the query string
                if (isset($_GET['country'])) {
                    if (isset($sqlParams[':authorId'])) {
                        // If both 'author' and 'country' are set, throw an error 
                        throw new \App\ClientError("Both 'author' and 'country' parameters cannot be used together.", 400);
                    }
                    $sql .= " WHERE affiliation.country = :country";
                    $sqlParams[':country'] = $_GET['country'];
                }

                // Execute the SQL query
                $data = $dbConn->executeSQL($sql, $sqlParams);

                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }
}

?>
