/**
 * Copyright © 2022 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import vitalCopyrightRowBaseOrig, { VitalCopyrightRow } from './tokens/vitalCopyrightRow';

/**
  * Use this version of the vital copyrightrow tokens when extending or shadowing.
  * @category Token Collection
  * @see [[vitalCopyrightRow]]
  */
const vitalCopyrightRowBase = vitalCopyrightRowBaseOrig;

export { default as CopyrightRowClean, asCopyrightRowToken, CopyrightRowStatic } from './CopyrightRowClean';
export { default as vitalCopyrightRow } from './tokens';
export type { CopyrightRowComponents, CopyrightRowProps } from './types';

export { vitalCopyrightRowBase, VitalCopyrightRow };
