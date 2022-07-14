//@ts-ignore
import React from 'react'
import FilerobotImageEditor, {TABS, TOOLS} from 'react-filerobot-image-editor'

export type SnekStudioProps = {
  src: string
  name: string
  isOpen: boolean
  /**
   * Called when the editor should be closed with saving the editing state
   */
  onComplete(file: Blob | null, dataURL: string, fileName?: string): void
  /**
   * Calle
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
      source={src}
      defaultSavedImageName={name}
      savingPixelRatio={4}
      previewPixelRatio={4}
      observePluginContainerSize={true}
      onSave={(editedImageObject, designState) => {
        console.log('saved', editedImageObject, designState)

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
      Crop={{
        autoResize: true,
        presetsItems: [],
        presetsFolders: []
      }}
      tabsIds={[
        TABS.ADJUST,
        TABS.ANNOTATE,
        TABS.WATERMARK,
        TABS.FILTERS,
        TABS.FINETUNE,
        TABS.RESIZE
      ]} // or {['Adjust', 'Annotate', 'Watermark']}
      defaultTabId={TABS.ANNOTATE} // or 'Annotate'
      defaultToolId={TOOLS.TEXT} // or 'Text'
      showBackButton
      closeAfterSave
    />
  )
}

export default SnekStudio
