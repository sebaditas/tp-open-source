// tf/src/app/services/reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {Product, Reservation} from "../../types";

@Injectable({
  providedIn: 'root'
})

export class ReservationService {
  private apiUrl = 'https://my-json-server.typicode.com/HenryCenturion/demo';

  constructor(private http: HttpClient) { }

  reserve(product: Product, rentorId: string): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/reservations`, {
      product,
      rentorId
    });
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`);
  }

  getUserReservations(userId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`)
      .pipe(
        map(reservations => reservations.filter(reservation => reservation.rentorId === userId))
      );
  }
  deleteReservation(reservationId: string): Observable<void> {
    return this.http.delete<void>(`https://my-json-server.typicode.com/HenryCenturion/demo/reservations/${reservationId}`);
  }
}
