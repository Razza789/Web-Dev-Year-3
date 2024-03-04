<?php

namespace App;

//Router for the endpoints and allows the user to type the endpoint into the url without needing to have the starting letter as a capital letter
abstract class Router
{
    public static function routeRequest()
    {
        try {
            switch (\App\Request::endpointName()) {
                case 'developer': 
                    $endpoint = new \App\EndpointControllers\Developer();
                    break;
                case 'country': 
                    $endpoint = new \App\EndpointControllers\Country();
                    break;
                case 'preview': 
                    $endpoint = new \App\EndpointControllers\Preview();
                    break;
                case 'AuthorAndAffiliation': 
                    $endpoint = new \App\EndpointControllers\AuthorAndAffiliation();
                    break;
                case 'content': 
                    $endpoint = new \App\EndpointControllers\Content();
                    break;
                case 'token': 
                    $endpoint = new \App\EndpointControllers\Token();
                    break;
                case 'note': 
                    $endpoint = new \App\EndpointControllers\Note();
                    break;
                default:
                    throw new \App\ClientError(404, "Endpoint Not Found");
            }
        } catch (\App\ClientError $e) {
            $data['message'] = $e->getMessage();
            $endpoint = new \App\EndpointControllers\Endpoint($data);
        }
        return $endpoint;
     }
}

?>