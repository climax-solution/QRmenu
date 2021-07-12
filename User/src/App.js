import React, { Suspense, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';


// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Pages
const Home = React.lazy(() => import("./components/pages/Home"));
const Hometwo = React.lazy(() => import("./components/pages/Hometwo"));
const Homethree = React.lazy(() => import("./components/pages/Homethree"));
const Homefour = React.lazy(() => import("./components/pages/Homefour"));
const Bloggrid = React.lazy(() => import("./components/pages/Bloggrid"));
const Bloglist = React.lazy(() => import("./components/pages/Bloglist"));
const Blogmasonry = React.lazy(() => import("./components/pages/Blogmasonry"));
const Blogfull = React.lazy(() => import("./components/pages/Blogfull"));
const Blogsingle = React.lazy(() => import("./components/pages/Blogsingle"));
const About = React.lazy(() => import("./components/pages/About"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Reservation = React.lazy(() => import("./components/pages/Reservation"));
const Cart = React.lazy(() => import("./components/pages/Cart"));
const Legal = React.lazy(() => import("./components/pages/Legal"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Menuone = React.lazy(() => import("./components/pages/Menuone"));
const Menutwo = React.lazy(() => import("./components/pages/Menutwo"));
const Menuitemone = React.lazy(() => import("./components/pages/Menuitemone"));
const Menuitemtwo = React.lazy(() => import("./components/pages/Menuitemtwo"));
const Locations = React.lazy(() => import("./components/pages/Locations"));
const Contact = React.lazy(() => import("./components/pages/Contact"));
const TrackOrder = React.lazy(() => import("./components/pages/TrackOrder"));
const Packages = React.lazy(() => import("./components/pages/Packages"));
const Specialities = React.lazy(() => import("./components/pages/Specialities"));

const ScrollToTop = withRouter(({ children, location: { pathname } }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children || null
})

function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <ScrollToTop>
          <Preloader />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reservation" component={Reservation} />
          <Route path="/cart" component={Cart} />
          <Route path="/legal" component={Legal} />
          <Route path="/error" component={Error} />
          <Route path="/menu" component={Menuone} />
          <Route path="/menu-item-v1/:id" exact component={props => (<Menuitemone {...props} key={window.location.pathname} />)} />
          <Route path="/ordering/:id" exact component={props => (<Menuitemone {...props} key={window.location.pathname} />)} />
          <Route path="/menu-item-v2/:id" exact component={props => (<Menuitemtwo {...props} key={window.location.pathname} />)} />
          <Route path="/locations" component={Locations} />
          <Route path="/contact" component={Contact} />
          <Route path="/track-order" component={TrackOrder} />
          <Route path="/package" component={Packages} />
          <Route path="/specialities" component={Specialities} />
        </ScrollToTop>
      </Suspense>
    </Router>
  );
}

export default App;
