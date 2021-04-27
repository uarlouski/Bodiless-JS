/**
 * Copyright © 2021 Johnson & Johnson
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

import React, { ComponentType } from 'react';
import {
  withDesign,
  addProps,
  replaceWith,
  stylable,
  Ul,
  Li,
  addPropsIf,
} from '@bodiless/fclasses';
import { ifEditable, withChild } from '@bodiless/core';
import type { WithNodeKeyProps } from '@bodiless/core';
import { asBodilessList } from '@bodiless/components';
import flow from 'lodash/flow';
import negate from 'lodash/negate';
import {
  ButtonBack,
  ButtonNext,
  ButtonPlay,
} from 'pure-react-carousel';
import CarouselDot from './CarouselDot';
import { useIsCarouselItemActive } from './hooks';

const withIntrinsicHeight = withDesign({
  Wrapper: addProps({
    isIntrinsicHeight: true,
  }),
});

const withNoDragIfEditable = withDesign({
  Wrapper: ifEditable(
    addProps({
      dragEnabled: false,
    }),
  ),
});

const withInfinitiveLoop = withDesign({
  Wrapper: addProps({
    infinite: true,
  }),
});

const withCarouselDots = (nodeKeys?: WithNodeKeyProps) => flow(
  withDesign({
    Dots: flow(
      replaceWith(Ul),
      asBodilessList(nodeKeys, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        Item: replaceWith(
          withChild(
            stylable(CarouselDot), 'Dot',
          )(Li),
        ),
      }),
    ),
  }),
);

const withNavigationButtons = withDesign({
  ButtonBack: replaceWith(stylable(ButtonBack)),
  ButtonNext: replaceWith(stylable(ButtonNext)),
});

const withAutoPlayButton = withDesign({
  ButtonPlay: replaceWith(stylable(ButtonPlay)),
});

const withAutoPlayInterval = (interval: number = 3000) => withDesign({
  Wrapper: addProps({
    interval,
  }),
});

const withCarouselItemTabIndex = (Component: ComponentType) => (props: any) => {
  const isItemActive = useIsCarouselItemActive();
  const tabIndex = isItemActive ? 0 : -1;
  return <Component {...props} tabIndex={tabIndex} />;
};

const asAccessibleCarouselButton = flow(
  addProps({
    role: 'button',
  }),
);

const withAriaSelectedCarouselItem = flow(
  addPropsIf(useIsCarouselItemActive)({
    'aria-selected': true,
    'aria-hidden': false,
  }),
  addPropsIf(negate(useIsCarouselItemActive))({
    'aria-selected': false,
    'aria-hidden': true,
  }),
);

const asAccessibleCarousel = withDesign({
  Slider: flow(
    addProps({
      tabIndex: 'auto',
    }),
    withDesign({
      Item: flow(
        withCarouselItemTabIndex,
        withAriaSelectedCarouselItem,
      ),
    }),
  ),
  ButtonBack: asAccessibleCarouselButton,
  ButtonNext: asAccessibleCarouselButton,
  Dots: withDesign({
    Item: flow(
      withAriaSelectedCarouselItem,
      addProps({
        'aria-hidden': false,
        role: 'presentation',
      }),
      withDesign({
        Dot: asAccessibleCarouselButton,
      }),
    ),
  }),
  ButtonPlay: asAccessibleCarouselButton,
});

export {
  withIntrinsicHeight,
  withNoDragIfEditable,
  withInfinitiveLoop,
  withCarouselDots,
  withNavigationButtons,
  withAutoPlayButton,
  withAutoPlayInterval,
  asAccessibleCarousel,
};