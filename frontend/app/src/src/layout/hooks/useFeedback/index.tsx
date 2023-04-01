import { ReactNode, useState } from 'react'
import { ErrorModal } from './components/ErrorModal'
import { SuccessModal } from './components/SuccessModal'

export interface IRenderFeedbackArgs {
  onClose?: () => void
  title?: string
  message: string
  wait?: boolean
}

export type IRenderFeedback = (
  type: 'error' | 'success',
  args: IRenderFeedbackArgs,
) => void

export function useFeedback() {
  const [FeedbackElement, setFeedbackElement] = useState<string | ReactNode>('')

  const feedbackTypes = {
    success: SuccessModal,
    error: ErrorModal,
  }

  function renderFeedback(
    type: keyof typeof feedbackTypes,
    { onClose, wait = false, ...otherProps }: IRenderFeedbackArgs,
  ) {
    const FeedComponent = feedbackTypes[type]
    if (!wait) {
      setFeedbackElement(
        <FeedComponent
          onClose={() => {
            setFeedbackElement('')
            if (onClose) {
              onClose()
            }
          }}
          {...otherProps}
        />,
      )
    } else {
      setTimeout(() => {
        setFeedbackElement(
          <FeedComponent
            onClose={() => {
              setFeedbackElement('')
              if (onClose) {
                onClose()
              }
            }}
            {...otherProps}
          />,
        )
      }, 125)
    }
  }

  return {
    FeedbackElement,
    renderFeedback,
  }
}
