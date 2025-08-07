/** Direccion */
export interface Direccion {
  /** Calle */
  calle: string;
  /**
   * Interior
   * @default ""
   */
  interior?: string | null;
  /** Colonia */
  colonia: string;
  /** Alcaldia */
  alcaldia: string;
  /**
   * Estado
   * @default "CDMX"
   */
  estado?: string;
  /** Cp */
  cp: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/** NuevaRentaRequest */
export interface NuevaRentaRequest {
  /** Nombre */
  nombre: string;
  /** Apellidos */
  apellidos: string;
  /**
   * Email
   * @format email
   */
  email: string;
  /** Telefono */
  telefono: string;
  direccion_entrega: Direccion;
  direccion_recoleccion: Direccion;
  /** Tipo Servicio */
  tipo_servicio: string;
  /** Paquete */
  paquete: string;
  /** Semanas */
  semanas: number;
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
}

/** NuevaRentaResponse */
export interface NuevaRentaResponse {
  /** Success */
  success: boolean;
  /** Renta Id */
  renta_id: number;
  /** Token Seguridad */
  token_seguridad: string;
  /** Precio Total */
  precio_total: number;
  /** Mensaje */
  mensaje: string;
  /** Fecha Entrega Estimada */
  fecha_entrega_estimada: string;
  /** Fecha Recoleccion Estimada */
  fecha_recoleccion_estimada: string;
}

/** PasswordReset */
export interface PasswordReset {
  /** Current Password */
  current_password: string;
  /** New Password */
  new_password: string;
}

/** Product */
export interface Product {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Sku */
  sku?: string | null;
  /** Type */
  type: string;
  /** Base Price */
  base_price?: number | null;
  /** Price Per Week */
  price_per_week?: number | null;
  /** Stock */
  stock: number;
  /** Image Url */
  image_url?: string | null;
}

/** ProductCreate */
export interface ProductCreate {
  /** Sku */
  sku: string;
  /** Name */
  name: string;
  /** Description */
  description?: string | null;
  /** Category */
  category?: string | null;
  /** Price */
  price: number;
  /** Cost */
  cost?: number | null;
  /**
   * Stock
   * @default 0
   */
  stock?: number;
  /**
   * Min Stock
   * @default 10
   */
  min_stock?: number;
  /**
   * Unit
   * @default "pza"
   */
  unit?: string;
  /**
   * Tax Rate
   * @default 16
   */
  tax_rate?: number;
  /** Images */
  images?: string[] | null;
  /** Attributes */
  attributes?: Record<string, any> | null;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
}

/** ProductOut */
export interface ProductOut {
  /** Sku */
  sku: string;
  /** Name */
  name: string;
  /** Description */
  description?: string | null;
  /** Category */
  category?: string | null;
  /** Price */
  price: number;
  /** Cost */
  cost?: number | null;
  /**
   * Stock
   * @default 0
   */
  stock?: number;
  /**
   * Min Stock
   * @default 10
   */
  min_stock?: number;
  /**
   * Unit
   * @default "pza"
   */
  unit?: string;
  /**
   * Tax Rate
   * @default 16
   */
  tax_rate?: number;
  /** Images */
  images?: string[] | null;
  /** Attributes */
  attributes?: Record<string, any> | null;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /** Id */
  id: string;
}

/** ProductUpdate */
export interface ProductUpdate {
  /** Sku */
  sku: string;
  /** Name */
  name: string;
  /** Description */
  description?: string | null;
  /** Category */
  category?: string | null;
  /** Price */
  price: number;
  /** Cost */
  cost?: number | null;
  /**
   * Stock
   * @default 0
   */
  stock?: number;
  /**
   * Min Stock
   * @default 10
   */
  min_stock?: number;
  /**
   * Unit
   * @default "pza"
   */
  unit?: string;
  /**
   * Tax Rate
   * @default 16
   */
  tax_rate?: number;
  /** Images */
  images?: string[] | null;
  /** Attributes */
  attributes?: Record<string, any> | null;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
}

/** ProfileOut */
export interface ProfileOut {
  /** Id */
  id: string;
  /**
   * Email
   * @format email
   */
  email: string;
  /** Full Name */
  full_name: string | null;
  /** Phone */
  phone: string | null;
  /** Role */
  role: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Last Login */
  last_login: string | null;
}

/** ProfileUpdate */
export interface ProfileUpdate {
  /** Full Name */
  full_name?: string | null;
  /** Phone */
  phone?: string | null;
}

/** Token */
export interface Token {
  /** Access Token */
  access_token: string;
  /**
   * Token Type
   * @default "bearer"
   */
  token_type?: string;
  /** User */
  user: Record<string, any>;
}

/** UserLogin */
export interface UserLogin {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Password */
  password: string;
}

/** UserRegister */
export interface UserRegister {
  /**
   * Email
   * @format email
   */
  email: string;
  /** Password */
  password: string;
  /** Full Name */
  full_name: string;
  /** Phone */
  phone?: string | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type CheckHealthData = HealthResponse;

/** Response List Products */
export type ListProductsData = Product[];

export type CreateProductData = ProductOut;

export type CreateProductError = HTTPValidationError;

export interface GetProductsParams {
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
}

/** Response Get Products */
export type GetProductsData = ProductOut[];

export type GetProductsError = HTTPValidationError;

export interface GetProductParams {
  /** Product Id */
  productId: string;
}

export type GetProductData = ProductOut;

export type GetProductError = HTTPValidationError;

export interface UpdateProductParams {
  /** Product Id */
  productId: string;
}

export type UpdateProductData = ProductOut;

export type UpdateProductError = HTTPValidationError;

export interface DeleteProductParams {
  /** Product Id */
  productId: string;
}

export type DeleteProductData = any;

export type DeleteProductError = HTTPValidationError;

export type RegisterData = Token;

export type RegisterError = HTTPValidationError;

export type LoginData = Token;

export type LoginError = HTTPValidationError;

export type GetProfileData = ProfileOut;

export type UpdateProfileData = ProfileOut;

export type UpdateProfileError = HTTPValidationError;

export type ChangePasswordData = any;

export type ChangePasswordError = HTTPValidationError;

export type CrearRentaData = NuevaRentaResponse;

export type CrearRentaError = HTTPValidationError;

export interface ListarRentasParams {
  /** Status */
  status?: string | null;
  /**
   * Limit
   * @default 50
   */
  limit?: number;
}

export type ListarRentasData = any;

export type ListarRentasError = HTTPValidationError;

export interface ObtenerRentaParams {
  /** Renta Id */
  rentaId: number;
}

export type ObtenerRentaData = any;

export type ObtenerRentaError = HTTPValidationError;

export interface ActualizarStatusRentaParams {
  /** Nuevo Status */
  nuevo_status: string;
  /** Renta Id */
  rentaId: number;
}

export type ActualizarStatusRentaData = any;

export type ActualizarStatusRentaError = HTTPValidationError;

export interface CalcularPrecioParams {
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
}

export type CalcularPrecioData = any;

export type CalcularPrecioError = HTTPValidationError;
