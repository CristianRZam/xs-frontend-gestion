import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';

interface Slide {
  image: string;
  title: string;
  text: string;
}

@Component({
  selector: 'xs-login-carousel',
  imports: [
    NgForOf
  ],
  templateUrl: './xs-login-carousel.html',
  styleUrl: './xs-login-carousel.scss'
})
export class XsLoginCarousel implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      image: 'assets/images/img_lo_1.jpg',
      title: 'Comprometidos con el desarrollo local',
      text: 'La Municipalidad de Pira trabaja para brindar mejores servicios a la comunidad.'
    },
    {
      image: 'assets/images/img_lo_2.jpg',
      title: 'Gestión responsable y transparente',
      text: 'Impulsamos acciones orientadas al cuidado del entorno y el bienestar ciudadano.'
    },
    {
      image: 'assets/images/img_lo_3.jpg',
      title: 'Modernización y servicio al vecino',
      text: 'Implementamos soluciones tecnológicas para una atención más rápida y eficiente.'
    }
  ];


  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }
}
