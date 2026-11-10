import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  selectedFiles?: FileList;
  currentFile?: any;
  message = '';
  categoryregform!: FormGroup
  savestatus: boolean = false;

  constructor(private db: DbserviceService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.categoryregform = this.fb.group({
      categoryname: ['',[Validators.required,Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]],
        

      // servicename: [''],
      image: [''],

    });

  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    
    if (!this.categoryregform.valid) {
      this.savestatus = true
      alert('Please data valid data!!')
      return
    }
    else {
    if (this.selectedFiles) {
      // console.log(this.selectedFiles); 
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;

        this.db.upload(this.currentFile).subscribe((event: any) => {
          this.message = event.body.message;
        });

      }
    }
    this.categoryregform.value.image = this.currentFile.name;
    this.db.categoryreg(this.categoryregform.value).then((confirmation: any) => {
      if (confirmation.message === "Success") {
        alert('Category Registered Succesfully')
         window.location.href='/adminmaster/category'
      }
      else {
       window.location.href='/adminmaster/category'
      }
    })

  }
}
}
