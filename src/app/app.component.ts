import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import * as tf from '@tensorflow/tfjs';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, startWith, map } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    MatSortModule,
    MatCheckboxModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatMenuModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ai-browser';
  tabs: any[];
  query: string = '';
  searchResults: string[] = [];
  nextTabId = 2;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private http: HttpClient) {
    this.tabs = JSON.parse(localStorage.getItem('tabs') ?? '[]');
    const tabId = this.activateRoute.snapshot.paramMap.get('id');

    if (this.tabs.length) {
      this.tabs.forEach((tab) => {
        if (tab.active && tab.id === tabId) {
          this.router.navigateByUrl(`/tab/${tab.id}`);
        }
      });
    } else {
      this.tabs = [{ id: 1, name: 'Tab 1', active: true }];
    }
  }

  searchControl = new FormControl();
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    // Load your TensorFlow.js model here
    this.loadModel();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  async loadModel() {
    const model = await tf.loadLayersModel('path/to/your/model.json');
    // Use the model for predictions
  }

  addTab() {
    this.tabs.push({
      id: this.nextTabId,
      name: `Tab ${this.nextTabId}`,
      active: true,
    });
    this.router.navigateByUrl(`/tab/${this.nextTabId}`);
    this.nextTabId++;
    localStorage.setItem('tabs', JSON.stringify(this.tabs));
  }

  removeTab(id: number) {
    this.tabs = this.tabs.filter((tab) => tab.id !== id);
    if (this.tabs.length > 0) {
      this.router.navigateByUrl(`/tab/${this.tabs[this.tabs.length - 1].id}`);
    } else {
      this.router.navigateByUrl('/');
    }
    localStorage.setItem('tabs', JSON.stringify(this.tabs));
  }

  search() {
    if (!this.query.trim()) return;

    // Simulated AI search API call
    this.http.get<{ results: string[] }>('https://api.example.com/search?q=' + this.query).subscribe(
      response => {
        this.searchResults = response.results;
      },
      error => {
        this.searchResults = ['No results found.'];
      }
    );
  }
}
