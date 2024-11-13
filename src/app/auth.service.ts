import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn().isLoggedIn);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 1.  CSRF TOKEN
  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`);
  }

  // 2. LOGIN
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/api/login`, body).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user_id', response.user_id);
        localStorage.setItem('user_email', response.user_email);
        localStorage.setItem('user_rol', response.user_rol);
        localStorage.setItem('user_name', response.user_name);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  // 3. LOGOUT
  logout(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/api/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_rol');
        localStorage.removeItem('user_name');
        this.isAuthenticatedSubject.next(false);
      }),
      catchError((error) => {
        console.error('Logout failed', error);
        return of(null);
      })
    );
  }

  // 4. REGISTER
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, userData);
  }

  // 5. RECUPERER UN USER
  getUser(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/api/user`, { headers });
  }

  // 6. RECUPERER ALL USERS
  getUsers(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/api/users`, { headers });
  }

  // 7. RECUPERER 1 ACTUALITE
  getSinglePost(idPost: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/actualites/ ${idPost}`);
  }

  // 8. RECUPERER ALL ACTUALITES
  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/actualites`);
  }

  // 9. VERIFIER SI L'USER EST LOGGED IN
  isLoggedIn(): { isLoggedIn: boolean; userId: string | null } {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('user_id');

    if (token && userId) {
      return { isLoggedIn: true, userId };
    } else {
      return { isLoggedIn: false, userId: null };
    }
  }

  // 10. VERIFIER SI L'USER EST ADMIN
  isAdmin(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/api/isAdmin`, { headers });
  }

  // 11. RECUPERER DONNEES DE LocalStorage
  getUserFromLocalStorage(): any {
    return {
      id: localStorage.getItem('user_id'),
      email: localStorage.getItem('user_email'),
      rol: localStorage.getItem('user_rol'),
      name: localStorage.getItem('user_name'),
    };
  }

  getLastPost(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/last-post`);
  }

  updateUser(id: number, updatedUser: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log('Enviando el siguiente cuerpo de datos:', updatedUser);
  
    return this.http.put(`${this.apiUrl}/api/user/${id}`, updatedUser, { headers });
  }
  
  deleteUser(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.delete(`${this.apiUrl}/api/user/${id}`, { headers });
  }
  
  createUser(user: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.post(`${this.apiUrl}/api/users`, user, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  deletePost(id: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/api/actualites/${id}`;
    return this.http.delete(url, { headers });
  }

  updatePost(id: number, updatedData: any): Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/api/actualites/${id}`;
    return this.http.put(url, updatedData, { headers });
  }
  
  createActualite(actualite: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  
    return this.http.post(`${this.apiUrl}/api/actualites`, actualite, { headers });
  }
  
  getReservations(): Observable<any> {
    const token = localStorage.getItem('authToken'); 

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/api/reservations`, { headers });
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations`, reservationData);
  }

  updateReservation(id: number, reservationData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservations/${id}`, reservationData);
  }
  
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservations/${id}`);
  }
}


