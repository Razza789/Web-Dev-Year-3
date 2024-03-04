<?php
namespace App\EndpointControllers;
/**
 * Preview endpoint returns the links to preview videos with the content title. The params are that it only returns 1 video at a time and changes with each refresh. 
 * @author John Rooksby as I followed some of the code from the workshop. 
 * @author Ryan Field
 */

class Preview extends Endpoint
{
    //Define the SQL
    private $sql = "SELECT title, preview_video FROM content WHERE preview_video IS NOT NULL AND preview_video != ''";

    //Array for placeholder values
    private $sqlParams = [];

    public function __construct()
    {
        $data = []; // Initialise data as an empty array

        switch(\App\Request::method()) 
        {
            case 'GET':
                // Get the 'limit' parameter from the query string
                $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 1; // Default to 1 if no limit is set
                $this->sql .= " ORDER BY RANDOM() LIMIT :limit";
                $this->sqlParams[':limit'] = $limit;
                
                $dbConn = new \App\Database(CHI_DATABASE); 

                // Pass both properties to the executeSQL method
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
 
                break;
            default:
                // ClientError is an exception that handles HTTP status codes
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }
}
?>
