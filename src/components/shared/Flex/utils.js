/**
 * This utility function is used to mutate the original styles array
 * using provided justify prop.
 *
 * @param {Array} styles
 * @param {String} justify
 * @param {Object} c
 */

const justifyHelper = (styles, justify, c) => {
  switch (justify) {
    case 'space-between': {
      styles.push(c.spaceBetween)
      break
    }
    case 'space-evenly': {
      styles.push(c.spaceEvenly)
      break
    }
    case 'space-around': {
      styles.push(c.spaceAround)
      break
    }
    case 'flex-start': {
      styles.push(c.flexStart)
      break
    }
    case 'flex-end': {
      styles.push(c.flexEnd)
      break
    }
    default: {
      break
    }
  }
}

const alignHelper = (styles, align, c) => {
  switch (align) {
    case 'center': {
      styles.push(c.alignCenter)
      break
    }
    case 'flex-start': {
      styles.push(c.alignFlexStart)
      break
    }
    case 'flex-end': {
      styles.push(c.alignFlexEnd)
      break
    }
    case 'space-between': {
      styles.push(c.alignSpaceBetween)
      break
    }
    default: {
      break
    }
  }
}

export { justifyHelper, alignHelper }
