'use client'
 
import { parseAsBoolean, useQueryState } from 'nuqs'

export const useCreateWorkspaceModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
      "create-workspace",
      parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true})   
     )

     const open = () => setIsOpen(true)
     const onClose = () => setIsOpen(false)

     return {
        isOpen,
        open,
        onClose,
        setIsOpen
     }
    
  }