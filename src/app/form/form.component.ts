import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupModel } from 'src/app/shared/signup.model';
import { ViewWarningComponent } from '../view-warning/view-warning.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
subscriptions: string[]=['Basic','Pro','Advanced'];
signupForm: FormGroup;
signup: SignupModel;
passwordMatchInvalid: boolean = false;
validations = {email: false, password: false, confirmedpassword: false};
signupArray = [];

  constructor(public dialog: MatDialog, public http: HttpClient) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'subscription': new FormControl(null,[Validators.required]),
      'password': new FormControl(null,[Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&]).{8,30}')]),
      'confirmedpassword': new FormControl(null,[Validators.required])
    });
    this.signupForm.patchValue({subscription: "Advanced"});
  }

  focusOutFunction() {
    var pass: string = this.signupForm.controls['password'].value;
    var confirmPass = this.signupForm.controls['confirmedpassword'].value;
    if(pass && pass.length > 0 && pass !== confirmPass) {
      this.passwordMatchInvalid = true;
    }else {
      this.passwordMatchInvalid = false;
    }
  }
  onSubmit(data: any){
    for (const field in this.signupForm.controls) {
      if(this.signupForm.controls[field].status === "INVALID") {
        // Show validation string if the status is invalid
        this.validations[field] = true;
      }else {
        // Remove the validation string if the status is valid
        this.validations[field] = false;
      }
    }
    console.log(this.signupForm);
    this.signup = new SignupModel(
      data.email,
      data.subscription,
      data.password,
      data.confirmedpassword,
      new Date().toLocaleDateString()
    );
    // console.log(this.signup);
    if(this.signupForm.status === "VALID") {
      this.signupArray.push(this.signup);
      this.saveText( JSON.stringify(this.signup), "signup.json" );
      this.http.post('/api/v1/person', this.signup).subscribe(obj => {});
    }


  }

  saveText(text: any, filename: any){
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
  }

  onClear() {
    const dialogRef = this.dialog.open(ViewWarningComponent, {
      width: '40%',
      height: '20%',
      data: null
    });

    dialogRef.afterClosed().subscribe(action => {
      if(action === "clear") {
        this.signupForm.reset();
      }
    });
  }
  
  
}
