import BreadCrumbs from './breadcrumbs/BreadCrumbs'
import ButtonNotif from './buttons/ButtonNotif'
import ButtonSearch from './buttons/ButtonSearch'
import ButtonMenu from './buttons/ButtonMenu'

export default function Navbar() {
  return (
    <div className='navbar_container'>
      <BreadCrumbs />
      <div className='nav_right_box'>
         <ButtonSearch />
         <ButtonNotif />
         <ButtonMenu />
      </div>
    </div>
  )
}
