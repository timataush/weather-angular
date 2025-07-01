import { Injectable } from "@angular/core"
import { type Observable, interval } from "rxjs"
import { map, startWith, share } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class DateService {
  private date: Observable<Date>
  private locale = "en-us"

  constructor() {
    this.date = interval(10000).pipe(
      startWith(0),
      map(() => new Date()),
      share(),
    )
  }

  getDate(): Observable<Date> {
    return this.date
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    return date.toLocaleDateString(this.locale, options)
  }
}
