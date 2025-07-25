import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { importProvidersFrom } from '@angular/core';
import { withRouterConfig } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
  withFetch,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import {
  MsalInterceptor,
  MSAL_INSTANCE,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { environment } from './environments/environment';
import { CustomPaginatorIntl } from './core/services/custom-paginator/custom-paginator-intl.service';
import { MatPaginatorIntl } from '@angular/material/paginator';

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_eventsWalnut',
    resetPassword: 'B2C_1_password_reset',
    editProfile: 'B2C_1_profile_edit',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://eventsAzureb2c.b2clogin.com/eventsAzureb2c.onmicrosoft.com/B2C_1_eventsWalnut',
    },
    resetPassword: {
      authority:
        'https://eventsAzureb2c.b2clogin.com/eventsAzureb2c.onmicrosoft.com/B2C_1_password_reset',
    },
    editProfile: {
      authority:
        'https://eventsAzureb2c.b2clogin.com/eventsAzureb2c.onmicrosoft.com/B2C_1_profile_edit',
    },
  },
  authorityDomain: 'eventsAzureb2c.b2clogin.com',
};

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.adb2cConfig.clientId,
      authority: b2cPolicies.authorities.signUpSignIn.authority, //environment.msalConfig.auth.authority,
      knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowPlatformBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  //have this set if more microservice used or requires different scope for different controllers
  protectedResourceMap.set(
    environment.adb2cConfig.apiEndpointUrl, // This is for all controllers
    environment.adb2cConfig.scopeUrls
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    loginFailedRoute: '/login-failed',
  };
}

//provideRouter(routes,withRouterConfig({ onSameUrlNavigation: 'reload' })),
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};
