
/**
 * Client
**/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model VolunteerSession
 * 
 */
export type VolunteerSession = $Result.DefaultSelection<Prisma.$VolunteerSessionPayload>
/**
 * Model Volunteer
 * 
 */
export type Volunteer = $Result.DefaultSelection<Prisma.$VolunteerPayload>
/**
 * Model VolunteerRegistration
 * 
 */
export type VolunteerRegistration = $Result.DefaultSelection<Prisma.$VolunteerRegistrationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RegistrationStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

export type RegistrationStatus = (typeof RegistrationStatus)[keyof typeof RegistrationStatus]


export const SessionTypes: {
  TUTORING: 'TUTORING',
  OTHER: 'OTHER'
};

export type SessionTypes = (typeof SessionTypes)[keyof typeof SessionTypes]

}

export type RegistrationStatus = $Enums.RegistrationStatus

export const RegistrationStatus: typeof $Enums.RegistrationStatus

export type SessionTypes = $Enums.SessionTypes

export const SessionTypes: typeof $Enums.SessionTypes

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more VolunteerSessions
 * const volunteerSessions = await prisma.volunteerSession.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more VolunteerSessions
   * const volunteerSessions = await prisma.volunteerSession.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => $Utils.JsPromise<void> : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.volunteerSession`: Exposes CRUD operations for the **VolunteerSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VolunteerSessions
    * const volunteerSessions = await prisma.volunteerSession.findMany()
    * ```
    */
  get volunteerSession(): Prisma.VolunteerSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.volunteer`: Exposes CRUD operations for the **Volunteer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Volunteers
    * const volunteers = await prisma.volunteer.findMany()
    * ```
    */
  get volunteer(): Prisma.VolunteerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.volunteerRegistration`: Exposes CRUD operations for the **VolunteerRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VolunteerRegistrations
    * const volunteerRegistrations = await prisma.volunteerRegistration.findMany()
    * ```
    */
  get volunteerRegistration(): Prisma.VolunteerRegistrationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    VolunteerSession: 'VolunteerSession',
    Volunteer: 'Volunteer',
    VolunteerRegistration: 'VolunteerRegistration'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "volunteerSession" | "volunteer" | "volunteerRegistration"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      VolunteerSession: {
        payload: Prisma.$VolunteerSessionPayload<ExtArgs>
        fields: Prisma.VolunteerSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VolunteerSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VolunteerSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload>
          }
          findFirst: {
            args: Prisma.VolunteerSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VolunteerSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload>
          }
          findMany: {
            args: Prisma.VolunteerSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload>[]
          }
          create: {
            args: Prisma.VolunteerSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload>
          }
          createMany: {
            args: Prisma.VolunteerSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VolunteerSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload>[]
          }
          delete: {
            args: Prisma.VolunteerSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload>
          }
          update: {
            args: Prisma.VolunteerSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload>
          }
          deleteMany: {
            args: Prisma.VolunteerSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VolunteerSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VolunteerSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload>[]
          }
          upsert: {
            args: Prisma.VolunteerSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerSessionPayload>
          }
          aggregate: {
            args: Prisma.VolunteerSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVolunteerSession>
          }
          groupBy: {
            args: Prisma.VolunteerSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<VolunteerSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.VolunteerSessionCountArgs<ExtArgs>
            result: $Utils.Optional<VolunteerSessionCountAggregateOutputType> | number
          }
        }
      }
      Volunteer: {
        payload: Prisma.$VolunteerPayload<ExtArgs>
        fields: Prisma.VolunteerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VolunteerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VolunteerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload>
          }
          findFirst: {
            args: Prisma.VolunteerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VolunteerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload>
          }
          findMany: {
            args: Prisma.VolunteerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload>[]
          }
          create: {
            args: Prisma.VolunteerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload>
          }
          createMany: {
            args: Prisma.VolunteerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VolunteerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload>[]
          }
          delete: {
            args: Prisma.VolunteerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload>
          }
          update: {
            args: Prisma.VolunteerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload>
          }
          deleteMany: {
            args: Prisma.VolunteerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VolunteerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VolunteerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload>[]
          }
          upsert: {
            args: Prisma.VolunteerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerPayload>
          }
          aggregate: {
            args: Prisma.VolunteerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVolunteer>
          }
          groupBy: {
            args: Prisma.VolunteerGroupByArgs<ExtArgs>
            result: $Utils.Optional<VolunteerGroupByOutputType>[]
          }
          count: {
            args: Prisma.VolunteerCountArgs<ExtArgs>
            result: $Utils.Optional<VolunteerCountAggregateOutputType> | number
          }
        }
      }
      VolunteerRegistration: {
        payload: Prisma.$VolunteerRegistrationPayload<ExtArgs>
        fields: Prisma.VolunteerRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VolunteerRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VolunteerRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload>
          }
          findFirst: {
            args: Prisma.VolunteerRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VolunteerRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload>
          }
          findMany: {
            args: Prisma.VolunteerRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload>[]
          }
          create: {
            args: Prisma.VolunteerRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload>
          }
          createMany: {
            args: Prisma.VolunteerRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VolunteerRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload>[]
          }
          delete: {
            args: Prisma.VolunteerRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload>
          }
          update: {
            args: Prisma.VolunteerRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.VolunteerRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VolunteerRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VolunteerRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.VolunteerRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VolunteerRegistrationPayload>
          }
          aggregate: {
            args: Prisma.VolunteerRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVolunteerRegistration>
          }
          groupBy: {
            args: Prisma.VolunteerRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VolunteerRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VolunteerRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<VolunteerRegistrationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    volunteerSession?: VolunteerSessionOmit
    volunteer?: VolunteerOmit
    volunteerRegistration?: VolunteerRegistrationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type VolunteerSessionCountOutputType
   */

  export type VolunteerSessionCountOutputType = {
    volunteers: number
  }

  export type VolunteerSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteers?: boolean | VolunteerSessionCountOutputTypeCountVolunteersArgs
  }

  // Custom InputTypes
  /**
   * VolunteerSessionCountOutputType without action
   */
  export type VolunteerSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSessionCountOutputType
     */
    select?: VolunteerSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VolunteerSessionCountOutputType without action
   */
  export type VolunteerSessionCountOutputTypeCountVolunteersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VolunteerRegistrationWhereInput
  }


  /**
   * Count Type VolunteerCountOutputType
   */

  export type VolunteerCountOutputType = {
    registrations: number
  }

  export type VolunteerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | VolunteerCountOutputTypeCountRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * VolunteerCountOutputType without action
   */
  export type VolunteerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerCountOutputType
     */
    select?: VolunteerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VolunteerCountOutputType without action
   */
  export type VolunteerCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VolunteerRegistrationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model VolunteerSession
   */

  export type AggregateVolunteerSession = {
    _count: VolunteerSessionCountAggregateOutputType | null
    _avg: VolunteerSessionAvgAggregateOutputType | null
    _sum: VolunteerSessionSumAggregateOutputType | null
    _min: VolunteerSessionMinAggregateOutputType | null
    _max: VolunteerSessionMaxAggregateOutputType | null
  }

  export type VolunteerSessionAvgAggregateOutputType = {
    id: number | null
    capacity: number | null
  }

  export type VolunteerSessionSumAggregateOutputType = {
    id: number | null
    capacity: number | null
  }

  export type VolunteerSessionMinAggregateOutputType = {
    id: number | null
    title: string | null
    date: Date | null
    description: string | null
    location: string | null
    capacity: number | null
    image: string | null
    type: $Enums.SessionTypes | null
    createdAt: Date | null
  }

  export type VolunteerSessionMaxAggregateOutputType = {
    id: number | null
    title: string | null
    date: Date | null
    description: string | null
    location: string | null
    capacity: number | null
    image: string | null
    type: $Enums.SessionTypes | null
    createdAt: Date | null
  }

  export type VolunteerSessionCountAggregateOutputType = {
    id: number
    title: number
    date: number
    description: number
    location: number
    capacity: number
    image: number
    type: number
    createdAt: number
    _all: number
  }


  export type VolunteerSessionAvgAggregateInputType = {
    id?: true
    capacity?: true
  }

  export type VolunteerSessionSumAggregateInputType = {
    id?: true
    capacity?: true
  }

  export type VolunteerSessionMinAggregateInputType = {
    id?: true
    title?: true
    date?: true
    description?: true
    location?: true
    capacity?: true
    image?: true
    type?: true
    createdAt?: true
  }

  export type VolunteerSessionMaxAggregateInputType = {
    id?: true
    title?: true
    date?: true
    description?: true
    location?: true
    capacity?: true
    image?: true
    type?: true
    createdAt?: true
  }

  export type VolunteerSessionCountAggregateInputType = {
    id?: true
    title?: true
    date?: true
    description?: true
    location?: true
    capacity?: true
    image?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type VolunteerSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VolunteerSession to aggregate.
     */
    where?: VolunteerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerSessions to fetch.
     */
    orderBy?: VolunteerSessionOrderByWithRelationInput | VolunteerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VolunteerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VolunteerSessions
    **/
    _count?: true | VolunteerSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VolunteerSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VolunteerSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VolunteerSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VolunteerSessionMaxAggregateInputType
  }

  export type GetVolunteerSessionAggregateType<T extends VolunteerSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateVolunteerSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVolunteerSession[P]>
      : GetScalarType<T[P], AggregateVolunteerSession[P]>
  }




  export type VolunteerSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VolunteerSessionWhereInput
    orderBy?: VolunteerSessionOrderByWithAggregationInput | VolunteerSessionOrderByWithAggregationInput[]
    by: VolunteerSessionScalarFieldEnum[] | VolunteerSessionScalarFieldEnum
    having?: VolunteerSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VolunteerSessionCountAggregateInputType | true
    _avg?: VolunteerSessionAvgAggregateInputType
    _sum?: VolunteerSessionSumAggregateInputType
    _min?: VolunteerSessionMinAggregateInputType
    _max?: VolunteerSessionMaxAggregateInputType
  }

  export type VolunteerSessionGroupByOutputType = {
    id: number
    title: string
    date: Date
    description: string
    location: string
    capacity: number
    image: string
    type: $Enums.SessionTypes
    createdAt: Date
    _count: VolunteerSessionCountAggregateOutputType | null
    _avg: VolunteerSessionAvgAggregateOutputType | null
    _sum: VolunteerSessionSumAggregateOutputType | null
    _min: VolunteerSessionMinAggregateOutputType | null
    _max: VolunteerSessionMaxAggregateOutputType | null
  }

  type GetVolunteerSessionGroupByPayload<T extends VolunteerSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VolunteerSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VolunteerSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VolunteerSessionGroupByOutputType[P]>
            : GetScalarType<T[P], VolunteerSessionGroupByOutputType[P]>
        }
      >
    >


  export type VolunteerSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    date?: boolean
    description?: boolean
    location?: boolean
    capacity?: boolean
    image?: boolean
    type?: boolean
    createdAt?: boolean
    volunteers?: boolean | VolunteerSession$volunteersArgs<ExtArgs>
    _count?: boolean | VolunteerSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["volunteerSession"]>

  export type VolunteerSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    date?: boolean
    description?: boolean
    location?: boolean
    capacity?: boolean
    image?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["volunteerSession"]>

  export type VolunteerSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    date?: boolean
    description?: boolean
    location?: boolean
    capacity?: boolean
    image?: boolean
    type?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["volunteerSession"]>

  export type VolunteerSessionSelectScalar = {
    id?: boolean
    title?: boolean
    date?: boolean
    description?: boolean
    location?: boolean
    capacity?: boolean
    image?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type VolunteerSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "date" | "description" | "location" | "capacity" | "image" | "type" | "createdAt", ExtArgs["result"]["volunteerSession"]>
  export type VolunteerSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteers?: boolean | VolunteerSession$volunteersArgs<ExtArgs>
    _count?: boolean | VolunteerSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VolunteerSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VolunteerSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VolunteerSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VolunteerSession"
    objects: {
      volunteers: Prisma.$VolunteerRegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      date: Date
      description: string
      location: string
      capacity: number
      image: string
      type: $Enums.SessionTypes
      createdAt: Date
    }, ExtArgs["result"]["volunteerSession"]>
    composites: {}
  }

  type VolunteerSessionGetPayload<S extends boolean | null | undefined | VolunteerSessionDefaultArgs> = $Result.GetResult<Prisma.$VolunteerSessionPayload, S>

  type VolunteerSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VolunteerSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VolunteerSessionCountAggregateInputType | true
    }

  export interface VolunteerSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VolunteerSession'], meta: { name: 'VolunteerSession' } }
    /**
     * Find zero or one VolunteerSession that matches the filter.
     * @param {VolunteerSessionFindUniqueArgs} args - Arguments to find a VolunteerSession
     * @example
     * // Get one VolunteerSession
     * const volunteerSession = await prisma.volunteerSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VolunteerSessionFindUniqueArgs>(args: SelectSubset<T, VolunteerSessionFindUniqueArgs<ExtArgs>>): Prisma__VolunteerSessionClient<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VolunteerSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VolunteerSessionFindUniqueOrThrowArgs} args - Arguments to find a VolunteerSession
     * @example
     * // Get one VolunteerSession
     * const volunteerSession = await prisma.volunteerSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VolunteerSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, VolunteerSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VolunteerSessionClient<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VolunteerSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerSessionFindFirstArgs} args - Arguments to find a VolunteerSession
     * @example
     * // Get one VolunteerSession
     * const volunteerSession = await prisma.volunteerSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VolunteerSessionFindFirstArgs>(args?: SelectSubset<T, VolunteerSessionFindFirstArgs<ExtArgs>>): Prisma__VolunteerSessionClient<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VolunteerSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerSessionFindFirstOrThrowArgs} args - Arguments to find a VolunteerSession
     * @example
     * // Get one VolunteerSession
     * const volunteerSession = await prisma.volunteerSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VolunteerSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, VolunteerSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__VolunteerSessionClient<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VolunteerSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VolunteerSessions
     * const volunteerSessions = await prisma.volunteerSession.findMany()
     * 
     * // Get first 10 VolunteerSessions
     * const volunteerSessions = await prisma.volunteerSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const volunteerSessionWithIdOnly = await prisma.volunteerSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VolunteerSessionFindManyArgs>(args?: SelectSubset<T, VolunteerSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VolunteerSession.
     * @param {VolunteerSessionCreateArgs} args - Arguments to create a VolunteerSession.
     * @example
     * // Create one VolunteerSession
     * const VolunteerSession = await prisma.volunteerSession.create({
     *   data: {
     *     // ... data to create a VolunteerSession
     *   }
     * })
     * 
     */
    create<T extends VolunteerSessionCreateArgs>(args: SelectSubset<T, VolunteerSessionCreateArgs<ExtArgs>>): Prisma__VolunteerSessionClient<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VolunteerSessions.
     * @param {VolunteerSessionCreateManyArgs} args - Arguments to create many VolunteerSessions.
     * @example
     * // Create many VolunteerSessions
     * const volunteerSession = await prisma.volunteerSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VolunteerSessionCreateManyArgs>(args?: SelectSubset<T, VolunteerSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VolunteerSessions and returns the data saved in the database.
     * @param {VolunteerSessionCreateManyAndReturnArgs} args - Arguments to create many VolunteerSessions.
     * @example
     * // Create many VolunteerSessions
     * const volunteerSession = await prisma.volunteerSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VolunteerSessions and only return the `id`
     * const volunteerSessionWithIdOnly = await prisma.volunteerSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VolunteerSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, VolunteerSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VolunteerSession.
     * @param {VolunteerSessionDeleteArgs} args - Arguments to delete one VolunteerSession.
     * @example
     * // Delete one VolunteerSession
     * const VolunteerSession = await prisma.volunteerSession.delete({
     *   where: {
     *     // ... filter to delete one VolunteerSession
     *   }
     * })
     * 
     */
    delete<T extends VolunteerSessionDeleteArgs>(args: SelectSubset<T, VolunteerSessionDeleteArgs<ExtArgs>>): Prisma__VolunteerSessionClient<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VolunteerSession.
     * @param {VolunteerSessionUpdateArgs} args - Arguments to update one VolunteerSession.
     * @example
     * // Update one VolunteerSession
     * const volunteerSession = await prisma.volunteerSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VolunteerSessionUpdateArgs>(args: SelectSubset<T, VolunteerSessionUpdateArgs<ExtArgs>>): Prisma__VolunteerSessionClient<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VolunteerSessions.
     * @param {VolunteerSessionDeleteManyArgs} args - Arguments to filter VolunteerSessions to delete.
     * @example
     * // Delete a few VolunteerSessions
     * const { count } = await prisma.volunteerSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VolunteerSessionDeleteManyArgs>(args?: SelectSubset<T, VolunteerSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VolunteerSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VolunteerSessions
     * const volunteerSession = await prisma.volunteerSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VolunteerSessionUpdateManyArgs>(args: SelectSubset<T, VolunteerSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VolunteerSessions and returns the data updated in the database.
     * @param {VolunteerSessionUpdateManyAndReturnArgs} args - Arguments to update many VolunteerSessions.
     * @example
     * // Update many VolunteerSessions
     * const volunteerSession = await prisma.volunteerSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VolunteerSessions and only return the `id`
     * const volunteerSessionWithIdOnly = await prisma.volunteerSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VolunteerSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, VolunteerSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VolunteerSession.
     * @param {VolunteerSessionUpsertArgs} args - Arguments to update or create a VolunteerSession.
     * @example
     * // Update or create a VolunteerSession
     * const volunteerSession = await prisma.volunteerSession.upsert({
     *   create: {
     *     // ... data to create a VolunteerSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VolunteerSession we want to update
     *   }
     * })
     */
    upsert<T extends VolunteerSessionUpsertArgs>(args: SelectSubset<T, VolunteerSessionUpsertArgs<ExtArgs>>): Prisma__VolunteerSessionClient<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VolunteerSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerSessionCountArgs} args - Arguments to filter VolunteerSessions to count.
     * @example
     * // Count the number of VolunteerSessions
     * const count = await prisma.volunteerSession.count({
     *   where: {
     *     // ... the filter for the VolunteerSessions we want to count
     *   }
     * })
    **/
    count<T extends VolunteerSessionCountArgs>(
      args?: Subset<T, VolunteerSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VolunteerSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VolunteerSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VolunteerSessionAggregateArgs>(args: Subset<T, VolunteerSessionAggregateArgs>): Prisma.PrismaPromise<GetVolunteerSessionAggregateType<T>>

    /**
     * Group by VolunteerSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VolunteerSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VolunteerSessionGroupByArgs['orderBy'] }
        : { orderBy?: VolunteerSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VolunteerSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVolunteerSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VolunteerSession model
   */
  readonly fields: VolunteerSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VolunteerSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VolunteerSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    volunteers<T extends VolunteerSession$volunteersArgs<ExtArgs> = {}>(args?: Subset<T, VolunteerSession$volunteersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VolunteerSession model
   */
  interface VolunteerSessionFieldRefs {
    readonly id: FieldRef<"VolunteerSession", 'Int'>
    readonly title: FieldRef<"VolunteerSession", 'String'>
    readonly date: FieldRef<"VolunteerSession", 'DateTime'>
    readonly description: FieldRef<"VolunteerSession", 'String'>
    readonly location: FieldRef<"VolunteerSession", 'String'>
    readonly capacity: FieldRef<"VolunteerSession", 'Int'>
    readonly image: FieldRef<"VolunteerSession", 'String'>
    readonly type: FieldRef<"VolunteerSession", 'SessionTypes'>
    readonly createdAt: FieldRef<"VolunteerSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VolunteerSession findUnique
   */
  export type VolunteerSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerSession to fetch.
     */
    where: VolunteerSessionWhereUniqueInput
  }

  /**
   * VolunteerSession findUniqueOrThrow
   */
  export type VolunteerSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerSession to fetch.
     */
    where: VolunteerSessionWhereUniqueInput
  }

  /**
   * VolunteerSession findFirst
   */
  export type VolunteerSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerSession to fetch.
     */
    where?: VolunteerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerSessions to fetch.
     */
    orderBy?: VolunteerSessionOrderByWithRelationInput | VolunteerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VolunteerSessions.
     */
    cursor?: VolunteerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VolunteerSessions.
     */
    distinct?: VolunteerSessionScalarFieldEnum | VolunteerSessionScalarFieldEnum[]
  }

  /**
   * VolunteerSession findFirstOrThrow
   */
  export type VolunteerSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerSession to fetch.
     */
    where?: VolunteerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerSessions to fetch.
     */
    orderBy?: VolunteerSessionOrderByWithRelationInput | VolunteerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VolunteerSessions.
     */
    cursor?: VolunteerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VolunteerSessions.
     */
    distinct?: VolunteerSessionScalarFieldEnum | VolunteerSessionScalarFieldEnum[]
  }

  /**
   * VolunteerSession findMany
   */
  export type VolunteerSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerSessions to fetch.
     */
    where?: VolunteerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerSessions to fetch.
     */
    orderBy?: VolunteerSessionOrderByWithRelationInput | VolunteerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VolunteerSessions.
     */
    cursor?: VolunteerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerSessions.
     */
    skip?: number
    distinct?: VolunteerSessionScalarFieldEnum | VolunteerSessionScalarFieldEnum[]
  }

  /**
   * VolunteerSession create
   */
  export type VolunteerSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a VolunteerSession.
     */
    data: XOR<VolunteerSessionCreateInput, VolunteerSessionUncheckedCreateInput>
  }

  /**
   * VolunteerSession createMany
   */
  export type VolunteerSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VolunteerSessions.
     */
    data: VolunteerSessionCreateManyInput | VolunteerSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VolunteerSession createManyAndReturn
   */
  export type VolunteerSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * The data used to create many VolunteerSessions.
     */
    data: VolunteerSessionCreateManyInput | VolunteerSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VolunteerSession update
   */
  export type VolunteerSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a VolunteerSession.
     */
    data: XOR<VolunteerSessionUpdateInput, VolunteerSessionUncheckedUpdateInput>
    /**
     * Choose, which VolunteerSession to update.
     */
    where: VolunteerSessionWhereUniqueInput
  }

  /**
   * VolunteerSession updateMany
   */
  export type VolunteerSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VolunteerSessions.
     */
    data: XOR<VolunteerSessionUpdateManyMutationInput, VolunteerSessionUncheckedUpdateManyInput>
    /**
     * Filter which VolunteerSessions to update
     */
    where?: VolunteerSessionWhereInput
    /**
     * Limit how many VolunteerSessions to update.
     */
    limit?: number
  }

  /**
   * VolunteerSession updateManyAndReturn
   */
  export type VolunteerSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * The data used to update VolunteerSessions.
     */
    data: XOR<VolunteerSessionUpdateManyMutationInput, VolunteerSessionUncheckedUpdateManyInput>
    /**
     * Filter which VolunteerSessions to update
     */
    where?: VolunteerSessionWhereInput
    /**
     * Limit how many VolunteerSessions to update.
     */
    limit?: number
  }

  /**
   * VolunteerSession upsert
   */
  export type VolunteerSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the VolunteerSession to update in case it exists.
     */
    where: VolunteerSessionWhereUniqueInput
    /**
     * In case the VolunteerSession found by the `where` argument doesn't exist, create a new VolunteerSession with this data.
     */
    create: XOR<VolunteerSessionCreateInput, VolunteerSessionUncheckedCreateInput>
    /**
     * In case the VolunteerSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VolunteerSessionUpdateInput, VolunteerSessionUncheckedUpdateInput>
  }

  /**
   * VolunteerSession delete
   */
  export type VolunteerSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
    /**
     * Filter which VolunteerSession to delete.
     */
    where: VolunteerSessionWhereUniqueInput
  }

  /**
   * VolunteerSession deleteMany
   */
  export type VolunteerSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VolunteerSessions to delete
     */
    where?: VolunteerSessionWhereInput
    /**
     * Limit how many VolunteerSessions to delete.
     */
    limit?: number
  }

  /**
   * VolunteerSession.volunteers
   */
  export type VolunteerSession$volunteersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    where?: VolunteerRegistrationWhereInput
    orderBy?: VolunteerRegistrationOrderByWithRelationInput | VolunteerRegistrationOrderByWithRelationInput[]
    cursor?: VolunteerRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VolunteerRegistrationScalarFieldEnum | VolunteerRegistrationScalarFieldEnum[]
  }

  /**
   * VolunteerSession without action
   */
  export type VolunteerSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerSession
     */
    select?: VolunteerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerSession
     */
    omit?: VolunteerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerSessionInclude<ExtArgs> | null
  }


  /**
   * Model Volunteer
   */

  export type AggregateVolunteer = {
    _count: VolunteerCountAggregateOutputType | null
    _avg: VolunteerAvgAggregateOutputType | null
    _sum: VolunteerSumAggregateOutputType | null
    _min: VolunteerMinAggregateOutputType | null
    _max: VolunteerMaxAggregateOutputType | null
  }

  export type VolunteerAvgAggregateOutputType = {
    id: number | null
  }

  export type VolunteerSumAggregateOutputType = {
    id: number | null
  }

  export type VolunteerMinAggregateOutputType = {
    id: number | null
    clerkUserId: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    email: string | null
    instagram: string | null
    birthDate: Date | null
    createdAt: Date | null
    isAdmin: boolean | null
    isLeader: boolean | null
    isActive: boolean | null
  }

  export type VolunteerMaxAggregateOutputType = {
    id: number | null
    clerkUserId: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    email: string | null
    instagram: string | null
    birthDate: Date | null
    createdAt: Date | null
    isAdmin: boolean | null
    isLeader: boolean | null
    isActive: boolean | null
  }

  export type VolunteerCountAggregateOutputType = {
    id: number
    clerkUserId: number
    firstName: number
    lastName: number
    phone: number
    email: number
    instagram: number
    birthDate: number
    createdAt: number
    isAdmin: number
    isLeader: number
    isActive: number
    _all: number
  }


  export type VolunteerAvgAggregateInputType = {
    id?: true
  }

  export type VolunteerSumAggregateInputType = {
    id?: true
  }

  export type VolunteerMinAggregateInputType = {
    id?: true
    clerkUserId?: true
    firstName?: true
    lastName?: true
    phone?: true
    email?: true
    instagram?: true
    birthDate?: true
    createdAt?: true
    isAdmin?: true
    isLeader?: true
    isActive?: true
  }

  export type VolunteerMaxAggregateInputType = {
    id?: true
    clerkUserId?: true
    firstName?: true
    lastName?: true
    phone?: true
    email?: true
    instagram?: true
    birthDate?: true
    createdAt?: true
    isAdmin?: true
    isLeader?: true
    isActive?: true
  }

  export type VolunteerCountAggregateInputType = {
    id?: true
    clerkUserId?: true
    firstName?: true
    lastName?: true
    phone?: true
    email?: true
    instagram?: true
    birthDate?: true
    createdAt?: true
    isAdmin?: true
    isLeader?: true
    isActive?: true
    _all?: true
  }

  export type VolunteerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Volunteer to aggregate.
     */
    where?: VolunteerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Volunteers to fetch.
     */
    orderBy?: VolunteerOrderByWithRelationInput | VolunteerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VolunteerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Volunteers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Volunteers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Volunteers
    **/
    _count?: true | VolunteerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VolunteerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VolunteerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VolunteerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VolunteerMaxAggregateInputType
  }

  export type GetVolunteerAggregateType<T extends VolunteerAggregateArgs> = {
        [P in keyof T & keyof AggregateVolunteer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVolunteer[P]>
      : GetScalarType<T[P], AggregateVolunteer[P]>
  }




  export type VolunteerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VolunteerWhereInput
    orderBy?: VolunteerOrderByWithAggregationInput | VolunteerOrderByWithAggregationInput[]
    by: VolunteerScalarFieldEnum[] | VolunteerScalarFieldEnum
    having?: VolunteerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VolunteerCountAggregateInputType | true
    _avg?: VolunteerAvgAggregateInputType
    _sum?: VolunteerSumAggregateInputType
    _min?: VolunteerMinAggregateInputType
    _max?: VolunteerMaxAggregateInputType
  }

  export type VolunteerGroupByOutputType = {
    id: number
    clerkUserId: string
    firstName: string
    lastName: string
    phone: string
    email: string
    instagram: string | null
    birthDate: Date
    createdAt: Date
    isAdmin: boolean
    isLeader: boolean
    isActive: boolean
    _count: VolunteerCountAggregateOutputType | null
    _avg: VolunteerAvgAggregateOutputType | null
    _sum: VolunteerSumAggregateOutputType | null
    _min: VolunteerMinAggregateOutputType | null
    _max: VolunteerMaxAggregateOutputType | null
  }

  type GetVolunteerGroupByPayload<T extends VolunteerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VolunteerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VolunteerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VolunteerGroupByOutputType[P]>
            : GetScalarType<T[P], VolunteerGroupByOutputType[P]>
        }
      >
    >


  export type VolunteerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    instagram?: boolean
    birthDate?: boolean
    createdAt?: boolean
    isAdmin?: boolean
    isLeader?: boolean
    isActive?: boolean
    registrations?: boolean | Volunteer$registrationsArgs<ExtArgs>
    _count?: boolean | VolunteerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["volunteer"]>

  export type VolunteerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    instagram?: boolean
    birthDate?: boolean
    createdAt?: boolean
    isAdmin?: boolean
    isLeader?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["volunteer"]>

  export type VolunteerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    instagram?: boolean
    birthDate?: boolean
    createdAt?: boolean
    isAdmin?: boolean
    isLeader?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["volunteer"]>

  export type VolunteerSelectScalar = {
    id?: boolean
    clerkUserId?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    email?: boolean
    instagram?: boolean
    birthDate?: boolean
    createdAt?: boolean
    isAdmin?: boolean
    isLeader?: boolean
    isActive?: boolean
  }

  export type VolunteerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkUserId" | "firstName" | "lastName" | "phone" | "email" | "instagram" | "birthDate" | "createdAt" | "isAdmin" | "isLeader" | "isActive", ExtArgs["result"]["volunteer"]>
  export type VolunteerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | Volunteer$registrationsArgs<ExtArgs>
    _count?: boolean | VolunteerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VolunteerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VolunteerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VolunteerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Volunteer"
    objects: {
      registrations: Prisma.$VolunteerRegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clerkUserId: string
      firstName: string
      lastName: string
      phone: string
      email: string
      instagram: string | null
      birthDate: Date
      createdAt: Date
      isAdmin: boolean
      isLeader: boolean
      isActive: boolean
    }, ExtArgs["result"]["volunteer"]>
    composites: {}
  }

  type VolunteerGetPayload<S extends boolean | null | undefined | VolunteerDefaultArgs> = $Result.GetResult<Prisma.$VolunteerPayload, S>

  type VolunteerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VolunteerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VolunteerCountAggregateInputType | true
    }

  export interface VolunteerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Volunteer'], meta: { name: 'Volunteer' } }
    /**
     * Find zero or one Volunteer that matches the filter.
     * @param {VolunteerFindUniqueArgs} args - Arguments to find a Volunteer
     * @example
     * // Get one Volunteer
     * const volunteer = await prisma.volunteer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VolunteerFindUniqueArgs>(args: SelectSubset<T, VolunteerFindUniqueArgs<ExtArgs>>): Prisma__VolunteerClient<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Volunteer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VolunteerFindUniqueOrThrowArgs} args - Arguments to find a Volunteer
     * @example
     * // Get one Volunteer
     * const volunteer = await prisma.volunteer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VolunteerFindUniqueOrThrowArgs>(args: SelectSubset<T, VolunteerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VolunteerClient<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Volunteer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerFindFirstArgs} args - Arguments to find a Volunteer
     * @example
     * // Get one Volunteer
     * const volunteer = await prisma.volunteer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VolunteerFindFirstArgs>(args?: SelectSubset<T, VolunteerFindFirstArgs<ExtArgs>>): Prisma__VolunteerClient<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Volunteer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerFindFirstOrThrowArgs} args - Arguments to find a Volunteer
     * @example
     * // Get one Volunteer
     * const volunteer = await prisma.volunteer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VolunteerFindFirstOrThrowArgs>(args?: SelectSubset<T, VolunteerFindFirstOrThrowArgs<ExtArgs>>): Prisma__VolunteerClient<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Volunteers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Volunteers
     * const volunteers = await prisma.volunteer.findMany()
     * 
     * // Get first 10 Volunteers
     * const volunteers = await prisma.volunteer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const volunteerWithIdOnly = await prisma.volunteer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VolunteerFindManyArgs>(args?: SelectSubset<T, VolunteerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Volunteer.
     * @param {VolunteerCreateArgs} args - Arguments to create a Volunteer.
     * @example
     * // Create one Volunteer
     * const Volunteer = await prisma.volunteer.create({
     *   data: {
     *     // ... data to create a Volunteer
     *   }
     * })
     * 
     */
    create<T extends VolunteerCreateArgs>(args: SelectSubset<T, VolunteerCreateArgs<ExtArgs>>): Prisma__VolunteerClient<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Volunteers.
     * @param {VolunteerCreateManyArgs} args - Arguments to create many Volunteers.
     * @example
     * // Create many Volunteers
     * const volunteer = await prisma.volunteer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VolunteerCreateManyArgs>(args?: SelectSubset<T, VolunteerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Volunteers and returns the data saved in the database.
     * @param {VolunteerCreateManyAndReturnArgs} args - Arguments to create many Volunteers.
     * @example
     * // Create many Volunteers
     * const volunteer = await prisma.volunteer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Volunteers and only return the `id`
     * const volunteerWithIdOnly = await prisma.volunteer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VolunteerCreateManyAndReturnArgs>(args?: SelectSubset<T, VolunteerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Volunteer.
     * @param {VolunteerDeleteArgs} args - Arguments to delete one Volunteer.
     * @example
     * // Delete one Volunteer
     * const Volunteer = await prisma.volunteer.delete({
     *   where: {
     *     // ... filter to delete one Volunteer
     *   }
     * })
     * 
     */
    delete<T extends VolunteerDeleteArgs>(args: SelectSubset<T, VolunteerDeleteArgs<ExtArgs>>): Prisma__VolunteerClient<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Volunteer.
     * @param {VolunteerUpdateArgs} args - Arguments to update one Volunteer.
     * @example
     * // Update one Volunteer
     * const volunteer = await prisma.volunteer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VolunteerUpdateArgs>(args: SelectSubset<T, VolunteerUpdateArgs<ExtArgs>>): Prisma__VolunteerClient<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Volunteers.
     * @param {VolunteerDeleteManyArgs} args - Arguments to filter Volunteers to delete.
     * @example
     * // Delete a few Volunteers
     * const { count } = await prisma.volunteer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VolunteerDeleteManyArgs>(args?: SelectSubset<T, VolunteerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Volunteers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Volunteers
     * const volunteer = await prisma.volunteer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VolunteerUpdateManyArgs>(args: SelectSubset<T, VolunteerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Volunteers and returns the data updated in the database.
     * @param {VolunteerUpdateManyAndReturnArgs} args - Arguments to update many Volunteers.
     * @example
     * // Update many Volunteers
     * const volunteer = await prisma.volunteer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Volunteers and only return the `id`
     * const volunteerWithIdOnly = await prisma.volunteer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VolunteerUpdateManyAndReturnArgs>(args: SelectSubset<T, VolunteerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Volunteer.
     * @param {VolunteerUpsertArgs} args - Arguments to update or create a Volunteer.
     * @example
     * // Update or create a Volunteer
     * const volunteer = await prisma.volunteer.upsert({
     *   create: {
     *     // ... data to create a Volunteer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Volunteer we want to update
     *   }
     * })
     */
    upsert<T extends VolunteerUpsertArgs>(args: SelectSubset<T, VolunteerUpsertArgs<ExtArgs>>): Prisma__VolunteerClient<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Volunteers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerCountArgs} args - Arguments to filter Volunteers to count.
     * @example
     * // Count the number of Volunteers
     * const count = await prisma.volunteer.count({
     *   where: {
     *     // ... the filter for the Volunteers we want to count
     *   }
     * })
    **/
    count<T extends VolunteerCountArgs>(
      args?: Subset<T, VolunteerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VolunteerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Volunteer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VolunteerAggregateArgs>(args: Subset<T, VolunteerAggregateArgs>): Prisma.PrismaPromise<GetVolunteerAggregateType<T>>

    /**
     * Group by Volunteer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VolunteerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VolunteerGroupByArgs['orderBy'] }
        : { orderBy?: VolunteerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VolunteerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVolunteerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Volunteer model
   */
  readonly fields: VolunteerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Volunteer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VolunteerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registrations<T extends Volunteer$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, Volunteer$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Volunteer model
   */
  interface VolunteerFieldRefs {
    readonly id: FieldRef<"Volunteer", 'Int'>
    readonly clerkUserId: FieldRef<"Volunteer", 'String'>
    readonly firstName: FieldRef<"Volunteer", 'String'>
    readonly lastName: FieldRef<"Volunteer", 'String'>
    readonly phone: FieldRef<"Volunteer", 'String'>
    readonly email: FieldRef<"Volunteer", 'String'>
    readonly instagram: FieldRef<"Volunteer", 'String'>
    readonly birthDate: FieldRef<"Volunteer", 'DateTime'>
    readonly createdAt: FieldRef<"Volunteer", 'DateTime'>
    readonly isAdmin: FieldRef<"Volunteer", 'Boolean'>
    readonly isLeader: FieldRef<"Volunteer", 'Boolean'>
    readonly isActive: FieldRef<"Volunteer", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Volunteer findUnique
   */
  export type VolunteerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
    /**
     * Filter, which Volunteer to fetch.
     */
    where: VolunteerWhereUniqueInput
  }

  /**
   * Volunteer findUniqueOrThrow
   */
  export type VolunteerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
    /**
     * Filter, which Volunteer to fetch.
     */
    where: VolunteerWhereUniqueInput
  }

  /**
   * Volunteer findFirst
   */
  export type VolunteerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
    /**
     * Filter, which Volunteer to fetch.
     */
    where?: VolunteerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Volunteers to fetch.
     */
    orderBy?: VolunteerOrderByWithRelationInput | VolunteerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Volunteers.
     */
    cursor?: VolunteerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Volunteers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Volunteers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Volunteers.
     */
    distinct?: VolunteerScalarFieldEnum | VolunteerScalarFieldEnum[]
  }

  /**
   * Volunteer findFirstOrThrow
   */
  export type VolunteerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
    /**
     * Filter, which Volunteer to fetch.
     */
    where?: VolunteerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Volunteers to fetch.
     */
    orderBy?: VolunteerOrderByWithRelationInput | VolunteerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Volunteers.
     */
    cursor?: VolunteerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Volunteers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Volunteers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Volunteers.
     */
    distinct?: VolunteerScalarFieldEnum | VolunteerScalarFieldEnum[]
  }

  /**
   * Volunteer findMany
   */
  export type VolunteerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
    /**
     * Filter, which Volunteers to fetch.
     */
    where?: VolunteerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Volunteers to fetch.
     */
    orderBy?: VolunteerOrderByWithRelationInput | VolunteerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Volunteers.
     */
    cursor?: VolunteerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Volunteers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Volunteers.
     */
    skip?: number
    distinct?: VolunteerScalarFieldEnum | VolunteerScalarFieldEnum[]
  }

  /**
   * Volunteer create
   */
  export type VolunteerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
    /**
     * The data needed to create a Volunteer.
     */
    data: XOR<VolunteerCreateInput, VolunteerUncheckedCreateInput>
  }

  /**
   * Volunteer createMany
   */
  export type VolunteerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Volunteers.
     */
    data: VolunteerCreateManyInput | VolunteerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Volunteer createManyAndReturn
   */
  export type VolunteerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * The data used to create many Volunteers.
     */
    data: VolunteerCreateManyInput | VolunteerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Volunteer update
   */
  export type VolunteerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
    /**
     * The data needed to update a Volunteer.
     */
    data: XOR<VolunteerUpdateInput, VolunteerUncheckedUpdateInput>
    /**
     * Choose, which Volunteer to update.
     */
    where: VolunteerWhereUniqueInput
  }

  /**
   * Volunteer updateMany
   */
  export type VolunteerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Volunteers.
     */
    data: XOR<VolunteerUpdateManyMutationInput, VolunteerUncheckedUpdateManyInput>
    /**
     * Filter which Volunteers to update
     */
    where?: VolunteerWhereInput
    /**
     * Limit how many Volunteers to update.
     */
    limit?: number
  }

  /**
   * Volunteer updateManyAndReturn
   */
  export type VolunteerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * The data used to update Volunteers.
     */
    data: XOR<VolunteerUpdateManyMutationInput, VolunteerUncheckedUpdateManyInput>
    /**
     * Filter which Volunteers to update
     */
    where?: VolunteerWhereInput
    /**
     * Limit how many Volunteers to update.
     */
    limit?: number
  }

  /**
   * Volunteer upsert
   */
  export type VolunteerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
    /**
     * The filter to search for the Volunteer to update in case it exists.
     */
    where: VolunteerWhereUniqueInput
    /**
     * In case the Volunteer found by the `where` argument doesn't exist, create a new Volunteer with this data.
     */
    create: XOR<VolunteerCreateInput, VolunteerUncheckedCreateInput>
    /**
     * In case the Volunteer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VolunteerUpdateInput, VolunteerUncheckedUpdateInput>
  }

  /**
   * Volunteer delete
   */
  export type VolunteerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
    /**
     * Filter which Volunteer to delete.
     */
    where: VolunteerWhereUniqueInput
  }

  /**
   * Volunteer deleteMany
   */
  export type VolunteerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Volunteers to delete
     */
    where?: VolunteerWhereInput
    /**
     * Limit how many Volunteers to delete.
     */
    limit?: number
  }

  /**
   * Volunteer.registrations
   */
  export type Volunteer$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    where?: VolunteerRegistrationWhereInput
    orderBy?: VolunteerRegistrationOrderByWithRelationInput | VolunteerRegistrationOrderByWithRelationInput[]
    cursor?: VolunteerRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VolunteerRegistrationScalarFieldEnum | VolunteerRegistrationScalarFieldEnum[]
  }

  /**
   * Volunteer without action
   */
  export type VolunteerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Volunteer
     */
    select?: VolunteerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Volunteer
     */
    omit?: VolunteerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerInclude<ExtArgs> | null
  }


  /**
   * Model VolunteerRegistration
   */

  export type AggregateVolunteerRegistration = {
    _count: VolunteerRegistrationCountAggregateOutputType | null
    _avg: VolunteerRegistrationAvgAggregateOutputType | null
    _sum: VolunteerRegistrationSumAggregateOutputType | null
    _min: VolunteerRegistrationMinAggregateOutputType | null
    _max: VolunteerRegistrationMaxAggregateOutputType | null
  }

  export type VolunteerRegistrationAvgAggregateOutputType = {
    id: number | null
    volunteerId: number | null
    sessionId: number | null
  }

  export type VolunteerRegistrationSumAggregateOutputType = {
    id: number | null
    volunteerId: number | null
    sessionId: number | null
  }

  export type VolunteerRegistrationMinAggregateOutputType = {
    id: number | null
    volunteerId: number | null
    sessionId: number | null
    status: $Enums.RegistrationStatus | null
    createdAt: Date | null
  }

  export type VolunteerRegistrationMaxAggregateOutputType = {
    id: number | null
    volunteerId: number | null
    sessionId: number | null
    status: $Enums.RegistrationStatus | null
    createdAt: Date | null
  }

  export type VolunteerRegistrationCountAggregateOutputType = {
    id: number
    volunteerId: number
    sessionId: number
    status: number
    createdAt: number
    _all: number
  }


  export type VolunteerRegistrationAvgAggregateInputType = {
    id?: true
    volunteerId?: true
    sessionId?: true
  }

  export type VolunteerRegistrationSumAggregateInputType = {
    id?: true
    volunteerId?: true
    sessionId?: true
  }

  export type VolunteerRegistrationMinAggregateInputType = {
    id?: true
    volunteerId?: true
    sessionId?: true
    status?: true
    createdAt?: true
  }

  export type VolunteerRegistrationMaxAggregateInputType = {
    id?: true
    volunteerId?: true
    sessionId?: true
    status?: true
    createdAt?: true
  }

  export type VolunteerRegistrationCountAggregateInputType = {
    id?: true
    volunteerId?: true
    sessionId?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type VolunteerRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VolunteerRegistration to aggregate.
     */
    where?: VolunteerRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerRegistrations to fetch.
     */
    orderBy?: VolunteerRegistrationOrderByWithRelationInput | VolunteerRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VolunteerRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VolunteerRegistrations
    **/
    _count?: true | VolunteerRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VolunteerRegistrationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VolunteerRegistrationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VolunteerRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VolunteerRegistrationMaxAggregateInputType
  }

  export type GetVolunteerRegistrationAggregateType<T extends VolunteerRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateVolunteerRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVolunteerRegistration[P]>
      : GetScalarType<T[P], AggregateVolunteerRegistration[P]>
  }




  export type VolunteerRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VolunteerRegistrationWhereInput
    orderBy?: VolunteerRegistrationOrderByWithAggregationInput | VolunteerRegistrationOrderByWithAggregationInput[]
    by: VolunteerRegistrationScalarFieldEnum[] | VolunteerRegistrationScalarFieldEnum
    having?: VolunteerRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VolunteerRegistrationCountAggregateInputType | true
    _avg?: VolunteerRegistrationAvgAggregateInputType
    _sum?: VolunteerRegistrationSumAggregateInputType
    _min?: VolunteerRegistrationMinAggregateInputType
    _max?: VolunteerRegistrationMaxAggregateInputType
  }

  export type VolunteerRegistrationGroupByOutputType = {
    id: number
    volunteerId: number
    sessionId: number
    status: $Enums.RegistrationStatus
    createdAt: Date
    _count: VolunteerRegistrationCountAggregateOutputType | null
    _avg: VolunteerRegistrationAvgAggregateOutputType | null
    _sum: VolunteerRegistrationSumAggregateOutputType | null
    _min: VolunteerRegistrationMinAggregateOutputType | null
    _max: VolunteerRegistrationMaxAggregateOutputType | null
  }

  type GetVolunteerRegistrationGroupByPayload<T extends VolunteerRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VolunteerRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VolunteerRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VolunteerRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], VolunteerRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type VolunteerRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    volunteerId?: boolean
    sessionId?: boolean
    status?: boolean
    createdAt?: boolean
    volunteer?: boolean | VolunteerDefaultArgs<ExtArgs>
    session?: boolean | VolunteerSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["volunteerRegistration"]>

  export type VolunteerRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    volunteerId?: boolean
    sessionId?: boolean
    status?: boolean
    createdAt?: boolean
    volunteer?: boolean | VolunteerDefaultArgs<ExtArgs>
    session?: boolean | VolunteerSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["volunteerRegistration"]>

  export type VolunteerRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    volunteerId?: boolean
    sessionId?: boolean
    status?: boolean
    createdAt?: boolean
    volunteer?: boolean | VolunteerDefaultArgs<ExtArgs>
    session?: boolean | VolunteerSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["volunteerRegistration"]>

  export type VolunteerRegistrationSelectScalar = {
    id?: boolean
    volunteerId?: boolean
    sessionId?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type VolunteerRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "volunteerId" | "sessionId" | "status" | "createdAt", ExtArgs["result"]["volunteerRegistration"]>
  export type VolunteerRegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteer?: boolean | VolunteerDefaultArgs<ExtArgs>
    session?: boolean | VolunteerSessionDefaultArgs<ExtArgs>
  }
  export type VolunteerRegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteer?: boolean | VolunteerDefaultArgs<ExtArgs>
    session?: boolean | VolunteerSessionDefaultArgs<ExtArgs>
  }
  export type VolunteerRegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    volunteer?: boolean | VolunteerDefaultArgs<ExtArgs>
    session?: boolean | VolunteerSessionDefaultArgs<ExtArgs>
  }

  export type $VolunteerRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VolunteerRegistration"
    objects: {
      volunteer: Prisma.$VolunteerPayload<ExtArgs>
      session: Prisma.$VolunteerSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      volunteerId: number
      sessionId: number
      status: $Enums.RegistrationStatus
      createdAt: Date
    }, ExtArgs["result"]["volunteerRegistration"]>
    composites: {}
  }

  type VolunteerRegistrationGetPayload<S extends boolean | null | undefined | VolunteerRegistrationDefaultArgs> = $Result.GetResult<Prisma.$VolunteerRegistrationPayload, S>

  type VolunteerRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VolunteerRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VolunteerRegistrationCountAggregateInputType | true
    }

  export interface VolunteerRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VolunteerRegistration'], meta: { name: 'VolunteerRegistration' } }
    /**
     * Find zero or one VolunteerRegistration that matches the filter.
     * @param {VolunteerRegistrationFindUniqueArgs} args - Arguments to find a VolunteerRegistration
     * @example
     * // Get one VolunteerRegistration
     * const volunteerRegistration = await prisma.volunteerRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VolunteerRegistrationFindUniqueArgs>(args: SelectSubset<T, VolunteerRegistrationFindUniqueArgs<ExtArgs>>): Prisma__VolunteerRegistrationClient<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VolunteerRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VolunteerRegistrationFindUniqueOrThrowArgs} args - Arguments to find a VolunteerRegistration
     * @example
     * // Get one VolunteerRegistration
     * const volunteerRegistration = await prisma.volunteerRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VolunteerRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, VolunteerRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VolunteerRegistrationClient<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VolunteerRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerRegistrationFindFirstArgs} args - Arguments to find a VolunteerRegistration
     * @example
     * // Get one VolunteerRegistration
     * const volunteerRegistration = await prisma.volunteerRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VolunteerRegistrationFindFirstArgs>(args?: SelectSubset<T, VolunteerRegistrationFindFirstArgs<ExtArgs>>): Prisma__VolunteerRegistrationClient<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VolunteerRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerRegistrationFindFirstOrThrowArgs} args - Arguments to find a VolunteerRegistration
     * @example
     * // Get one VolunteerRegistration
     * const volunteerRegistration = await prisma.volunteerRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VolunteerRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, VolunteerRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VolunteerRegistrationClient<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VolunteerRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VolunteerRegistrations
     * const volunteerRegistrations = await prisma.volunteerRegistration.findMany()
     * 
     * // Get first 10 VolunteerRegistrations
     * const volunteerRegistrations = await prisma.volunteerRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const volunteerRegistrationWithIdOnly = await prisma.volunteerRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VolunteerRegistrationFindManyArgs>(args?: SelectSubset<T, VolunteerRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VolunteerRegistration.
     * @param {VolunteerRegistrationCreateArgs} args - Arguments to create a VolunteerRegistration.
     * @example
     * // Create one VolunteerRegistration
     * const VolunteerRegistration = await prisma.volunteerRegistration.create({
     *   data: {
     *     // ... data to create a VolunteerRegistration
     *   }
     * })
     * 
     */
    create<T extends VolunteerRegistrationCreateArgs>(args: SelectSubset<T, VolunteerRegistrationCreateArgs<ExtArgs>>): Prisma__VolunteerRegistrationClient<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VolunteerRegistrations.
     * @param {VolunteerRegistrationCreateManyArgs} args - Arguments to create many VolunteerRegistrations.
     * @example
     * // Create many VolunteerRegistrations
     * const volunteerRegistration = await prisma.volunteerRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VolunteerRegistrationCreateManyArgs>(args?: SelectSubset<T, VolunteerRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VolunteerRegistrations and returns the data saved in the database.
     * @param {VolunteerRegistrationCreateManyAndReturnArgs} args - Arguments to create many VolunteerRegistrations.
     * @example
     * // Create many VolunteerRegistrations
     * const volunteerRegistration = await prisma.volunteerRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VolunteerRegistrations and only return the `id`
     * const volunteerRegistrationWithIdOnly = await prisma.volunteerRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VolunteerRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, VolunteerRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VolunteerRegistration.
     * @param {VolunteerRegistrationDeleteArgs} args - Arguments to delete one VolunteerRegistration.
     * @example
     * // Delete one VolunteerRegistration
     * const VolunteerRegistration = await prisma.volunteerRegistration.delete({
     *   where: {
     *     // ... filter to delete one VolunteerRegistration
     *   }
     * })
     * 
     */
    delete<T extends VolunteerRegistrationDeleteArgs>(args: SelectSubset<T, VolunteerRegistrationDeleteArgs<ExtArgs>>): Prisma__VolunteerRegistrationClient<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VolunteerRegistration.
     * @param {VolunteerRegistrationUpdateArgs} args - Arguments to update one VolunteerRegistration.
     * @example
     * // Update one VolunteerRegistration
     * const volunteerRegistration = await prisma.volunteerRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VolunteerRegistrationUpdateArgs>(args: SelectSubset<T, VolunteerRegistrationUpdateArgs<ExtArgs>>): Prisma__VolunteerRegistrationClient<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VolunteerRegistrations.
     * @param {VolunteerRegistrationDeleteManyArgs} args - Arguments to filter VolunteerRegistrations to delete.
     * @example
     * // Delete a few VolunteerRegistrations
     * const { count } = await prisma.volunteerRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VolunteerRegistrationDeleteManyArgs>(args?: SelectSubset<T, VolunteerRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VolunteerRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VolunteerRegistrations
     * const volunteerRegistration = await prisma.volunteerRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VolunteerRegistrationUpdateManyArgs>(args: SelectSubset<T, VolunteerRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VolunteerRegistrations and returns the data updated in the database.
     * @param {VolunteerRegistrationUpdateManyAndReturnArgs} args - Arguments to update many VolunteerRegistrations.
     * @example
     * // Update many VolunteerRegistrations
     * const volunteerRegistration = await prisma.volunteerRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VolunteerRegistrations and only return the `id`
     * const volunteerRegistrationWithIdOnly = await prisma.volunteerRegistration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VolunteerRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, VolunteerRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VolunteerRegistration.
     * @param {VolunteerRegistrationUpsertArgs} args - Arguments to update or create a VolunteerRegistration.
     * @example
     * // Update or create a VolunteerRegistration
     * const volunteerRegistration = await prisma.volunteerRegistration.upsert({
     *   create: {
     *     // ... data to create a VolunteerRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VolunteerRegistration we want to update
     *   }
     * })
     */
    upsert<T extends VolunteerRegistrationUpsertArgs>(args: SelectSubset<T, VolunteerRegistrationUpsertArgs<ExtArgs>>): Prisma__VolunteerRegistrationClient<$Result.GetResult<Prisma.$VolunteerRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VolunteerRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerRegistrationCountArgs} args - Arguments to filter VolunteerRegistrations to count.
     * @example
     * // Count the number of VolunteerRegistrations
     * const count = await prisma.volunteerRegistration.count({
     *   where: {
     *     // ... the filter for the VolunteerRegistrations we want to count
     *   }
     * })
    **/
    count<T extends VolunteerRegistrationCountArgs>(
      args?: Subset<T, VolunteerRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VolunteerRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VolunteerRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VolunteerRegistrationAggregateArgs>(args: Subset<T, VolunteerRegistrationAggregateArgs>): Prisma.PrismaPromise<GetVolunteerRegistrationAggregateType<T>>

    /**
     * Group by VolunteerRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VolunteerRegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VolunteerRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VolunteerRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: VolunteerRegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VolunteerRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVolunteerRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VolunteerRegistration model
   */
  readonly fields: VolunteerRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VolunteerRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VolunteerRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    volunteer<T extends VolunteerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VolunteerDefaultArgs<ExtArgs>>): Prisma__VolunteerClient<$Result.GetResult<Prisma.$VolunteerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    session<T extends VolunteerSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VolunteerSessionDefaultArgs<ExtArgs>>): Prisma__VolunteerSessionClient<$Result.GetResult<Prisma.$VolunteerSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VolunteerRegistration model
   */
  interface VolunteerRegistrationFieldRefs {
    readonly id: FieldRef<"VolunteerRegistration", 'Int'>
    readonly volunteerId: FieldRef<"VolunteerRegistration", 'Int'>
    readonly sessionId: FieldRef<"VolunteerRegistration", 'Int'>
    readonly status: FieldRef<"VolunteerRegistration", 'RegistrationStatus'>
    readonly createdAt: FieldRef<"VolunteerRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VolunteerRegistration findUnique
   */
  export type VolunteerRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerRegistration to fetch.
     */
    where: VolunteerRegistrationWhereUniqueInput
  }

  /**
   * VolunteerRegistration findUniqueOrThrow
   */
  export type VolunteerRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerRegistration to fetch.
     */
    where: VolunteerRegistrationWhereUniqueInput
  }

  /**
   * VolunteerRegistration findFirst
   */
  export type VolunteerRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerRegistration to fetch.
     */
    where?: VolunteerRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerRegistrations to fetch.
     */
    orderBy?: VolunteerRegistrationOrderByWithRelationInput | VolunteerRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VolunteerRegistrations.
     */
    cursor?: VolunteerRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VolunteerRegistrations.
     */
    distinct?: VolunteerRegistrationScalarFieldEnum | VolunteerRegistrationScalarFieldEnum[]
  }

  /**
   * VolunteerRegistration findFirstOrThrow
   */
  export type VolunteerRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerRegistration to fetch.
     */
    where?: VolunteerRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerRegistrations to fetch.
     */
    orderBy?: VolunteerRegistrationOrderByWithRelationInput | VolunteerRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VolunteerRegistrations.
     */
    cursor?: VolunteerRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VolunteerRegistrations.
     */
    distinct?: VolunteerRegistrationScalarFieldEnum | VolunteerRegistrationScalarFieldEnum[]
  }

  /**
   * VolunteerRegistration findMany
   */
  export type VolunteerRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which VolunteerRegistrations to fetch.
     */
    where?: VolunteerRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VolunteerRegistrations to fetch.
     */
    orderBy?: VolunteerRegistrationOrderByWithRelationInput | VolunteerRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VolunteerRegistrations.
     */
    cursor?: VolunteerRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VolunteerRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VolunteerRegistrations.
     */
    skip?: number
    distinct?: VolunteerRegistrationScalarFieldEnum | VolunteerRegistrationScalarFieldEnum[]
  }

  /**
   * VolunteerRegistration create
   */
  export type VolunteerRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a VolunteerRegistration.
     */
    data: XOR<VolunteerRegistrationCreateInput, VolunteerRegistrationUncheckedCreateInput>
  }

  /**
   * VolunteerRegistration createMany
   */
  export type VolunteerRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VolunteerRegistrations.
     */
    data: VolunteerRegistrationCreateManyInput | VolunteerRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VolunteerRegistration createManyAndReturn
   */
  export type VolunteerRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many VolunteerRegistrations.
     */
    data: VolunteerRegistrationCreateManyInput | VolunteerRegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VolunteerRegistration update
   */
  export type VolunteerRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a VolunteerRegistration.
     */
    data: XOR<VolunteerRegistrationUpdateInput, VolunteerRegistrationUncheckedUpdateInput>
    /**
     * Choose, which VolunteerRegistration to update.
     */
    where: VolunteerRegistrationWhereUniqueInput
  }

  /**
   * VolunteerRegistration updateMany
   */
  export type VolunteerRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VolunteerRegistrations.
     */
    data: XOR<VolunteerRegistrationUpdateManyMutationInput, VolunteerRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which VolunteerRegistrations to update
     */
    where?: VolunteerRegistrationWhereInput
    /**
     * Limit how many VolunteerRegistrations to update.
     */
    limit?: number
  }

  /**
   * VolunteerRegistration updateManyAndReturn
   */
  export type VolunteerRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update VolunteerRegistrations.
     */
    data: XOR<VolunteerRegistrationUpdateManyMutationInput, VolunteerRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which VolunteerRegistrations to update
     */
    where?: VolunteerRegistrationWhereInput
    /**
     * Limit how many VolunteerRegistrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VolunteerRegistration upsert
   */
  export type VolunteerRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the VolunteerRegistration to update in case it exists.
     */
    where: VolunteerRegistrationWhereUniqueInput
    /**
     * In case the VolunteerRegistration found by the `where` argument doesn't exist, create a new VolunteerRegistration with this data.
     */
    create: XOR<VolunteerRegistrationCreateInput, VolunteerRegistrationUncheckedCreateInput>
    /**
     * In case the VolunteerRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VolunteerRegistrationUpdateInput, VolunteerRegistrationUncheckedUpdateInput>
  }

  /**
   * VolunteerRegistration delete
   */
  export type VolunteerRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
    /**
     * Filter which VolunteerRegistration to delete.
     */
    where: VolunteerRegistrationWhereUniqueInput
  }

  /**
   * VolunteerRegistration deleteMany
   */
  export type VolunteerRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VolunteerRegistrations to delete
     */
    where?: VolunteerRegistrationWhereInput
    /**
     * Limit how many VolunteerRegistrations to delete.
     */
    limit?: number
  }

  /**
   * VolunteerRegistration without action
   */
  export type VolunteerRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VolunteerRegistration
     */
    select?: VolunteerRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VolunteerRegistration
     */
    omit?: VolunteerRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VolunteerRegistrationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const VolunteerSessionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    date: 'date',
    description: 'description',
    location: 'location',
    capacity: 'capacity',
    image: 'image',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type VolunteerSessionScalarFieldEnum = (typeof VolunteerSessionScalarFieldEnum)[keyof typeof VolunteerSessionScalarFieldEnum]


  export const VolunteerScalarFieldEnum: {
    id: 'id',
    clerkUserId: 'clerkUserId',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    email: 'email',
    instagram: 'instagram',
    birthDate: 'birthDate',
    createdAt: 'createdAt',
    isAdmin: 'isAdmin',
    isLeader: 'isLeader',
    isActive: 'isActive'
  };

  export type VolunteerScalarFieldEnum = (typeof VolunteerScalarFieldEnum)[keyof typeof VolunteerScalarFieldEnum]


  export const VolunteerRegistrationScalarFieldEnum: {
    id: 'id',
    volunteerId: 'volunteerId',
    sessionId: 'sessionId',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type VolunteerRegistrationScalarFieldEnum = (typeof VolunteerRegistrationScalarFieldEnum)[keyof typeof VolunteerRegistrationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SessionTypes'
   */
  export type EnumSessionTypesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionTypes'>
    


  /**
   * Reference to a field of type 'SessionTypes[]'
   */
  export type ListEnumSessionTypesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionTypes[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'RegistrationStatus'
   */
  export type EnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus'>
    


  /**
   * Reference to a field of type 'RegistrationStatus[]'
   */
  export type ListEnumRegistrationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RegistrationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type VolunteerSessionWhereInput = {
    AND?: VolunteerSessionWhereInput | VolunteerSessionWhereInput[]
    OR?: VolunteerSessionWhereInput[]
    NOT?: VolunteerSessionWhereInput | VolunteerSessionWhereInput[]
    id?: IntFilter<"VolunteerSession"> | number
    title?: StringFilter<"VolunteerSession"> | string
    date?: DateTimeFilter<"VolunteerSession"> | Date | string
    description?: StringFilter<"VolunteerSession"> | string
    location?: StringFilter<"VolunteerSession"> | string
    capacity?: IntFilter<"VolunteerSession"> | number
    image?: StringFilter<"VolunteerSession"> | string
    type?: EnumSessionTypesFilter<"VolunteerSession"> | $Enums.SessionTypes
    createdAt?: DateTimeFilter<"VolunteerSession"> | Date | string
    volunteers?: VolunteerRegistrationListRelationFilter
  }

  export type VolunteerSessionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    description?: SortOrder
    location?: SortOrder
    capacity?: SortOrder
    image?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    volunteers?: VolunteerRegistrationOrderByRelationAggregateInput
  }

  export type VolunteerSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VolunteerSessionWhereInput | VolunteerSessionWhereInput[]
    OR?: VolunteerSessionWhereInput[]
    NOT?: VolunteerSessionWhereInput | VolunteerSessionWhereInput[]
    title?: StringFilter<"VolunteerSession"> | string
    date?: DateTimeFilter<"VolunteerSession"> | Date | string
    description?: StringFilter<"VolunteerSession"> | string
    location?: StringFilter<"VolunteerSession"> | string
    capacity?: IntFilter<"VolunteerSession"> | number
    image?: StringFilter<"VolunteerSession"> | string
    type?: EnumSessionTypesFilter<"VolunteerSession"> | $Enums.SessionTypes
    createdAt?: DateTimeFilter<"VolunteerSession"> | Date | string
    volunteers?: VolunteerRegistrationListRelationFilter
  }, "id">

  export type VolunteerSessionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    description?: SortOrder
    location?: SortOrder
    capacity?: SortOrder
    image?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: VolunteerSessionCountOrderByAggregateInput
    _avg?: VolunteerSessionAvgOrderByAggregateInput
    _max?: VolunteerSessionMaxOrderByAggregateInput
    _min?: VolunteerSessionMinOrderByAggregateInput
    _sum?: VolunteerSessionSumOrderByAggregateInput
  }

  export type VolunteerSessionScalarWhereWithAggregatesInput = {
    AND?: VolunteerSessionScalarWhereWithAggregatesInput | VolunteerSessionScalarWhereWithAggregatesInput[]
    OR?: VolunteerSessionScalarWhereWithAggregatesInput[]
    NOT?: VolunteerSessionScalarWhereWithAggregatesInput | VolunteerSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VolunteerSession"> | number
    title?: StringWithAggregatesFilter<"VolunteerSession"> | string
    date?: DateTimeWithAggregatesFilter<"VolunteerSession"> | Date | string
    description?: StringWithAggregatesFilter<"VolunteerSession"> | string
    location?: StringWithAggregatesFilter<"VolunteerSession"> | string
    capacity?: IntWithAggregatesFilter<"VolunteerSession"> | number
    image?: StringWithAggregatesFilter<"VolunteerSession"> | string
    type?: EnumSessionTypesWithAggregatesFilter<"VolunteerSession"> | $Enums.SessionTypes
    createdAt?: DateTimeWithAggregatesFilter<"VolunteerSession"> | Date | string
  }

  export type VolunteerWhereInput = {
    AND?: VolunteerWhereInput | VolunteerWhereInput[]
    OR?: VolunteerWhereInput[]
    NOT?: VolunteerWhereInput | VolunteerWhereInput[]
    id?: IntFilter<"Volunteer"> | number
    clerkUserId?: StringFilter<"Volunteer"> | string
    firstName?: StringFilter<"Volunteer"> | string
    lastName?: StringFilter<"Volunteer"> | string
    phone?: StringFilter<"Volunteer"> | string
    email?: StringFilter<"Volunteer"> | string
    instagram?: StringNullableFilter<"Volunteer"> | string | null
    birthDate?: DateTimeFilter<"Volunteer"> | Date | string
    createdAt?: DateTimeFilter<"Volunteer"> | Date | string
    isAdmin?: BoolFilter<"Volunteer"> | boolean
    isLeader?: BoolFilter<"Volunteer"> | boolean
    isActive?: BoolFilter<"Volunteer"> | boolean
    registrations?: VolunteerRegistrationListRelationFilter
  }

  export type VolunteerOrderByWithRelationInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    instagram?: SortOrderInput | SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    isLeader?: SortOrder
    isActive?: SortOrder
    registrations?: VolunteerRegistrationOrderByRelationAggregateInput
  }

  export type VolunteerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    clerkUserId?: string
    AND?: VolunteerWhereInput | VolunteerWhereInput[]
    OR?: VolunteerWhereInput[]
    NOT?: VolunteerWhereInput | VolunteerWhereInput[]
    firstName?: StringFilter<"Volunteer"> | string
    lastName?: StringFilter<"Volunteer"> | string
    phone?: StringFilter<"Volunteer"> | string
    email?: StringFilter<"Volunteer"> | string
    instagram?: StringNullableFilter<"Volunteer"> | string | null
    birthDate?: DateTimeFilter<"Volunteer"> | Date | string
    createdAt?: DateTimeFilter<"Volunteer"> | Date | string
    isAdmin?: BoolFilter<"Volunteer"> | boolean
    isLeader?: BoolFilter<"Volunteer"> | boolean
    isActive?: BoolFilter<"Volunteer"> | boolean
    registrations?: VolunteerRegistrationListRelationFilter
  }, "id" | "clerkUserId">

  export type VolunteerOrderByWithAggregationInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    instagram?: SortOrderInput | SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    isLeader?: SortOrder
    isActive?: SortOrder
    _count?: VolunteerCountOrderByAggregateInput
    _avg?: VolunteerAvgOrderByAggregateInput
    _max?: VolunteerMaxOrderByAggregateInput
    _min?: VolunteerMinOrderByAggregateInput
    _sum?: VolunteerSumOrderByAggregateInput
  }

  export type VolunteerScalarWhereWithAggregatesInput = {
    AND?: VolunteerScalarWhereWithAggregatesInput | VolunteerScalarWhereWithAggregatesInput[]
    OR?: VolunteerScalarWhereWithAggregatesInput[]
    NOT?: VolunteerScalarWhereWithAggregatesInput | VolunteerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Volunteer"> | number
    clerkUserId?: StringWithAggregatesFilter<"Volunteer"> | string
    firstName?: StringWithAggregatesFilter<"Volunteer"> | string
    lastName?: StringWithAggregatesFilter<"Volunteer"> | string
    phone?: StringWithAggregatesFilter<"Volunteer"> | string
    email?: StringWithAggregatesFilter<"Volunteer"> | string
    instagram?: StringNullableWithAggregatesFilter<"Volunteer"> | string | null
    birthDate?: DateTimeWithAggregatesFilter<"Volunteer"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Volunteer"> | Date | string
    isAdmin?: BoolWithAggregatesFilter<"Volunteer"> | boolean
    isLeader?: BoolWithAggregatesFilter<"Volunteer"> | boolean
    isActive?: BoolWithAggregatesFilter<"Volunteer"> | boolean
  }

  export type VolunteerRegistrationWhereInput = {
    AND?: VolunteerRegistrationWhereInput | VolunteerRegistrationWhereInput[]
    OR?: VolunteerRegistrationWhereInput[]
    NOT?: VolunteerRegistrationWhereInput | VolunteerRegistrationWhereInput[]
    id?: IntFilter<"VolunteerRegistration"> | number
    volunteerId?: IntFilter<"VolunteerRegistration"> | number
    sessionId?: IntFilter<"VolunteerRegistration"> | number
    status?: EnumRegistrationStatusFilter<"VolunteerRegistration"> | $Enums.RegistrationStatus
    createdAt?: DateTimeFilter<"VolunteerRegistration"> | Date | string
    volunteer?: XOR<VolunteerScalarRelationFilter, VolunteerWhereInput>
    session?: XOR<VolunteerSessionScalarRelationFilter, VolunteerSessionWhereInput>
  }

  export type VolunteerRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    volunteerId?: SortOrder
    sessionId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    volunteer?: VolunteerOrderByWithRelationInput
    session?: VolunteerSessionOrderByWithRelationInput
  }

  export type VolunteerRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    volunteerId_sessionId?: VolunteerRegistrationVolunteerIdSessionIdCompoundUniqueInput
    AND?: VolunteerRegistrationWhereInput | VolunteerRegistrationWhereInput[]
    OR?: VolunteerRegistrationWhereInput[]
    NOT?: VolunteerRegistrationWhereInput | VolunteerRegistrationWhereInput[]
    volunteerId?: IntFilter<"VolunteerRegistration"> | number
    sessionId?: IntFilter<"VolunteerRegistration"> | number
    status?: EnumRegistrationStatusFilter<"VolunteerRegistration"> | $Enums.RegistrationStatus
    createdAt?: DateTimeFilter<"VolunteerRegistration"> | Date | string
    volunteer?: XOR<VolunteerScalarRelationFilter, VolunteerWhereInput>
    session?: XOR<VolunteerSessionScalarRelationFilter, VolunteerSessionWhereInput>
  }, "id" | "volunteerId_sessionId">

  export type VolunteerRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    volunteerId?: SortOrder
    sessionId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: VolunteerRegistrationCountOrderByAggregateInput
    _avg?: VolunteerRegistrationAvgOrderByAggregateInput
    _max?: VolunteerRegistrationMaxOrderByAggregateInput
    _min?: VolunteerRegistrationMinOrderByAggregateInput
    _sum?: VolunteerRegistrationSumOrderByAggregateInput
  }

  export type VolunteerRegistrationScalarWhereWithAggregatesInput = {
    AND?: VolunteerRegistrationScalarWhereWithAggregatesInput | VolunteerRegistrationScalarWhereWithAggregatesInput[]
    OR?: VolunteerRegistrationScalarWhereWithAggregatesInput[]
    NOT?: VolunteerRegistrationScalarWhereWithAggregatesInput | VolunteerRegistrationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VolunteerRegistration"> | number
    volunteerId?: IntWithAggregatesFilter<"VolunteerRegistration"> | number
    sessionId?: IntWithAggregatesFilter<"VolunteerRegistration"> | number
    status?: EnumRegistrationStatusWithAggregatesFilter<"VolunteerRegistration"> | $Enums.RegistrationStatus
    createdAt?: DateTimeWithAggregatesFilter<"VolunteerRegistration"> | Date | string
  }

  export type VolunteerSessionCreateInput = {
    title: string
    date: Date | string
    description: string
    location: string
    capacity: number
    image: string
    type?: $Enums.SessionTypes
    createdAt?: Date | string
    volunteers?: VolunteerRegistrationCreateNestedManyWithoutSessionInput
  }

  export type VolunteerSessionUncheckedCreateInput = {
    id?: number
    title: string
    date: Date | string
    description: string
    location: string
    capacity: number
    image: string
    type?: $Enums.SessionTypes
    createdAt?: Date | string
    volunteers?: VolunteerRegistrationUncheckedCreateNestedManyWithoutSessionInput
  }

  export type VolunteerSessionUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    type?: EnumSessionTypesFieldUpdateOperationsInput | $Enums.SessionTypes
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteers?: VolunteerRegistrationUpdateManyWithoutSessionNestedInput
  }

  export type VolunteerSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    type?: EnumSessionTypesFieldUpdateOperationsInput | $Enums.SessionTypes
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteers?: VolunteerRegistrationUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type VolunteerSessionCreateManyInput = {
    id?: number
    title: string
    date: Date | string
    description: string
    location: string
    capacity: number
    image: string
    type?: $Enums.SessionTypes
    createdAt?: Date | string
  }

  export type VolunteerSessionUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    type?: EnumSessionTypesFieldUpdateOperationsInput | $Enums.SessionTypes
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    type?: EnumSessionTypesFieldUpdateOperationsInput | $Enums.SessionTypes
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerCreateInput = {
    clerkUserId: string
    firstName: string
    lastName: string
    phone: string
    email: string
    instagram?: string | null
    birthDate: Date | string
    createdAt?: Date | string
    isAdmin?: boolean
    isLeader?: boolean
    isActive?: boolean
    registrations?: VolunteerRegistrationCreateNestedManyWithoutVolunteerInput
  }

  export type VolunteerUncheckedCreateInput = {
    id?: number
    clerkUserId: string
    firstName: string
    lastName: string
    phone: string
    email: string
    instagram?: string | null
    birthDate: Date | string
    createdAt?: Date | string
    isAdmin?: boolean
    isLeader?: boolean
    isActive?: boolean
    registrations?: VolunteerRegistrationUncheckedCreateNestedManyWithoutVolunteerInput
  }

  export type VolunteerUpdateInput = {
    clerkUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isLeader?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrations?: VolunteerRegistrationUpdateManyWithoutVolunteerNestedInput
  }

  export type VolunteerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isLeader?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrations?: VolunteerRegistrationUncheckedUpdateManyWithoutVolunteerNestedInput
  }

  export type VolunteerCreateManyInput = {
    id?: number
    clerkUserId: string
    firstName: string
    lastName: string
    phone: string
    email: string
    instagram?: string | null
    birthDate: Date | string
    createdAt?: Date | string
    isAdmin?: boolean
    isLeader?: boolean
    isActive?: boolean
  }

  export type VolunteerUpdateManyMutationInput = {
    clerkUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isLeader?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VolunteerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isLeader?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VolunteerRegistrationCreateInput = {
    status?: $Enums.RegistrationStatus
    createdAt?: Date | string
    volunteer: VolunteerCreateNestedOneWithoutRegistrationsInput
    session: VolunteerSessionCreateNestedOneWithoutVolunteersInput
  }

  export type VolunteerRegistrationUncheckedCreateInput = {
    id?: number
    volunteerId: number
    sessionId: number
    status?: $Enums.RegistrationStatus
    createdAt?: Date | string
  }

  export type VolunteerRegistrationUpdateInput = {
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteer?: VolunteerUpdateOneRequiredWithoutRegistrationsNestedInput
    session?: VolunteerSessionUpdateOneRequiredWithoutVolunteersNestedInput
  }

  export type VolunteerRegistrationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    volunteerId?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerRegistrationCreateManyInput = {
    id?: number
    volunteerId: number
    sessionId: number
    status?: $Enums.RegistrationStatus
    createdAt?: Date | string
  }

  export type VolunteerRegistrationUpdateManyMutationInput = {
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerRegistrationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    volunteerId?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumSessionTypesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionTypes | EnumSessionTypesFieldRefInput<$PrismaModel>
    in?: $Enums.SessionTypes[] | ListEnumSessionTypesFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionTypes[] | ListEnumSessionTypesFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionTypesFilter<$PrismaModel> | $Enums.SessionTypes
  }

  export type VolunteerRegistrationListRelationFilter = {
    every?: VolunteerRegistrationWhereInput
    some?: VolunteerRegistrationWhereInput
    none?: VolunteerRegistrationWhereInput
  }

  export type VolunteerRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VolunteerSessionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    description?: SortOrder
    location?: SortOrder
    capacity?: SortOrder
    image?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type VolunteerSessionAvgOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
  }

  export type VolunteerSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    description?: SortOrder
    location?: SortOrder
    capacity?: SortOrder
    image?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type VolunteerSessionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    date?: SortOrder
    description?: SortOrder
    location?: SortOrder
    capacity?: SortOrder
    image?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type VolunteerSessionSumOrderByAggregateInput = {
    id?: SortOrder
    capacity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumSessionTypesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionTypes | EnumSessionTypesFieldRefInput<$PrismaModel>
    in?: $Enums.SessionTypes[] | ListEnumSessionTypesFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionTypes[] | ListEnumSessionTypesFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionTypesWithAggregatesFilter<$PrismaModel> | $Enums.SessionTypes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionTypesFilter<$PrismaModel>
    _max?: NestedEnumSessionTypesFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VolunteerCountOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    instagram?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    isLeader?: SortOrder
    isActive?: SortOrder
  }

  export type VolunteerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VolunteerMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    instagram?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    isLeader?: SortOrder
    isActive?: SortOrder
  }

  export type VolunteerMinOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    instagram?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    isAdmin?: SortOrder
    isLeader?: SortOrder
    isActive?: SortOrder
  }

  export type VolunteerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type VolunteerScalarRelationFilter = {
    is?: VolunteerWhereInput
    isNot?: VolunteerWhereInput
  }

  export type VolunteerSessionScalarRelationFilter = {
    is?: VolunteerSessionWhereInput
    isNot?: VolunteerSessionWhereInput
  }

  export type VolunteerRegistrationVolunteerIdSessionIdCompoundUniqueInput = {
    volunteerId: number
    sessionId: number
  }

  export type VolunteerRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    volunteerId?: SortOrder
    sessionId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type VolunteerRegistrationAvgOrderByAggregateInput = {
    id?: SortOrder
    volunteerId?: SortOrder
    sessionId?: SortOrder
  }

  export type VolunteerRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    volunteerId?: SortOrder
    sessionId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type VolunteerRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    volunteerId?: SortOrder
    sessionId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type VolunteerRegistrationSumOrderByAggregateInput = {
    id?: SortOrder
    volunteerId?: SortOrder
    sessionId?: SortOrder
  }

  export type EnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
  }

  export type VolunteerRegistrationCreateNestedManyWithoutSessionInput = {
    create?: XOR<VolunteerRegistrationCreateWithoutSessionInput, VolunteerRegistrationUncheckedCreateWithoutSessionInput> | VolunteerRegistrationCreateWithoutSessionInput[] | VolunteerRegistrationUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: VolunteerRegistrationCreateOrConnectWithoutSessionInput | VolunteerRegistrationCreateOrConnectWithoutSessionInput[]
    createMany?: VolunteerRegistrationCreateManySessionInputEnvelope
    connect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
  }

  export type VolunteerRegistrationUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<VolunteerRegistrationCreateWithoutSessionInput, VolunteerRegistrationUncheckedCreateWithoutSessionInput> | VolunteerRegistrationCreateWithoutSessionInput[] | VolunteerRegistrationUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: VolunteerRegistrationCreateOrConnectWithoutSessionInput | VolunteerRegistrationCreateOrConnectWithoutSessionInput[]
    createMany?: VolunteerRegistrationCreateManySessionInputEnvelope
    connect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSessionTypesFieldUpdateOperationsInput = {
    set?: $Enums.SessionTypes
  }

  export type VolunteerRegistrationUpdateManyWithoutSessionNestedInput = {
    create?: XOR<VolunteerRegistrationCreateWithoutSessionInput, VolunteerRegistrationUncheckedCreateWithoutSessionInput> | VolunteerRegistrationCreateWithoutSessionInput[] | VolunteerRegistrationUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: VolunteerRegistrationCreateOrConnectWithoutSessionInput | VolunteerRegistrationCreateOrConnectWithoutSessionInput[]
    upsert?: VolunteerRegistrationUpsertWithWhereUniqueWithoutSessionInput | VolunteerRegistrationUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: VolunteerRegistrationCreateManySessionInputEnvelope
    set?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    disconnect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    delete?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    connect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    update?: VolunteerRegistrationUpdateWithWhereUniqueWithoutSessionInput | VolunteerRegistrationUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: VolunteerRegistrationUpdateManyWithWhereWithoutSessionInput | VolunteerRegistrationUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: VolunteerRegistrationScalarWhereInput | VolunteerRegistrationScalarWhereInput[]
  }

  export type VolunteerRegistrationUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<VolunteerRegistrationCreateWithoutSessionInput, VolunteerRegistrationUncheckedCreateWithoutSessionInput> | VolunteerRegistrationCreateWithoutSessionInput[] | VolunteerRegistrationUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: VolunteerRegistrationCreateOrConnectWithoutSessionInput | VolunteerRegistrationCreateOrConnectWithoutSessionInput[]
    upsert?: VolunteerRegistrationUpsertWithWhereUniqueWithoutSessionInput | VolunteerRegistrationUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: VolunteerRegistrationCreateManySessionInputEnvelope
    set?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    disconnect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    delete?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    connect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    update?: VolunteerRegistrationUpdateWithWhereUniqueWithoutSessionInput | VolunteerRegistrationUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: VolunteerRegistrationUpdateManyWithWhereWithoutSessionInput | VolunteerRegistrationUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: VolunteerRegistrationScalarWhereInput | VolunteerRegistrationScalarWhereInput[]
  }

  export type VolunteerRegistrationCreateNestedManyWithoutVolunteerInput = {
    create?: XOR<VolunteerRegistrationCreateWithoutVolunteerInput, VolunteerRegistrationUncheckedCreateWithoutVolunteerInput> | VolunteerRegistrationCreateWithoutVolunteerInput[] | VolunteerRegistrationUncheckedCreateWithoutVolunteerInput[]
    connectOrCreate?: VolunteerRegistrationCreateOrConnectWithoutVolunteerInput | VolunteerRegistrationCreateOrConnectWithoutVolunteerInput[]
    createMany?: VolunteerRegistrationCreateManyVolunteerInputEnvelope
    connect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
  }

  export type VolunteerRegistrationUncheckedCreateNestedManyWithoutVolunteerInput = {
    create?: XOR<VolunteerRegistrationCreateWithoutVolunteerInput, VolunteerRegistrationUncheckedCreateWithoutVolunteerInput> | VolunteerRegistrationCreateWithoutVolunteerInput[] | VolunteerRegistrationUncheckedCreateWithoutVolunteerInput[]
    connectOrCreate?: VolunteerRegistrationCreateOrConnectWithoutVolunteerInput | VolunteerRegistrationCreateOrConnectWithoutVolunteerInput[]
    createMany?: VolunteerRegistrationCreateManyVolunteerInputEnvelope
    connect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type VolunteerRegistrationUpdateManyWithoutVolunteerNestedInput = {
    create?: XOR<VolunteerRegistrationCreateWithoutVolunteerInput, VolunteerRegistrationUncheckedCreateWithoutVolunteerInput> | VolunteerRegistrationCreateWithoutVolunteerInput[] | VolunteerRegistrationUncheckedCreateWithoutVolunteerInput[]
    connectOrCreate?: VolunteerRegistrationCreateOrConnectWithoutVolunteerInput | VolunteerRegistrationCreateOrConnectWithoutVolunteerInput[]
    upsert?: VolunteerRegistrationUpsertWithWhereUniqueWithoutVolunteerInput | VolunteerRegistrationUpsertWithWhereUniqueWithoutVolunteerInput[]
    createMany?: VolunteerRegistrationCreateManyVolunteerInputEnvelope
    set?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    disconnect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    delete?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    connect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    update?: VolunteerRegistrationUpdateWithWhereUniqueWithoutVolunteerInput | VolunteerRegistrationUpdateWithWhereUniqueWithoutVolunteerInput[]
    updateMany?: VolunteerRegistrationUpdateManyWithWhereWithoutVolunteerInput | VolunteerRegistrationUpdateManyWithWhereWithoutVolunteerInput[]
    deleteMany?: VolunteerRegistrationScalarWhereInput | VolunteerRegistrationScalarWhereInput[]
  }

  export type VolunteerRegistrationUncheckedUpdateManyWithoutVolunteerNestedInput = {
    create?: XOR<VolunteerRegistrationCreateWithoutVolunteerInput, VolunteerRegistrationUncheckedCreateWithoutVolunteerInput> | VolunteerRegistrationCreateWithoutVolunteerInput[] | VolunteerRegistrationUncheckedCreateWithoutVolunteerInput[]
    connectOrCreate?: VolunteerRegistrationCreateOrConnectWithoutVolunteerInput | VolunteerRegistrationCreateOrConnectWithoutVolunteerInput[]
    upsert?: VolunteerRegistrationUpsertWithWhereUniqueWithoutVolunteerInput | VolunteerRegistrationUpsertWithWhereUniqueWithoutVolunteerInput[]
    createMany?: VolunteerRegistrationCreateManyVolunteerInputEnvelope
    set?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    disconnect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    delete?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    connect?: VolunteerRegistrationWhereUniqueInput | VolunteerRegistrationWhereUniqueInput[]
    update?: VolunteerRegistrationUpdateWithWhereUniqueWithoutVolunteerInput | VolunteerRegistrationUpdateWithWhereUniqueWithoutVolunteerInput[]
    updateMany?: VolunteerRegistrationUpdateManyWithWhereWithoutVolunteerInput | VolunteerRegistrationUpdateManyWithWhereWithoutVolunteerInput[]
    deleteMany?: VolunteerRegistrationScalarWhereInput | VolunteerRegistrationScalarWhereInput[]
  }

  export type VolunteerCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<VolunteerCreateWithoutRegistrationsInput, VolunteerUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: VolunteerCreateOrConnectWithoutRegistrationsInput
    connect?: VolunteerWhereUniqueInput
  }

  export type VolunteerSessionCreateNestedOneWithoutVolunteersInput = {
    create?: XOR<VolunteerSessionCreateWithoutVolunteersInput, VolunteerSessionUncheckedCreateWithoutVolunteersInput>
    connectOrCreate?: VolunteerSessionCreateOrConnectWithoutVolunteersInput
    connect?: VolunteerSessionWhereUniqueInput
  }

  export type EnumRegistrationStatusFieldUpdateOperationsInput = {
    set?: $Enums.RegistrationStatus
  }

  export type VolunteerUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<VolunteerCreateWithoutRegistrationsInput, VolunteerUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: VolunteerCreateOrConnectWithoutRegistrationsInput
    upsert?: VolunteerUpsertWithoutRegistrationsInput
    connect?: VolunteerWhereUniqueInput
    update?: XOR<XOR<VolunteerUpdateToOneWithWhereWithoutRegistrationsInput, VolunteerUpdateWithoutRegistrationsInput>, VolunteerUncheckedUpdateWithoutRegistrationsInput>
  }

  export type VolunteerSessionUpdateOneRequiredWithoutVolunteersNestedInput = {
    create?: XOR<VolunteerSessionCreateWithoutVolunteersInput, VolunteerSessionUncheckedCreateWithoutVolunteersInput>
    connectOrCreate?: VolunteerSessionCreateOrConnectWithoutVolunteersInput
    upsert?: VolunteerSessionUpsertWithoutVolunteersInput
    connect?: VolunteerSessionWhereUniqueInput
    update?: XOR<XOR<VolunteerSessionUpdateToOneWithWhereWithoutVolunteersInput, VolunteerSessionUpdateWithoutVolunteersInput>, VolunteerSessionUncheckedUpdateWithoutVolunteersInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumSessionTypesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionTypes | EnumSessionTypesFieldRefInput<$PrismaModel>
    in?: $Enums.SessionTypes[] | ListEnumSessionTypesFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionTypes[] | ListEnumSessionTypesFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionTypesFilter<$PrismaModel> | $Enums.SessionTypes
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSessionTypesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionTypes | EnumSessionTypesFieldRefInput<$PrismaModel>
    in?: $Enums.SessionTypes[] | ListEnumSessionTypesFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionTypes[] | ListEnumSessionTypesFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionTypesWithAggregatesFilter<$PrismaModel> | $Enums.SessionTypes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionTypesFilter<$PrismaModel>
    _max?: NestedEnumSessionTypesFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRegistrationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusFilter<$PrismaModel> | $Enums.RegistrationStatus
  }

  export type NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RegistrationStatus | EnumRegistrationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RegistrationStatus[] | ListEnumRegistrationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRegistrationStatusWithAggregatesFilter<$PrismaModel> | $Enums.RegistrationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRegistrationStatusFilter<$PrismaModel>
    _max?: NestedEnumRegistrationStatusFilter<$PrismaModel>
  }

  export type VolunteerRegistrationCreateWithoutSessionInput = {
    status?: $Enums.RegistrationStatus
    createdAt?: Date | string
    volunteer: VolunteerCreateNestedOneWithoutRegistrationsInput
  }

  export type VolunteerRegistrationUncheckedCreateWithoutSessionInput = {
    id?: number
    volunteerId: number
    status?: $Enums.RegistrationStatus
    createdAt?: Date | string
  }

  export type VolunteerRegistrationCreateOrConnectWithoutSessionInput = {
    where: VolunteerRegistrationWhereUniqueInput
    create: XOR<VolunteerRegistrationCreateWithoutSessionInput, VolunteerRegistrationUncheckedCreateWithoutSessionInput>
  }

  export type VolunteerRegistrationCreateManySessionInputEnvelope = {
    data: VolunteerRegistrationCreateManySessionInput | VolunteerRegistrationCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type VolunteerRegistrationUpsertWithWhereUniqueWithoutSessionInput = {
    where: VolunteerRegistrationWhereUniqueInput
    update: XOR<VolunteerRegistrationUpdateWithoutSessionInput, VolunteerRegistrationUncheckedUpdateWithoutSessionInput>
    create: XOR<VolunteerRegistrationCreateWithoutSessionInput, VolunteerRegistrationUncheckedCreateWithoutSessionInput>
  }

  export type VolunteerRegistrationUpdateWithWhereUniqueWithoutSessionInput = {
    where: VolunteerRegistrationWhereUniqueInput
    data: XOR<VolunteerRegistrationUpdateWithoutSessionInput, VolunteerRegistrationUncheckedUpdateWithoutSessionInput>
  }

  export type VolunteerRegistrationUpdateManyWithWhereWithoutSessionInput = {
    where: VolunteerRegistrationScalarWhereInput
    data: XOR<VolunteerRegistrationUpdateManyMutationInput, VolunteerRegistrationUncheckedUpdateManyWithoutSessionInput>
  }

  export type VolunteerRegistrationScalarWhereInput = {
    AND?: VolunteerRegistrationScalarWhereInput | VolunteerRegistrationScalarWhereInput[]
    OR?: VolunteerRegistrationScalarWhereInput[]
    NOT?: VolunteerRegistrationScalarWhereInput | VolunteerRegistrationScalarWhereInput[]
    id?: IntFilter<"VolunteerRegistration"> | number
    volunteerId?: IntFilter<"VolunteerRegistration"> | number
    sessionId?: IntFilter<"VolunteerRegistration"> | number
    status?: EnumRegistrationStatusFilter<"VolunteerRegistration"> | $Enums.RegistrationStatus
    createdAt?: DateTimeFilter<"VolunteerRegistration"> | Date | string
  }

  export type VolunteerRegistrationCreateWithoutVolunteerInput = {
    status?: $Enums.RegistrationStatus
    createdAt?: Date | string
    session: VolunteerSessionCreateNestedOneWithoutVolunteersInput
  }

  export type VolunteerRegistrationUncheckedCreateWithoutVolunteerInput = {
    id?: number
    sessionId: number
    status?: $Enums.RegistrationStatus
    createdAt?: Date | string
  }

  export type VolunteerRegistrationCreateOrConnectWithoutVolunteerInput = {
    where: VolunteerRegistrationWhereUniqueInput
    create: XOR<VolunteerRegistrationCreateWithoutVolunteerInput, VolunteerRegistrationUncheckedCreateWithoutVolunteerInput>
  }

  export type VolunteerRegistrationCreateManyVolunteerInputEnvelope = {
    data: VolunteerRegistrationCreateManyVolunteerInput | VolunteerRegistrationCreateManyVolunteerInput[]
    skipDuplicates?: boolean
  }

  export type VolunteerRegistrationUpsertWithWhereUniqueWithoutVolunteerInput = {
    where: VolunteerRegistrationWhereUniqueInput
    update: XOR<VolunteerRegistrationUpdateWithoutVolunteerInput, VolunteerRegistrationUncheckedUpdateWithoutVolunteerInput>
    create: XOR<VolunteerRegistrationCreateWithoutVolunteerInput, VolunteerRegistrationUncheckedCreateWithoutVolunteerInput>
  }

  export type VolunteerRegistrationUpdateWithWhereUniqueWithoutVolunteerInput = {
    where: VolunteerRegistrationWhereUniqueInput
    data: XOR<VolunteerRegistrationUpdateWithoutVolunteerInput, VolunteerRegistrationUncheckedUpdateWithoutVolunteerInput>
  }

  export type VolunteerRegistrationUpdateManyWithWhereWithoutVolunteerInput = {
    where: VolunteerRegistrationScalarWhereInput
    data: XOR<VolunteerRegistrationUpdateManyMutationInput, VolunteerRegistrationUncheckedUpdateManyWithoutVolunteerInput>
  }

  export type VolunteerCreateWithoutRegistrationsInput = {
    clerkUserId: string
    firstName: string
    lastName: string
    phone: string
    email: string
    instagram?: string | null
    birthDate: Date | string
    createdAt?: Date | string
    isAdmin?: boolean
    isLeader?: boolean
    isActive?: boolean
  }

  export type VolunteerUncheckedCreateWithoutRegistrationsInput = {
    id?: number
    clerkUserId: string
    firstName: string
    lastName: string
    phone: string
    email: string
    instagram?: string | null
    birthDate: Date | string
    createdAt?: Date | string
    isAdmin?: boolean
    isLeader?: boolean
    isActive?: boolean
  }

  export type VolunteerCreateOrConnectWithoutRegistrationsInput = {
    where: VolunteerWhereUniqueInput
    create: XOR<VolunteerCreateWithoutRegistrationsInput, VolunteerUncheckedCreateWithoutRegistrationsInput>
  }

  export type VolunteerSessionCreateWithoutVolunteersInput = {
    title: string
    date: Date | string
    description: string
    location: string
    capacity: number
    image: string
    type?: $Enums.SessionTypes
    createdAt?: Date | string
  }

  export type VolunteerSessionUncheckedCreateWithoutVolunteersInput = {
    id?: number
    title: string
    date: Date | string
    description: string
    location: string
    capacity: number
    image: string
    type?: $Enums.SessionTypes
    createdAt?: Date | string
  }

  export type VolunteerSessionCreateOrConnectWithoutVolunteersInput = {
    where: VolunteerSessionWhereUniqueInput
    create: XOR<VolunteerSessionCreateWithoutVolunteersInput, VolunteerSessionUncheckedCreateWithoutVolunteersInput>
  }

  export type VolunteerUpsertWithoutRegistrationsInput = {
    update: XOR<VolunteerUpdateWithoutRegistrationsInput, VolunteerUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<VolunteerCreateWithoutRegistrationsInput, VolunteerUncheckedCreateWithoutRegistrationsInput>
    where?: VolunteerWhereInput
  }

  export type VolunteerUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: VolunteerWhereInput
    data: XOR<VolunteerUpdateWithoutRegistrationsInput, VolunteerUncheckedUpdateWithoutRegistrationsInput>
  }

  export type VolunteerUpdateWithoutRegistrationsInput = {
    clerkUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isLeader?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VolunteerUncheckedUpdateWithoutRegistrationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkUserId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    instagram?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    isLeader?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VolunteerSessionUpsertWithoutVolunteersInput = {
    update: XOR<VolunteerSessionUpdateWithoutVolunteersInput, VolunteerSessionUncheckedUpdateWithoutVolunteersInput>
    create: XOR<VolunteerSessionCreateWithoutVolunteersInput, VolunteerSessionUncheckedCreateWithoutVolunteersInput>
    where?: VolunteerSessionWhereInput
  }

  export type VolunteerSessionUpdateToOneWithWhereWithoutVolunteersInput = {
    where?: VolunteerSessionWhereInput
    data: XOR<VolunteerSessionUpdateWithoutVolunteersInput, VolunteerSessionUncheckedUpdateWithoutVolunteersInput>
  }

  export type VolunteerSessionUpdateWithoutVolunteersInput = {
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    type?: EnumSessionTypesFieldUpdateOperationsInput | $Enums.SessionTypes
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerSessionUncheckedUpdateWithoutVolunteersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    type?: EnumSessionTypesFieldUpdateOperationsInput | $Enums.SessionTypes
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerRegistrationCreateManySessionInput = {
    id?: number
    volunteerId: number
    status?: $Enums.RegistrationStatus
    createdAt?: Date | string
  }

  export type VolunteerRegistrationUpdateWithoutSessionInput = {
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    volunteer?: VolunteerUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type VolunteerRegistrationUncheckedUpdateWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    volunteerId?: IntFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerRegistrationUncheckedUpdateManyWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    volunteerId?: IntFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerRegistrationCreateManyVolunteerInput = {
    id?: number
    sessionId: number
    status?: $Enums.RegistrationStatus
    createdAt?: Date | string
  }

  export type VolunteerRegistrationUpdateWithoutVolunteerInput = {
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: VolunteerSessionUpdateOneRequiredWithoutVolunteersNestedInput
  }

  export type VolunteerRegistrationUncheckedUpdateWithoutVolunteerInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VolunteerRegistrationUncheckedUpdateManyWithoutVolunteerInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    status?: EnumRegistrationStatusFieldUpdateOperationsInput | $Enums.RegistrationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}