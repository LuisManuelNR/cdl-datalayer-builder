import { writable } from 'svelte/store'

export interface DatalayerEvent {
  name: string,
  data: {
    event: 'imPageView' | 'imAnalyticsEvent'
    [key: string]: any
  }
}

const testEvents: DatalayerEvent[] = [
  {
    name: 'Thank you page',
    data: {
      event: 'imPageView',
      context: {
        language: 'es', // (es)
        country: 'es', // (es|mx|co)
        platform: 'web_responsive', // (web_responsive|app_responsive_ios|app_responsive_android|ios|android)
        brand: 'cdl', // (cdl)
        division: 'cdl', // (cdl)
      },
      page: {
        type: 'checkout',
        id: 'typ',
      },
      user: {
        state: 'logged', // (logged|not_logged),
        type: 'client', // (client|prospect)
        profile: 'particular', // (afiliado|empresa|particular)
        id: 16969620,
        member: 'original', // (original|genuino|leyenda)
        dimension170: 'si_socio', // (si_socio|no_socio)
        social_register: '',
        ctf: '3d1cc8a9a158c9c8344406bede4fdbbd:7d57cc0514dc5bf441185cbaf304732941fbaf417188f00a2ebe52aa01cf2f91967dfd2f2a2b1cc8df553ffd6742f6be', // email encriptado AES128
        dimension165:
          '0fe3cafae85878ed9e906b0164fc522ce906bee1f9c45ac0dd3f6f010b44f1ee', // email encriptado SHA256
      },
      ecommerce: {
        currencyCode: 'EUR', // moneda preguntar a jesus
        purchase: {
          actionField: {
            id: 36419054, // id transacción
            revenue: 17, // importe total del pedido
            shipping: 0, // importe envio
            tax: 0, // pregutar a jesus
            revenue_neto: 17.9, // importe sin IVA?? preguntar a jesus
            coupon: null,
            has_shipping: 'Si', // si tiene gastos de envio
          },
          products: [
            {
              id: 12744060,
              name: 'VERTIGO',
              brand: 'AGUILAR', // editorial
              price: '17,00',
              category: 'Novela contemporánea',
              quantity: 1,
              dimension77: 'BANDINI, RIGOBERTA', // nombre autor
              dimension78: 'no', // si tiene stock
              dimension164: 'cdl', // si es producto usado (marketplace | cdl)
              type: 'libro', // tipo producto (libro|ebook|accesorios|pelicula)
              novelty: false, // preguntar a jesus
              ean: '9788403523388', // ean
              net_price: '17,00', // precioProductoRebajadoMoneda??
              dimension155: 5, // descuento
              dimension156: 'Si', // si tiene descuento (Si|No)
              family: 'Literatura', // categoría??
              subfamily: 'Literatura contemporánea', // subcategoria??
              product_url:
                'https://pre-front-nuxt.casadellibro.com/libro-vertigo/9788403523388/12744060',
              distributor: 'PENGUIN RANDOM HOUSE GRUPO EDITORIAL',
            },
          ],
        },
      },
      order: {
        id: [36419054],
        order: ['3e76x38186'],
      },
      shipping: {
        type: 'Envío en 1 día', // nombre método de envio
      },
      payment: {
        type: 'Visa Paycomet|', // método de pago
      },
      dimension166: 0, // importe total productos de segunda mano
      dimension167: 17, // importe total productos de casadellibro
      dimension168: [], // productos de segunda mano
      dimension169: [
        // productos casadellibro
        '12744060',
      ],
    }
  },
  {
    name: 'Home',
    data: {
      event: 'imPageView',
      context: {
        language: 'es',
        country: 'es',
        platform: 'web_responsive',
        brand: 'cdl',
        division: 'cdl',
      },
      page: {
        type: 'home',
        id: 'home',
      },
      user: {
        state: 'logged',
        type: 'client',
        profile: 'particular',
        id: 13419725,
        member: 'original',
        dimension170: 'si_socio',
        ctf: 'f02ccece24da7c6c302aa6e115ede205:4456bb6fba92e00171a9a840dd1a8c4f4d9c86a0fdc4ebacb3227bb595e44adf293006db16bfc36675865d06b3f1012c',
        dimension165:
          '9dae6f1c87b7c0f01c29dfdb0f092897d7ad82a4392f88e80af694d185115724',
      }
    }
  }
]

export const events = writable<DatalayerEvent[]>(testEvents)
export const selectedEvent = writable<DatalayerEvent>()

export function selectEvent (e: DatalayerEvent) {
  selectedEvent.set(e)
}