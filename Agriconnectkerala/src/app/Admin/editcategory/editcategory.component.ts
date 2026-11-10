import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent {
categoryid: any;
  public categoryArray: any;
  editcategory!: FormGroup;
  selectedFiles?: FileList;
  currentFile?: any;
  fileInfos?: Observable<any>;
  message = '';
  constructor(private fb: FormBuilder, private db: DbserviceService, private router: Router, private route: ActivatedRoute) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.categoryid = params.get('id')
    });
  }
  ngOnInit(): void {
    this.editcategory = this.fb.group({
      categoryid: [''], // Use 'CategoryId' here
      categoryname: [''],
      image: [''],
    })

    const id = this.categoryid;
    console.log(id);
    this.db.getcategorydetails({ id }).then((data: any) => { // Use 'CategoryId' here
      this.categoryArray = data;
      console.log(this.categoryArray);
      this.editcategory.setValue({
        categoryid: data[0].categoryid, // Use 'CourseId' here
        categoryname: data[0].categoryname,
        image: data[0].image

      });
    });
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(event.target.files);
  }

  onSubmit() {
    if (this.selectedFiles) {
      //console.log(this.selectedFiles);
      console.log(this.selectedFiles.item(0));
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.db.upload(this.currentFile).subscribe(
          (event: any) => {
            this.message = event.body.message;
          });
      }
      this.editcategory.value.image = this.currentFile.name;

      this.db.updatecategory(this.editcategory.value)
        .then((confirmation: any) => {
          if (confirmation.message === "Success") {

            alert('Category Details Updated')
            this.router.navigate(['/adminmaster/categoryview'])
          }
        })
    }
    else{
      this.db.updatecategory(this.editcategory.value)
      .then((confirmation: any) => {
        if (confirmation.message === "Success") {

          alert('Category  Details Updated')
          this.router.navigate(['/adminmaster/categoryview'])
        }
      })
    }

  }
}

