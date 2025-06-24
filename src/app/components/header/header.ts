import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [FormsModule],
    templateUrl: './header.html',
    styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() weatherConditionChange = new EventEmitter<string>();

  currentTime = '';
  currentDate = '';
  cityInput = 'Minsk';
  suggestions: string[] = [];
  showSuggestions = false;
  isSignedIn = false;
  currentAPI = 'openweather';

  private timeSubscription?: Subscription;

  private cities = [
    'Minsk', 'Moscow', 'London', 'Paris', 'Berlin', 'Rome', 'Madrid', 'Amsterdam',
    'Vienna', 'Prague', 'Warsaw', 'Kiev', 'Stockholm', 'Oslo', 'Copenhagen',
    'Helsinki', 'Tallinn', 'Riga', 'Vilnius', 'Bratislava', 'Budapest', 'Bucharest'
  ];

  ngOnInit() {
    this.updateDateTime();
    this.timeSubscription = interval(60000).subscribe(() => {
      this.updateDateTime();
    });
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  updateDateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    this.currentDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  onCityInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim();

    if (query.length > 2) {
      this.suggestions = this.cities.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      this.showSuggestions = this.suggestions.length > 0;
    } else {
      this.showSuggestions = false;
    }
  }

  selectSuggestion(city: string) {
    this.cityInput = city;
    this.showSuggestions = false;
    this.searchCity();
  }

  searchCity() {
    if (this.cityInput.trim()) {
      this.showSuggestions = false;
      // Simulate weather condition change
      const conditions = ['sunny', 'cloudy', 'rainy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      this.weatherConditionChange.emit(randomCondition);
    }
  }

  signIn() {
    this.isSignedIn = !this.isSignedIn;
  }

  signUp() {
    alert('Sign up feature would redirect to registration page');
  }

  toggleAPI() {
    this.currentAPI = this.currentAPI === 'openweather' ? 'stormglass' : 'openweather';
  }
}
