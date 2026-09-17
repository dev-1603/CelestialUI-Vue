import type { CustomProjectConfig } from 'lost-pixel'

/** Default (or primary) story IDs for all 18 catalog components */
const SMOKE_STORIES = [
  'atoms-button--default',
  'components-atoms-cinput--default',
  'atoms-cicon--default',
  'components-atoms-ccheckbox--default',
  'atoms-cswitch--default',
  'atoms-progress--default',
  'atoms-cavatar--default',
  'atoms-ccard--default',
  'components-molecules-pininput--default',
  'components-molecules-tabs--default',
  'atoms-cbreadcrumb--default',
  'atoms-alert--default',
  'components-molecules-dialog--default',
  'components-organisms-usertenantdropdown--default',
  'components-organisms-identifierfirstresolver--default',
  'components-organisms-authmethoddispatcher--default',
  'components-organisms-mfachallengepanel--totp',
  'components-organisms-qrsessioncanvas--active',
]

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: './storybook-static',
  },
  imagePathBaseline: '.lostpixel/baseline',
  imagePathCurrent: '.lostpixel/current',
  imagePathDifference: '.lostpixel/difference',
  failOnDifference: true,
  threshold: 0.02,
  filterShot: (story) => !!story.id && SMOKE_STORIES.includes(story.id),
}
