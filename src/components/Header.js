//impt
import PropTypes from 'prop-types'
import Button from './Button'


// rafce
const Header = ({title, onClick, showAddForm}) => {

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button 
                onClick={onClick}
                text= {!showAddForm ? 'Add' : 'Close'}
            />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header

