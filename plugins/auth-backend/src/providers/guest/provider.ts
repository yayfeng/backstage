/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { createAuthProviderIntegration } from '../createAuthProviderIntegration';
import { AuthHandler, SignInResolver } from '../types';
import { createGuestAuthProviderFactory } from '@backstage/plugin-auth-backend-module-guest-provider';

/**
 * Auth provider integration for Google auth
 *
 * @public
 */
export const guest = createAuthProviderIntegration({
  create(options?: {
    /**
     * The profile transformation function used to verify and convert the auth response
     * into the profile that will be presented to the user.
     */
    authHandler?: AuthHandler<{}>;

    /**
     * Configure sign-in for this provider, without it the provider can not be used to sign users in.
     */
    signIn?: {
      /**
       * Maps an auth result to a Backstage identity for the user.
       */
      resolver: SignInResolver<{}>;
    };
  }) {
    return createGuestAuthProviderFactory({
      profileTransform: options?.authHandler,
      signInResolver: options?.signIn?.resolver,
    });
  },
});
