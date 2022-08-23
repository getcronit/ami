/**
 * @license
 *
 * SPDX-FileCopyrightText: Copyright © 2021 snek.at
 * SPDX-License-Identifier: EUPL-1.2
 *
 * Use of this source code is governed by an EUPL-1.2 license that can be found
 * in the LICENSE file at https://snek.at/license
 */
import {IconButton} from '@chakra-ui/react'
import {FaFileUpload} from '@react-icons/all-files/fa/FaFileUpload'
import React from 'react'
import {Accept, FileRejection, useDropzone} from 'react-dropzone'

export type UploadButtonProps = {
  onUpload(acceptedFiles: File[], rejectedFiles: FileRejection[]): void
  accept?: Accept
}

const UploadButton: React.FC<UploadButtonProps> = ({onUpload, accept}) => {
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: onUpload,
    noDrag: true,
    accept,
    maxSize: 5000000
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <IconButton aria-label="" icon={<FaFileUpload />} />
    </div>
  )
}

export default UploadButton
