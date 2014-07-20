/*
 * Copyright 2014 Continuuity, Inc.
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

package com.continuuity.jetstream.flowlet;

import java.util.Map;

/**
 * Configuration Content Generator.
 */
public interface ConfigFileGenerator {

  String generatePacketSchema(InputFlowletSpecification spec);

  String generateOutputSpec(InputFlowletSpecification spec);

  Map<String, String> generateGSQLFiles(InputFlowletSpecification spec);

  Map.Entry<String, String> generateHostIfq();

  String generateIfresXML();
}
