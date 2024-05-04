// tf/src/app/services/reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {Product, Reservation} from "../../types";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})

export class ReservationService {
   private apiUrl = environment;

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
    return this.http.delete<void>(`${this.apiUrl}/reservations/${reservationId}`);
  }
}
