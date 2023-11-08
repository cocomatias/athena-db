import { Request, Response, Router } from 'express';
import BaseRoute from './BaseRoute';
import { BaseRouteParams } from '@types';

/**
 * Supported HTTP methods for routing.
 */
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

/**
 * Constructor type for route handlers, expecting a new instance of a class extending BaseRoute.
 */
type RouteHandlerConstructor<T extends BaseRoute> = new (
  params: BaseRouteParams,
) => T;

/**
 * Utility function to set up a route with the given method, path, and route handler class.
 * @param router Express Router instance to which the route will be added.
 * @param method HTTP method for the route.
 * @param path URL path for the route.
 * @param RouteHandler Class extending BaseRoute to handle the route.
 * @param options Additional options to pass to the RouteHandler, excluding request and response objects.
 */
export function setupRoute<T extends BaseRoute>(
  router: Router,
  method: HttpMethod,
  path: string,
  RouteHandler: RouteHandlerConstructor<T>,
  options: Omit<BaseRouteParams, 'req' | 'res'> = {},
): void {
  // Using bracket syntax to dynamically access the method on the router based on the HttpMethod type
  router[method](path, (req: Request, res: Response) => {
    // Instantiate the handler with the incoming request, response, and any additional options
    const handler = new RouteHandler({ req, res, ...options });
    // Invoke the handler for the route
    handler.handle();
  });
}
