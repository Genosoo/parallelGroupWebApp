import BreadCrumbs from './breadcrumbs/BreadCrumbs'
import ButtonSearch from './buttons/ButtonSearch'
import ButtonMenu from './buttons/ButtonMenu'
import Notification from './Notification'

export default function Navbar() {
  return (
    <div className='navbar_container'>
      <BreadCrumbs />
      <div className='nav_right_box'>
         <ButtonSearch />
         <Notification />
         <ButtonMenu />
      </div>
    </div>
  )
}
