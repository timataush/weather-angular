import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']

})
export class NotFoundComponent {
  private route = inject(ActivatedRoute)
  city = ""

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.city = params["city"] || ""
    })
  }
}
