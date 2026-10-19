// const domain = process.env.SHOPIFY_STORE_DOMAIN
// const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN

// if (!domain) {
//   throw new Error('SHOPIFY_STORE_DOMAIN saknas i .env')
// }

// if (!token) {
//   throw new Error('SHOPIFY_STOREFRONT_PRIVATE_TOKEN saknas i .env')
// }

// const shopifyDomain: string = domain
// const shopifyToken: string = token

// const endpoint = `https://${shopifyDomain}/api/2026-07/graphql.json`

// type ShopifyFetchParams = {
//   query: string
//   variables?: Record<string, unknown>
// }

// type ShopifyGraphQLError = {
//   message: string
// }

// type ShopifyGraphQLResponse<T> = {
//   data?: T
//   errors?: ShopifyGraphQLError[]
// }

// export async function shopifyFetch<T>({
//   query,
//   variables = {},
// }: ShopifyFetchParams): Promise<T> {
//   const response = await fetch(endpoint, {
//     method: 'POST',

//     headers: {
//       'Content-Type': 'application/json',
//       'Shopify-Storefront-Private-Token': shopifyToken,
//     },

//     body: JSON.stringify({
//       query,
//       variables,
//     }),

//     cache: 'no-store',
//   })

//   const json =
//     (await response.json()) as ShopifyGraphQLResponse<T>

//   if (!response.ok) {
//     console.error('Shopify HTTP error:', json)

//     throw new Error(
//       `Shopify request failed: ${response.status}`,
//     )
//   }

//   if (json.errors?.length) {
//     console.error(
//       'Shopify GraphQL errors:',
//       json.errors,
//     )

//     throw new Error(
//       json.errors
//         .map((error) => error.message)
//         .join(', '),
//     )
//   }

//   if (!json.data) {
//     throw new Error(
//       'Shopify returnerade ingen data.',
//     )
//   }

//   return json.data
// }

// /* =========================
//    GEMENSAMMA TYPER
// ========================= */

// export type ShopifyMoney = {
//   amount: string
//   currencyCode: string
// }

// export type ShopifyImage = {
//   id?: string
//   url: string
//   altText: string | null
// }

// /* =========================
//    PRODUKTLISTA
// ========================= */

// export type ShopifyProduct = {
//   id: string
//   handle: string
//   title: string
//   description: string

//   featuredImage: {
//     url: string
//     altText: string | null
//   } | null

//   priceRange: {
//     minVariantPrice: ShopifyMoney
//   }
// }

// type ProductsResponse = {
//   products: {
//     nodes: ShopifyProduct[]
//   }
// }

// export async function getProducts() {
//   const query = `
//     query Products {
//       products(first: 50) {
//         nodes {
//           id
//           handle
//           title
//           description

//           featuredImage {
//             url
//             altText
//           }

//           priceRange {
//             minVariantPrice {
//               amount
//               currencyCode
//             }
//           }
//         }
//       }
//     }
//   `

//   const data =
//     await shopifyFetch<ProductsResponse>({
//       query,
//     })

//   return data.products.nodes
// }

// /* =========================
//    PRODUKTVARIANT
// ========================= */

// export type ShopifyProductVariant = {
//   id: string
//   title: string
//   availableForSale: boolean

//   image: {
//     url: string
//     altText: string | null
//   } | null

//   price: ShopifyMoney

//   selectedOptions: {
//     name: string
//     value: string
//   }[]
// }

// /* =========================
//    PRODUKTDETALJ
// ========================= */

// export type ShopifyProductDetail = {
//   id: string
//   handle: string
//   title: string
//   description: string

//   featuredImage: {
//     url: string
//     altText: string | null
//   } | null

//   priceRange: {
//     minVariantPrice: ShopifyMoney
//   }

//   images: {
//     nodes: ShopifyImage[]
//   }

//   variants: {
//     nodes: ShopifyProductVariant[]
//   }
// }

// type ProductByHandleResponse = {
//   product: ShopifyProductDetail | null
// }

// export async function getProductByHandle(
//   handle: string,
// ) {
//   const query = `
//     query ProductByHandle($handle: String!) {
//       product(handle: $handle) {
//         id
//         handle
//         title
//         description

//         featuredImage {
//           url
//           altText
//         }

//         priceRange {
//           minVariantPrice {
//             amount
//             currencyCode
//           }
//         }

//         images(first: 20) {
//           nodes {
//             id
//             url
//             altText
//           }
//         }

//         variants(first: 50) {
//           nodes {
//             id
//             title
//             availableForSale

//             image {
//               url
//               altText
//             }

//             price {
//               amount
//               currencyCode
//             }

//             selectedOptions {
//               name
//               value
//             }
//           }
//         }
//       }
//     }
//   `

//   const data =
//     await shopifyFetch<ProductByHandleResponse>({
//       query,
//       variables: {
//         handle,
//       },
//     })

//   return data.product
// }

// /* =========================
//    CART TYPES
// ========================= */

// export type ShopifyCartLine = {
//   id: string
//   quantity: number

//   merchandise: {
//     id: string
//     title: string

//     image: {
//       url: string
//       altText: string | null
//     } | null

//     product: {
//       title: string
//       handle: string
//     }

//     price: {
//       amount: string
//       currencyCode: string
//     }
//   }
// }

// export type ShopifyCart = {
//   id: string
//   checkoutUrl: string

//   cost: {
//     totalAmount: {
//       amount: string
//       currencyCode: string
//     }
//   }

//   lines: {
//     nodes: ShopifyCartLine[]
//   }
// }

// /* =========================
//    CREATE CART
// ========================= */

// type CartCreateResponse = {
//   cartCreate: {
//     cart: ShopifyCart | null

//     userErrors: {
//       field: string[] | null
//       message: string
//     }[]
//   }
// }

// export async function createCart(
//   merchandiseId: string,
//   quantity = 1,
// ) {
//   const query = `
//     mutation CartCreate(
//       $merchandiseId: ID!
//       $quantity: Int!
//     ) {
//       cartCreate(
//         input: {
//           lines: [
//             {
//               merchandiseId: $merchandiseId
//               quantity: $quantity
//             }
//           ]
//         }
//       ) {
//         cart {
//           id
//           checkoutUrl

//           cost {
//             totalAmount {
//               amount
//               currencyCode
//             }
//           }

//           lines(first: 50) {
//             nodes {
//               id
//               quantity

//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title

//                   image {
//                     url
//                     altText
//                   }

//                   product {
//                     title
//                     handle
//                   }

//                   price {
//                     amount
//                     currencyCode
//                   }
//                 }
//               }
//             }
//           }
//         }

//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `

//   const data =
//     await shopifyFetch<CartCreateResponse>({
//       query,
//       variables: {
//         merchandiseId,
//         quantity,
//       },
//     })

//   const errors =
//     data.cartCreate.userErrors

//   if (errors.length > 0) {
//     throw new Error(
//       errors
//         .map((error) => error.message)
//         .join(', '),
//     )
//   }

//   return data.cartCreate.cart
// }

// /* =========================
//    ADD TO CART
// ========================= */

// type CartLinesAddResponse = {
//   cartLinesAdd: {
//     cart: ShopifyCart | null

//     userErrors: {
//       field: string[] | null
//       message: string
//     }[]
//   }
// }

// export async function addToCart(
//   cartId: string,
//   merchandiseId: string,
//   quantity = 1,
// ) {
//   const query = `
//     mutation CartLinesAdd(
//       $cartId: ID!
//       $merchandiseId: ID!
//       $quantity: Int!
//     ) {
//       cartLinesAdd(
//         cartId: $cartId

//         lines: [
//           {
//             merchandiseId: $merchandiseId
//             quantity: $quantity
//           }
//         ]
//       ) {
//         cart {
//           id
//           checkoutUrl

//           cost {
//             totalAmount {
//               amount
//               currencyCode
//             }
//           }

//           lines(first: 50) {
//             nodes {
//               id
//               quantity

//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title

//                   image {
//                     url
//                     altText
//                   }

//                   product {
//                     title
//                     handle
//                   }

//                   price {
//                     amount
//                     currencyCode
//                   }
//                 }
//               }
//             }
//           }
//         }

//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `

//   const data =
//     await shopifyFetch<CartLinesAddResponse>({
//       query,
//       variables: {
//         cartId,
//         merchandiseId,
//         quantity,
//       },
//     })

//   const errors =
//     data.cartLinesAdd.userErrors

//   if (errors.length > 0) {
//     throw new Error(
//       errors
//         .map((error) => error.message)
//         .join(', '),
//     )
//   }

//   return data.cartLinesAdd.cart
// }

// /* =========================
//    GET CART
// ========================= */

// type GetCartResponse = {
//   cart: ShopifyCart | null
// }

// export async function getCart(
//   cartId: string,
// ) {
//   const query = `
//     query GetCart($cartId: ID!) {
//       cart(id: $cartId) {
//         id
//         checkoutUrl

//         cost {
//           totalAmount {
//             amount
//             currencyCode
//           }
//         }

//         lines(first: 50) {
//           nodes {
//             id
//             quantity

//             merchandise {
//               ... on ProductVariant {
//                 id
//                 title

//                 image {
//                   url
//                   altText
//                 }

//                 product {
//                   title
//                   handle
//                 }

//                 price {
//                   amount
//                   currencyCode
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `

//   const data =
//     await shopifyFetch<GetCartResponse>({
//       query,
//       variables: {
//         cartId,
//       },
//     })

//   return data.cart
// }

// /* =========================
//    REMOVE FROM CART
// ========================= */

// type CartLinesRemoveResponse = {
//   cartLinesRemove: {
//     cart: ShopifyCart | null

//     userErrors: {
//       field: string[] | null
//       message: string
//     }[]
//   }
// }

// export async function removeFromCart(
//   cartId: string,
//   lineId: string,
// ) {
//   const query = `
//     mutation CartLinesRemove(
//       $cartId: ID!
//       $lineIds: [ID!]!
//     ) {
//       cartLinesRemove(
//         cartId: $cartId
//         lineIds: $lineIds
//       ) {
//         cart {
//           id
//           checkoutUrl

//           cost {
//             totalAmount {
//               amount
//               currencyCode
//             }
//           }

//           lines(first: 50) {
//             nodes {
//               id
//               quantity

//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title

//                   image {
//                     url
//                     altText
//                   }

//                   product {
//                     title
//                     handle
//                   }

//                   price {
//                     amount
//                     currencyCode
//                   }
//                 }
//               }
//             }
//           }
//         }

//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `

//   const data =
//     await shopifyFetch<CartLinesRemoveResponse>({
//       query,
//       variables: {
//         cartId,
//         lineIds: [lineId],
//       },
//     })

//   const errors =
//     data.cartLinesRemove.userErrors

//   if (errors.length > 0) {
//     throw new Error(
//       errors
//         .map((error) => error.message)
//         .join(', '),
//     )
//   }

//   return data.cartLinesRemove.cart
// }

// /* =========================
//    UPDATE QUANTITY
// ========================= */

// type CartLinesUpdateResponse = {
//   cartLinesUpdate: {
//     cart: ShopifyCart | null

//     userErrors: {
//       field: string[] | null
//       message: string
//     }[]
//   }
// }

// export async function updateCartLine(
//   cartId: string,
//   lineId: string,
//   quantity: number,
// ) {
//   const query = `
//     mutation CartLinesUpdate(
//       $cartId: ID!
//       $lines: [CartLineUpdateInput!]!
//     ) {
//       cartLinesUpdate(
//         cartId: $cartId
//         lines: $lines
//       ) {
//         cart {
//           id
//           checkoutUrl

//           cost {
//             totalAmount {
//               amount
//               currencyCode
//             }
//           }

//           lines(first: 50) {
//             nodes {
//               id
//               quantity

//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title

//                   image {
//                     url
//                     altText
//                   }

//                   product {
//                     title
//                     handle
//                   }

//                   price {
//                     amount
//                     currencyCode
//                   }
//                 }
//               }
//             }
//           }
//         }

//         userErrors {
//           field
//           message
//         }
//       }
//     }
//   `

//   const data =
//     await shopifyFetch<CartLinesUpdateResponse>({
//       query,
//       variables: {
//         cartId,

//         lines: [
//           {
//             id: lineId,
//             quantity,
//           },
//         ],
//       },
//     })

//   const errors =
//     data.cartLinesUpdate.userErrors

//   if (errors.length > 0) {
//     throw new Error(
//       errors
//         .map((error) => error.message)
//         .join(', '),
//     )
//   }

//   return data.cartLinesUpdate.cart
// }