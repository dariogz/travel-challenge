import LoaderSVG from '../assets/loader.svg'

function Loader() {
  return (
    <section className="h-full min-h-screen top-0 pt-24 flex items-center justify-center">
      <img src={LoaderSVG} alt="Loading..." />
    </section>
  )
}

export default Loader;