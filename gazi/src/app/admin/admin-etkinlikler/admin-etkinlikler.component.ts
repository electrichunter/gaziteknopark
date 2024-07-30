import { Component, OnInit } from '@angular/core';
import { EtkinliklerService } from 'src/app/services/etkinlikler.service';

@Component({
  selector: 'app-admin-etkinlikler',
  templateUrl: './admin-etkinlikler.component.html',
  styleUrls: ['./admin-etkinlikler.component.css']
})
export class AdminEtkinliklerComponent implements OnInit {
  etkinlikler: any[] = [];
  newEtkinlik: any = {};
  seciliEtkinlik: any = {};
  selectedFile: File | null = null;

  constructor(private etkinliklerService: EtkinliklerService) { }

  ngOnInit(): void {
    this.getEtkinlikler();
  }

  getEtkinlikler() {
    this.etkinliklerService.getEtkinlikler()
      .subscribe(
        (data: any[]) => {
          this.etkinlikler = data;
        },
        (error) => {
          console.error('Etkinlikler alınamadı:', error);
        }
      );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.uploadSelectedFile(formData);
    } else {
      console.warn('Lütfen bir dosya seçin.');
    }
  }

  uploadSelectedFile(formData: FormData) {
    this.etkinliklerService.uploadFile(formData)
      .subscribe(
        (response: any) => {
          console.log('Dosya yüklendi 1:', response);
          this.newEtkinlik.filePath = response.filePath;
          /* this.saveEtkinlik(); */
        },
        (error) => {
          console.error('  yüklenirken hata  :', error);
        }
      );
  }

  saveEtkinlik() {
    this.etkinliklerService.saveEtkinlik(this.newEtkinlik.filePath)
      .subscribe(
        (response: any) => {
          console.log('Yeni etkinlik eklendi:', response);
          this.getEtkinlikler();
          this.newEtkinlik = {};
          window.location.reload();  
        },
        (error) => {
          console.error('Etkinlik eklenirken hata oluştu:', error);
        }
      );
  } 

  deleteEtkinlik(etkinlikId: number) {
    this.etkinliklerService.deleteEtkinlik(etkinlikId)
      .subscribe(
        () => {
          console.log('Etkinlik silindi:', etkinlikId);
          this.getEtkinlikler();
        },
        (error) => {
          console.error('Etkinlik silinirken hata oluştu:', error);
        }
      );
  }

  /* etkinlikGuncelle() {
    this.etkinliklerService.updateEtkinlik(this.seciliEtkinlik)
      .subscribe(
        () => {
          console.log('Etkinlik güncellendi:', this.seciliEtkinlik);
          this.getEtkinlikler();
        },
        (error) => {
          console.error('Etkinlik güncellenirken hata oluştu:', error);
        }
      ); */
  }

