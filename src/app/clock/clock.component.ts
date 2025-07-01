import { Component, type OnInit, type OnDestroy, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { Subscription } from "rxjs"
import { ClockService } from "./clock.service"

@Component({
  selector: "app-clock",
  standalone: true,
  imports: [CommonModule],
  template: `{{ time | date:'HH:mm' }}`,
  styles: [`
  
  `]
})
export class ClockComponent implements OnInit, OnDestroy {
  private clockService = inject(ClockService)
  private subscription?: Subscription

  time: Date = new Date()

  ngOnInit(): void {
    this.subscription = this.clockService.getClock().subscribe((time) => {
      this.time = time
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
