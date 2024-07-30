import { Component, OnInit, OnDestroy } from '@angular/core';
import { SliderService } from 'src/app/services/slider.servivice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider-admin',
  templateUrl: './slider-admin.component.html',
  styleUrls: ['./slider-admin.component.css']
})
export class SliderAdminComponent implements OnInit, OnDestroy {
  sliders: any[] = [];
  selectedFile: File | null = null;
  currentSlide: number = 0;
  intervalId: any;
  sliderSubscription: Subscription = new Subscription(); // Varsayılan değer  

  constructor(private sliderService: SliderService) {}

  ngOnInit() {
    this.fetchSliders(); // İlk yükleme için sliderları getir
   // this.startSlider();
  }


/*   
  startSlider(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 saniye
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.sliders.length;
    const sliderWrapper = document.querySelector('.inner-wrapper') as HTMLElement;
    sliderWrapper.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }
 */







  
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.sliderSubscription) {
      this.sliderSubscription.unsubscribe();
    }
  }

  fetchSliders() {
    this.sliderSubscription = this.sliderService.getSliders().subscribe(
      (data) => {
        this.sliders = data.map(slider => {
          const imagePath = slider.resim_yol.substring(slider.resim_yol.indexOf('assets') + 'assets'.length);
          return { ...slider, resim_yol: `assets\\${imagePath}`.replace(/\//g, '\\') };
        });
      },
      (error) => {
        console.error('Slider bilgileri alınamadı', error);
      }
    );
  }

  deleteSlider(index: number): void {
    const confirmFirst = window.confirm('Bu slider\'ı silmek istediğinize emin misiniz?');
    if (confirmFirst) {
      const confirmSecond = window.confirm('Bu işlem geri alınamaz. Silmek istediğinize gerçekten emin misiniz?');
      if (confirmSecond) {
        const slider = this.sliders[index];
        this.sliderService.deleteSlider(slider.id).subscribe(() => {
          this.sliders.splice(index, 1);
        });
      }
    }
  }



  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadSliderImage() {
    if (this.selectedFile) {
      this.sliderService.uploadSliderImage(this.selectedFile).subscribe(
        (response) => {
          console.log('Resim yüklendi ve kaydedildi', response);
          this.fetchSliders(); // Yeni slider yüklendikten sonra listeyi güncelle
          this.selectedFile = null; // Seçimi sıfırla
        },
        (error) => {
          console.error('Resim yüklenirken hata oluştu', error);
        }
      );
    } else {
      console.error('Resim dosyası seçilmedi');
    }
  }
}
