import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    
    // Bu metod, kullanıcıdan aldığı email ve password bilgilerini API'ye gönderir.
    this.authService.login(this.formData.email, this.formData.password)
      .subscribe(
         
        // 'response' değişkeni, API'den dönen başarılı yanıtı içerir.
        (response: any) => {
          console.log('Giriş başarılı:', response); // Başarılı giriş yanıtını konsola yazdırır.
          this.errorMessage = null; // Herhangi bir hata mesajını temizler.
          this.router.navigate(['/admin']); // Giriş başarılı olduğunda kullanıcıyı '/admin' sayfasına yönlendirir.
        },
       
        // 'error' değişkeni, API'den dönen hata yanıtını içerir.
        (error) => {
          console.error('Giriş hatası:', error); // Hata mesajını konsola yazdırır.
          this.errorMessage = 'Giriş başarısız. Lütfen tekrar deneyin.'; // Kullanıcıya gösterilecek hata mesajını ayarlar.
        }
      );
  }
}  