
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import HomePage from '../components/HomePage';
import BlogPostPage from '../components/BlogPostPage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/blog/:slug" component={BlogPostPage} />
        
      </Switch>
    </Router>
  );
};

export default AppRouter;
