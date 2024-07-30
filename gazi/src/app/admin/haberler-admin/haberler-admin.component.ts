import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HaberlerService } from 'src/app/services/haberler.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-haberler-admin',
  templateUrl: './haberler-admin.component.html',
  styleUrls: ['./haberler-admin.component.css']
})
export class HaberlerAdminComponent implements OnInit, OnDestroy {
  haberler: any[] = [];
  selectedFile: File | null = null;
  selectedImageUrl: string | null = null;
  haberSubscription: Subscription = new Subscription();
  myForm: FormGroup;
  errorMessage: string | null = null;
  images: Array<{ name: string; url: string }> = [];
  editorData: string = '<p>Başlamak için buraya yazın...</p>'; // Başlangıç verisi

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private haberlerService: HaberlerService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      content: [this.editorData, Validators.required] // Burada başlangıç verisini atıyoruz
    });
  }

  ngOnInit() {
    this.fetchHaberler();
  }

  ngOnDestroy(): void {
    if (this.haberSubscription) {
      this.haberSubscription.unsubscribe();
    }
  }

  fetchHaberler() {
    this.haberSubscription = this.haberlerService.getHaberler().subscribe(
      (data: any[]) => {
        this.haberler = data.map(haber => {
          if (haber.haberResimData) {
            return { 
              ...haber, 
              haberResimData: 'data:image/jpeg;base64,' + haber.haberResimData 
            };
          } else {
            return haber;
          }
        });

        this.images = data.map(haber => ({
          name: haber.haberResimAdi || 'Resim Adı Yok',
          url: 'data:image/jpeg;base64,' + haber.haberResimData
        }));
      },
      (error: any) => {
        console.error('Haber bilgileri alınamadı:', error);
        this.errorMessage = 'Haber bilgileri alınamadı. Lütfen tekrar deneyin.';
      }
    );
  }

  saveHaber(): void {
    const title = this.myForm.get('title')?.value;
    const content = this.myForm.get('content')?.value;

    if (!title || !content || !this.selectedFile) {
      this.errorMessage = 'Başlık, içerik veya resim eksik!';
      console.error(this.errorMessage);
      return;
    }

    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Content', content);
    formData.append('File', this.selectedFile);

    this.haberlerService.saveHaber(title, content, this.selectedFile).subscribe(
      (response: any) => {
        this.fetchHaberler();
        this.resetForm();
        this.errorMessage = null;
      },
      (error: any) => {
        console.error('Haber kaydedilemedi:', error);
        this.errorMessage = 'Haber kaydedilemedi. Lütfen tekrar deneyin.';
      }
    );
  }

  resetForm(): void {
    this.myForm.reset();
    this.selectedFile = null;
    this.selectedImageUrl = null;
    this.editorData = '<p>Başlamak için buraya yazın...</p>'; // Başlangıç verisini sıfırla
  }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
        console.log('Seçilen dosya görüntüsü yüklendi:', this.selectedImageUrl);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  deleteHaber(id: number): void {
    if (window.confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      this.haberlerService.deleteHaber(id).subscribe(
        () => {
          this.fetchHaberler(); 
        },
        (error: any) => {
          console.error('Haber silinemedi:', error);
          this.errorMessage = 'Haber silinemedi. Lütfen tekrar deneyin.';
        }
      );
    }
  }
}
