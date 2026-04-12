import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-root',
  imports: [MatFormFieldModule,RouterOutlet, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  control = new FormControl();

  list: string[] = [
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Pineapple',
    'Strawberry'
  ];

  filteredList: string[] = [...this.list];

  filterList(event: any) {
    const value = event.target.value.toLowerCase();
    this.filteredList = this.list.filter(item =>
      item.toLowerCase().includes(value)
    );
  }

}

