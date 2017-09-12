import { Component } from '@angular/core';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { ModalController } from 'ionic-angular';
import { QuotePage } from '../quote/quote';
import { SettingService } from '../../services/settings';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes:  Quote[];

  constructor(
    private settingService: SettingService,
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
        this.onRemoveFromFavorites(quote);
      }      
    });
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
    //get quotes again from service
    // this.quotes = this.quotesService.getFavoriteQuotes();
    const position = this.quotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(position, 1);
  }

  getBackgound() {
    return this.settingService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

  isAllBackground() {
    return this.settingService.isAltBackground();
  }
}
