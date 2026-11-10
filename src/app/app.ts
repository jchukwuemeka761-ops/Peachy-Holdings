import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { BookingModals } from './components/booking-modals/booking-modals';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CartDrawer, BookingModals],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
