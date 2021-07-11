import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabsPage',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'onboarding-one',
    loadChildren: () => import('./onboarding-one/onboarding-one.module').then( m => m.OnboardingOnePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./onboarding-one/onboarding-one.module').then( m => m.OnboardingOnePageModule)
  },
  {
    path: 'onboarding-two',
    loadChildren: () => import('./onboarding-two/onboarding-two.module').then( m => m.OnboardingTwoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
