import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5002/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(taskData: any): Observable<any> {
    return this.http.post(this.apiUrl, taskData);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMyTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mytasks`);
  }

  updateTaskStatus(taskId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}/status`, { status });
  }

  addComment(taskId: string, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${taskId}/comment`, { comment });
  }
}
