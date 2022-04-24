import "./navbar.scss"

const Navbar = () => {
    return (
        <div className='navbar__wrapper'>
            <div className="navbar__logo-wrapper">
                <i className='icon-logo'></i>
            </div>
            <div className="navbar__search-bar-wrapper">
                <div className="navbar__search-bar">
                    <div className='navbar__search-bar--location'>
                        <i className='icon-location' />
                        <input type="text" placeholder='Chennai' readOnly />
                    </div>
                    <hr />
                    <div className='navbar__search-bar--dish'>
                        <i className='icon-search' />
                        <input type="text" placeholder='Search for restaurant, cuisine or a dish' readOnly />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar