import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-error",
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  title!: string
  message!: string

  constructor(private route: ActivatedRoute) {
    route.data.subscribe((data) => {
      this.title = data["title"]
      this.message = data["message"]
    })
  }
}
