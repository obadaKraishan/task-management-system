import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:5002/api/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${projectId}`);
  }

  // Add more methods as needed for adding, updating projects
}
