import {
  ActualizarStatusRentaData,
  ActualizarStatusRentaError,
  ActualizarStatusRentaParams,
  CalcularPrecioData,
  CalcularPrecioError,
  CalcularPrecioParams,
  ChangePasswordData,
  ChangePasswordError,
  CheckHealthData,
  CrearRentaData,
  CrearRentaError,
  CreateProductData,
  CreateProductError,
  DeleteProductData,
  DeleteProductError,
  DeleteProductParams,
  GetProductData,
  GetProductError,
  GetProductParams,
  GetProductsData,
  GetProductsError,
  GetProductsParams,
  GetProfileData,
  ListProductsData,
  ListarRentasData,
  ListarRentasError,
  ListarRentasParams,
  LoginData,
  LoginError,
  NuevaRentaRequest,
  ObtenerRentaData,
  ObtenerRentaError,
  ObtenerRentaParams,
  PasswordReset,
  ProductCreate,
  ProductUpdate,
  ProfileUpdate,
  RegisterData,
  RegisterError,
  UpdateProductData,
  UpdateProductError,
  UpdateProductParams,
  UpdateProfileData,
  UpdateProfileError,
  UserLogin,
  UserRegister,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description Retrieve all products from the database.
   *
   * @tags dbtn/module:inventory, dbtn/hasAuth
   * @name list_products
   * @summary List Products
   * @request GET:/routes/products
   */
  list_products = (params: RequestParams = {}) =>
    this.request<ListProductsData, any>({
      path: `/routes/products`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name create_product
   * @summary Create Product
   * @request POST:/routes/products/
   * @secure
   */
  create_product = (data: ProductCreate, params: RequestParams = {}) =>
    this.request<CreateProductData, CreateProductError>({
      path: `/routes/products/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name get_products
   * @summary Get Products
   * @request GET:/routes/products/
   */
  get_products = (query: GetProductsParams, params: RequestParams = {}) =>
    this.request<GetProductsData, GetProductsError>({
      path: `/routes/products/`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * No description
   *
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name get_product
   * @summary Get Product
   * @request GET:/routes/products/{product_id}
   */
  get_product = ({ productId, ...query }: GetProductParams, params: RequestParams = {}) =>
    this.request<GetProductData, GetProductError>({
      path: `/routes/products/${productId}`,
      method: "GET",
      ...params,
    });

  /**
   * No description
   *
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name update_product
   * @summary Update Product
   * @request PUT:/routes/products/{product_id}
   * @secure
   */
  update_product = ({ productId, ...query }: UpdateProductParams, data: ProductUpdate, params: RequestParams = {}) =>
    this.request<UpdateProductData, UpdateProductError>({
      path: `/routes/products/${productId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name delete_product
   * @summary Delete Product
   * @request DELETE:/routes/products/{product_id}
   * @secure
   */
  delete_product = ({ productId, ...query }: DeleteProductParams, params: RequestParams = {}) =>
    this.request<DeleteProductData, DeleteProductError>({
      path: `/routes/products/${productId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });

  /**
   * @description User registration endpoint
   *
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name register
   * @summary Register
   * @request POST:/routes/users/register
   */
  register = (data: UserRegister, params: RequestParams = {}) =>
    this.request<RegisterData, RegisterError>({
      path: `/routes/users/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description User login endpoint
   *
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name login
   * @summary Login
   * @request POST:/routes/users/login
   */
  login = (data: UserLogin, params: RequestParams = {}) =>
    this.request<LoginData, LoginError>({
      path: `/routes/users/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Get current user profile
   *
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name get_profile
   * @summary Get Profile
   * @request GET:/routes/users/me
   * @secure
   */
  get_profile = (params: RequestParams = {}) =>
    this.request<GetProfileData, any>({
      path: `/routes/users/me`,
      method: "GET",
      secure: true,
      ...params,
    });

  /**
   * @description Update user profile
   *
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name update_profile
   * @summary Update Profile
   * @request PUT:/routes/users/me
   * @secure
   */
  update_profile = (data: ProfileUpdate, params: RequestParams = {}) =>
    this.request<UpdateProfileData, UpdateProfileError>({
      path: `/routes/users/me`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Change user password
   *
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name change_password
   * @summary Change Password
   * @request POST:/routes/users/me/change-password
   * @secure
   */
  change_password = (data: PasswordReset, params: RequestParams = {}) =>
    this.request<ChangePasswordData, ChangePasswordError>({
      path: `/routes/users/me/change-password`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Creates a new box rental for RentaBox.
   *
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name crear_renta
   * @summary Crear Renta
   * @request POST:/routes/api/rentabox/crear-renta
   */
  crear_renta = (data: NuevaRentaRequest, params: RequestParams = {}) =>
    this.request<CrearRentaData, CrearRentaError>({
      path: `/routes/api/rentabox/crear-renta`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * @description Lists all box rentals.
   *
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name listar_rentas
   * @summary Listar Rentas
   * @request GET:/routes/api/rentabox/rentas
   */
  listar_rentas = (query: ListarRentasParams, params: RequestParams = {}) =>
    this.request<ListarRentasData, ListarRentasError>({
      path: `/routes/api/rentabox/rentas`,
      method: "GET",
      query: query,
      ...params,
    });

  /**
   * @description Gets details for a specific box rental.
   *
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name obtener_renta
   * @summary Obtener Renta
   * @request GET:/routes/api/rentabox/rentas/{renta_id}
   */
  obtener_renta = ({ rentaId, ...query }: ObtenerRentaParams, params: RequestParams = {}) =>
    this.request<ObtenerRentaData, ObtenerRentaError>({
      path: `/routes/api/rentabox/rentas/${rentaId}`,
      method: "GET",
      ...params,
    });

  /**
   * @description Updates the status of a box rental.
   *
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name actualizar_status_renta
   * @summary Actualizar Status Renta
   * @request PUT:/routes/api/rentabox/rentas/{renta_id}/status
   */
  actualizar_status_renta = ({ rentaId, ...query }: ActualizarStatusRentaParams, params: RequestParams = {}) =>
    this.request<ActualizarStatusRentaData, ActualizarStatusRentaError>({
      path: `/routes/api/rentabox/rentas/${rentaId}/status`,
      method: "PUT",
      query: query,
      ...params,
    });

  /**
   * @description Price calculator for RentaBox.
   *
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name calcular_precio
   * @summary Calcular Precio
   * @request GET:/routes/api/rentabox/calculadora-precio
   */
  calcular_precio = (query: CalcularPrecioParams, params: RequestParams = {}) =>
    this.request<CalcularPrecioData, CalcularPrecioError>({
      path: `/routes/api/rentabox/calculadora-precio`,
      method: "GET",
      query: query,
      ...params,
    });
}
