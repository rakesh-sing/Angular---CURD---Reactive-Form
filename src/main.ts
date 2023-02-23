import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class App implements OnInit {

  submitted = false;
  addForm = false;
  users: any[] = [];
  showButton = true;
  showUpdate = false;
  currentIndex: any;

  userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      company: new FormControl(),
      gender: new FormControl(),
      dob: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.createUserForm();
  }

  //Creating User Form
  createUserForm() {
      this.userForm = this.fb.group({
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]],
          email: ['', [Validators.required]],
          phone: [
              '',
              [
                  Validators.required,
                  Validators.maxLength(10),
                  Validators.pattern('^[0-9]+$'),
              ],
          ],
          company: ['', Validators.required],
          gender: ['', Validators.required],
          dob: ['', Validators.required],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
      });
  }

  //Form Validation
  get userValidation() {
      return this.userForm.controls;
  }

  //On Register User
  onRegister() {
      this.submitted = true;
      if (this.userForm.invalid) {
          return;
      }
      this.users.push(this.userForm.value);
      if (this.users.length > 0) {
          this.submitted = false
          this.userForm.reset();
      }
  }

  //On Cancle User
  onCancle() {
      this.submitted = false
      this.userForm.reset();
  }

  //On Edit
  onEdit(user: any, index: any) {
      this.currentIndex = index;
      this.userForm.setValue(user);
      this.showUpdate=true;
      this.showButton=false;
  }

  //on Delete
  onDelete(index: any) {
      this.users.splice(index, 1);
      this.userForm.reset();
  }

  //on Update
  onUpdate(){
  this.users[this.currentIndex]=this.userForm.value;
  this.showUpdate=false;
  this.showButton=true
  this.userForm.reset();  
}
}




bootstrapApplication(App);
