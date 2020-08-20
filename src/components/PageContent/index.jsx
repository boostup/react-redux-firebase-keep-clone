import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  page: {
    padding: theme.spacing(2),
    WebkitOverflowScrolling: "touch",
    height: `calc(100vh - 56px)`,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      height: `calc(100vh - 48px)`,
    },
    [theme.breakpoints.up("sm")]: {
      height: `calc(100vh - 64px)`,
    },
  },
});

class PageContent extends React.Component {
  state = { isScrolled: false };

  componentDidMount() {
    const page = document.getElementById("page");
    page.addEventListener("scroll", this.handleScroll, { passive: true });
  }
  componentWillUnmount() {
    const page = document.getElementById("page");
    page.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const page = document.getElementById("page");
    // Only execute when the elevation should change
    const isScrolled = page.scrollTop > 0;
    if (isScrolled !== this.state.isScrolled) {
      const appBar = document.getElementById("app-bar");
      if (page.scrollTop <= 0) {
        appBar.classList.add("not-scrolled");
      } else {
        appBar.classList.remove("not-scrolled");
      }
      this.setState({
        isScrolled: !this.state.isScrolled,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="page" className={classes.page}>
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles)(PageContent);
