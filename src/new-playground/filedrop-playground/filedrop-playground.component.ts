import { Component, ViewChild } from '@angular/core';
import { Actions, BoxShadows, Styles } from 'atlas-cdk';
import { FiledropComponent } from 'atlas-filedrop';


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
}