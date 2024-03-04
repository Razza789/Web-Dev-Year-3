<?php
namespace App\EndpointControllers;
/**
 * Returns my name and student ID in JSON.
 * @author Ryan Field
 */

class Developer extends Endpoint
{
    public function __construct()
    {
        switch(\App\Request::method()) {
            case 'GET':
                $data['code'] = "W20017978";
                $data['name'] = "Ryan Field";
                break;
            default:
                throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }
}
?>
