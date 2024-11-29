import logo from '../assets/logo.jpg'
import './Header.css'
export default function Header() {
  return (
    <header>
    <div class="wrapper">
	<svg>
		<text x="50%" y="50%" dy=".35em" text-anchor="middle">
			XO Game
		</text>
	</svg>
</div>
    <img src={logo} alt=""/>
  </header>
  )
}
