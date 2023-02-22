import AOS from 'aos'
import "aos/dist/aos.css"
export default ({app}) => {
  app.AOS = new AOS.init(
    {
      easing: 'ease-out-back',
      delay: 300,
      once: true
    }
  )
}
