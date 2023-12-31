/**
 * Expresscart
 * Expresscart API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface SignInResponse { 
    /**
     * Access token for authenticated user.
     */
    token: any | null;
    /**
     * Refresh token for authenticated user.
     */
    refreshToken: any | null;
    /**
     * Token expiration time in seconds.
     */
    expiresIn: any | null;
    /**
     * User ID.
     */
    id: any | null;
}

