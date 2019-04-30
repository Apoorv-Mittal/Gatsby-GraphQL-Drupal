import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default class About extends React.Component {
  render() {

    return (
      <Layout>
        <SEO title="About QTC" />
        <h1>About QTC</h1>
        <div>Something about QTC</div>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}