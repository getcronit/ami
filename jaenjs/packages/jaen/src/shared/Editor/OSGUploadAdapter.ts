import * as osg from '../../services/openStorageGateway'

export class OSGUploadAdapter {
  loader: any

  constructor(loader: any) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  async upload() {
    const file = await this.loader.file
    const url = await osg.upload(file)

    return {
      default: url
    }
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
  }
}

export function OSGUploadAdapterPlugin(editor: {
  plugins: {
    get: (
      arg0: string
    ) => {
      (): any
      new (): any
      createUploadAdapter: (loader: any) => OSGUploadAdapter
    }
  }
}) {
  editor.plugins.get('FileRepository').createUploadAdapter = loader => {
    return new OSGUploadAdapter(loader)
  }
}
