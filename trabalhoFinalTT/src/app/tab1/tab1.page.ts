import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LivroService } from '../services/livro.service';
//import { AvaliacaoService } from '..services/avaliacao.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    myUserId;
    myUser;

    slides;
    avaliacoes;

    loading = true;

    constructor(public authService: AuthService, public livroService: LivroService, public router: Router, public route: ActivatedRoute) { }

    getMyUser(id) {
        this.authService.mostraUser(id).subscribe(
            (res) => {
                console.log(res);
                this.myUser = res[0];
                this.getLivros(this.myUser.id);
            },
            (error) => {
                console.log(error);
            });
    }

    getLivros(id) {
        this.loading = true;
        this.livroService.mostraOferta(id).subscribe(
            (res) => {
                console.log(res);
                this.slides = res;
                this.loading = false;
            },
            (error) => {
                console.log(error);
            });
    }

    goToLivro(id) {
        this.router.navigate(['/livro', id]);
    }

    ionViewWillEnter() {
        this.myUserId = localStorage.getItem('userId');
        this.getMyUser(this.myUserId);
    }

}
