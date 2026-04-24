import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



export interface WorkRequestForm {
  site: string;
  title: string;
  description: string;
  images: File[];
  activityFlags: {
    structuralWork: boolean;
    electricalWork: boolean;
    plumbingWork: boolean;
    mechanicalWork: boolean;
  };
  activityParameters: {
    activityType: string;
    priority: string;
    category: string;
    department: string;
    resource: string;
    phase: string;
    zone: string;
    team: string;
    status: string;
  };
}


@Component({
  selector: 'app-root',
  imports: [MatFormFieldModule, RouterOutlet, MatIconModule, MatCheckboxModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  form: WorkRequestForm = {
    site: '',
    title: '',
    description: '',
    images: [],
    activityFlags: {
      structuralWork: false,
      electricalWork: false,
      plumbingWork: false,
      mechanicalWork: false,
    },
    activityParameters: {
      activityType: '',
      priority: '',
      category: '',
      department: '',
      resource: '',
      phase: '',
      zone: '',
      team: '',
      status: '',
    }
  };

  sites = ['Site A', 'Site B', 'Site C'];
  activityTypes = ['Corrective', 'Preventive', 'Inspection'];
  priorities = ['Low', 'Medium', 'High', 'Critical'];
  categories = ['Category 1', 'Category 2', 'Category 3'];
  departments = ['Maintenance', 'Operations', 'Engineering'];
  resources = ['Resource 1', 'Resource 2', 'Resource 3'];
  phases = ['Phase 1', 'Phase 2', 'Phase 3'];
  zones = ['Zone A', 'Zone B', 'Zone C'];
  teams = ['Team Alpha', 'Team Beta', 'Team Gamma'];
  statuses = ['Open', 'In Progress', 'Closed'];

  isDragging = false;
  imagePreviewUrls: string[] = [];

  constructor(public activeModal: NgbActiveModal) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) this.handleFiles(files);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) this.handleFiles(input.files);
  }

  handleFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      if (['image/png', 'image/jpeg', 'image/gif'].includes(file.type) && file.size <= 10 * 1024 * 1024) {
        this.form.images.push(file);
        const reader = new FileReader();
        reader.onload = (e) => this.imagePreviewUrls.push(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(index: number): void {
    this.form.images.splice(index, 1);
    this.imagePreviewUrls.splice(index, 1);
  }

  onSubmit(): void {
    console.log('Work Request Submitted:', this.form);
    this.activeModal.close(this.form);
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }


}

