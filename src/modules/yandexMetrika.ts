import type { UserModule } from '~/types'

const metrikaId = 110069608

function installMetrika(id: number) {
  window.ym = window.ym || function (...args: unknown[]) {
    window.ym!.a = window.ym!.a || []
    window.ym!.a.push(args)
  }
  window.ym.l = Date.now()

  if (!document.querySelector('script[data-yandex-metrika]')) {
    const script = document.createElement('script')
    script.async = true
    script.dataset.yandexMetrika = 'true'
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${id}`
    document.head.appendChild(script)
  }

  window.ym(id, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  })
}

export const install: UserModule = ({ isClient, router }) => {
  if (!isClient || !import.meta.env.PROD || !Number.isInteger(metrikaId) || metrikaId <= 0)
    return

  router.isReady().then(() => {
    installMetrika(metrikaId)

    router.afterEach((to, from) => {
      if (to.fullPath === from.fullPath)
        return

      window.ym?.(metrikaId, 'hit', window.location.href, {
        referer: from.fullPath
          ? new URL(from.fullPath, window.location.origin).href
          : document.referrer,
        title: document.title,
      })
    })
  }).catch(() => {})
}
