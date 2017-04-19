/*
 * Copyright © 2014 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package co.cask.cdap.app.authorization;

import co.cask.cdap.common.conf.CConfiguration;

/**
 * Factory for handling authorization service.
 */
public interface AuthorizationFactory {
  /**
   * Creates an instance of {@link AuthorizationHandler} for authorizing requests
   * being processed by any service.
   *
   * @param configuration An instance of {@link CConfiguration} to configure.
   * @return An instance of {@link AuthorizationHandler}
   */
  AuthorizationHandler create(CConfiguration configuration);
}