import { Component, OnInit, Input, ViewChild, Type } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { SharedService, UserService } from '../../services/index';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Md5 } from 'ts-md5/dist/md5';
declare let $: any;
@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  public user: any = null;
  src: string;
  data: any;
  cropperSettings: CropperSettings;

  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  onOld: boolean = true;
  onChange: boolean = true;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  constructor(
    fb: FormBuilder,
    private sharedService: SharedService,
    private userService: UserService) {

    //Cropper settings 2
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.cropperSettings.canvasWidth = 450;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;

    this.cropperSettings.rounded = true;
    this.cropperSettings.minWithRelativeToResolution = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;
    this.data = {};
    this.data.image = '';

  }
  ngOnInit(): void {
    this.user = this.sharedService.getUser();
  }

  onChangePic() {
    $("#myModal").modal();
  }

  onChangePass() {
    $("#myModalPassword").modal();
  }

  /////////////////////    image change  ///////////////////
  fileChangeListener($event: any) {
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  imageSave() {
    this.src = this.data.image;
    this.user.imagelocation = this.src;
    this.userService.imageChange(this.user.imagelocation, this.user.id)
      .then(res => {
        if (res.sucess) {

        }
        else {

        }
      })
  }

  changePassword() {
    this.onOld = true;
    this.onChange = true;
    var password = Md5.hashStr(Md5.hashStr(this.user.email) + this.oldPassword);
    console.log (password);
    console.log (this.user.password);
    if (password != this.user.password) this.onOld = false;
    if (this.newPassword != this.confirmPassword) this.onChange = false;
    password = Md5.hashStr(Md5.hashStr(this.user.email) + this.newPassword);
    if (this.onOld == true && this.onChange == true) {
      this.userService.passwordChange(password, this.user.id)
        .then(res => {
          if (res.sucess) {

          }
          else {

          }
        })
    }
  }
}
