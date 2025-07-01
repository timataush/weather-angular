import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  private router = inject(Router)

  searchText = ""

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter" && this.searchText.trim()) {
      this.performSearch()
    }
  }

  onSearch(): void {
    if (this.searchText.trim()) {
      this.performSearch()
    }
  }

  private performSearch(): void {
    const city = this.searchText.trim()
    this.router.navigate(["/city", city])
    this.searchText = ""
  }
}
