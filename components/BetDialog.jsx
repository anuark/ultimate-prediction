// components/ExampleDialog.js
import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import '@reach/dialog/styles.css'

function BetDialog(props) {
  const { home, away } = props
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <div>
      <div className="text-center pt-3">
        <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700" onClick={open}>Predict</button>
      </div>
      <Dialog isOpen={showDialog} onDismiss={close} className="" style={{width: '30vh'}}>
        <button className="close-button float-right" onClick={close}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span className="text-fuchsia-500" aria-hidden>×</span>
        </button>

        <p className="text-black text-xl p-6">Choose your prediction</p>
        <div className="flex space-x-6 items-center">
          <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-900 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700">{home}</button>
          <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-900 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700">Draw</button>
          <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-900 focus:outline-none dark:bg-cyan-600 dark:hover:bg-cyan-700">{away}</button>
        </div>
      </Dialog >
    </div >
  )
}

export default BetDialog
