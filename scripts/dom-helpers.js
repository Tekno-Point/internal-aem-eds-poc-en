/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-param-reassign */

/**
 * Example Usage:
 *
 * domEl('main',
 *  div({ class: 'card' },
 *  a({ href: item.path },
 *    div({ class: 'card-thumb' },
 *     createOptimizedPicture(item.image, item.title, 'lazy', [{ width: '800' }]),
 *    ),
 *   div({ class: 'card-caption' },
 *      h3(item.title),
 *      p({ class: 'card-description' }, item.description),
 *      p({ class: 'button-container' },
 *       a({ href: item.path, 'aria-label': 'Read More', class: 'button primary' }, 'Read More'),
 *     ),
 *   ),
 *  ),
 * )
 */

/**
 * Helper for more concisely generating DOM Elements with attributes and children
 * @param {string} tag HTML tag of the desired element
 * @param  {[Object?, ...Element]} items: First item can optionally be an object of attributes,
 *  everything else is a child element
 * @returns {Element} The constructred DOM Element
 */
export function domEl(tag, ...items) {
    const element = document.createElement(tag);
  
    if (!items || items.length === 0) return element;
  
    if (!(items[0] instanceof Element || items[0] instanceof HTMLElement) && typeof items[0] === 'object') {
      const [attributes, ...rest] = items;
      items = rest;
  
      Object.entries(attributes).forEach(([key, value]) => {
        if (!key.toLowerCase().startsWith('on')) {
          element.setAttribute(key, Array.isArray(value) ? value.join(' ') : value);
        } else {
          element.addEventListener(key.substring(2).toLowerCase(), value);
        }
      });
    }
  
    items.forEach((item) => {
      item = item instanceof Element || item instanceof HTMLElement
        ? item
        : document.createTextNode(item);
      element.appendChild(item);
    });
  
    return element;
  }
  
  /*
    More short hand functions can be added for very common DOM elements below.
    domEl function from above can be used for one off DOM element occurrences.
  */
    export function select(...items) { return domEl('select', ...items); }

    // Basic HTML Elements
    export function a(...items) { return domEl('a', ...items); }
    export function abbr(...items) { return domEl('abbr', ...items); }
    export function address(...items) { return domEl('address', ...items); }
    export function area(...items) { return domEl('area', ...items); }
    export function article(...items) { return domEl('article', ...items); }
    export function aside(...items) { return domEl('aside', ...items); }
    export function audio(...items) { return domEl('audio', ...items); }
    export function b(...items) { return domEl('b', ...items); }
    export function base(...items) { return domEl('base', ...items); }
    export function bdi(...items) { return domEl('bdi', ...items); }
    export function bdo(...items) { return domEl('bdo', ...items); }
    export function blockquote(...items) { return domEl('blockquote', ...items); }
    export function body(...items) { return domEl('body', ...items); }
    export function br(...items) { return domEl('br', ...items); }
    export function button(...items) { return domEl('button', ...items); }
    export function canvas(...items) { return domEl('canvas', ...items); }
    export function caption(...items) { return domEl('caption', ...items); }
    export function cite(...items) { return domEl('cite', ...items); }
    export function code(...items) { return domEl('code', ...items); }
    export function col(...items) { return domEl('col', ...items); }
    export function colgroup(...items) { return domEl('colgroup', ...items); }
    export function data(...items) { return domEl('data', ...items); }
    export function datalist(...items) { return domEl('datalist', ...items); }
    export function dd(...items) { return domEl('dd', ...items); }
    export function del(...items) { return domEl('del', ...items); }
    export function details(...items) { return domEl('details', ...items); }
    export function dfn(...items) { return domEl('dfn', ...items); }
    export function dialog(...items) { return domEl('dialog', ...items); }
    export function div(...items) { return domEl('div', ...items); }
    export function dl(...items) { return domEl('dl', ...items); }
    export function dt(...items) { return domEl('dt', ...items); }
    export function em(...items) { return domEl('em', ...items); }
    export function embed(...items) { return domEl('embed', ...items); }
    export function fieldset(...items) { return domEl('fieldset', ...items); }
    export function figcaption(...items) { return domEl('figcaption', ...items); }
    export function figure(...items) { return domEl('figure', ...items); }
    export function footer(...items) { return domEl('footer', ...items); }
    export function form(...items) { return domEl('form', ...items); }
    export function h1(...items) { return domEl('h1', ...items); }
    export function h2(...items) { return domEl('h2', ...items); }
    export function h3(...items) { return domEl('h3', ...items); }
    export function h4(...items) { return domEl('h4', ...items); }
    export function h5(...items) { return domEl('h5', ...items); }
    export function h6(...items) { return domEl('h6', ...items); }
    export function header(...items) { return domEl('header', ...items); }
    export function hr(...items) { return domEl('hr', ...items); }
    export function html(...items) { return domEl('html', ...items); }
    export function i(...items) { return domEl('i', ...items); }
    export function iframe(...items) { return domEl('iframe', ...items); }
    export function img(...items) { return domEl('img', ...items); }
    export function input(...items) { return domEl('input', ...items); }
    export function ins(...items) { return domEl('ins', ...items); }
    export function kbd(...items) { return domEl('kbd', ...items); }
    export function label(...items) { return domEl('label', ...items); }
    export function legend(...items) { return domEl('legend', ...items); }
    export function li(...items) { return domEl('li', ...items); }
    export function link(...items) { return domEl('link', ...items); }
    export function main(...items) { return domEl('main', ...items); }
    export function map(...items) { return domEl('map', ...items); }
    export function mark(...items) { return domEl('mark', ...items); }
    export function menu(...items) { return domEl('menu', ...items); }
    export function meta(...items) { return domEl('meta', ...items); }
    export function meter(...items) { return domEl('meter', ...items); }
    export function nav(...items) { return domEl('nav', ...items); }
    export function noscript(...items) { return domEl('noscript', ...items); }
    export function object(...items) { return domEl('object', ...items); }
    export function ol(...items) { return domEl('ol', ...items); }
    export function optgroup(...items) { return domEl('optgroup', ...items); }
    export function option(...items) { return domEl('option', ...items); }
    export function output(...items) { return domEl('output', ...items); }
    export function p(...items) { return domEl('p', ...items); }
    export function picture(...items) { return domEl('picture', ...items); }
    export function pre(...items) { return domEl('pre', ...items); }
    export function progress(...items) { return domEl('progress', ...items); }
    export function q(...items) { return domEl('q', ...items); }
    export function rp(...items) { return domEl('rp', ...items); }
    export function rt(...items) { return domEl('rt', ...items); }
    export function ruby(...items) { return domEl('ruby', ...items); }
    export function s(...items) { return domEl('s', ...items); }
    export function samp(...items) { return domEl('samp', ...items); }
    export function script(...items) { return domEl('script', ...items); }
    export function section(...items) { return domEl('section', ...items); }
    export function select(...items) { return domEl('select', ...items); }
    export function small(...items) { return domEl('small', ...items); }
    export function source(...items) { return domEl('source', ...items); }
    export function span(...items) { return domEl('span', ...items); }
    export function strong(...items) { return domEl('strong', ...items); }
    export function style(...items) { return domEl('style', ...items); }
    export function sub(...items) { return domEl('sub', ...items); }
    export function summary(...items) { return domEl('summary', ...items); }
    export function sup(...items) { return domEl('sup', ...items); }
    export function table(...items) { return domEl('table', ...items); }
    export function tbody(...items) { return domEl('tbody', ...items); }
    export function td(...items) { return domEl('td', ...items); }
    export function template(...items) { return domEl('template', ...items); }
    export function textarea(...items) { return domEl('textarea', ...items); }
    export function tfoot(...items) { return domEl('tfoot', ...items); }
    export function th(...items) { return domEl('th', ...items); }
    export function thead(...items) { return domEl('thead', ...items); }
    export function time(...items) { return domEl('time', ...items); }
    export function title(...items) { return domEl('title', ...items); }
    export function tr(...items) { return domEl('tr', ...items); }
    export function track(...items) { return domEl('track', ...items); }
    export function u(...items) { return domEl('u', ...items); }
    export function ul(...items) { return domEl('ul', ...items); }
    export function video(...items) { return domEl('video', ...items); }
    export function wbr(...items) { return domEl('wbr', ...items); }