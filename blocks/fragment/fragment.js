/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */
import { loadFragment } from '../../scripts/aem.js';

export default async function decorate(block) {
  loadFragment(block);
}
