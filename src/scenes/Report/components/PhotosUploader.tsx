import React, { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import * as firebase from "firebase/app";

import StorageService from "shared/services/storageService";
import { getUUID } from "shared/utils";

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 3px;
  border-radius: 10px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  cursor: pointer;
  transition: border 0.24s ease-in-out;
  margin-bottom: 20px;
  margin-top: 10px;
  min-height: 150px;
`;

const InstructionText = styled.p`
  margin-top: 70px;
`;

const ThumbsContainer = styled.aside({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
});

const Thumb = styled.div({
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
});

const ThumbInner = styled.div({
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  margin: "0 auto"
});

const ImgStyled = styled.img({
  display: "block",
  width: "auto",
  height: "100%"
});

type FileWithPreview = File & { preview: string };
const PhotosUploader: FC<{
  onChange: (e: Event | null, value: any[]) => void;
}> = ({ onChange, ...props }) => {
  const uploadFile = useCallback(
    (file: File, { onProgress, onError, onSuccess }) => {
      return new Promise((resolve, reject) => {
        const uploadTask = StorageService.uploadFile(`pets/${getUUID()}`, file);
        if (!uploadTask) {
          reject("Storage doesn't exist");
          return;
        }

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          onProgress,
          error => {
            console.error("Error uploading the file", (error as any).code);
            reject(error);
          },
          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                resolve(downloadURL);
              });
          }
        );
      });
    },
    []
  );

  const uploadFiles = useCallback(async (files: File[]) => {
    try {
      const result = await Promise.all(files.map(uploadFile));
      return {
        success: files.map((file, index) => ({
          ...file,
          downloadURL: result[index]
        }))
      };
    } catch (error) {
      console.error("Files upload failed", error);
      return { error };
    }
  }, []);

  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    async acceptedFiles => {
      const filesArr: FileWithPreview[] = [
        ...files,
        ...acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ];
      setFiles(filesArr);
      const { success: uploadedFiles } = await uploadFiles(filesArr);
      if (uploadedFiles) {
        onChange && onChange(null, uploadedFiles);
      }
    },
    [onChange, files]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: "image/*", maxSize: 20971520, onDrop });

  const thumbs = files.map((file, index) => (
    <Thumb key={`${file.lastModified}-${index}`}>
      <ThumbInner>
        <ImgStyled src={file.preview} />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      {thumbs && thumbs.length === 0 ? (
        <InstructionText>Upload Photos by drag n drop or click</InstructionText>
      ) : (
        <ThumbsContainer>{thumbs}</ThumbsContainer>
      )}
    </Container>
  );
};

export default PhotosUploader;
