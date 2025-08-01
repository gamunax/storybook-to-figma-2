import { Component, ViewChild } from '@angular/core';
import { Actions, BoxShadows, Styles } from 'atlas-cdk';
import { FiledropComponent, ProgressFileInfo } from 'atlas-filedrop';


@Component({
  selector: 'filedrop-playground',
  templateUrl: './filedrop-playground.component.html',
  styleUrls: ['./filedrop-playground.component.scss']
})
export class FiledropPlayground {
  actions = Actions;
  styles = Styles;
  boxShadows = BoxShadows;
  files: Array<any> = [];
  filesAuxiliar: Array<any> = [];
  filesList: Array<any> = [];
  fileListMultiple: Array<any> = [];
  @ViewChild('fileDropSimple') fileDropSimple: FiledropComponent;
  @ViewChild('fileDropMultiple') fileDropMultiple: FiledropComponent;

  onCanceledUpload(): void {
    this.files = [];
    console.log('canceled upload');
  }

  onSelectedFilesToUpload(files: Array<any>): void {   
    console.log('onSelectedFilesToUpload', this.files);
    this.filesList = files;   
  }

  onSelectedFilesToUploadMultiple(files: Array<any>): void {   
    console.log('onSelectedFilesToUploadMultiple', this.files);
    this.fileListMultiple = files;   
  }

  onDeleteFile(indexToRemove): void {
    console.log('onDeleteFile=', this.files, indexToRemove);
    this.fileDropSimple.deleteFile(indexToRemove);
    console.log('onDeleteFile2=', this.files, indexToRemove);
  }

  onDeleteFileMultiple(indexToRemove): void {
    console.log('onDeleteFileMultiple=', this.files, indexToRemove);
    this.fileDropMultiple.deleteFile(indexToRemove);
    console.log('onDeleteFileMultiple2=', this.files, indexToRemove);
  }

  // New methods to demonstrate programmatic file addition
  onFileAdded(fileInfo: ProgressFileInfo): void {
    console.log('File added:', fileInfo);
  }

  onFileRemoved(fileInfo: ProgressFileInfo): void {
    console.log('File removed:', fileInfo);
  }

  // Method to programmatically add files (simulating email attachments)
  addEmailAttachments(): void {
    // Simulate adding original email attachments programmatically
    const mockAttachment1 = new File(['Original email content 1'], 'original_email_attachment1.pdf', { type: 'application/pdf' });
    const mockAttachment2 = new File(['Original email content 2'], 'original_email_attachment2.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    this.fileDropMultiple.addFiles([mockAttachment1, mockAttachment2]);
  }

  addSingleEmailAttachment(): void {
    // Simulate adding a single attachment programmatically
    const mockAttachment = new File(['Single attachment content'], 'forwarded_document.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    this.fileDropSimple.addFiles([mockAttachment]);
  }
}