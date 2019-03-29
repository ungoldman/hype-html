// https://github.com/choojs/nanohtml
// Copyright 2018 Choo Contributors
// MIT License

import { hyperx } from './hyperx.js'
import { SVG_TAGS, BOOL_PROPS, DIRECT_PROPS } from './constants.js'
import { appendChild } from './append-child.js'

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var COMMENT_TAG = '!--'

export function createElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // If we are extending a builtin element
  var isCustomElement = false
  if (props.is) {
    isCustomElement = props.is
    delete props.is
  }

  // Create the element
  if (ns) {
    if (isCustomElement) {
      el = document.createElementNS(ns, tag, { is: isCustomElement })
    } else {
      el = document.createElementNS(ns, tag)
    }
  } else if (tag === COMMENT_TAG) {
    return document.createComment(props.comment)
  } else if (isCustomElement) {
    el = document.createElement(tag, { is: isCustomElement })
  } else {
    el = document.createElement(tag)
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS.indexOf(key) !== -1) {
        if (String(val) === 'true') val = key
        else if (String(val) === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on' || DIRECT_PROPS.indexOf(key) !== -1) {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  appendChild(el, children)
  return el
}

export function createFragment (nodes) {
  var fragment = document.createDocumentFragment()
  for (var i = 0; i < nodes.length; i++) {
    if (typeof nodes[i] === 'string') nodes[i] = document.createTextNode(nodes[i])
    fragment.appendChild(nodes[i])
  }
  return fragment
}

export const html = hyperx(createElement, {
  comments: true,
  createFragment: createFragment
})
