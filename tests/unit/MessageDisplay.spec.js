import MessageDisplay from '@/components/MessageDisplay'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios'
import flushPromises from 'flush-promises'

jest.mock('@/services/axios')

beforeEach(() => {
  jest.clearAllMocks()  
})

describe('MessageDisplay', () => {

    test('Calls getMessage and displays message', async () => {
    
        const mockMessage = 'Hello from db!'
        getMessage.mockResolvedValueOnce({ text: mockMessage })
        const wrapper = mount(MessageDisplay) 

        // wait for promise to resolve
        await flushPromises()
        expect(getMessage).toHaveBeenCalledTimes(1)

        const message = wrapper.find('[data-testid="message"]').element.textContent
        expect(message).toEqual(mockMessage)
    })

    test('Displays an error when getMessage call fails', async () => {
    
        const mockError = 'Oops, error'
        getMessage.mockRejectedValueOnce(mockError)
        const wrapper = mount(MessageDisplay) 

        // wait for promise to resolve
        await flushPromises()
        expect(getMessage).toHaveBeenCalledTimes(1)

        const displayedError = wrapper.find('[data-testid="message-error"]')
            .element.textContent
        expect(displayedError).toEqual(mockError)
    })



})