import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Root, BoxContent, animationStyles } from "./styles/NotFoundStyles";

const NotFound = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Simulate a delay before mounting the component
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Root>
      <style>{animationStyles}</style>
      <TransitionGroup component={null}>
        {isMounted && ( // Only render the CSSTransition when isMounted is true
          <CSSTransition classNames="fade" timeout={300} key="not-found">
            <BoxContent>
              <h1>404 Not Found</h1>
              <p>The page you are looking for does not exist.</p>
              <Link to="/">
                <Button variant="outlined" color="error">
                  <span className="go-back">Back To Main Page</span>
                </Button>
              </Link>
            </BoxContent>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Root>
  );
};

export default NotFound;
