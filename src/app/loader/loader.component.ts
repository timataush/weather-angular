import { Component, type OnInit, type OnDestroy, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { Subscription } from "rxjs"
import { LoaderService } from "./loader.service"
import type { LoaderState } from "./loader.model"

@Component({
  selector: "app-loader",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" [class.hidden]="!show">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  `,
  styles: [
    `
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.3s ease;
    }

    .hidden {
      opacity: 0;
      pointer-events: none;
    }

    .spinner {
      display: flex;
      gap: 5px;
    }

    .spinner > div {
      width: 18px;
      height: 18px;
      background-color: white;
      border-radius: 100%;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .bounce1 {
      animation-delay: -0.32s;
    }

    .bounce2 {
      animation-delay: -0.16s;
    }

    @keyframes sk-bouncedelay {
      0%, 80%, 100% {
        transform: scale(0);
      } 40% {
        transform: scale(1.0);
      }
    }
  `,
  ],
})
export class LoaderComponent implements OnInit, OnDestroy {
  private loaderService = inject(LoaderService)
  private subscription?: Subscription

  show = false

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
