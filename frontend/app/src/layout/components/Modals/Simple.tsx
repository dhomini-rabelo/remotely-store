import { Dialog, Transition } from '@headlessui/react'
import { X } from 'phosphor-react'
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react'

export interface IDefaultProps {
  title?: string
  children: ReactNode
  onClose?: () => void
  controlIsOpen?: boolean
  size?: 'normal' | 'medium' | 'large'
}

export function SimpleModal({
  title = '',
  children,
  controlIsOpen = false,
  onClose = () => null,
  size = 'normal',
}: IDefaultProps) {
  const [isOpen, setIsOpen] = useState<boolean>(controlIsOpen)
  const changedFromControl = useRef(false)

  useEffect(() => {
    changedFromControl.current = false
  }, [controlIsOpen])

  useEffect(() => {
    if (controlIsOpen !== isOpen && !changedFromControl.current) {
      setIsOpen(controlIsOpen)
      changedFromControl.current = true
    }
  }, [controlIsOpen, isOpen])

  function closeModal() {
    setIsOpen(false)
    onClose()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 roboto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`
                    ${size === 'normal' && 'w-full max-w-md'}
                    ${size === 'medium' &&
                    'w-full max-w-md tesm:max-w-md tsm:max-w-[70%] tmd:max-w-[644px] tlg:max-w-[720px]'
                    }
                    ${size === 'large' &&
                    'w-full max-w-md tesm:max-w-md tsm:max-w-[90%] tmd:max-w-[724px] tlg:max-w-[890px]'
                    }
                    p-6 transform rounded-2xl bg-Gray-100
                    text-left align-middle shadow-xl transition-all border-solid
                    border-Gray-300 border-2
                  `.replaceAll('\n', '')}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-Black-500"
                  >
                    <div className="flex justify-between items-center flex-wrap">
                      <strong>{title}</strong>
                      <span onClick={closeModal} className="cursor-pointer">
                        <X size={24} weight="fill" />
                      </span>
                    </div>
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
