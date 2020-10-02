import React, { memo } from 'react'

import cn from 'classnames'

import './index.scss'

/** props
 *
 * goToPreviousPage : called when pressing the left arrow button
 * goToNextPage     : called when pressing the right arrow button
 * goToPage         : called when pressing any of the page numbers
 *
 * visiblePages : odd number of pages you want to be visible, default 5
 * pageCount    : total number of pages
 * currentPage  : current page number
 * 
 * theme : set colors palette
 */
const ReactPaginationNav = ({
  theme = 'dark',
  className, goToPreviousPage, pageCount, currentPage,
  goToPage, goToNextPage, visiblePages = 5,
  isPreviousBtnHidden, isNextBtnHidden,
  PrevNextButton
}) => {
  // in case visiblePages is an even number
  const oddVisiblePages = (parseInt(visiblePages, 10) % 2) === 0
    ? parseInt(visiblePages, 10) + 1
    : parseInt(visiblePages, 10)
  const halfVisiblePages = oddVisiblePages / 2

  return (
    <div className={cn('react-pagination-nav', `react-pagination-nav--${theme}`, className)}>
      {!isPreviousBtnHidden && <PrevNextButton direction='prev' onClick={goToPreviousPage} />}
      <div className="react-pagination-nav__page-list">
        {
          Array(pageCount).fill().map((_, i) => {
            return (
              (
                Math.abs(currentPage - 1 - i) < halfVisiblePages ||
                (currentPage < halfVisiblePages && (i < oddVisiblePages)) ||
                (
                  pageCount - currentPage < halfVisiblePages &&
                  (Math.abs(currentPage - 1 - i) < (oddVisiblePages - (pageCount - currentPage)))
                )
              ) &&
              <button
                key={i}
                className={
                  "react-pagination-nav__page-number react-pagination-nav__button "
                  + (currentPage === i + 1 ? 'react-pagination-nav__button__active' : '')
                }
                onClick={() => goToPage(i+1)}
              >
                {i+1}
              </button>
            )
          })
        }
      </div>
      {!isNextBtnHidden && <PrevNextButton direction='next' onClick={goToNextPage} />}
    </div>
  )
}

const DefaultPrevNextButton = memo(({ direction, onClick }) => {
  return <button
    className={`react-pagination-nav__${direction}-page react-pagination-nav__button`}
    onClick={onClick}
    title={`Go to ${direction} page`}
    aria-label={`Go to ${direction} page`}
  >
    {direction === 'prev' ? '<' : '>'}
  </button>
})

ReactPaginationNav.defaultProps = {
  PrevNextButton: DefaultPrevNextButton
}

export default ReactPaginationNav
