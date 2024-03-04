<?php
namespace App\EndpointControllers;

/**
 * This endpoint gets the content id, title, abstract, content type, affiliation, authors name, authors country and if it has won an award or not
 * The params for this are that you can use content?page=2 and content?type=Paper in the URL, but you have to put the capital letter at the start.
 * @author Ryan Field
 * @author CHATGPT helped with the SQL commands
 */

class Content extends Endpoint
{
    public function __construct()
    {
        $data = [];

        switch(\App\Request::method()) 
        {
            case 'GET':
                $dbConn = new \App\Database(CHI_DATABASE);
                $sqlParams = [];
                $perPage = 20; // Default number of results per page

                // SQL query to get the content id, title, abstract, content type, affiliation, authors name, authors country and award
                $sql = "SELECT c.id, c.title, c.abstract, t.name AS content_type,
                    GROUP_CONCAT(DISTINCT a.name) AS authors_names,
                    GROUP_CONCAT(DISTINCT aff.country) AS authors_countries,
                    CASE
                        WHEN cha_award.award IS NOT NULL THEN 'Yes'
                        ELSE 'No'
                    END AS has_award, aw.name AS award_name FROM content c
                    JOIN content_has_author cha ON c.id = cha.content
                    JOIN author a ON cha.author = a.id
                    JOIN affiliation aff ON a.id = aff.author
                    JOIN type t ON c.type = t.id
                    LEFT JOIN content_has_award cha_award ON c.id = cha_award.content
                    LEFT JOIN award aw ON cha_award.award = aw.id
                GROUP BY 
                    c.id";

                // Filter by type if the 'type' parameter is set
                if(isset($_GET['type'])) {
                    $sql .= " HAVING content_type = :type";
                    $sqlParams[':type'] = $_GET['type'];
                }

                // Add pagination if the 'page' parameter is set
                if(isset($_GET['page'])) {
                    $page = max(1, intval($_GET['page']));
                    $offset = ($page - 1) * $perPage;
                    $sql .= " LIMIT :offset, :perPage";
                    $sqlParams[':offset'] = $offset;
                    $sqlParams[':perPage'] = $perPage;
                }

                // Execute the SQL query with parameters
                $data = $dbConn->executeSQL($sql, $sqlParams);

                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }
}
?>
