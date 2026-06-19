import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ModalCloseButton from '~/components/ui/ModalCloseButton.vue'

describe('modal close button', () => {
  it.each([360, 375, 390, 414, 430])('emits close on the first click at %ipx', async (width) => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: width })
    window.dispatchEvent(new Event('resize'))

    const wrapper = mount(ModalCloseButton)

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
