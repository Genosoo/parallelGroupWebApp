import Login from '../../../auth/login/Login'
import Cards from '../cards/Cards'

export default function Home() {
  return (
    <div className='landingPage_container'>
      <Login />
      <Cards />
    </div>
  )
}
