import React from 'react'

const Header = () => {

  const hideMenu = () =>  {
    let mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hide');
  }

  return (
    <header>
      <div id='header-desktop' className='mobile-hide'>
        <h1>Header</h1>
        <ul>
          <li><a href='#'>Home</a></li>
          <li><a href="#/about">About</a></li>
        </ul>
      </div>
      <div id='header-mobile' className='desktop-hide'>
        <h1 id='mobile-menu-button' onClick={hideMenu}>Menu</h1>
        <ul id='mobile-menu' className='hide'>
          <li><a href='#'>Home</a></li>
          <li><a href="#/about">About</a></li>
        </ul>
      </div>
    </header>
  )
}

export default Header
