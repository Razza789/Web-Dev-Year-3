<?php

namespace App\EndpointControllers;
/**
 * Abstract class to get information about the http request.
 * 
 * The methods in this class are static so they can be called
 * without creating an instance of the class. This will be useful
 * for the endpoint classes.
 * 
 * @author Ryan Field
 */

class Country extends Endpoint
{
    // This endpoint doesn't require parameters, but you could define them if needed
    protected $allowedParams = [];

    /** Define the SQL as a property */
    private $sql = "SELECT DISTINCT country FROM affiliation";

    /** Define an array used to match placehoders to values */
    private $sqlParams = [];

    public function __construct()
    {
        $data = []; // Initialize data as an empty array

        switch(\App\Request::method()) 
        {
            case 'GET':
                // Since there's no parameters to check, we directly access the database
                $dbConn = new \App\Database(CHI_DATABASE); // Modify this if your Database class expects a PDO instance

                // Pass both properties to the executeSQL method
                // Modify this line according to how your Database class handles SQL execution
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams);
 
                break;
            default:
                // Assuming ClientError is an exception that handles HTTP status codes
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }
}
?>
