import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HaberlerService } from 'src/app/services/haberler.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassicEditor } from 'ckeditor5';

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
  images: Array<{ name: string; url: string }> = []; // Resimlerin listesi
  public Editor = ClassicEditor;
  
  public editorData: string = '<p>Başlamak için buraya yazın...</p>';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private haberlerService: HaberlerService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
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

  onContentChange(event: Event): void {
    const content = (event.target as HTMLElement).innerText;
    this.myForm.get('content')?.setValue(content);
  }
  fetchHaberler() {
    this.haberSubscription = this.haberlerService.getHaberler().subscribe(
      (data: any[]) => {
        
        console.log('API Yanıtı:', data); // Yanıtın formatını kontrol edin
        this.haberler = data.map(haber => {
          console.log('Haber:', haber); // Her haber nesnesini kontrol edin
          if (haber.haberResimData) {
            return { 
              ...haber, 
              haberResimData: 'data:image/jpeg;base64,' + haber.haberResimData 
            };
          } else {
            return haber;
          }
        });
  
        // Resimleri listele
        this.images = data.map(haber => ({
    

          name: haber.haberResimAdi || 'Resim Adı Yok',
          url: 'data:image/jpeg;base64,' + haber.haberResimData
        }));
        console.log('Haberler başarıyla alındı:', this.haberler);
      },
      (error: any) => {
        console.error('Haber bilgileri alınamadı:', error);
        this.errorMessage = 'Haber bilgileri alınamadı. Lütfen tekrar deneyin.';
      }
    );
  }
  
  
  deleteHaber(id: number): void {
    if (window.confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      this.haberlerService.deleteHaber(id).subscribe(
        () => {
          console.log('Haber başarıyla silindi:', id);
          this.fetchHaberler(); // Listeyi güncelle
        },
        (error: any) => {
          console.error('Haber silinemedi:', error);
          this.errorMessage = 'Haber silinemedi. Lütfen tekrar deneyin.';
        }
      );
    }
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
console.log(title)
  this.haberlerService.saveHaber(title, content, this.selectedFile).subscribe(
    (response: any) => {
      console.log('Haber başarıyla kaydedildi:', response);
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
    console.log('Form sıfırlandı');
  }

  changeFontSize(size: number): void {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const fragment = range.extractContents();
      const span = document.createElement('span');
      span.style.fontSize = `${size}px`;
      span.appendChild(fragment);

      // Seçimi yeniden ayarla
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    console.log(`Yazı tipi boyutu ${size}px olarak ayarlandı`);
  }

  deleteHaberById(id: number): void {
    const confirmFirst = window.confirm('Bu haberi kaldırmak istediğinizden emin misiniz?');
  
    if (confirmFirst) {
      this.haberlerService.deleteHaber(id).subscribe(
        () => {
          // Başarıyla silindiğinde haber listesini yeniden yükle
          this.fetchHaberler();
          console.log('Haber başarıyla kaldırıldı:', id);
        },
        error => {
          // Hata durumunda kullanıcıya bilgi ver
          console.error('Haber silinemedi:', error);
          alert('Haber silinemedi. Lütfen tekrar deneyin.');
        }
      );
    } else {
      console.log('Haber kaldırma iptal edildi');
    }
  }
}

