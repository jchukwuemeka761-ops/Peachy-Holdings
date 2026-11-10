import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'PEACHY HOLDING ENTERPRISE | Excellence Beyond Expectations'
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'About Us | Peachy Holding Enterprise'
  },
  {
    path: 'luxury-cars',
    loadComponent: () => import('./pages/cars/cars').then(m => m.Cars),
    title: 'Luxury Car Rental & Executive Mobility | Peachy Holding'
  },
  {
    path: 'luxury-watches',
    loadComponent: () => import('./pages/watches/watches').then(m => m.Watches),
    title: 'Haute Horlogerie & Luxury Watches | Peachy Holding'
  },
  {
    path: 'spa-wellness',
    loadComponent: () => import('./pages/spa/spa').then(m => m.Spa),
    title: 'Five-Star Spa & Wellness Sanctuary Umuahia | Peachy Holding'
  },
  {
    path: 'logistics',
    loadComponent: () => import('./pages/logistics/logistics').then(m => m.Logistics),
    title: 'Global Logistics, Freight & Consignment Tracking | Peachy Holding'
  },
  {
    path: 'digital-assets',
    loadComponent: () => import('./pages/digital-assets/digital-assets').then(m => m.DigitalAssets),
    title: 'Digital Assets & Macroeconomic Advisory | Peachy Holding'
  },
  {
    path: 'lifestyle-concierge',
    loadComponent: () => import('./pages/lifestyle/lifestyle').then(m => m.Lifestyle),
    title: 'Private Aviation & Lifestyle Concierge | Peachy Holding'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
    title: 'Executive Contact & Umuahia Sanctuary Location | Peachy Holding'
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account').then(m => m.Account),
    title: 'Customer Account & Private Vault | Peachy Holding'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout),
    title: 'Secure Acquisition Checkout | Peachy Holding'
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.Admin),
    title: 'Administrative Operations Console | Peachy Holding'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
