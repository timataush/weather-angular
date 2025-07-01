import { Component, type OnInit, type OnDestroy, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { Subscription } from "rxjs"
import { DateService } from "./date.service"

@Component({
  selector: "app-date",
  standalone: true,
  imports: [CommonModule],
  template: `{{ date }}`,
})
export class DateComponent implements OnInit, OnDestroy {
  private dateService = inject(DateService)
  private subscription?: Subscription

  date = ""

  ngOnInit(): void {
    this.subscription = this.dateService.getDate().subscribe((date) => {
      this.date = this.dateService.formatDate(date)
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
