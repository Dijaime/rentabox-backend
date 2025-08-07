import {
  ActualizarStatusRentaData,
  CalcularPrecioData,
  ChangePasswordData,
  CheckHealthData,
  CrearRentaData,
  CreateProductData,
  DeleteProductData,
  GetProductData,
  GetProductsData,
  GetProfileData,
  ListProductsData,
  ListarRentasData,
  LoginData,
  NuevaRentaRequest,
  ObtenerRentaData,
  PasswordReset,
  ProductCreate,
  ProductUpdate,
  ProfileUpdate,
  RegisterData,
  UpdateProductData,
  UpdateProfileData,
  UserLogin,
  UserRegister,
} from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description Retrieve all products from the database.
   * @tags dbtn/module:inventory, dbtn/hasAuth
   * @name list_products
   * @summary List Products
   * @request GET:/routes/products
   */
  export namespace list_products {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListProductsData;
  }

  /**
   * No description
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name create_product
   * @summary Create Product
   * @request POST:/routes/products/
   * @secure
   */
  export namespace create_product {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProductCreate;
    export type RequestHeaders = {};
    export type ResponseBody = CreateProductData;
  }

  /**
   * No description
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name get_products
   * @summary Get Products
   * @request GET:/routes/products/
   */
  export namespace get_products {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Skip
       * @default 0
       */
      skip?: number;
      /**
       * Limit
       * @default 100
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetProductsData;
  }

  /**
   * No description
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name get_product
   * @summary Get Product
   * @request GET:/routes/products/{product_id}
   */
  export namespace get_product {
    export type RequestParams = {
      /** Product Id */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetProductData;
  }

  /**
   * No description
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name update_product
   * @summary Update Product
   * @request PUT:/routes/products/{product_id}
   * @secure
   */
  export namespace update_product {
    export type RequestParams = {
      /** Product Id */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ProductUpdate;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateProductData;
  }

  /**
   * No description
   * @tags Products, dbtn/module:products, dbtn/hasAuth
   * @name delete_product
   * @summary Delete Product
   * @request DELETE:/routes/products/{product_id}
   * @secure
   */
  export namespace delete_product {
    export type RequestParams = {
      /** Product Id */
      productId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteProductData;
  }

  /**
   * @description User registration endpoint
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name register
   * @summary Register
   * @request POST:/routes/users/register
   */
  export namespace register {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserRegister;
    export type RequestHeaders = {};
    export type ResponseBody = RegisterData;
  }

  /**
   * @description User login endpoint
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name login
   * @summary Login
   * @request POST:/routes/users/login
   */
  export namespace login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserLogin;
    export type RequestHeaders = {};
    export type ResponseBody = LoginData;
  }

  /**
   * @description Get current user profile
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name get_profile
   * @summary Get Profile
   * @request GET:/routes/users/me
   * @secure
   */
  export namespace get_profile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetProfileData;
  }

  /**
   * @description Update user profile
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name update_profile
   * @summary Update Profile
   * @request PUT:/routes/users/me
   * @secure
   */
  export namespace update_profile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ProfileUpdate;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateProfileData;
  }

  /**
   * @description Change user password
   * @tags Users, dbtn/module:users, dbtn/hasAuth
   * @name change_password
   * @summary Change Password
   * @request POST:/routes/users/me/change-password
   * @secure
   */
  export namespace change_password {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PasswordReset;
    export type RequestHeaders = {};
    export type ResponseBody = ChangePasswordData;
  }

  /**
   * @description Creates a new box rental for RentaBox.
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name crear_renta
   * @summary Crear Renta
   * @request POST:/routes/api/rentabox/crear-renta
   */
  export namespace crear_renta {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NuevaRentaRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CrearRentaData;
  }

  /**
   * @description Lists all box rentals.
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name listar_rentas
   * @summary Listar Rentas
   * @request GET:/routes/api/rentabox/rentas
   */
  export namespace listar_rentas {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Status */
      status?: string | null;
      /**
       * Limit
       * @default 50
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListarRentasData;
  }

  /**
   * @description Gets details for a specific box rental.
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name obtener_renta
   * @summary Obtener Renta
   * @request GET:/routes/api/rentabox/rentas/{renta_id}
   */
  export namespace obtener_renta {
    export type RequestParams = {
      /** Renta Id */
      rentaId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ObtenerRentaData;
  }

  /**
   * @description Updates the status of a box rental.
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name actualizar_status_renta
   * @summary Actualizar Status Renta
   * @request PUT:/routes/api/rentabox/rentas/{renta_id}/status
   */
  export namespace actualizar_status_renta {
    export type RequestParams = {
      /** Renta Id */
      rentaId: number;
    };
    export type RequestQuery = {
      /** Nuevo Status */
      nuevo_status: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ActualizarStatusRentaData;
  }

  /**
   * @description Price calculator for RentaBox.
   * @tags RentaBox, dbtn/module:rentabox, dbtn/hasAuth
   * @name calcular_precio
   * @summary Calcular Precio
   * @request GET:/routes/api/rentabox/calculadora-precio
   */
  export namespace calcular_precio {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Paquete */
      paquete: string;
      /**
       * Semanas
       * @default 1
       */
      semanas?: number;
      /**
       * Cajas Xl
       * @default 0
       */
      cajas_xl?: number;
      /**
       * Carritos
       * @default 0
       */
      carritos?: number;
      /**
       * Film
       * @default 0
       */
      film?: number;
      /**
       * Esquineros
       * @default 0
       */
      esquineros?: number;
      /**
       * Papel Kraft
       * @default 0
       */
      papel_kraft?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CalcularPrecioData;
  }
}
