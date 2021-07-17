import React, { Suspense, useLayoutEffect } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';
import 'react-notifications/lib/notifications.css';
import { createBrowserHistory } from 'history';


// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Pages
const Home = React.lazy(() => import("./components/pages/Home"));
const About = React.lazy(() => import("./components/pages/About"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Reservation = React.lazy(() => import("./components/pages/Reservation"));
const Cart = React.lazy(() => import("./components/pages/Cart"));
const Legal = React.lazy(() => import("./components/pages/Legal"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Menuone = React.lazy(() => import("./components/pages/Menuone"));
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
const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
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
          <Route path="/contact" component={Contact} />
          <Route path="/track-order" component={TrackOrder} />
          <Route path="/package" component={Packages} />
          <Route path="/specialities" component={Specialities} />
          <Route path="/checkout" component={Cart} />
        </ScrollToTop>
      </Suspense>
    </Router>
  );
}

export default App;
