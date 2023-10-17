import { TestBed } from '@angular/core/testing';

import { AuthentificationInterceptorInterceptor } from './authentification-interceptor.interceptor';

describe('AuthentificationInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthentificationInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthentificationInterceptorInterceptor = TestBed.inject(AuthentificationInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
