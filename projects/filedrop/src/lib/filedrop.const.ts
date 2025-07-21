export interface ProgressFileInfo {
    index: number;
    progress: number;
    file: any;
}

export enum UploadStateEnum {
    Empty,
    UploadStaged,
    Uploading,
    UploadSuccess,
    UploadFailure
  }
  
  export enum FileUploadStatusEnum {
    UPLOADING = 'Uploading',
    SUCCESS = 'Success',
    FAILED = 'Failed',
  }
  