import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {
  ofertaForm: FormGroup;
  constructor(public formbuilder: FormBuilder, private router: Router, public storage: Storage) {
    this.ofertaForm = this.formbuilder.group({
      titulo: [null, [Validators.required]],
      autor: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      preco: [null, [Validators.required]],
      sinopse: [null],
      info: [null],
    })
  }
  ngOnInit(){}
  voltaPraHome(){
    this.router.navigate(['/tabs/tab2']);
  }
}
