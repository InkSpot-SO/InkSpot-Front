import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AppState } from 'src/_ngrx/actions/app.state';
import { postCreate } from 'src/_ngrx/actions/post/post.action';
import { PostService } from 'src/app/_services/post/post.service';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'ik-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  description : string = '';
  fileList: NzUploadFile[] = [  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  beforeUpload = (file: any): boolean => {
    getBase64(file).then(data => {
      // Handle the Base64 data here
      console.log(data);
    });
    return false;
  };

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  constructor(
    private _store : Store<AppState>
    ) {

  }

  sendFormData() {
    const formData = new FormData();
    formData.append('description', this.description);
    this.fileList.forEach((file, index) => {
      formData.append(`image_${index}`, file.originFileObj!);
    });
    this._store.dispatch(postCreate({ post : formData }));
  }
}
