import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // Cambia esto por la URL de tu API Laravel

  constructor(private http: HttpClient) {}

  // 1. Obtener el token CSRF
  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`);
  }

  // 2. Iniciar sesión (Login)
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/api/login`, body).pipe(
      tap((response: any) => {
        // Guardar el token en localStorage después del login exitoso
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('rol', response.rol);
      })
    );
  }

  // 3. Registro de un nuevo usuario
  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/api/register`, body);
  }

  // 4. Cerrar sesión (Logout)
  logout(): Observable<any> {
    // Obtener el token guardado en localStorage
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Hacer la solicitud de logout
    return this.http.post(`${this.apiUrl}/api/logout`, {}, { headers }).pipe(
      tap(() => {
        // Eliminar el token del localStorage después del logout
        localStorage.removeItem('authToken');
      })
    );
  }

  // 5. Obtener los datos del usuario autenticado
  getUser(): Observable<any> {
    // Obtener el token guardado en localStorage
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Hacer la solicitud a la API con el token
    return this.http.get(`${this.apiUrl}/api/user`, { headers });
  }

  // Méthode pour récupérer les utilisateurs (requêtes protégées)
  getUsers(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/api/users`, { headers });
  }

  // Méthode pour récupérer les actualites (non protégé)
  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/actualites`);
  }

  // Méthode pour récupérer une seule actualite (non protégé)
  getSinglePost(idPost: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/actualites/ ${idPost}`);
  }
  // 6. Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    // Verificar si el token existe en localStorage
    return localStorage.getItem('authToken') !== null;
  }

  isAdmin(token: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/api/isAdmin`, { headers });
  }
}
