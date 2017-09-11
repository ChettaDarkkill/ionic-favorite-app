import { Component } from '@angular/core';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { ModalController } from 'ionic-angular';
import { QuotePage } from '../quote/quote';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes:  Quote[];

  constructor(
    private modalCtrl: ModalController,
    private quotesService: QuotesService){}

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage,quote);
    modal.present();
    //callback function
    modal.onDidDismiss( (remove: boolean) => {
      if(remove) {
        this.quotesService.removeQuoteFromFavorites(quote);
        //get quotes again from service
        // this.quotes = this.quotesService.getFavoriteQuotes();
        const position = this.quotes.findIndex((quoteEl: Quote) => {
          return quoteEl.id == quote.id;
        });
        this.quotes.splice(position, 1);
      }      
    });

  }
}
