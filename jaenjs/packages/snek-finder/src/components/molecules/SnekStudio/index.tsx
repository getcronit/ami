//@ts-ignore
import React from 'react'
import FilerobotImageEditor, {TABS} from 'react-filerobot-image-editor'

export type SnekStudioProps = {
  src: string
  name: string
  isOpen: boolean
  /**
   * Called when the editor should be closed with saving the editing state
   */
  onComplete(file: Blob | null, dataURL: string, fileName?: string): void

  /**
   * Called when the editor should be closed without saving the editing state
   */
  shouldClose(): void
}

const SnekStudio: React.FC<SnekStudioProps> = ({
  src,
  name,
  isOpen,
  onComplete,
  shouldClose
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <FilerobotImageEditor
      defaultSavedImageName={name}
      showBackButton
      closeAfterSave
      observePluginContainerSize={true}
      savingPixelRatio={4}
      previewPixelRatio={4}
      source={src}
      onSave={(editedImageObject, designState) => {
        const {imageBase64, imageCanvas, fullName} = editedImageObject

        if (imageCanvas && imageBase64) {
          imageCanvas.toBlob(blob => {
            onComplete(blob, imageBase64, fullName)
          })
        }
      }}
      onClose={shouldClose}
      annotationsCommon={{
        fill: '#ff0000'
      }}
      Text={{text: 'Text...'}}
      tabsIds={[TABS.RESIZE, TABS.ADJUST, TABS.FILTERS, TABS.FINETUNE]}
    />
  )
}

export default SnekStudio
