import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FiledropComponent } from './filedrop.component';
import { ProgressFileInfo } from './filedrop.const';

describe('FiledropComponent', () => {
  let component: FiledropComponent;
  let fixture: ComponentFixture<FiledropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiledropComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addFiles method', () => {
    it('should programmatically add files to the component', () => {
      // Arrange
      const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });
      const files = [mockFile];
      component.multipleFiles = true;

      // Mock the updateProgressFile to prevent automatic progress updates
      spyOn(component as any, 'updateProgressFile');
      spyOn(component.fileAdded, 'emit');
      spyOn(component.selectedFiles, 'emit');

      // Act
      component.addFiles(files);

      // Assert
      expect(component.files.length).toBe(1);
      expect(component.files[0].file).toBe(mockFile);
      expect(component.files[0].index).toBe(0);
      expect(component.files[0].progress).toBe(0);
      expect(component.fileAdded.emit).toHaveBeenCalledWith(component.files[0]);
      expect(component.selectedFiles.emit).toHaveBeenCalledWith(component.files);
    });

    it('should reject multiple files when multipleFiles is false', () => {
      // Arrange
      const mockFile1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
      const mockFile2 = new File(['content2'], 'test2.txt', { type: 'text/plain' });
      const files = [mockFile1, mockFile2];
      component.multipleFiles = false;

      spyOn(component.uploadFail, 'emit');

      // Act & Assert
      expect(() => component.addFiles(files)).toThrowError("Can't upload more than one file");
      expect(component.uploadFail.emit).toHaveBeenCalledWith(files);
      expect(component.hasError.status).toBe(true);
    });

    it('should reject files when already has file and multipleFiles is false', () => {
      // Arrange
      const existingFile = new File(['existing'], 'existing.txt', { type: 'text/plain' });
      const newFile = new File(['new'], 'new.txt', { type: 'text/plain' });
      
      component.multipleFiles = false;
      component.files = [{ file: existingFile, index: 0, progress: 0 }];
      
      spyOn(component.uploadFail, 'emit');

      // Act & Assert
      expect(() => component.addFiles([newFile])).toThrowError("Can't upload more than one file");
      expect(component.uploadFail.emit).toHaveBeenCalledWith([newFile]);
      expect(component.hasError.status).toBe(true);
    });

    it('should handle empty array gracefully', () => {
      // Arrange
      const initialLength = component.files.length;

      // Act
      component.addFiles([]);

      // Assert
      expect(component.files.length).toBe(initialLength);
    });

    it('should handle null/undefined gracefully', () => {
      // Arrange
      const initialLength = component.files.length;

      // Act
      component.addFiles(null as any);
      component.addFiles(undefined as any);

      // Assert
      expect(component.files.length).toBe(initialLength);
    });
  });

  describe('deleteFile method', () => {
    it('should emit fileRemoved event when deleting a file', () => {
      // Arrange
      const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });
      const fileInfo: ProgressFileInfo = { file: mockFile, index: 0, progress: 50 };
      component.files = [fileInfo];
      component.multipleFiles = true;

      spyOn(component.fileRemoved, 'emit');
      spyOn(component.selectedFiles, 'emit');

      // Act
      component.deleteFile(0);

      // Assert
      expect(component.fileRemoved.emit).toHaveBeenCalledWith(fileInfo);
      expect(component.selectedFiles.emit).toHaveBeenCalledWith([]);
      expect(component.files.length).toBe(0);
    });

    it('should reindex remaining files after deletion', () => {
      // Arrange
      const mockFile1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
      const mockFile2 = new File(['content2'], 'test2.txt', { type: 'text/plain' });
      const mockFile3 = new File(['content3'], 'test3.txt', { type: 'text/plain' });
      
      component.files = [
        { file: mockFile1, index: 0, progress: 0 },
        { file: mockFile2, index: 1, progress: 0 },
        { file: mockFile3, index: 2, progress: 0 }
      ];
      component.multipleFiles = true;

      spyOn(component.fileRemoved, 'emit');

      // Act - delete middle file
      component.deleteFile(1);

      // Assert
      expect(component.files.length).toBe(2);
      expect(component.files[0].index).toBe(0);
      expect(component.files[1].index).toBe(1);
      expect(component.files[0].file).toBe(mockFile1);
      expect(component.files[1].file).toBe(mockFile3);
    });
  });

  describe('fileAdded and fileRemoved events', () => {
    it('should emit fileAdded event when files are added via onFileDropped', () => {
      // Arrange
      const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });
      component.multipleFiles = true;
      
      // Mock the updateProgressFile to prevent automatic progress updates
      spyOn(component as any, 'updateProgressFile');
      spyOn(component.fileAdded, 'emit');

      // Act
      component.onFileDropped([mockFile]);

      // Assert
      expect(component.fileAdded.emit).toHaveBeenCalledTimes(1);
      expect(component.fileAdded.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        file: mockFile,
        index: 0,
        progress: 0
      }));
    });
  });
});
