import filetype from 'magic-bytes.js'

export async function getFileType(file: File) {
  const buffer = await file.arrayBuffer()
  const [t, ...rest] = filetype(new Uint8ClampedArray(buffer))

  return {
    mime: t.mime || 'application/octet-stream',
    extension: t.extension,
    typename: t.typename
  }
}
