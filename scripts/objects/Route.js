/**
 * Define a route.
 */
export default class Route {

  // The name (identifier) of the route.
  name:String = '';

  // The path of the route. Ex: /home or /restaurants/:id
  path:String = '';

  // The handler for this route.
  handler:String = '';

  disable:Boolean = false;

  /**
   * Construct a new Route object.
   * @param name The name (identifier) of the route.
   * @param path The path of the route. Ex: /home or /restaurants/:id
   * @param handler The handler for this route. A null handler disable the route
   * @param disable
   */
  constructor(name:String, path:String, handler:String, disable:Boolean = false) {
    this.name = name;
    this.path = path;
    this.handler = handler;
    // disable if the handler is null.
    this.disable = handler === null ? false : disable;
  }
}
