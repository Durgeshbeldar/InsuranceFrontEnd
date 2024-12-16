import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileUrl = 'https://localhost:7191/api/File/upload';
  documentUrl = 'https://localhost:7191/api/Document/bulk-add';
  docUrl = 'https://localhost:7191/api/Document';
  constructor(private http: HttpClient) { }
  
  addImage(file: File): Observable<any> {
    const formData = new FormData(); // Create FormData object
    formData.append('file', file); // Append file to form data
    return this.http.post(this.fileUrl, formData); // Send form data to server
  }
  
  uploadDocuments(data:any){
    return this.http.post(this.documentUrl, data);
  }
  updateDocumentStatus(data :any){
    return this.http.put(this.docUrl, data);
  }

}
