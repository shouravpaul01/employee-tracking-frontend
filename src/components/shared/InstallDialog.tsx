'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function InstallDialog() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    // Listen for install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Show dialog on first visit if not standalone
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setShowDialog(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User response: ${outcome}`)
      setDeferredPrompt(null)
      setShowDialog(false)
    }
  }

  if (isStandalone) {
    return null // Don't show install button if already installed
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Install App</DialogTitle>
          <DialogDescription>
            Install this app on your device for quick access and a better
            experience.
          </DialogDescription>
        </DialogHeader>

        {isIOS && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-900">
            To install this app on your iOS device, tap the share button
            <span className="mx-1">⎋</span>
            and then &quot;Add to Home Screen&quot;
            <span className="mx-1">➕</span>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleInstall}>
            Add to Home Screen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}