import { Component, ElementRef, ViewChild, OnInit , AfterViewInit,} from '@angular/core';
declare var $: any; // Declara jQuery para acceder a las funciones de Bootstrap


@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit, AfterViewInit{
  @ViewChild('myCarousel', { static: false }) myCarousel: ElementRef | undefined ;

  ngOnInit() {

  }

  ngAfterViewInit() {
    if(this.myCarousel){
      $(this.myCarousel.nativeElement).carousel({
        interval: 11000
      });
    }
  }

}
